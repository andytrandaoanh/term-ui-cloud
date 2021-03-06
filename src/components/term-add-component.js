import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { TERM_API_URL, writeHeaders } from './api-config';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    
    flexGrow: 1,

    '& > *': {
      margin: theme.spacing(1),
    },
 
  },
  formControl: {
    minWidth: 120,
  },

  selectControl:{
    width: '10ch',
    marginLeft: 5,
  },

  checkControl: {
    marginTop: 25,
  },
  textControl: {
    width: '50ch',
  },
  
  submitWrap: {
    width: '80%',
    textAlign: 'center',
  }

}));





export default function AddTermForm() {
  const classes = useStyles();
  const [mainLang, setMainLang] = useState(1);
  const [coLang, setCoLang] = useState(3);
  const [checked, setChecked] = useState(false);
  const [mainTerm, setMainTerm] = useState('');
  const [coTerm, setCoTerm] = useState('');
  const [tags, setTags] = useState(''); 
  const [updateMessage, setUpdateMessage] = useState('');

  const languages = [
    {langID: 1, shortName: 'EN'},
    {langID: 2, shortName: 'FR'},
    {langID: 3, shortName: 'VI'},
  ];

  const handleSubmit = (event) =>{
    
    sendPostRequest();
    event.preventDefault();
  }

  
  const sendPostRequest = async () => {
    const status  = checked ? 1 : 0;
    const newTerm = {
      mainTerm: mainTerm,
      mainLangId: mainLang,
      coTerm: coTerm,
      coLangId: coLang,
      tags: tags,
      status: status,
    };

    //ready to send to API using Axios
    //console.log(newTerm);
    try {
      const resp = await axios.post(TERM_API_URL, newTerm, writeHeaders );
      console.log(resp.data);
      setUpdateMessage('Data sucessfully written to the database!');
      //history.push(`/home`);

    } catch (err) {
      
      console.log(err);
      
      if(err.response.status === 400){
        
        setUpdateMessage('Your session is expired. Please log in again');
      } 

      if(err.response.status === 401){
        
        setUpdateMessage('You are not allowed to modify data');
      } 
     


    }

  }


  return (
    <Fragment>    
    <CssBaseline />
    <Container maxWidth="md">
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={8} >
        
          <TextField             
            id= "main-term" 
            label="Main Term" 
            fullWidth
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
          fullWidth
          id= "co-term" label="Corresponding Term"
          onChange={(event)=>setCoTerm(event.target.value)}
        />
      </Grid>  

      <Grid item xs={12} sm={2}> 
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
          className={classes.textControl} 
          id= "tags" label="Tags"
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
        <div className={classes.submitWrap}>
        <div><Typography variant="caption" display="block" gutterBottom>{updateMessage}</Typography></div>
        <Button variant="contained" color="primary" onClick={(event)=>handleSubmit(event)}>
          Submit
        </Button>
        
        </div>
        
        </Grid>
    </Container>
    
    </Fragment>
  );
}
