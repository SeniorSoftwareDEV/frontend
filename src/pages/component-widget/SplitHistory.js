/* eslint-disable */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function SpliteHistory() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [symbol, setSymbol] = useState('');
  const [from, setFrom] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSubmit = async () => {
    await getData();
  };

  const getData = async () => {
    if (symbol) {
      setIsLoading(true);
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('symbol', symbol);

        let res = await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/activity/getsplithistory`,
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log(res);
        if (res.data !== null) {
          setIsLoading(false);
          setData(res.data);
        }
      } catch (e) {
        setIsLoading(false);

        console.log('error', e);
      }
    }
  };
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={isloading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ width: '100%', height: '30px', bgcolor: 'white', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
        <input
          style={{ width: '200px', height: '100%', fontSize: '1rem', padding: '5px' }}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        ></input>
        <button style={{ marginLeft: '3px' }} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ marginTop: '10px', maxWidth: 1200 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: '#869797' }}>
              <TableRow>
                <TableCell align="center" style={{ width: '20%' }}>
                  No
                </TableCell>
                <TableCell align="center" style={{ width: '40%' }}>
                  Date
                </TableCell>
                <TableCell align="center" style={{ width: '40%' }}>
                  Ratio
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center" style={{ width: '20%' }}>
                    {page * rowsPerPage + key + 1}
                  </TableCell>
                  <TableCell align="center" style={{ width: '40%' }}>
                    {row.Date}
                  </TableCell>
                  <TableCell align="center" style={{ width: '40%' }}>
                    {row.Ratio}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={10}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default SpliteHistory;
