import React, { PureComponent,Fragment } from "react";
import {Button, Form, Input, UncontrolledTooltip} from "reactstrap";
import FieldInput from "../../vendor/FieldInput";


class FormModalSignalannonceUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

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
                                                <FieldInput name="full_name" type='text' minLength="3" maxLength="50" placeholder="Nom complete" value={this.state.full_name}
                                                            handleFieldChange={this.props.handleFieldChange}
                                                            hasErrorFor={this.props.hasErrorFor}
                                                            renderErrorFor={this.props.renderErrorFor}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
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

                                    </div>

                                    <div className="row">

                                        <div className="input-group">
                                            <FieldInput name="message" type='textarea' minLength="5" maxLength="5000" placeholder="Pourquoi signalez-vous cette annonce?" value={this.state.message}
                                                        handleFieldChange={this.props.handleFieldChange}
                                                        hasErrorFor={this.props.hasErrorFor}
                                                        renderErrorFor={this.props.renderErrorFor} rows="10"/>
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
