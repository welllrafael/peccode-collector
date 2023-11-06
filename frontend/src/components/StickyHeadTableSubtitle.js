import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LockOpen from '@material-ui/icons/LockOpen';
import MoreVert from '@material-ui/icons/MoreVert';
import { Divider, IconButton } from '@mui/material';
import { SubtitleTable } from './SubtitleTable';


const StickyHeadTableSubtitle = (props) => {
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

    const dummyMenuItems = [
      {
        title: "Add Item"
      },
      {
        title: "Move Item"
      },
      {
        title: "Delete Item"
      },
      {
        title: "GTA"
      }
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = e => {      
      setAnchorEl(e.currentTarget);
    };

    const handleClose = (item, event) => {      
      if (item.title === "GTA") {
          
      }

      setAnchorEl(null);
    };
    
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
                                  <><IconButton onClick={handleClick}>
                                  <MoreVert fontSize="small" />
                                </IconButton>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                    {dummyMenuItems.map(item => (
                                      <MenuItem onClick={(event) => handleClose(item, event)} key={item.title} value={item.title}>
                                        {item.title}
                                      </MenuItem>
                                    ))}
                                </Menu></>
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
        <Divider />
        <SubtitleTable collapsed={true} subtitle={props.subtitle}></SubtitleTable>
      </Paper>
    );
}

export default StickyHeadTableSubtitle;