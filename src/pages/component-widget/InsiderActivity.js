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

function InsiderActivity() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [symbol, setSymbol] = useState('TSLA');
  const [from, setFrom] = useState(0);
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

  useEffect(() => {
    console.log('wwwww', page, rowsPerPage, data.length, from, symbol);
    if ((page + 1) * rowsPerPage > data.length) {
      getData();
    }
  }, [page]);

  const getData = async () => {
    try {
      let res = await axios.post(
        process.env.REACT_APP_API_ENDPOINT,
        {
          query: {
            query_string: {
              query: `issuer.tradingSymbol:${symbol}`
            }
          },
          from: from === 0 ? 0 : from * 30 + 1,
          size: 30,
          sort: [{ filedAt: { order: 'desc' } }]
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: process.env.REACT_APP_API_KEY
          }
        }
      );
      var resData = res.data.transactions;
      console.log(resData)
      let showData = [];
      resData.map((item) => {
        let base = {
          periodOfReport: item.periodOfReport,
          issuerCik: item.issuer.cik,
          issuerTicker: item.issuer.tradingSymbol,
          reportingPerson: item.reportingOwner.name,
          officerTitle: item.reportingOwner.relationship.officerTitle ? item.reportingOwner.relationship.officerTitle : ''
        };
        if (item.nonDerivativeTable) {
          if (item.nonDerivativeTable.transactions)
            item.nonDerivativeTable.transactions.map((transaction) => {
              let entry = {
                securityTitle: transaction.securityTitle,
                codingCode: transaction.coding.code,
                acquiredDisposed: transaction.amounts.acquiredDisposedCode,
                shares: transaction.amounts.shares,
                sharePrice: transaction.amounts.pricePerShare,
                total: Math.ceil(transaction.amounts.shares * transaction.amounts.pricePerShare),
                sharesOwnedFollowingTransaction: transaction.postTransactionAmounts.sharesOwnedFollowingTransaction,
                base: base
              };

              showData.push(entry);
            });
        }
      });
      if (showData !== []) setData([...showData]);
      setFrom(++from);
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <>
      <div style={{ width: '100%', height: '30px', bgcolor: 'white', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
        <input
          style={{ width: '200px', height: '100%', fontSize: '1rem', padding: '5px' }}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        ></input>
        <button style={{ marginLeft: '3px' }} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: '#869797' }}>
            <TableRow>
              <TableCell align="center" style={{ width: '8%' }}>
                Period Of Report
              </TableCell>
              <TableCell align="center" style={{ width: '7%' }}>
                Issuer Cik
              </TableCell>
              <TableCell align="center" style={{ width: '8%' }}>
                Issuer Ticker
              </TableCell>
              <TableCell align="center" style={{ width: '13%' }}>
                Reporting Person
              </TableCell>
              <TableCell align="center" style={{ width: '10%' }}>
                Officer Titel
              </TableCell>
              <TableCell align="center" style={{ width: '16%' }}>
                Security Title
              </TableCell>
              <TableCell align="center" style={{ width: '5%' }}>
                Coding Code
              </TableCell>
              <TableCell align="center" style={{ width: '8%' }}>
                Shares
              </TableCell>
              <TableCell align="center" style={{ width: '8%' }}>
                Share Price
              </TableCell>
              <TableCell align="center" style={{ width: '7%' }}>
                Total
              </TableCell>
              <TableCell align="center" style={{ width: '10%' }}>
                Shares Owned Following Transaction
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row, key) => (
              <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" style={{ width: '8%' }}>
                  {row.base.periodOfReport}
                </TableCell>
                <TableCell align="center" style={{ width: '7%' }}>
                  {row.base.issuerCik}
                </TableCell>
                <TableCell align="center" style={{ width: '8%' }}>
                  {row.base.issuerTicker}
                </TableCell>
                <TableCell align="center" style={{ width: '13%' }}>
                  {row.base.reportingPerson}
                </TableCell>
                <TableCell align="center" style={{ width: '10%' }}>
                  {row.base.officerTitle}
                </TableCell>
                <TableCell align="center" style={{ width: '16%' }}>
                  {row.securityTitle}
                </TableCell>
                <TableCell align="center" style={{ width: '5%' }}>
                  {row.codingCode}
                </TableCell>
                <TableCell align="center" style={{ width: '8%' }}>
                  {row.shares}
                </TableCell>
                <TableCell align="center" style={{ width: '8%' }}>
                  {row.sharePrice}
                </TableCell>
                <TableCell align="center" style={{ width: '7%' }}>
                  {row.total}
                </TableCell>
                <TableCell align="center" style={{ width: '10%' }}>
                  {row.sharesOwnedFollowingTransaction}
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
    </>
  );
}

export default InsiderActivity;
