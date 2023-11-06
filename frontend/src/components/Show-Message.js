import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const ShowMessage = (props) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
        {
            props.result === "error"
            ?
                <Alert severity="error">{props.message}</Alert>
            :
            props.result === "warning"
            ?
                <Alert severity="warning">{props.message}</Alert>
            :
            props.result === "warning"
            ?
                <Alert severity="info">{props.message}</Alert>
            :
                <Alert severity="success">{props.message}</Alert>
        }      
    </Stack>
  );
}