import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { LANGUAGE_API_URL, EXAMPLE_API_URL, safeHeaders, writeHeaders } from './api-config';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  centerBox: {
      width: '100%',
      textAlign: "center"
  }
}));



export default function ExampleEditComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const [example, setExample] = useState({});
  const [isError, setIsError] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');


  
  const sendPutRequest = async () => {



    try {

        const resp = await axios.put(`${EXAMPLE_API_URL}/${props.egId}`, example, writeHeaders );
        console.log(resp.data);
        history.push(`/terms/display/${example.term_id}`);

    } catch (err) {
      
      if(err.response.status === 400){
        
        setUpdateMessage('Your session is expired. Please log in again');
      } 

      if(err.response.status === 401){
        
        setUpdateMessage('You are not allowed to modify data');
      } 
    }
  };


  const handleChange = (event) => {
    event.persist();
    setExample(example => ({...example, [event.target.name]: event.target.value}));
}



  const handleSubmit = (event) =>{    
    sendPutRequest();
    //console.log('language', egLang);
    
    event.preventDefault();
  }



  useEffect(() => {
    const fetchExampleData = async () => {
     
      setDataLoading(true);

        try {
        const result = await axios.get(`${EXAMPLE_API_URL}/${props.egId}`, safeHeaders );
        setExample(result.data);
        


      } catch (error) {
        setIsError(true);
        console.log('error loading term data', error);
      }

      setDataLoading(false);
      //console.log({'photo data': photoData});
 
    };

    

    const fetchLangData = async () => {
     
      setListLoading(true);

        try {
        const result = await axios.get(`${LANGUAGE_API_URL}`, safeHeaders );
        const langArray = [];
        result.data.forEach((lang)=>langArray.push({langID: lang.lang_id, shortName: lang.short_name}));
        //console.log(langArray);
        setLanguages(langArray);


      } catch (error) {
        setIsError(true);
        console.log('error loading languages', error);
      }

      setListLoading(false);
      //console.log({'photo data': photoData});
 
    };

    fetchLangData();
    fetchExampleData();
  },[props.egId]);



  return (
    <Fragment>
    {isError && <div>Something went wrong when loading API data ...</div>}
    {listLoading || dataLoading ? ( <div>Loading ...</div>) : (
    <div>    
    <CssBaseline />
    <Container maxWidth="md">
    <Grid container className={classes.root} spacing={2}>
    <Grid item xs={12} >
        
          <TextField 
            id="lang_id"
            name="lang_id"
            select
            label="Select"
            value={example.lang_id}
            onChange={handleChange}
            helperText="Language"
            SelectProps={{className: classes.selectControl}}
          >
            
            {languages.map(language =>(
              <MenuItem key={`eg-lang-${language.langID}`} value={language.langID}>
                  {language.shortName}
              </MenuItem>   
            ))}  
            
          </TextField>
      </Grid>
   
      <Grid item xs={12} >

        <TextField
          id="eg_body"
          name="eg_body"
          label="Example"
          multiline
          fullWidth
          rowsMax={8}
          value={example.eg_body}
          onChange={handleChange}
        />

        <TextField
          id="eg_source"
          name="eg_source"
          label="Source"
          multiline
          fullWidth
          rowsMax={4}
          value={example.eg_source}
          onChange={handleChange}
        />
        
        </Grid>
        <div className={classes.centerBox}>
        <Button 
          variant="contained" color="primary" 
          onClick = {(event)=>handleSubmit(event)}
        
        >
          Submit
        </Button>
        </div>
        
        <div className={classes.centerBox}>
          <Typography variant="caption" display="block" gutterBottom>{updateMessage}</Typography>
        </div>

    </Grid>
    </Container>
    </div>
    )}
    </Fragment>
    
  );
}
