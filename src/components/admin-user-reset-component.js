import React, { Fragment,  useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { USER_API_URL, safeHeaders, writeHeaders } from './api-config.js';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding:theme.spacing(2),
    
  },
  table: {
    margin: theme.spacing(2),
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
  },
  smallButton: {
    borderRadius: 3,
    fontSize: 11,
   
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

  },

  formEdit: {
    padding:theme.spacing(2),
    
  }, 

  textBox: {
    marginRight: theme.spacing(2),
  }

  
}));







export default function AdminUserResetPassword() {

  const classes = useStyles();
  const [id, setId] = useState([null]);
  const [userName, setUserName] = useState(['']);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editCount, setEditCount] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = axios.get(USER_API_URL, safeHeaders);
        setUserData(result.data);
        //console.log(result.data);
      } catch (error) {
        setIsError(true);
        console.log('error:', error);
      }

      setIsLoading(false);
      //console.log(termData);
 
    };
 
    fetchData();
  }, [editCount]);  


  const handleRepeatPassword = (rePass) =>{
    setRepeatPassword(rePass);
    if (newPassword === rePass) {
      setMessage("New Password and Repeat Password match!")
      setError(false);
      setDisabled(false);
    }
    else {
      setMessage("New Password and Repeat Password do not match!")
      setError(true);
      setDisabled(true);
    }

  }


  const setItemClick = (event, id) => {
    event.preventDefault();
    setDisabled(false);
    userData.forEach(item =>{
      if (item.id === id) {
        setId(id);
        setUserName(item.name);
      }
    })

  }
  

  const sendPutRequest = async (newData) =>{
    //console.log('user', newData);
     try {
         
         await axios.put(`${USER_API_URL}/resetuserpassword/${id}`, newData, writeHeaders );
         //console.log(resp.data);
         setMessage('Data sucessfully written to the database!');
         //update data
    
         setEditCount(editCount + 1);
         
         
         
         //history.push(`/home`);
   
       } catch (err) {
         if(err.response.status === 400){
           setError(true);
           setMessage('Your session is expired. Please log in again');
         } 
 
         if(err.response.status === 401){
           setError(true);
           setMessage('You are not allowed to add users');
         } 
        
       }
 
   }
 
 
   const handleSubmit = (event) =>{

       console.log('user submit');
       event.preventDefault();
       const data ={
           password: newPassword
       }
       
     
      sendPutRequest(data);
     
 
   }



  return (
    <Fragment>
    {isError && <div>Something went wrong when loading API data ...</div>}
    {isLoading && ( <div>Loading ...</div>) }

    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
      
      <div className={error ? classes.errrorBoxRed : classes.errorBoxGreen}>{message}</div>
      <form className={classes.formEdit} noValidate autoComplete="off">
        
        <TextField 
              disabled
              className={classes.textBox}
              id="user-name" 
              label="user name" 
              value={userName}
              onChange={(event)=>setUserName(event.target.value)}
          />

  
          <TextField 
              className={classes.textBox}
              id="new-password" 
              label="new password" 
              value={newPassword}
              onChange={(event)=>setNewPassword(event.target.value)}
          />

          <TextField 
              className={classes.textBox}
              id="repeat-password" 
              label="repeat password" 
              value={repeatPassword}
              onChange={(event)=>handleRepeatPassword(event.target.value)}
          />

          <Button
           disabled={disabled}
           variant="contained" 
           color="primary"
           onClick={(event)=>{
               handleSubmit(event)
           }}
           >
          Reset
          </Button>
  
  
      </form>
      
             
      </Grid>
      <Grid item xs={12} >


    <Paper>
    <table className={classes.table}>  
      <tr>
        <th>Name</th>
        <th>Full Name</th>
        <th>Admin</th>
        <th>Editor</th>
        <th>Status</th>
        <th>Created</th>
        <th>Action</th>
        

      </tr>
      {userData && userData.map(item=>{
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.full_name}</td>
            <td>{item.admin}</td>
            <td>{item.editor}</td>
            <td>{item.status}</td>
            <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
            <td>
              
              <button 
                className={classes.smallButton}
                onClick={(event)=>{setItemClick(event, item.id)}}
              >Select
              </button>
            </td>

                    
            
          </tr>

        )

      })}
    </table>
    </Paper>

  
      </Grid>
    </Grid>

    </Fragment>
  );
 }