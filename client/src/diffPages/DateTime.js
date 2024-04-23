import React, {useState} from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

export const DateTime = ({ name, ...props }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [timeValue, setTimeValue] = useState('10:00');
    // const { setFieldValue } = useFormikContext();
    const [field, state, { setValue, setTouched }] = useField(props.field.name);
    const handleDateChange = (date) => {
        setStartDate(date);
        setValue(date.toISOString());
        console.log(date);
    };

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy hh:mm aa"
                showTimeSelect
                {...props}
            />
        </div>
    );
};
