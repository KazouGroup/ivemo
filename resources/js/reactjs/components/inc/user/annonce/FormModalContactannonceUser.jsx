import React, { Component,Fragment } from "react";
import {Button, Form, Input, UncontrolledTooltip} from "reactstrap";
import {NavLink} from "react-router-dom";
import moment from "moment";


class FormModalContactannonceUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }

    // lifecycle method
    componentDidMount() {

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
                                            <a href={`/@${this.props.user.slug}/annonces_locations/`}>
                                                <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt={this.props.user.first_name} className="avatar" />
                                            </a>
                                            <div className="mx-3">
                                                <a href={`/@${this.props.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm"><b>{this.props.user.first_name}</b>
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
                                            <input id='full_name'
                                                   type='text'
                                                   className={`form-control ${this.props.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                   name='full_name'
                                                   minLength="5"
                                                   placeholder="Nom complet"
                                                   aria-label="Nom complet"
                                                   autoComplete="full_name"
                                                   value={this.state.full_name}
                                                   onChange={this.props.handleFieldChange}
                                            />
                                            {this.props.renderErrorFor('full_name')}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                            </div>
                                            <input id='email'
                                                   type='email'
                                                   className={`form-control ${this.props.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                   name='email'
                                                   minLength="3"
                                                   placeholder="Email"
                                                   aria-label="Email"
                                                   autoComplete="email"
                                                   value={this.state.email}
                                                   onChange={this.props.handleFieldChange}
                                            />
                                            {this.props.renderErrorFor('email')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons tech_mobile"/></span>
                                            </div>
                                            <input id='phone'
                                                   type='text'
                                                   className={`form-control ${this.props.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                                   name='phone'
                                                   placeholder="Téléphone"
                                                   aria-label="Téléphone"
                                                   value={this.state.phone}
                                                   onChange={this.props.handleFieldChange}
                                            />
                                            {this.props.renderErrorFor('phone')}
                                        </div>


                                    </div>
                                    <div className="row">

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                            </div>
                                            <input id='subject'
                                                   type='text'
                                                   minLength="5"
                                                   className={`form-control ${this.props.hasErrorFor('subject') ? 'is-invalid' : ''}`}
                                                   name='subject'
                                                   placeholder="Object..."
                                                   aria-label="Object"
                                                   autoComplete="subject"
                                                   value={this.state.subject}
                                                   onChange={this.props.handleFieldChange}
                                            />
                                            {this.props.renderErrorFor('subject')}
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.props.handleFieldChange}
                                                                 placeholder={'Posez ici toutes vos questions !'}
                                                                 minLength="5"
                                                                 className={`form-control ${this.props.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 rows="10" />
                                            {this.props.renderErrorFor('message')}
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
