import React, { Component } from "react";
import FieldInput from "../../../../inc/vendor/FieldInput";
import PrivacyInformationsFormContact from "../../../../inc/user/PrivacyInformationsFormContact";


class FormcontactuseronreservationShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            subject: '',
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
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.message,
        };
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemcityannonce = this.props.match.params.city;
        let itemuser = this.props.match.params.user;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        let url = route('annoncereservationsendcontactservice_site',[itemannoncetype,itemCategoryannoncereservation,itemcityannonce,itemuser,itemannoncereservation]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a été bien envoyé à cette utilisateur`
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
                                                            <i className="now-ui-icons tech_mobile"/></span>
                            </div>
                            <FieldInput name="phone" type='number' minLength="3" maxLength="30" placeholder="Téléphone " value={this.state.phone}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>


                    </div>
                    <div className="row">

                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                            </div>
                            <FieldInput name="subject" type='text' minLength="3" maxLength="250" placeholder="Object " value={this.state.subject}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>
                    </div>
                    <div className="row">

                        <div className="input-group">

                            <FieldInput name="message" type='textarea' minLength="3" maxLength="5000" placeholder="Posez ici toutes vos questions " value={this.state.message}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </div>
                    </div>
                    <div className="submit text-center">
                        {!$guest ?
                            <>
                                <button className="btn btn-primary btn-lg" type="submit">
                                    <i className="now-ui-icons ui-1_send"/> Contacter
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

            </form>

        )
    }

}

export default FormcontactuseronreservationShow;
