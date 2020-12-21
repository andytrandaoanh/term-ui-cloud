import React, { Fragment,  useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { TERM_API_URL, safeHeaders  } from './api-config.js';


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

export default function TermCards() {
  const classes = useStyles();
  
  const [termData, setTermData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

        try {
        const result = await axios(TERM_API_URL, safeHeaders );        
        setTermData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
      //console.log(termData);
 
    };
 
    fetchData();
  }, []);  

  return (
    <Grid container spacing={3}>
        {termData.map(term => (
            <Grid key={term.term_id} xs={3}>
            <Card className={classes.termcard}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                recently added term
              </Typography>
              <Typography variant="h5" component="h2">
                {term.main_term}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {term.co_term}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to={`/terms/display/${term.term_id}`}>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        ))}
    </Grid>
  );
}
