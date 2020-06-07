import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import {Row, Form, Input, InputGroup, FormGroup, FormText} from 'reactstrap';


class SignalFromEmployementForShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            confirm_send: '',
            email: '',
            message: '',
            errors: [],
        };


        this.signalemessageItem = this.signalemessageItem.bind(this);
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

    signalemessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            confirm_send: this.state.confirm_send,
            full_name: this.state.full_name,
            message: this.state.message,
        };
        let itemEmployment = this.props.match.params.employment;
        let itemCategoryemployment = this.props.match.params.categoryemployment;
        let itemCity = this.props.match.params.city;
        let url = route('signalemploymentbyslug_site',[itemCategoryemployment,itemCity,itemEmployment]);
        dyaxios.post(url, item)
            .then(() => {

                $('#addNew').modal('hide');

                $.notify({
                        message: `Cette annonce a été signalé avec succès`
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
            $.notify("Ooop! Quelque chose ne va pas. Essayer plus tard...", {
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

            <div className="modal fade" id="addNew" tabIndex="-1" role="dialog" aria-labelledby="addNewLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Signaler des erreurs sur cette annonce</b></h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Form role="form"  onSubmit={this.signalemessageItem}  acceptCharset="UTF-8">

                            <div className="modal-body">

                                <div className="card-body">

                                    <p className="title text-center"><b>Spécifie le type d'erreur</b></p>

                                    <div className="row">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                            </div>
                                            <input id='full_name'
                                                   type='text'
                                                   required="required"
                                                   className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                   name='full_name'
                                                   placeholder="Nom complet"
                                                   aria-label="Nom complet"
                                                   autoComplete="full_name"
                                                   value={this.state.full_name}
                                                   onChange={this.handleFieldChange}
                                            />
                                            {this.renderErrorFor('full_name')}
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
                                                   required="required"
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
                                    </div>
                                    <div className="row">

                                        <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.handleFieldChange}
                                                                 placeholder={'Pourquoi signalez-vous cette article?'}
                                                                 className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 required="required"
                                                                 rows="10" />
                                            {this.renderErrorFor('message')}
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
                                    </div>

                                    <div className="submit text-center">
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">
                                            <b>Signaler</b>
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

export default SignalFromEmployementForShow;
