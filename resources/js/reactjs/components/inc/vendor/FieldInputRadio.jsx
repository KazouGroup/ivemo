import React,{Component} from "react";
import {Input} from "reactstrap";

class FieldInputRadio extends Component {

    render() {
        const {name,type,checked,value,namecheck,onChange} = this.props;
        return (
            <>
                <div className="form-check form-check-radio text-dark">
                    <label
                        className="form-check-label">
                        <Input
                            className={`form-check-input`}
                            id={name}
                            type={type}
                            name={name}
                            checked={checked}
                            value={value}
                            onChange={onChange}/>
                        <span className="form-check-sign"/>
                        <b>{namecheck}</b>
                    </label>
                </div>
            </>
        );
    }
}
export default FieldInputRadio;
