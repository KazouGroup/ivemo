import React, { Component } from "react";
import FieldInput from "../../../inc/vendor/FieldInput";


class FormcontactuseronactivitycityShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
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
            phone: this.state.phone,
            message: this.state.message,
        };
        let itemCity = this.props.match.params.city;
        let itemActivitycity = this.props.match.params.activitycity;
        let url = route('activitycitysendcontactservice_site',[itemCity,itemActivitycity]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                    message: `Votre message a bien été envoyé`
                },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
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


            <form role="form" id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">

                <div className="card-body">
                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons users_circle-08" /></span>
                            </div>
                            <FieldInput name="full_name" type='text' minLength="4" maxLength="50" placeholder="Nom complet" value={this.state.full_name}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons ui-1_email-85" /></span>
                            </div>
                            <FieldInput name="email" type='email' minLength="3" maxLength="50" placeholder="Email" value={this.state.email}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons tech_mobile" /></span>
                            </div>
                            <FieldInput name="phone" type='number' minLength="3" maxLength="15" placeholder="Téléphone" value={this.state.phone}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">

                            <FieldInput name="message" type='textarea' minLength="10" maxLength="5000" placeholder="Posez ici toutes vos questions !" value={this.state.message}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor} rows="17"/>
                        </div>
                    </div>
                    <div className="submit text-center">
                        {!$guest ?
                            <>
                                <button className="btn btn-primary btn-lg" type="submit">
                                    <i className="now-ui-icons ui-1_email-85" /> Contacter
                                </button>
                            </>
                            :
                            <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-primary btn-lg">
                                <i className="now-ui-icons ui-1_email-85" /> Contacter
                            </a>
                        }
                    </div>
                </div>
            </form>

        )
    }

}

export default FormcontactuseronactivitycityShow;
