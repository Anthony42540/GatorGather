import Select from 'react-select';
import { useField } from 'formik';

export function SelectField(props) {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    
    const onChange = (value) => {
      setValue(value);
    };

    return <Select {...props} value={state?.value} isMulti onChange={onChange} onBlur={setTouched} />;
  }