import React, { Fragment,  useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { USER_API_URL, safeHeaders, writeHeaders } from './api-config.js';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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







export default function AdminUserList() {

  const classes = useStyles();
  const [id, setId] = useState([null]);
  const [userName, setUserName] = useState(['']);
  const [userFullName, setUserFullName] = useState(['']);
  const [editor, setEditor] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [actionFlag, setActionFlag] = useState(null); 
  const [buttonColor, setButtonColor] = useState('primary');
  const [buttonText, setButtonText] = useState('submit');
  const [editCount, setEditCount] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(USER_API_URL, safeHeaders);
        setUserData(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
        console.log('error:', error);
      }

      setIsLoading(false);
      //console.log(termData);
 
    };
 
    fetchData();
  }, [editCount]);  


  const setItemClick = (event, id, flag) => {
    event.preventDefault();
    setActionFlag(flag);
    (flag === 'delete') ? setButtonColor('secondary') : setButtonColor('primary');
    (flag === 'delete') ? setButtonText('delete') : setButtonText('submit');

    userData.forEach(item =>{
      if (item.id === id) {
        setId(id);
        setUserName(item.name);
        setUserFullName(item.full_name);
        setEditor(item.editor === 1 ? true : false);
        setAdmin(item.admin === 1 ? true : false);
        setStatus(item.status === 1 ? true : false);
      }
    })

  }
  

  const sendPutRequest = async (newData) =>{
    //console.log('user', newData);
     try {
         
         await axios.put(`${USER_API_URL}/${id}`, newData, writeHeaders );
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
 
   const sendDeleteRequest = async () =>{
    //console.log(data);
     try {
         await axios.delete(`${USER_API_URL}/${id}`,  writeHeaders );
         //console.log(`${USER_API_URL}/${id}`);
         setMessage('Data sucessfully removed from the database!');
         //history.push(`/home`);
         setEditCount(editCount + 1);
   
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
           name: userName,
           fullName: userFullName,
           editor: editor ? 1 : 0,
           admin: admin ? 1 : 0,
           status: status ? 1 : 0,
       }
       
      if (actionFlag === 'edit') {
        sendPutRequest(data);
      }

      else if (actionFlag === 'delete') sendDeleteRequest();
       
 
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
              className={classes.textBox}
              id="user-name" 
              label="user name" 
              value={userName}
              onChange={(event)=>setUserName(event.target.value)}
          />
        <TextField 
              className={classes.textBox}
              id="user-full-name" 
              label="full name" 
              value={userFullName}
              onChange={(event)=>setUserFullName(event.target.value)}
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

            <FormControlLabel
            control={
            <Checkbox
              checked={status}
              onChange={(event) =>setStatus(event.target.checked)}
              name="checkStatus"
              color="primary"
           />
              }
              label="Status"
          />
          <Button
           variant="contained" 
           color={buttonColor}
           onClick={(event)=>{
               handleSubmit(event)
           }}
           >
          {buttonText}
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
        <th>Edit</th>
        <th>Delete</th>


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
              {!(item.name === 'admin') && 
              <button 
                className={classes.smallButton}
                onClick={(event)=>{setItemClick(event, item.id, 'edit')}}
              >Edit
              </button>} 
            </td>
            <td>{!(item.name === 'admin') && 
              <button 
                className={classes.smallButton}
                onClick={(event)=>{setItemClick(event, item.id, 'delete')}}
              >Delete</button>} 
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