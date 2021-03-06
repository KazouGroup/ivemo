import React, { Component } from "react";
import PrivacyInformationsFormContact from "../../../../inc/user/PrivacyInformationsFormContact";
import FieldInput from "../../../../inc/vendor/FieldInput";


class FormContactAnnoncereservationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            adult_number: '',
            children_number: '',
            phone: '',
            message: '',
            remember: true,
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
            adult_number: this.state.adult_number,
            children_number: this.state.children_number,
            phone: this.state.phone,
            message: this.state.message,
        };
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemcityannonce = this.props.match.params.city;
        let itemuser = this.props.match.params.user;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        let url = route('annoncereservationsendreservations_site',[itemannoncetype,itemCategoryannoncereservation,itemcityannonce,itemuser,itemannoncereservation]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre reservation a ??t?? bien envoy??`,
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animated fadeInUp",
                            exit: "animated fadeOutDown"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
                    message: "",
                    description: "",
                    adult_number: "",
                    children_number: "",
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
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                </div>
                                <FieldInput name="full_name" type='text' minLength="3" maxLength="150" placeholder="Nom complet " value={this.state.full_name}
                                            handleFieldChange={this.handleFieldChange}
                                            hasErrorFor={this.hasErrorFor}
                                            renderErrorFor={this.renderErrorFor}/>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className={'col-md-12'}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                </div>
                                <FieldInput name="email" type='email' minLength="3" maxLength="150" placeholder="Email " value={this.state.email}
                                            handleFieldChange={this.handleFieldChange}
                                            hasErrorFor={this.hasErrorFor}
                                            renderErrorFor={this.renderErrorFor}/>

                            </div>
                        </div>


                    </div>
                    <div className="row">
                      <div className="col-md-12">
                          <div className="input-group">
                              <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                              </div>

                              <FieldInput name="phone" type='number' minLength="3" maxLength="30" placeholder="T??l??phone " value={this.state.phone}
                                          handleFieldChange={this.handleFieldChange}
                                          hasErrorFor={this.hasErrorFor}
                                          renderErrorFor={this.renderErrorFor}/>
                          </div>
                      </div>


                    </div>
                    {/*

                    <div className={'row'}>

                            <div className="col-md-4 mx-auto">
                                <div className="datepicker-container">
                                    <div className="form-group">
                                        <input type="text" className="form-control datepicker" defaultValue="10/05/2016"/>
                                    </div>
                                </div>
                            </div>
                        <strong >au</strong>
                        <div className="col-md-4 mx-auto">
                                <div className="datepicker-container">
                                    <div className="form-group">
                                        <input type="text" className="form-control datepicker" defaultValue="10/05/2016"/>
                                    </div>
                                </div>
                            </div>
                    </div>
                    */}
                    <div className={'row'}>
                        <div className="col-md-6 col-6">
                            <div className="form-group">
                                <select  value={this.state.adult_number} className={`form-control ${this.hasErrorFor('adult_number') ? 'is-invalid' : ''}`}
                                         onChange={this.handleFieldChange} name="adult_number"  id="adult_number" required="required">
                                    <option value="" disabled>Adulte(s)</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                                {this.renderErrorFor('adult_number')}
                            </div>
                        </div>
                        <div className="col-md-6 col-6">
                            <div className="form-group">
                                <select  value={this.state.children_number} className={`form-control ${this.hasErrorFor('children_number') ? 'is-invalid' : ''}`}
                                         onChange={this.handleFieldChange} name="children_number"  id="children_number" required="required">
                                    <option value="" disabled>Enfant(s)</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {this.renderErrorFor('sex')}
                            </div>
                        </div>
                    </div>
                    <FieldInput name="message" type='textarea' rows="5" minLength="3" maxLength="5000" placeholder="Posez ici toutes vos questions " value={this.state.message}
                                handleFieldChange={this.handleFieldChange}
                                hasErrorFor={this.hasErrorFor}
                                renderErrorFor={this.renderErrorFor}/>

                    <div className="form-check text-left">
                        <label className="form-check-label">
                            <input className="form-check-input" id="remember" type="checkbox" defaultChecked={this.state.remember} value={this.state.remember} name="remember" onChange={this.handleFieldChange} />
                            <span className="form-check-sign"/>
                            <span>Je ne souhaite pas recevoir les annonces similaires. En savoir plus</span>
                        </label>
                    </div>

                    <div className="submit text-center">
                        {!$guest ?
                            <button className="btn btn-primary btn-lg" type="submit">
                                 Reserver {this.props.categoryannoncereservation.label}
                            </button>
                            :
                            <h6 className="title text-center">S'il vous pla??t
                                <a href="/" className="text-primary" data-toggle="modal" data-target="#loginModal"> Connectez vous </a> ou
                                <a href={route('register')} className="text-primary"> Inscrivez vous </a> reserver cette annonce
                            </h6>
                        }
                    </div>

                </div>

                <PrivacyInformationsFormContact />

            </form>

        )
    }

}

export default FormContactAnnoncereservationUser;
