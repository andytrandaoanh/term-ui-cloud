import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { TERM_API_URL, LANGUAGE_API_URL, EXAMPLE_API_URL, safeHeaders, writeHeaders } from './api-config';
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
    textAlign: 'center',
  }
}));



export default function EditTermForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [termData, setTermData] = useState([]);
  const [egLang, setEgLang] = useState(1);
  const [egBody, setEgBody] = useState('');
  const [egSource, setEgSource] = useState('');
  const [isError, setIsError] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');


  

  const sendPostRequest = async () => {


    const newExample = {
        termId : props.termId,
        langId : egLang,
        egBody: egBody,
        egSource: egSource,
        status: 0

    };


    try {
        const resp = await axios.post(EXAMPLE_API_URL, newExample, writeHeaders);
        console.log(resp.data);
        history.push(`/terms/display/${props.termId}`);
        
    } catch (err) {
      console.log(err);
      
      if(err.response.status === 400){
        
        setUpdateMessage('Your session is expired. Please log in again');
      } 

      if(err.response.status === 401){
        
        setUpdateMessage('You are not allowed to modify data');
      } 
    
    }
  };





  const handleSubmit = (event) =>{    
    sendPostRequest();

    event.preventDefault();
  }



  useEffect(() => {
    const fetchTermData = async () => {
     
      setDataLoading(true);

        try {
        const result = await axios.get(`${TERM_API_URL}/${props.termId}`, safeHeaders);
        setTermData(result.data);
        setEgLang(result.data.main_lang_id);


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
        const result = await axios.get(`${LANGUAGE_API_URL}`, safeHeaders);
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
    fetchTermData();
  },[props.termId]);



  return (
    <Fragment>
    {isError && <div>Something went wrong when loading API data ...</div>}
    {listLoading || dataLoading ? ( <div>Loading ...</div>) : (
    <div>    
    <CssBaseline />
    <Container maxWidth="md">
    <Grid container className={classes.root} spacing={2}>

      <Grid item xs={12}  >
          <TextField
            disabled  
            id= "main-term" 
            label="Main Term" 
            fullWidth
            defaultValue={termData.main_term}  
            
          />
      </Grid>

      <Grid item xs={12}  >
          <TextField  
          disabled
          fullWidth
          id= "co-term" 
          label="Corresponding Term"
          defaultValue={termData.co_term} 
          
        />
        </Grid>  

        <Grid item xs={12}  >
          <TextField 
            id="eg-lang-select"
            select
            label="Select"
            value={egLang}
            onChange={(event)=>setEgLang(event.target.value)}
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
   

        <Grid item xs={12}  >
        <TextField
          id="example-body"
          label="Example"
          multiline
          fullWidth
          rowsMax={8}
          value={egBody}
          onChange={(event)=>setEgBody(event.target.value)}
        />

        </Grid>

        <Grid item xs={12}  >
          <TextField  
          id= "eg_source" 
          label="Source"
          fullWidth
          defaultValue={egSource} 
          onChange={(event)=>setEgSource(event.target.value)}
          
        />
        </Grid>  

    
        <div className={classes.centerBox}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={(event)=>handleSubmit(event)}
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
