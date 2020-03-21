import * as React from 'react';
import { FormGroup, Input } from 'reactstrap';
import InputMask from 'react-input-mask';

type Props ={
    placeholder: string,
    onChange: Function
};

export default ({ placeholder, onChange }: Props) => (
    <FormGroup>
        <InputMask placeholder={placeholder} onChange={({ target: { value }}) => onChange(parseInt(value))} mask="9999">
            { inputProps => <Input type="tel" { ...inputProps } /> }
        </InputMask>
    </FormGroup>
);