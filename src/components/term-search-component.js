import React, { Fragment,  useState, useEffect } from 'react';
import axios from 'axios';
import { TERM_API_URL } from './api-config.js';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        const SEARCH_URL_WITH_PARAMS = `${TERM_API_URL}/search?main_term=${props.queryString}&co_term=${props.queryString}&tags=${props.queryString}`;

        console.log(SEARCH_URL_WITH_PARAMS);

	      	try {
	    		const result = await axios.get(SEARCH_URL_WITH_PARAMS);          
          console.log(result);
          setTermData(result.data);


	  		} catch (error) {

	    		setIsError(true);
	  		}

	  		setIsLoading(false);
	  		//console.log('props', props.queryString);
	 
	    };
	 
	    fetchData();
	  }, [props.queryString]);

	return (
    <Fragment>

    {isError && <Alert severity="info">No terms found with your search. Click Home button to return.</Alert>}
    {isLoading && ( <div>Loading ...</div>) }

    {!isError && !isLoading && (
    <div className={classes.root}>

    <Grid container spacing={3}>
        {termData.map((term) => (
          
        <Grid key={term.term_id} xs={3}>
           <Card className={classes.termcard}>
            <CardContent>
              <Typography variant="h5" component="h4">
                {term.main_term}
              </Typography>
              
              <span>{term.co_term}</span>
              
                <IconButton 
                aria-label={`info about ${term.main_term}`} 
                className={classes.icon} component={RouterLink} 
                to={`/terms/display/${term.term_id}`}>
                  <InfoIcon />
                </IconButton>

            </CardContent>  
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    )}

   

	</Fragment>
  )	


}
