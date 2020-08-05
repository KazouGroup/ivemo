import React,{Component} from "react";
import {Input} from "reactstrap";

class FieldInputCheck extends Component {

    render() {
        const {name,type,checked,value,onChange,namecheck} = this.props;
        return (
            <>
                <div className="form-check">
                    <label
                        className="form-check-label">
                        <Input
                            className="form-check-input"
                            type={type}
                            name={name}
                            checked={checked}
                            value={value}
                            onChange={onChange}/>
                        <span
                            className="form-check-sign"/>
                        <b>{namecheck}</b>
                    </label>
                </div>
            </>
        );
    }
}
export default FieldInputCheck;
