import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { TERM_API_URL, LANGUAGE_API_URL, safeHeaders } from './api-config';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },  
    checkControl: {
      marginTop: 25,            
    },        
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
        const resp = await axios.put(`${TERM_API_URL}/${props.termId}`, newTerm, safeHeaders);
        console.log(resp.data);
        history.push(`/terms/display/${props.termId}`);
    } catch (err) {
        // Handle Error Here
        console.error(err);
        setUpdateMessage('Error encountered while writing to the database!');
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

    <div className='form-container-center'>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

        <FormControl  className={classes.formControlText}>
          <TextField  id= "main-term" label="Main Term" 
            defaultValue={mainTerm}  
            onChange={(event)=>setMainTerm(event.target.value)}
          />
        </FormControl>  

        <FormControl className={classes.formControlSelect}>
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

        <FormControl  className={classes.formControlText}>
          <TextField  id= "co-term" label="Corresponding Term"
           defaultValue={coTerm} 
          onChange={(event)=>setCoTerm(event.target.value)}
        />
        </FormControl>  

        <FormControl className={classes.formControlSelect}>
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

        <FormControl className={classes.formControlText}>
          <TextField  id= "tags" label="Tags"
          defaultValue={tags}  
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
    
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        </form>
        <div><Typography variant="caption" display="block" gutterBottom>{updateMessage}</Typography></div>

    </div>
    )}
    </Fragment>
  );
}
