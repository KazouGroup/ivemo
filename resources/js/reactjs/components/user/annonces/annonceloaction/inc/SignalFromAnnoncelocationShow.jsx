import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import {Row, Form, Input, InputGroup, FormGroup, FormText} from 'reactstrap';


class SignalFromAnnoncelocationShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: 'Mauvaise catégorie',
            message: '',
            errors: [],
            annoncelocationItem: [],

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
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCity = this.props.match.params.city;
        let itemannoncelocation = this.props.match.params.annoncelocation;
        let url = route('annoncelocationsignal_site',[itemannoncetype,itemCategoryannoncelocation,itemCity,itemannoncelocation]);
        dyaxios.post(url, item)
            .then(() => {

                $('#addNew').modal('hide');

                $.notify({
                        message: `Cette annonce a été signalée avec succès`
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
            $.notify("Ooops! Quelque chose ne va pas. Essayez plus tard ...", {
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

                               <p className="category">Spécifier le type d'erreur</p>

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
                                               Informations incomplète
                                           </label>
                                       </div>
                                       <div className="form-check form-check-radio">
                                           <label className="form-check-label">
                                               <input className="form-check-input" type="radio"
                                                      name="subject" id="subject"
                                                      value="Erreur d'adresse / de carte" onChange={this.handleCheckClick} checked={this.state.subject === "Erreur d'adresse / de carte"}/>
                                               <span className="form-check-sign"></span>
                                               Erreur d'adresse / de carte
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
                                                      value="Arnaque possible" onChange={this.handleCheckClick} checked={this.state.subject === "Arnaque possible"}/>
                                               <span className="form-check-sign"></span>
                                               Arnaque possible
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

export default SignalFromAnnoncelocationShow;
