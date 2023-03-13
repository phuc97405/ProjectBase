import React from 'react';
import {useController} from 'react-hook-form';
import {Text, TextInput} from 'react-native';

const FormTextInput = ({
  control,
  name,
  rules,
  placeholder,
  errorMessage,
}: any) => {
  const {field, fieldState} = useController({
    control,
    name,
    rules,
    defaultValue: '',
  });

  return (
    <>
      <TextInput
        {...field}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder={placeholder}
      />
      {fieldState.error && <Text style={{color: 'red'}}>{errorMessage}</Text>}
    </>
  );
};

export default FormTextInput;
