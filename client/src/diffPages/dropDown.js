import Select from 'react-select';
import { useField } from 'formik';

//code used from https://stackoverflow.com/questions/66539650/formik-react-select-multiple-variables
//function for creating component that uses formik with react-select to take in multiple values

export function SelectField(props) {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    
    const onChange = (value) => {
      setValue(value);
    };

    return <Select {...props} value={state?.value} isMulti onChange={onChange} onBlur={setTouched} />;
  }