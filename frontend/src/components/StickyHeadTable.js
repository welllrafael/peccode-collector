import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import LockOpen from '@material-ui/icons/LockOpen';
import MoreVert from '@material-ui/icons/MoreVert';
import { IconButton } from '@mui/material';

const StickyHeadTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!props.data)
    return(" ")

  const columns = props.data.structBrowse;
  const rows = props.data.data;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={15}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const menu = column.menu;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { column.icon ? 
                                <LockOpen fontSize="small" />
                                : menu ?
                                <IconButton>
                                  <MoreVert fontSize="small" />
                                </IconButton>
                                : column.format && typeof value === 'object'
                                ? column.format(value)
                                  : (typeof value == "boolean"  
                                  ? value ?
                                      <LockOpen fontSize="small" /> 
                                      : <Lock fontSize="small" /> 
                                  : value)
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination        
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}        
      />
    </Paper>
  );
}

export default StickyHeadTable;