import React, { Component,Fragment } from "react";
import {Button, Form, Input, UncontrolledTooltip} from "reactstrap";
import {NavLink} from "react-router-dom";
import moment from "moment";


class FormModalSignalannonceUser extends Component {
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

            <div className="modal fade" id="addNew" tabIndex="-1" role="dialog" aria-labelledby="addNewLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Signaler des erreurs publicitaires</b></h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Form role="form"  onSubmit={this.props.signalemessageItem}  acceptCharset="UTF-8">

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
                                                    <Input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Annonce double" onChange={this.props.handleCheckClick} checked={this.state.object === "Annonce double"}/>
                                                    <span className="form-check-sign"></span>
                                                    Annonce double
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Mauvaise catégorie" onChange={this.props.handleCheckClick} checked={this.state.object === "Mauvaise catégorie"}/>
                                                    <span className="form-check-sign"></span>
                                                    Mauvaise catégorie
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Mauvaise ville" onChange={this.props.handleCheckClick} checked={this.state.object === "Mauvaise ville"}/>
                                                    <span className="form-check-sign"></span>
                                                    Mauvaise ville
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Téléphone / e-mail incorrect" onChange={this.props.handleCheckClick} checked={this.state.object === "Téléphone / e-mail incorrect"}/>
                                                    <span className="form-check-sign"></span>
                                                    Téléphone / e-mail incorrect
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Erreur d'adresse / de carte" onChange={this.props.handleCheckClick} checked={this.state.object === "Erreur d'adresse / de carte"}/>
                                                    <span className="form-check-sign"></span>
                                                    Erreur d'adresse / de carte
                                                </label>
                                            </div>

                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Propriété inexistante" onChange={this.props.handleCheckClick} checked={this.state.object === "Propriété inexistante"}/>
                                                    <span className="form-check-sign"></span>
                                                    Propriété inexistante
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Arnaque possible" onChange={this.props.handleCheckClick} checked={this.state.object === "Arnaque possible"}/>
                                                    <span className="form-check-sign"></span>
                                                    Arnaque possible
                                                </label>
                                            </div>
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">
                                                    <Input className="form-check-input" type="radio"
                                                           name="object" id="object"
                                                           value="Autre (précisez dans le commentaire)" onChange={this.props.handleCheckClick} checked={this.state.object === "Autre (précisez dans le commentaire)"}/>
                                                    <span className="form-check-sign"></span>
                                                    Autre (précisez dans le commentaire)
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                                </div>
                                                <input id='full_name'
                                                       type='text'
                                                       required="required"
                                                       className={`form-control ${this.props.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                       name='full_name'
                                                       placeholder="Nom complet"
                                                       aria-label="Nom complet"
                                                       autoComplete="full_name"
                                                       value={this.state.full_name}
                                                       onChange={this.props.handleFieldChange}
                                                />
                                                {this.props.renderErrorFor('full_name')}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                                </div>
                                                <input id='email'
                                                       type='email'
                                                       required="required"
                                                       className={`form-control ${this.props.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                       name='email'
                                                       placeholder="Email"
                                                       aria-label="Email"
                                                       autoComplete="email"
                                                       value={this.state.email}
                                                       onChange={this.props.handleFieldChange}
                                                />
                                                {this.props.renderErrorFor('email')}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.props.handleFieldChange}
                                                                 placeholder={'Pourquoi signalez-vous cette article?'}
                                                                 className={`form-control ${this.props.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 required="required"
                                                                 rows="10" />
                                            {this.props.renderErrorFor('message')}
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

export default FormModalSignalannonceUser;
