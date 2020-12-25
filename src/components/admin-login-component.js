import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    }
  }));



export default function AdminLoginComponent() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography className={classes.pageTitle} variant="h6" gutterBottom>
                Sytem Administrator Login
                </Typography>
          </Grid>  
          <Grid item xs={0} sm={2} md={3}>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Paper className={classes.paper}>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="admin-user-name" label="Admin User Name" fullWidth />
                <TextField id="admin-password" label="Admin Pasword" fullWidth />
                <div className={classes.submitContainer}>
                <Button variant="contained" color="primary">
                    Log In
                </Button>
                </div>
            </form>

            </Paper>
          </Grid>
          <Grid item  item xs={0} sm={2} md={3}>
            
          </Grid>

        </Grid>
      </div>
    );
  }