import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import { Row, Form, Input,InputGroup,FormGroup } from 'reactstrap';


class ContactFromPublicitePageIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            appointment_time: '',
            full_name: '',
            confirm_send: '',
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
            appointment_time: this.state.appointment_time,
            confirm_send: this.state.confirm_send,
            phone: this.state.phone,
            message: this.state.message,
        };
        let url = route('contactusersadverts_save.store');
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a été bien envoyé chez Ivemo`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animated fadeInDown",
                            exit: "animated fadeOutUp"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
                    confirm_send: "",
                    appointment_time: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }
    // lifecycle method
    componentDidMount() {
       //
    }

    render() {

        return (

            <div id="recallForm" className="container">
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                        <h5 className="text-center title">Appelez-nous au {$phone_number} ou remplissez le formulaire pour etre contacté.</h5>
                        <form className="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons users_circle-08"/></span>
                                        </div>
                                        <Input id='full_name'
                                               type='text'
                                               required="required"
                                               className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                               name='full_name'
                                               minLength="3"
                                               maxLength="200"
                                               placeholder="Nom complet"
                                               aria-label="Nom complet"
                                               autoComplete="full_name"
                                               value={this.state.full_name}
                                               onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('full_name')}
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons ui-1_email-85"/></span>
                                        </div>
                                        <Input id='email'
                                               type='email'
                                               required="required"
                                               className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                               name='email'
                                               minLength="7"
                                               maxLength="200"
                                               placeholder="Email..."
                                               aria-label="Email"
                                               autoComplete="email"
                                               value={this.state.email}
                                               onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('email')}
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons tech_mobile"/></span>
                                        </div>
                                        <Input id='phone'
                                               type='number'
                                               className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                               name='phone'
                                               placeholder="Téléphone"
                                               aria-label="Téléphone"
                                               value={this.state.phone}
                                               onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('phone')}
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <select id="appointment_time" value={this.state.appointment_time || ''} className={`form-control ${this.hasErrorFor('appointment_time') ? 'is-invalid' : ''}`}
                                                onChange={this.handleFieldChange} name="appointment_time" required="required">
                                            <option value="" disabled="">Preference oraire</option>
                                            <option value="09-13">09-13</option>
                                            <option value="13-15">13-15</option>
                                            <option value="15-18">15-18</option>
                                            <option value="09-18">N'importe quelle heure</option>
                                        </select>
                                        {this.renderErrorFor('appointment_date')}
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <InputGroup>
                                        <textarea name="message" value={this.state.message}
                                                  onChange={this.handleFieldChange}
                                                  placeholder={'Posez ici toutes vos questions (optionel)!'}
                                                  maxLength="5000"
                                                  className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                  id="message"
                                                  rows="17" />
                                        {this.renderErrorFor('message')}
                                    </InputGroup>
                                </div>
                            </div>
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
                            <div className="row">
                                <div className="col-md-6 ml-auto mr-auto text-center">
                                    <button type="submit" className="btn btn-primary mt-4 btn-lg">
                                        Demandez à être contacté
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ContactFromPublicitePageIndex;