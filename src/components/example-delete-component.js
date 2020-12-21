import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { LANGUAGE_API_URL, EXAMPLE_API_URL, safeHeaders  } from './api-config';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  formBox: {
      width: '80%',
      textAlign: "center"
  }
}));



export default function ExampleEditComponent(props) {
  const classes = useStyles();
  const [example, setExample] = useState({});
  const [isError, setIsError] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');


  

  const sendDeleteRequest = async () => {





    try {

        const resp = await axios.delete(`${EXAMPLE_API_URL}/${props.egId}`, safeHeaders );
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };


  const handleChange = (event) => {
    event.persist();
    setExample(example => ({...example, [event.target.name]: event.target.value}));
}



  const handleSubmit = (event) =>{    
    sendDeleteRequest();
    //console.log('language', egLang);
    setUpdateMessage('You have successfully delete the data!');
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
  },[]);



  return (
    <Fragment>
    {isError && <div>Something went wrong when loading API data ...</div>}
    {listLoading || dataLoading ? ( <div>Loading ...</div>) : (
    <div>    
    <CssBaseline />
    <Container maxWidth="sm">
    <Box className={classes.formBox}>
        <Typography variant="h5" component="h5">
            Delete Example
        </Typography>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>


        <FormControl>
          <TextField 
            disabled
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
        </FormControl>
   

        <TextField
          disabled
          id="eg_body"
          name="eg_body"
          label="Example"
          multiline
          fullWidth
          rowsMax={4}
          value={example.eg_body}
          onChange={handleChange}
        />

        <TextField
          disabled
          id="eg_source"
          name="eg_source"
          label="Source"
          multiline
          fullWidth
          rowsMax={4}
          value={example.eg_source}
          onChange={handleChange}
        />
  
        <div>
        <Button variant="contained" color="secondary" type="submit">
          Delete
        </Button>
        </div>
        </form>
        <div><Typography variant="caption" display="block" gutterBottom>{updateMessage}</Typography></div>

    </Box>
    </Container>
    </div>
    )}
    </Fragment>
    
  );
}
