import React, {Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { USER_API_URL, writeHeaders } from './api-config';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  errrorBoxRed: {
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
    width: '100%',

  },
  
  errorBoxGreen: {
    textAlign: 'center',
    fontSize: 14,
    color: 'green',
    width: '100%',

  }
}));

export default function UserAddComponent() {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [password, setPassword] = useState('1234');
  const [editor, setEditor] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  

  const sendPostRequest = async (userData) =>{
   //console.log(data);
    try {
        const resp = await axios.post(USER_API_URL, userData, writeHeaders );
        console.log(resp.data);
        setMessage('Data sucessfully written to the database!');
        //history.push(`/home`);
  
      } catch (err) {
        if (err.response) {
          if(err.response.status === 400){
            setError(true);
            setMessage('Your session is expired. Please log in again');
          } 
  
          if(err.response.status === 401){
            setError(true);
            setMessage('You are not allowed to add users');
          } 
  
        }

        else {
          setError(true);
          setMessage('API error encountered.');
          console.log(err);

        }
       
      }

  }

  const handleSubmit = (event) =>{
      event.preventDefault();
      const data ={
          name: userName,
          fullName: userFullName,
          password: password,
          editor: editor ? 1 : 0,
          admin: admin ? 1 : 0,
      }
      //console.log('data to send', data)
      sendPostRequest(data);

  }
  return (
    <Fragment>
    <div className={error ? classes.errrorBoxRed : classes.errorBoxGreen}>{message}</div>
    <form className={classes.root} noValidate autoComplete="off">
      
      <TextField 
            id="user-name" 
            label="user name" 
            value={userName}
            onChange={(event)=>setUserName(event.target.value)}
        />
      <TextField 
            id="user-full-name" 
            label="full name" 
            value={userFullName}
            onChange={(event)=>setUserFullName(event.target.value)}
        />

      <TextField 
            id="password" 
            label="password" 
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
        />
        <FormControlLabel
          control={
          <Checkbox
            checked={editor}
            onChange={(event) =>setEditor(event.target.checked)}
            name="checkEditor"
            color="primary"
         />
            }
            label="Editor"
        />
        <FormControlLabel
          control={
          <Checkbox
            checked={admin}
            onChange={(event) =>setAdmin(event.target.checked)}
            name="checkAdmin"
            color="primary"
         />
            }
            label="Admin"
        />

        <Button
         variant="contained" 
         color="primary"
         onClick={(event)=>{
             handleSubmit(event)
         }}
         >
        Submit
        </Button>


    </form>
    </Fragment>
  );

}