import React,{Component} from "react";
import {Input} from "reactstrap";

class FieldInput extends Component {

    render() {
        const {name,type,placeholder,value,minLength,maxLength,rows,required,handleFieldChange,hasErrorFor,renderErrorFor} = this.props;
        return (
            <>
                <Input id={name}
                       minLength={minLength}
                       maxLength={maxLength}
                       type={type}
                       required={required}
                       className={`form-control ${hasErrorFor(name) ? 'is-invalid' : ''}`}
                       name={name}
                       placeholder={placeholder}
                       aria-label={placeholder}
                       value={value}
                       rows={rows}
                       onChange={handleFieldChange}
                       autoComplete={name}
                />
                {renderErrorFor(name)}
            </>
        );
    }
}
export default FieldInput;
