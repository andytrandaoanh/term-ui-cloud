import React, { Fragment,  useState, useEffect } from 'react';
import axios from 'axios';
import { TERM_API_URL, safeHeaders  } from './api-config.js';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles({

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  termcard: {
    margin: 5,
  },

  itemLink:{
    marginRight: 5,
  },

  orderList: {
     columns: '2 auto',
  },
  
  itemType:{
    marginLeft: 5,
    color: 'gray',
  },


});




export default function TermSearchComponent (props) {
	const classes = useStyles();
	const [termData, setTermData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
		const [isError, setIsError] = useState(false);

	useEffect(() => {
	   	const fetchData = async () => {
	   		setIsError(false);
	  		setIsLoading(true);
        const SEARCH_URL_WITH_PARAMS = `${TERM_API_URL}/combined/${props.langId}`;

        console.log(SEARCH_URL_WITH_PARAMS);

	      	try {
	    		const result = await axios.get(SEARCH_URL_WITH_PARAMS, safeHeaders );          
          console.log(result);
          setTermData(result.data);


	  		} catch (error) {

	    		setIsError(true);
	  		}

	  		setIsLoading(false);
	  		//console.log('props', props.queryString);
	 
	    };
	 
	    fetchData();
	  }, [props]);

	return (
    <Fragment>

    {isError && <Alert severity="info">No terms found with your search. Click Home button to return.</Alert>}
    {isLoading && ( <div>Loading ...</div>) }

    {!isError && !isLoading && (
    <div className={classes.root}>

      <ul className={classes.orderList}>    
        {termData.map((term) => (
        <li key={term.term_id}>
           

          <Link className={classes.itemLink} component={RouterLink} to={`/terms/display/${term.term_id}`} target="_blank">
          {props.langId === 'vi' ? term.term_vi : term.term_en }
          </Link>
          {props.langId === 'vi' ? term.term_en : term.term_vi }
          
            <Typography className={classes.itemType} variant="caption" display="inline" gutterBottom>
            ({term.type})
            </Typography>

        </li>
        ))}

      </ul>

    </div>
    )}

   

	</Fragment>
  )	


}
