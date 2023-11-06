import React, { useRef, useEffect } from 'react';
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

import '@fontsource/Poppins/700.css';
import '../scss/components/form-peccode.scss';
import { SearchablePecCode } from './SearchablePecCode';
import UserContext from '../context/collectorContext';
import SelectContext from "../context/selectContext"; 
import { useForm } from "react-hook-form";
import { ResolverContext } from '../resolver/ResolverContext';
import { ShowMessage } from './Show-Message';

const bodyTheme = createTheme({
  typography: {
    h6: {
      color: '#3e5915',
      fontStyle: 'bold',
      fontFamily: 'Poppins'
    }
},});

const headerTheme = createTheme({
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

const optionsStatus = [
  {
    value: true,
    label: 'Ativo',
  },
  {
    value: false,
    label: 'Inativo',
  }
];

const onSubmit = registerData => {
  dispatch(registerUser(registerData))
}

const FormPecCode = (props)=>{
  
  const [optionSelected, setOptionSelected] = React.useState('1');
  const navigate = useNavigate();  
  const {state} = React.useContext(UserContext);
  const {setCollections, collections} = React.useContext(SelectContext);
  
  const headerRequest = {
    operation: "POST",
    typeCollection: props.typeInputOperation
  };
  const [resultOperation, setResult] = React.useState({show:false,status:"",message: ""});

  const firstRender = useRef(true);

  useEffect(() => {    
    if (firstRender.current) {
      clearCollection()
      firstRender.current = false;
      return;
    }      
  });

  const clearCollection = () => {    
    collections.length = 0;
    setCollections(collections);
  };  

  const handleChange = (event) => {
    setOptionSelected(event.target.value);
  };

  const handleSubmmit = (_) => {    
    const fieldsContext = getValues();
    
    try {            
      ResolverContext(props.contextForm, headerRequest, fieldsContext, collections)
      .then((res)=> {
        const successResult = 201;
        if (res.status === successResult)
        {
          setResult({show:true, status:"success", message: "Operacao concluida com sucesso"});
        }
        else
        {
          setResult({show:true, status: "error", message: res.message});
        }
      });    
    } catch (error) {
        setResult({show:true, status:"error", message: error.message});
    }
    
    resetFields(fieldsContext);

  };
  
  const resetFields = (fieldsContext) => {
    Object.keys(fieldsContext).map((field) => {
      resetField(field);
    });
  }

  const inputProps = {
    "data-testid": "mui-field"
  };

  if (!props.fields)
    return(" ")  
  
  const columns = props.fields
  const { register, getValues, resetField } = useForm();

  return (    
    <>
      <ThemeProvider theme={headerTheme}>
        <div className="main-div-headerPage">
          <div className='div-headerPage'>            
            <Button aria-label="button-fazendaAddEdit" color="green" variant="contained" onClick={()=> navigate(-1)} startIcon={<ArrowBackIcon />} >Voltar</Button>
            <Typography weight="bold" variant="h6" align="center" >            
              Novo - {state.title}
            </Typography>    
            <Button onClick={() => handleSubmmit()} color="green" variant="contained" startIcon={<SaveIcon />}>Salvar</Button>
          </div>            
        </div>
      </ThemeProvider>
      <ThemeProvider theme={bodyTheme}>
        <Box
          component="form"
          m={3} //margin
          p={1} //padding
          boxShadow={12}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '60ch' },
          }}
          className="boxPage"          
        >
          <div className="main-div-bodyPage">          
            <div className="div-typography-bodyPage">                           
              <Typography weight="bold" variant="h6" align="left" >
                Informações - {state.title}
              </Typography>                  
            </div>
            {
              columns.map((column,indexCol) => {                                
                return (
                    
                    column.type == 'bool' 
                    ? 
                      <TextField
                        {...register(column.name)}
                        id={column.id}
                        key={column.name}
                        select
                        label={column.label}
                        value={optionSelected}
                        onChange={handleChange}         
                        variant="standard" 
                        inputProps={inputProps}
                      >
                      {optionsStatus.map((option,index) => {
                        return (
                          <MenuItem  
                            data-testid="select-option" 
                            aria-selected={index == 0} 
                            key={option.value} 
                            value={option.value}
                            {...register(column.name)}
                          >
                            {option.label}
                          </MenuItem> 
                        )
                      })}
                      </TextField>
                    :                    
                    column.constraint                     
                    ?
                      <SearchablePecCode constraint={column.constraint} keyConstraint={column.keyConstraint} nameKey={column.name} registerSearch={register}>                        
                      </SearchablePecCode>
                    :
                      <TextField 
                        {...register(column.name)}
                        id={column.name} 
                        key={column.name} 
                        label={column.label}
                        type={column.type == 'int' ? 'number' : 'text'}
                        variant="standard" />
                )
              })
            }
          </div>          
        </Box>
        {resultOperation.show &&
          <ShowMessage result={resultOperation.status} message={resultOperation.message}></ShowMessage>     
        }         
      </ThemeProvider>    
    </>
  );
}

export default FormPecCode;