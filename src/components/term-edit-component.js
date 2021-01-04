import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { TERM_API_URL, LANGUAGE_API_URL, safeHeaders, writeHeaders } from './api-config';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    
    flexGrow: 1,

    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
        
  },

  checkControl: {
    marginTop: 25,            
  },

  centerBox: {
    textAlign: 'center',
  }
}));



export default function EditTermForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [mainLang, setMainLang] = useState('');
  const [coLang, setCoLang] = useState('');
  const [checked, setChecked] = useState(false);
  const [mainTerm, setMainTerm] = useState('');
  const [coTerm, setCoTerm] = useState('');
  const [tags, setTags] = useState(''); 
  const [isError, setIsError] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');


  

  const sendPutRequest = async () => {

    const status  = checked ? 1 : 0;
    const newTerm = {
      mainTerm: mainTerm,
      mainLangId: mainLang,
      coTerm: coTerm,
      coLangId: coLang,
      tags: tags,
      status: status,
    };


    try {
        const resp = await axios.put(`${TERM_API_URL}/${props.termId}`, newTerm, writeHeaders);
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
    sendPutRequest();
    
    event.preventDefault();
  }



  useEffect(() => {
    const fetchTermData = async () => {
     
      setDataLoading(true);

        try {
        const result = await axios.get(`${TERM_API_URL}/${props.termId}`, safeHeaders);
        //setTermData(result.data);
        //console.log(result.data);
        setMainTerm(result.data.main_term);
        setMainLang(result.data.main_lang_id);
        setCoTerm(result.data.co_term);
        setCoLang(result.data.co_lang_id);
        setTags(result.data.tags);
        result.data.status ? setChecked(true) : setChecked(false);

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
      <Grid item xs={12} sm={8} >  

            <TextField  
              id= "main-term" label="Main Term" 
              fullWidth
              defaultValue={mainTerm}  
              onChange={(event)=>setMainTerm(event.target.value)}
            />
      </Grid>

      <Grid item xs={12} sm={2}>
            <TextField 
              id="main-lang-select"
              select
              label="Select"
              value={mainLang}
              onChange={(event)=>setMainLang(event.target.value)}
              helperText="Language"
              SelectProps={{className: classes.selectControl}}
            >
              
              {languages.map(language =>(
                <MenuItem key={`main-lang-${language.langID}`} value={language.langID}>
                    {language.shortName}
                </MenuItem>   
              ))}  
              
            </TextField>
      </Grid>

      <Grid item xs={12} sm={8} >  

            <TextField  
              id= "co-term" 
              label="Corresponding Term"
              fullWidth
              defaultValue={coTerm} 
              onChange={(event)=>setCoTerm(event.target.value)}
          />
      </Grid> 

      <Grid item xs={12} sm={2} >                
          
            <TextField 
              id="co-lang-select"
              select
              label="Select"
              value={coLang}
              onChange={(event)=>setCoLang(event.target.value)}
              helperText="Language"
              SelectProps={{className: classes.selectControl}}
            >
              
              {languages.map(language =>(
                <MenuItem key={`co-lang-${language.langID}`} value={language.langID}>
                    {language.shortName}
                </MenuItem>   
              ))}  
              
            </TextField>
      </Grid>

      <Grid item xs={12} sm={8} >  
          
            <TextField  
              id= "tags" label="Tags"
              fullWidth
              defaultValue={tags}  
              onChange={(event)=>setTags(event.target.value)}
            />
      </Grid>
      
      <Grid item xs={12} sm={2} >  
          
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event)=>setChecked(event.target.checked)}
                  name="status"
                  color="secondary"
                />
              }
              label="Disabled"
            />
      </Grid>

      <Grid item xs={12} className={classes.centerBox}> 
          <Button variant="contained" color="primary" onClick={(event)=>handleSubmit(event)}>
            Submit
          </Button>
      </Grid>        
      <Grid item xs={12}  className={classes.centerBox}> 
        <Typography variant="caption" display="block" gutterBottom>{updateMessage}</Typography>
      </Grid>
    </Grid>
    </Container>
    </div>
    )}
    </Fragment>
  );
}
