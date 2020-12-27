import React, { Fragment,  useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { USER_API_URL, safeHeaders, writeHeaders } from './api-config.js';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding:theme.spacing(2),
    
  },
  table: {
    margin: theme.spacing(2),
    textAlign: 'left',
    width: '100%',

  },
  smallButton: {
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
    width: 60,
   
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


  textBox: {
    padding: 2,
  }

  
}));


export default function UserProfileComponent() {

    const classes = useStyles();
    const [id, setId] = useState([null]);
    const [isEditor, setIsEditor] = useState(false);
    const [password, setPassword] = useState(['']);
    const [repass, setRepass] = useState(['']);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    
  const sendPutRequest = async (newData) =>{
    //console.log('user', newData);
     try {
         
         await axios.put(`${USER_API_URL}/resetpassword/${id}`, newData, writeHeaders );
         //console.log(resp.data);
         setMessage('Sucessfully changed password!');
   
       } catch (err) {
         if(err.response.status === 400){
           setError(true);
           setMessage('Your session is expired. Please log in again');
         } 
 
         if(err.response.status === 401){
           setError(true);
           setMessage('You are not allowed to change password');
         } 
        
       }
 
   }
 
   const handleSubmit = (event) =>{

       console.log('user submit');
       event.preventDefault();
       const data = {
           password: password,
       }
       

        sendPutRequest(data);

       
 
   }



    const handleRePass = (event)=>{
        setRepass(event.target.value);
        if (event.target.value === password){
            setError(false);
            setMessage('Password and Repeat Password match!')
        }
        else {
            setError(true);
            setMessage('Password and Repeat Password do not match!')
        }

    }

    useEffect(() => {

        const id = localStorage.getItem('id');
        setId(id);
        const editor = localStorage.getItem('editor');
        if (editor === '1') setIsEditor(true);



        const fetchData = async () => {
          setIsError(false);
          setIsLoading(true);
    
          try {
            const result = await axios.get(`${USER_API_URL}/${id}`, safeHeaders);
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
      }, []);  
    
      return(

        <Fragment>
        {isError && <div>Something went wrong when loading API data ...</div>}
        {isLoading && ( <div>Loading ...</div>) }
    
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} sm={6} >
            
            <Paper className={classes.paper}>
                <strong>User Profile</strong>
                <table className={classes.table}>
                <tr>
                    <td>User Name</td>
                    <td>{userData.name}</td>
                </tr>
                <tr>
                    <td>Full Name</td>
                    <td>{userData.full_name}</td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td>{userData.editor ? 'Editor' : 'Viewer'}</td>
                </tr>


                <tr>
                    <td>Created</td>
                    <td>{moment(userData.created_at).format('DD/MM/YYYY')}</td>
                </tr>
                </table> 
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} >
          {isEditor && <Paper className={classes.paper}>
                <strong>Reset Password</strong>
                <table className={classes.table}>
                <tr>
                    <td>New Password</td>
                    <td>
                        <input 
                            className={classes.textBox} 
                            type="password" 
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)} 
                        />
                    </td>
                </tr>
                <tr>
                    <td>Repeat Password</td>
                    <td>
                        <input 
                            className={classes.textBox} 
                            type="password"
                            value={repass} 
                            onChange={(event)=>handleRePass(event)}
                        />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><button 
                      className={classes.smallButton}
                      onClick = {(event)=>handleSubmit(event)}
                      >
                      Reset
                      </button></td>
                </tr>
                </table>
                <div className={error ? classes.errrorBoxRed : classes.errorBoxGreen}>{message}</div> 
            </Paper>
          }
        </Grid>
        </Grid>
        </Fragment>



      )
}