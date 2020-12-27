import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { USER_API_URL, safeHeaders  } from './api-config';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    pageTitle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
      },   
      
    submitContainer: {
        marginTop: theme.spacing(2),
    },
    messageBox: {
      textAlign: 'center',
    }

  }));



export default function UserLoginComponent() {
    const history = useHistory();
    const classes = useStyles();
    const [user, setUser] = useState(['']);
    const [password, setPassword] = useState(['']);
    const [message, setMessage] = useState(['']);

    
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(`${USER_API_URL}/auth?name=${user}&password=${password}`, safeHeaders );
      console.log(resp.data);
      if (resp.data.login) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('admin', resp.data.admin);
        localStorage.setItem('editor', resp.data.editor);
        localStorage.setItem('name', resp.data.name);
        localStorage.setItem('id', resp.data.id);
        localStorage.setItem('status', 'login');
        history.push(`/home`);
        
        //setMessage("Successfully loged in")
      }

      else {
        setMessage("Login failed")
      }
      


    } catch (err) {
      // Handle Error Here
      console.error(err);
      setMessage('Error login')
    }

  }



    const handleSubmit = (event) =>{
      event.preventDefault();
      sendGetRequest();
    }


    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography className={classes.pageTitle} variant="h6" gutterBottom>
                Editor Login
                </Typography>
                <div className={classes.messageBox}>{message}</div>
          </Grid>  
          <Grid item xs={0} sm={2} md={3}>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Paper className={classes.paper}>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                  id="user-name" 
                  label="user name"                 
                  fullWidth 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                />
                <TextField 
                  id="user-password" 
                  type="password" 
                  label="user password" 
                  fullWidth 
                  value={password}
                  onChange={(event)=>setPassword(event.target.value)}
                  />
                <div className={classes.submitContainer}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={(event)=>{handleSubmit(event)}}
                >
                    Log In
                </Button>
                </div>
            </form>

            </Paper>
          </Grid>
          <Grid item  xs={0} sm={2} md={3}>
            
          </Grid>

        </Grid>
      </div>
    );
  }