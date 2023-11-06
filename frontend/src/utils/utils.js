import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';

import DataTablePecCode from '../components/DataTable-PecCode';
import DataTablePecCodeSubtitle from '../components/DataTable-PecCode-Subtitle';
import FormPecCode from '../components/Form-PecCode';
import { ResolverContext } from '../resolver/ResolverContext';

export const getArrayFromStruct = (struct) => {
    const newStruct = Object.entries(struct);

    return struct
}

export const execFormPecCode = (route, typeInputOperation) => {
    const location = useLocation();    
    
    if (!location.state?.data)
      return(" ")  
  
    const properties = location.state.data.structForm;  
    const fields = properties
  
    return (    
      <FormPecCode fields={fields} contextForm={route} typeInputOperation={typeInputOperation}></FormPecCode>
    );
}

export const generateDataTablePecCode = (title, route, headerRequest) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await ResolverContext(route, headerRequest);
      setData(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    isLoading ?
    <div>Loading...</div>
    :
    <DataTablePecCode title={title} navigate={/* istanbul ignore next */ () => navigate(route, { state: { data: data } })} data={data} />    
  );
}

export const generateDataTablePecCodeWithSubtitle = (title, route, subtitles, headerRequest) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await ResolverContext(route, headerRequest);
      setData(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    isLoading ?
    <div>Loading...</div>
    :
    <DataTablePecCodeSubtitle title={title} navigate={/* istanbul ignore next */ () => navigate(route, { state: { data: data } })} data={data} subtitle={subtitles} />    
  );
}