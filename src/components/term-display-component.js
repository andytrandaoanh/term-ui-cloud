import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TERM_API_URL, EXAMPLE_API_URL, safeHeaders } from './api-config';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  containerBox:{
    margin: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },

  paper: {
    padding: 12,
  },
  buttonWrap:{
    textAlign: 'right',
    marginTop: -30,
  },

  exampleWrap:{
    marginLeft: 10,
  }

}));



export default function TermDisplayComponent(props) {
  const classes = useStyles();
  const [termData, setTermData] = useState([]);
  const [examples, setExamples] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isExampleLoading, setIsExampleLoading] = useState(false);
  const [isTermLoading, setIsTermLoading] = useState(false);

  

  useEffect(() => {
    const fetchTermData = async () => {
     
      setIsTermLoading(true);

        try {
        const result = await axios.get(`${TERM_API_URL}/${props.termId}`, safeHeaders);
        //setTermData(result.data);
        console.log(result.data);
        setTermData(result.data);

      } catch (error) {
        setIsError(true);
      }

      setIsTermLoading(false);
      //console.log({'photo data': photoData});
 
    };

    const fetchExamples = async () => {
     
      setIsExampleLoading(true);

        try {
        const result = await axios.get(`${EXAMPLE_API_URL}/term/${props.termId}`, safeHeaders);
        //setTermData(result.data);
        //console.log(result.data);
        setExamples(result.data);

      } catch (error) {
        setIsError(true);
      }

      setIsExampleLoading(false);
      //console.log({'photo data': photoData});
 
    };

    
    fetchTermData();
    fetchExamples();
  },[props.termId]);



  return (
    <Fragment>
     {isError && <div>Something went wrong when loading API data ...</div>} 
    {isExampleLoading || isTermLoading ? ( <div>Loading examples ...</div>) : (
      <Container maxWidth="md">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} >

          <Button  
            size="medium" color="primary" 
            startIcon={<HomeIcon />}
            component={RouterLink} to={`/home`}>Go Home
          </Button>

          <Button  
            size="medium" color="primary"           
            startIcon={<AddBoxIcon />}
            component={RouterLink} to={`/examples/add/${termData.term_id}`}>Add Example
          </Button>

          <Button  size="medium" color="primary" 
            startIcon={<EditIcon />}
            component={RouterLink} to={`/terms/edit/${props.termId}`}>
            Edit Term
          </Button>


        </Grid>        
        <Grid item xs={6}>
       <Typography variant="overline" display="block" gutterBottom>
        Main Term ({termData.main_lang})
      </Typography>
      <Typography variant="h4" gutterBottom>
      {termData.main_term}
      </Typography>
      </Grid>
      <Grid item xs={6}>
      <Typography variant="overline" display="block" gutterBottom>
      Corrensponding Term  ({termData.co_lang})
      </Typography>    
      <Typography variant="h4" gutterBottom>
      {termData.co_term}
      </Typography>       
      </Grid> 
      <Grid item xs={12}>
        TAGS: {termData.tags}
      </Grid>
      <Grid item xs={12}>
              <Divider />
      </Grid>


        {examples.map(item => (
          
          <div className={classes.exampleWrap}>

          <Grid item xs={12} key={`container${item.eg_id}`} >
            <Typography variant="subtitle1" gutterBottom>
              {item.eg_body}
            </Typography>

          </Grid>
          <Grid item xs={12} key={`source${item.eg_id}`} >
          <Typography component="div">

            <Box fontStyle="italic" m={1}>
            {item.eg_source}
            </Box>

            </Typography>
            <div className={classes.buttonWrap}>
            <IconButton aria-label="delete" 
            className={classes.margin}
            component={RouterLink} to={`/examples/edit/${item.eg_id}`}
            >
              <EditIcon fontSize="small" />
            </IconButton> 
            <IconButton aria-label="delete" 
            className={classes.margin}
            component={RouterLink} to={`/examples/delete/${item.eg_id}`}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>           
            </div>
          </Grid>


        </div>
          
        ))}
      </Grid>
      </Container>
    )}  

    </Fragment>
  );
  
}

