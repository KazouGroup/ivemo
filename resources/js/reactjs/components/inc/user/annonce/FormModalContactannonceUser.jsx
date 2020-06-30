import React, {PureComponent, Fragment} from "react";
import {Button, Form, Input, UncontrolledTooltip} from "reactstrap";
import {NavLink} from "react-router-dom";
import moment from "moment";
import FieldInput from "../../vendor/FieldInput";


class FormModalContactannonceUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }


    render() {
        return (

            <div className="modal fade" id="contactNew" tabIndex="-1" role="dialog" aria-labelledby="contactNewLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Contacter {this.props.user.first_name}</b></h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Form role="form"  onSubmit={this.props.sendmessageItem}  acceptCharset="UTF-8">

                            <div className="modal-body">

                                <div className="card-body">

                                    <div className="row">
                                        <div className="d-flex align-items-center">
                                            <a href={`/pro/${this.props.user.slug}/annonces_locations/`}>
                                                <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt={this.props.user.first_name} className="avatar" />
                                            </a>
                                            <div className="mx-3">
                                                <a href={`/pro/${this.props.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm"><b>{this.props.user.first_name}</b>
                                                    <small className="d-block text-muted">{moment(this.props.user.created_at).format('LL')}</small>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="text-right ml-auto">
                                            {this.props.user.phone && (
                                                <Fragment>
                                                    <UncontrolledTooltip placement="bottom" target="TooltipPhone">
                                                        {this.props.user.phone}
                                                    </UncontrolledTooltip>
                                                    <Button className="btn btn-icon btn-sm btn-info" id="TooltipPhone">
                                                        <i className="now-ui-icons tech_mobile"/>
                                                    </Button>
                                                </Fragment>
                                            )}

                                        </div>
                                    </div>
                                    <br/>

                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                            </div>
                                            <FieldInput name="full_name" type='text' minLength="3" maxLength="50" placeholder="Nom complete" value={this.state.full_name}
                                                        handleFieldChange={this.props.handleFieldChange}
                                                        hasErrorFor={this.props.hasErrorFor}
                                                        renderErrorFor={this.props.renderErrorFor}/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                            </div>
                                            <FieldInput name="email" type='email' minLength="3" maxLength="50" placeholder="Email" value={this.state.email}
                                                        handleFieldChange={this.props.handleFieldChange}
                                                        hasErrorFor={this.props.hasErrorFor}
                                                        renderErrorFor={this.props.renderErrorFor}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons tech_mobile"/></span>
                                            </div>
                                            <FieldInput name="phone" type='number' minLength="3" maxLength="15" placeholder="Téléphone" value={this.state.phone}
                                                        handleFieldChange={this.props.handleFieldChange}
                                                        hasErrorFor={this.props.hasErrorFor}
                                                        renderErrorFor={this.props.renderErrorFor}/>
                                        </div>


                                    </div>
                                    <div className="row">

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                            </div>
                                            <FieldInput name="subject" type='text' minLength="3" maxLength="50" placeholder="Object" value={this.state.subject}
                                                        handleFieldChange={this.props.handleFieldChange}
                                                        hasErrorFor={this.props.hasErrorFor}
                                                        renderErrorFor={this.props.renderErrorFor}/>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="input-group">
                                            <FieldInput name="message" type='textarea' minLength="5" maxLength="5000" placeholder="Message" value={this.state.message}
                                                        handleFieldChange={this.props.handleFieldChange}
                                                        hasErrorFor={this.props.hasErrorFor}
                                                        renderErrorFor={this.props.renderErrorFor} rows="10"/>
                                        </div>
                                    </div>
                                    <div className="form-check text-left">
                                        <label className="form-check-label">
                                            <Input className="form-check-input" id="remember" type="checkbox" name="remember" required/>
                                            <span className="form-check-sign"/>
                                            <span>J'ai lu et accepté
                                        <a className="text-primary" data-action="open-privacy-disclamer"> Informations de confidentialité</a>
                                    </span>
                                        </label>
                                    </div>
                                    <div className="submit text-center">
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">
                                            Contacter
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </Form>


                    </div>
                </div>
            </div>

        )
    }
}

export default FormModalContactannonceUser;
