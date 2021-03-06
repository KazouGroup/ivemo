import React, { Component } from "react";
import FieldInput from "../../../../inc/vendor/FieldInput";
import PrivacyInformationsFormContact from "../../../../inc/user/PrivacyInformationsFormContact";
import {Form} from "reactstrap";


class FormcontactuseronannonceventeShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            subject: '',
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
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemCity = this.props.match.params.city;
        let itemuser = this.props.match.params.user;
        let itemannoncevente = this.props.match.params.annoncevente;
        let url = route('annonceventesendcontactservice_site',[itemannoncetype,itemCategoryannoncevente,itemCity,itemuser,itemannoncevente]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a ??t?? bien envoy?? ?? cette utilisateur`
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
                    subject: "",
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
        const { subject, message } = this.state;
        const enabled = subject.length && message.length > 0;
        return (


            <Form id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">

                <div className="card-body">

                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                            </div>

                            <FieldInput name="full_name" type='text' minLength="4" maxLength="50" placeholder="* Nom complete" value={this.state.full_name}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor} required="required"/>

                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                            </div>

                            <FieldInput name="email" type='email' minLength="3" maxLength="50" placeholder="* Email" value={this.state.email}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor} required="required"/>

                        </div>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons tech_mobile"/></span>
                            </div>

                            <FieldInput name="phone" type='number' minLength="3" maxLength="50"
                                        placeholder="* Votre num??ro de T??l??phone"
                                        value={this.state.phone}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>


                    </div>
                    <div className="row">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons users_circle-08" /></span>
                            </div>
                            <FieldInput name="subject" type='text' minLength="5" maxLength="200" placeholder="Object" value={this.state.subject}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>
                    </div>
                    <div className="row">

                        <div className="input-group">

                            <FieldInput name="message" type='textarea' minLength="5" maxLength="5000"
                                        placeholder="* Bonjour, je suis vivement int??ress??(e) par cette annonce. Merci de me recontacter pour plus d'informations. Bien cordialement"
                                        value={this.state.message}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor} rows="17" required="required"/>
                        </div>
                    </div>
                    <small>les champs avec un ast??risque * sont obligatoires</small>

                    <div className="submit text-center">
                        {!$guest ?
                            <>
                                <button className="btn btn-primary btn-lg" type="submit" disabled={!enabled}>
                                    <i className="now-ui-icons ui-1_email-85"/> <b>Contacter</b>
                                </button>
                            </>
                            :
                            <>
                                <a href={`/login`} data-toggle="modal"
                                   data-target="#loginModal"
                                   className="btn btn-primary btn-lg">
                                    <i className="now-ui-icons ui-1_send"/> Contacter
                                </a>
                            </>
                        }
                    </div>
                </div>

                <PrivacyInformationsFormContact />

            </Form>

        )
    }

}

export default FormcontactuseronannonceventeShow;
