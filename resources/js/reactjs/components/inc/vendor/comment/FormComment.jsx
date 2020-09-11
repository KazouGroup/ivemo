import React,{Component} from "react";
import {Button, Form, FormText, Input} from "reactstrap";
import FieldInput from "../FieldInput";

class FormComment extends Component {


    render() {
        const {namesubmit,value,disabled,cancelresponseCourse,renderErrorFor,hasErrorFor,handleFieldChange} = this.props;
        return (
           <>
               {$guest ?
                   <div className="media media-post">
                       <a className="pull-left" href="#">
                           <div className="author">
                               <img className="avatar"
                                    src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                           </div>
                       </a>
                       <div className="media-body">

                           <FieldInput name="body" type='textarea' maxLength="5000" placeholder="Laisser votre avis ou un commentaire..."  value={value}
                                       handleFieldChange={handleFieldChange}
                                       hasErrorFor={hasErrorFor}
                                       renderErrorFor={renderErrorFor} rows="4"/>


                           <div className="media-footer">
                               <h6 className="text-muted">Se connecter avec</h6>
                               <a href={route('social.oauth','facebook')} className="btn btn-icon btn-sm btn-facebook">
                                   <i className="fab fa-facebook-square"></i>
                               </a>
                               <a href={route('social.oauth','google')} className="btn btn-icon btn-sm btn-google">
                                   <i className="fab fa-google-plus-square"></i>
                               </a>
                               <a href="#" data-toggle="modal" data-target="#loginModal"
                                       className="btn btn-primary pull-right btn-sm">
                                   <b>{namesubmit}</b>
                               </a>

                               <button type="button" onClick={cancelresponseCourse}
                                       className="btn btn-default pull-right btn-sm"> <b>ANNULER</b>
                               </button>
                           </div>
                       </div>
                   </div>
                   :

                   <div className="media media-post">
                       <a className="pull-left" href={$userIvemo.status_profile ?

                           `${route('public_profile.site',[$userIvemo.slug])}`
                           :
                           `${route('userpublic_profile.site',[$userIvemo.slug])}`}
                       >
                           <div className="author">
                               {$userIvemo.avatar === null ?
                                   <img className="avatar" alt={$userIvemo.first_name}
                                        src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                   :
                                   <img className="avatar" alt={$userIvemo.first_name}
                                        src={$userIvemo.avatar}/>
                               }
                           </div>
                       </a>
                       <div className="media-body">

                           <FieldInput name="body" type='textarea' maxLength="5000" placeholder="Laisser votre avis ou un commentaire..."  value={value}
                                       handleFieldChange={handleFieldChange}
                                       hasErrorFor={hasErrorFor}
                                       renderErrorFor={renderErrorFor} rows="4"/>

                           <div className="media-footer">
                               <Button type="submit" disabled={disabled}
                                       className="btn btn-primary pull-right btn-sm">
                                   <b>{namesubmit}</b>
                               </Button>

                               <button type="button" onClick={cancelresponseCourse}
                                       disabled={disabled}
                                       className="btn btn-default pull-right btn-sm"> <b>ANNULER</b>
                               </button>
                           </div>
                       </div>
                   </div>
               }


           </>
        );
    }
}
export default FormComment;
