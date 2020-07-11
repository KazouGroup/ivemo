import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import {Row, Form, Input, InputGroup, FormGroup, FormText} from 'reactstrap';
import FieldInput from "../../../inc/vendor/FieldInput";


class ContactFromEmployementIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            subject: '',
            email: '',
            phone: '',
            message: '',
            errors: [],
        };


        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }


    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    // Handle Errors
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    sendmessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            full_name: this.state.full_name,
            subject: this.state.subject,
            phone: this.state.phone,
            message: this.state.message,
        };
        let itemEmployment = this.props.match.params.employment;
        let itemCategoryemployment = this.props.match.params.categoryemployment;
        let itemCity = this.props.match.params.city;
        let url = route('employmentsendcontactmessageuser_site',[itemCategoryemployment,itemCity,itemEmployment]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Message bien envoyé à cette utilisateur`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInDown",
                            exit: "animate__animated animate__fadeOutUp"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
                    confirm_send: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Quelque chose ne va pas. Essayez plus tard ...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    render() {
        return (

            <form role="form" id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                    </div>
                    <FieldInput name="full_name" type='text' minLength="3" maxLength="50" placeholder="Nom complete" value={this.state.full_name}
                                handleFieldChange={this.handleFieldChange}
                                hasErrorFor={this.hasErrorFor}
                                renderErrorFor={this.renderErrorFor}/>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                    </div>
                    <FieldInput name="email" type='email' minLength="3" maxLength="50" placeholder="Email" value={this.state.email}
                                handleFieldChange={this.handleFieldChange}
                                hasErrorFor={this.hasErrorFor}
                                renderErrorFor={this.renderErrorFor}/>
                </div>
                <FormText className="text-muted" color="default" id="emailHelp">
                   <b>Veuillez entrer une adresse e-mail et un numero de téléphone valide </b>
                </FormText>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                    </div>
                    <FieldInput name="phone" type='number' minLength="3" maxLength="15" placeholder="Téléphone" value={this.state.phone}
                                handleFieldChange={this.handleFieldChange}
                                hasErrorFor={this.hasErrorFor}
                                renderErrorFor={this.renderErrorFor}/>
                </div>
                {/*
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="now-ui-icons business_briefcase-24"></i></span>
                    </div>
                    <input id='cv_file'
                           type='file'
                           onChange={this.updateImage}
                           className={`form-control ${this.hasErrorFor('cv_file') ? 'is-invalid' : ''}`}
                           name='cv_file'
                           placeholder="CV"
                           aria-label="CV"
                    />
                    {this.renderErrorFor('cv_file')}
                </div>

                <FormText className="text-muted" color="default" id="emailHelp">
                    <b>Bien vouloir selectioner votre CV.</b>
                </FormText>
                */}
                <div className="form-group">
                    <FieldInput name="message" type='textarea' minLength="5" maxLength="5000" placeholder="Message" value={this.state.message}
                                handleFieldChange={this.handleFieldChange}
                                hasErrorFor={this.hasErrorFor}
                                renderErrorFor={this.renderErrorFor} rows="10"/>
                </div>
                {/*
                 <div
                    className="custom-control custom-checkbox mb-3">
                    <input name="confirm_send" className={`custom-control-input ${this.hasErrorFor('confirm_send') ? 'is-invalid' : ''}`}
                           id="confirm_send" value="1" type="checkbox" onChange={this.handleFieldChange} checked={this.state.confirm_send}/>
                    <label className="custom-control-label"
                           htmlFor="confirm_send">
                      <span>Je suis majeur, j'ai lu et accepté
                          <a className="text-primary" data-action="open-privacy-disclamer"> Informations de confidentialité</a>
                      </span>
                    </label>
                </div>
                */}
                <div className="submit text-center">
                    <button className="btn btn-primary btn-lg" type="submit">
                        <b>Postuler</b>
                    </button>
                </div>
            </form>

        )
    }
}

export default ContactFromEmployementIndex;
