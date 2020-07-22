import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import {Row, Form, Input, InputGroup, FormGroup, FormText} from 'reactstrap';


class SignalFromForumForShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: 'Mauvaise catégorie',
            message: '',
            errors: [],
            employmentItem: [],

        };


        this.signalemessageItem = this.signalemessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
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

    handleCheckClick(event){
        this.setState({
            subject: event.target.value
        });

    };

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
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
            subject: this.state.subject,
            message: this.state.message,
        };
        let itemCategoryforum = this.props.match.params.categoryforum;
        let itemForum = this.props.match.params.forum;
        let url = route('forumsendsignal_site',[itemCategoryforum, itemForum]);
        dyaxios.post(url, item)
            .then(() => {

                //Masquer le modal après la création
                $('#addNew').modal('hide');

                $.notify({
                        message: `Post signalé avec succès`
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
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
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
                            <h5 className="modal-title"><b>Signaler des erreurs de post</b></h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Form role="form"  onSubmit={this.signalemessageItem}  acceptCharset="UTF-8">

                            <div className="modal-body">
                                <div className="card-body">
                                    <div className="alert alert-danger text-center" role="alert">
                                        <div className="container">
                                            {this.props.title}
                                        </div>
                                    </div>

                                    <p className="category">Spécifie le type d'erreur</p>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="radio"
                                                           name="subject" id="subject"
                                                           value="Mauvaise catégorie" onChange={this.handleCheckClick} checked={this.state.subject === "Mauvaise catégorie"}/>
                                                    <span className="form-check-sign"></span>
                                                    Mauvaise catégorie
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="subject" id="subject"
                                                           value="Information incomplète" onChange={this.handleCheckClick} checked={this.state.subject === "Information incomplète"}/>
                                                    <span className="form-check-sign"></span>
                                                    Information incomplète
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="subject" id="subject"
                                                           value="Mauvaise redaction" onChange={this.handleCheckClick} checked={this.state.subject === "Mauvaise redaction"}/>
                                                    <span className="form-check-sign"></span>
                                                    Mauvaise redaction
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="subject" id="subject"
                                                           value="Autre (précisez dans le commentaire)" onChange={this.handleCheckClick} checked={this.state.subject === "Autre (précisez dans le commentaire)"}/>
                                                    <span className="form-check-sign"></span>
                                                    Autre (précisez dans le commentaire)
                                                </label>
                                            </div>
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

export default SignalFromForumForShow;
