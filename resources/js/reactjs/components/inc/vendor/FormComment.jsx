import React,{Component} from "react";
import {Button, Form, FormText, Input} from "reactstrap";
import FieldInput from "./FieldInput";

class FormComment extends Component {


    render() {
        const {namesubmit,value,cancelresponseCourse,renderErrorFor,hasErrorFor,handleFieldChange} = this.props;
        return (
           <>
               <div className="media media-post">
                   <a className="pull-left author" href="#pablo">
                       <div className="author">
                           <img className="avatar img-raised" alt={$userIvemo.first_name}
                                src={$userIvemo.avatar}/>
                       </div>
                   </a>
                   <div className="media-body">

                       <FieldInput name="body" type='textarea' maxLength="5000" placeholder="Laiser votre avis sur ce bien..."  value={value}
                                   handleFieldChange={handleFieldChange}
                                   hasErrorFor={hasErrorFor}
                                   renderErrorFor={renderErrorFor} rows="4"/>

                       <div className="media-footer">
                           <Button type="submit"
                                   className="btn btn-primary pull-right btn-sm">
                               {namesubmit}
                           </Button>

                           <button type="button" onClick={cancelresponseCourse}
                                   className="btn btn-default pull-right btn-sm"> Annuler
                           </button>
                       </div>
                   </div>
               </div>

           </>
        );
    }
}
export default FormComment;
