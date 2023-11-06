import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import Button from '@mui/material/Button';
import Typography from "@material-ui/core/Typography";

import StickyHeadTable from './StickyHeadTable';

import '@fontsource/Poppins/700.css';
import '../scss/components/datatable-peccode.scss';
import StickyHeadTableSubtitle from './StickyHeadTableSubtitle';

const theme = createTheme({
    typography: {
      h6: {
        color: '#fff',
        fontStyle: 'bold',
        fontFamily: 'Poppins'
      }
    },
    palette: {
      green: {
        main: '#8bc34a',
        contrastText: '#fff',
      },
    },
  });

const DataTablePecCodeSubtitle = (props) => {    
    const title = props.title;
    
    return (
        <ThemeProvider theme={theme}>
            <div>          
                <div className="headerPage">
                <div className="div-typography-headerPage">            
                    <Typography weight="bold" variant="h6" align="right" >
                    <ListIcon className="listIcon-headerPage"/>
                    {title}
                    </Typography>    
                </div>    
                <div className="div-button-headerPage">        
                    <Button className=".button-headerPage" aria-label="btn-peccode" color="green" variant="contained" startIcon={<AddIcon />} 
                    onClick={props.navigate}>{title}</Button>        
                </div>    
                </div>
                <br/>
                <div className="div-stickyHeadTable">
                  <StickyHeadTableSubtitle data={props.data} subtitle={props.subtitle}/>
                </div> 
            </div>   
        </ThemeProvider> 
    );
}

export default DataTablePecCodeSubtitle;