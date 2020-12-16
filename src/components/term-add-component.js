import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { TERM_API_URL } from './api-config';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
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
  formWrap: {
    padding: 10,
    textAlign: 'left',
  },

  formContainer: {
    margin: 'auto',
    width: '70%',
    height: 400,
    textAlign: 'center',
  },
  
  submitWrap: {
    width: '80%',
    textAlign: 'center',
  }

}));





export default function AddTermForm() {
  const classes = useStyles();
  const history = useHistory();
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
      const resp = await axios.post(TERM_API_URL, newTerm);
      console.log(resp.data);
      setUpdateMessage('Data sucessfully written to the database!');
      //history.push(`/home`);

    } catch (err) {
      // Handle Error Here
      console.error(err);
      setUpdateMessage('Error encountered while writing to the database!');
    }

  }


  return (
    <div className={classes.formContainer}>
    <div className={classes.formWrap}>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

        <FormControl  className={classes.formControl}>
          <TextField 
            className={classes.textControl} 
            id= "main-term" 
            label="Main Term" 
            onChange={(event)=>setMainTerm(event.target.value)}
          />
        </FormControl>  

        <FormControl className={classes.formControl}>
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
        </FormControl>

        <FormControl  className={classes.formControl}>
          <TextField  
          className={classes.textControl} 
          id= "co-term" label="Corresponding Term"
          onChange={(event)=>setCoTerm(event.target.value)}
        />
        </FormControl>  

        <FormControl>
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
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField  
          className={classes.textControl} 
          id= "tags" label="Tags"
          onChange={(event)=>setTags(event.target.value)}
           />
        </FormControl>

        <FormControl className={classes.checkControl}>
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
        </FormControl>
        <div className={classes.submitWrap}>
        <div><Typography variant="caption" display="block" gutterBottom>{updateMessage}</Typography></div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        
        </div>
        </form>
        

    </div>
    
    </div>
  );
}
