import React, { Fragment,  useState, useEffect } from 'react';
import axios from 'axios';
import { TERM_API_URL, safeHeaders  } from './api-config.js';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SlideshowIcon from '@material-ui/icons/Slideshow';


const useStyles = makeStyles((theme) =>({
  
  root: {
    flexGrow: 1,
  },
  
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },


}));




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
	  }, [props.langId]);

	return (
    <Fragment>

    {isError && <Alert severity="info">No terms found with your search. Click Home button to return.</Alert>}
    {isLoading && ( <div>Loading ...</div>) }

    {!isError && !isLoading && (
    <div className={classes.root}>

      <Grid container spacing={3}>   
        {termData.map((term) => (
        <Grid item xs={12} sm={6} md={4} key={term.term_id}>
          <Paper className={classes.paper}>

            <Typography variant="h5" gutterBottom color="primary">
              {props.langId === 'vi' ? term.term_vi : term.term_en }
            </Typography>
          
            <Typography variant="h6" gutterBottom display="inline">
            {props.langId === 'vi' ? term.term_en : term.term_vi }
            </Typography>

            <IconButton aria-label="show" size="small" component={RouterLink} to={`/terms/display/${term.term_id}`}>
              <SlideshowIcon fontSize="small"  />
            </IconButton>

          </Paper>
        </Grid>
        ))}

      </Grid>

    </div>
    )}

   

	</Fragment>
  )	


}
