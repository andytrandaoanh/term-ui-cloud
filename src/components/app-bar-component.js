import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  },
  
}));







export default function TopAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [searchString, setSearchString] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [userLogin, setUserLogin] = useState(false);



  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (admin === '1') setIsAdmin(true);
    const editor = localStorage.getItem('editor');
    if (editor === '1') setIsEditor(true);
    const status = localStorage.getItem('status');
    if (status === 'login') setUserLogin(true);
   
  }, []);  



  const handleChange = (event) => {
    
      const search_string = String(event.target.value);
      setSearchString(search_string.trim());
  } 

  const handleKeyPress = (event) => {
    
    //console.log(`Pressed keyCode ${event.key}`);

      if (event.key === 'Enter') {
          //console.log({'search string': searchString});         
          history.push(`/terms/search/${searchString}`);
          event.preventDefault();
      }
  } 

  const listMenuItems = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={()=>setShowMenu(false)}
      onKeyDown={()=>setShowMenu(false)}
    >
      <List>
        <ListItem button key="menu-item-home" component={RouterLink} to="/home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>

      </List>
      <Divider />
      <List>


      <ListItem button key="menu-item-combined-vn" component={RouterLink} to="/terms/combinedlist/vi">
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <ListItemText primary="Combined Vietnamese" />
        </ListItem>        

        <ListItem button key="menu-item-combined-en" component={RouterLink} to="/terms/combinedlist/en">
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <ListItemText primary="Combined English" />
        </ListItem>     

        <ListItem button key="menu-item-pure-en" component={RouterLink} to="/terms/orderlist/en">
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary="Pure English Terms" />
        </ListItem>

        
        <ListItem button key="menu-item-pure-vn" component={RouterLink} to="/terms/orderlist/vi">
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary="Pure Vietnamese" />
        </ListItem>

        <Divider />


        <ListItem button key="menu-item-user-login" component={RouterLink} to="/editorlogin">
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary="Editor Login" />
        </ListItem>
        
        {isAdmin  &&<Divider />}
        {isAdmin  &&
        <ListItem button key="menu-item-admin" component={RouterLink} to="/administrationpage">
            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText primary="Admin Page" />
        </ListItem>
        
        }

      </List>
    </div>
  );
  

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick= {() => setShowMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Technical Terms
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}

              inputProps={{ 'aria-label': 'search' }}

              onKeyPress={handleKeyPress}

              onChange={handleChange}

              
            />
          </div>
          {isEditor && 
          <div>
          <Tooltip title="Add New Term">
          <IconButton
              aria-label="add new term"
              color="inherit"
              component={RouterLink} 
              to="/terms/add"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="List Terms">
          <IconButton
              aria-label="list terms"
              color="inherit"
              component={RouterLink} 
              to="/terms/list"
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>

          </div>}

          {userLogin &&

          <Tooltip title="Change Password">
          <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
              component={RouterLink} 
              to="/userprofile"
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
          }
        </Toolbar>
        <Drawer anchor="left" open={showMenu} onClose = {()=>setShowMenu(false)}>
            {listMenuItems("left")}
        </Drawer>
      </AppBar>
                  
      </div>
  );
}
