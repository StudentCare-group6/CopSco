import React from 'react';
import FormInputs from './FormInputs';
import useFormContext from  '../../../hooks/useFormContext';

  export default function Popup() {
    const { page, setPage, title, subtitle, handleSubmit, getValues, setValue, errors } =
    useFormContext();
    return (
        <FormInputs/>
    );
  }
