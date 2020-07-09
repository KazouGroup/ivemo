import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import {Row, Form, Input, InputGroup, FormGroup, FormText} from 'reactstrap';


class ContactFromWorkwithusIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            email: '',
            phone: '',
            cv_file: '',
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
            phone: this.state.phone,
            cv_file: this.state.cv_file,
            message: this.state.message,
        };
        let itemCategoryworkwithus = this.props.match.params.categoryworkwithus;
        let itemWorkwithus = this.props.match.params.workwithus;
        let url = route('work_with_us_store.site',[itemCategoryworkwithus,itemWorkwithus]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a été bien envoyé chez ${$name_site}`
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
                    <input id='full_name'
                           type='text'
                           minLength="3"
                           maxLength="200"
                           className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                           name='full_name'
                           placeholder="Nom"
                           aria-label="Nom complete"
                           autoComplete="full_name"
                           value={this.state.full_name}
                           onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('full_name')}
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                    </div>
                    <input id='email'
                           type='email'
                           minLength="3"
                           maxLength="200"
                           className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                           name='email'
                           placeholder="Email"
                           aria-label="Email"
                           autoComplete="email"
                           value={this.state.email}
                           onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('email')}
                </div>
                <FormText className="text-muted" color="default" id="emailHelp">
                   <b>Veuillez entrer une adresse e-mail valide </b>
                </FormText>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                    </div>
                    <input id='phone'
                           type='text'
                           className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                           name='phone'
                           placeholder="Téléphone"
                           aria-label="Téléphone"
                           value={this.state.phone}
                           onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('phone')}
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
                 <textarea name="message" value={this.state.message}
                           onChange={this.handleFieldChange}
                           placeholder={'Message'}
                           minLength="5"
                           maxLength="5000"
                           className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                           id="message"
                           rows="10" />
                    {this.renderErrorFor('message')}
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
                        Envoyer
                    </button>
                </div>
            </form>

        )
    }
}

export default ContactFromWorkwithusIndex;
