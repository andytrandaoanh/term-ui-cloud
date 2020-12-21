import React, { Fragment,  useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { TERM_API_URL, safeHeaders } from './api-config.js';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function DenseTable() {
  const classes = useStyles();
  const [termData, setTermData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

        try {
        const result = await axios.get(TERM_API_URL, safeHeaders);
        setTermData(result.data);
      } catch (error) {
        setIsError(true);
        console.log('error:', error);
      }

      setIsLoading(false);
      console.log(termData);
 
    };
 
    fetchData();
  }, []);  


  return (
    <Fragment>

    {isError && <div>Something went wrong when loading API data ...</div>}
    {isLoading ? ( <div>Loading ...</div>) : (

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Main Term</TableCell>
              <TableCell>Lang</TableCell>
              <TableCell >Co-Term</TableCell>
              <TableCell>Lang</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {termData.map((row) => (
              <TableRow key={row.term_id}>
                <TableCell>
                <IconButton  component={RouterLink} to={`/terms/display/${row.term_id}`}>
                  <VisibilityIcon fontSize="small"  color="primary" /></IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.main_term}</TableCell>
                <TableCell>{row.main_lang}</TableCell>
                <TableCell>{row.co_term}</TableCell>
                <TableCell>{row.co_lang}</TableCell>
                <TableCell>{row.tags}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{moment(row.created_at).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{moment(row.updated_at).format('DD/MM/YYYY')}</TableCell>
    

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
    </Fragment>
  );
}


