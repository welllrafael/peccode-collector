import React, { useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData as getDataUtil } from '../data/RequestData';
import SelectContext from '../context/selectContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const  SearchablePecCode = (props) => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);        
    const [data, setData] = React.useState([]);    
    const keyConstraint = props.keyConstraint;
    const nameMenuItem = props.constraint.split("/")[0];
    const {setCollections, collections} = useContext(SelectContext);

    useEffect(() => {
        const getData = async () => {            
            const data = await getDataUtil(props.constraint); 
            setData(data); 
            collections.push({name: props.constraint, data: data})
            setCollections(collections);                 
        };
        getData();
      }, []);    

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
              <Select 
              {...props.registerSearch(props.nameKey)}                               
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
              >
              <MenuItem                 
                disabled value="">
                  <em>{nameMenuItem}</em>
              </MenuItem>
              {data.map((value) => {
                return(
                  <MenuItem                
                  key={value[keyConstraint]}
                  value={value._id}
                  style={getStyles(name, personName, theme)}
                  >
                  {value[keyConstraint]}
                  </MenuItem>
                )})}
              </Select>
          </FormControl>
        </div>
    );
}
