import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import moment from "moment";


class FormContactProfileAccountUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
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
            email: this.state.email,
            full_name: this.state.full_name,
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.message,
        };
        dyaxios.post(route('contact.save'), item)
            .then(() => {
                $.notify('<strong>Merçi pour votre message ...</strong>', {
                    allow_dismiss: false,
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    },
                    animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    },
                });

                this.setState({
                    email: "",
                    first_name: "",
                    last_name: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        //
    }

    render() {
        return (


            <form role="form" id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="info info-horizontal">
                                <div className="icon icon-primary">
                                    <i className="now-ui-icons tech_mobile"/>
                                </div>
                                <div className="description">
                                    <h5 className="info-title">Give us a ring</h5>
                                    <p> Michael Jordan
                                        <br/> +40 762 321 762
                                        <br/> Mon - Fri, 8:00-22:00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="info info-horizontal">
                                <div className="icon icon-primary">
                                    <i className="now-ui-icons location_pin"/>
                                </div>
                                <div className="description">
                                    <h5 className="info-title">Find us at the office</h5>
                                    <p> Bld Mihail Kogalniceanu
                                        <br/> 7652 Bucharest,
                                        <br/> Romania
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Nom complet</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                </div>
                                <input id='full_name'
                                       type='text'
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
                    </div>

                    <div className="row">
                        <div className="col-md-6 pr-2">
                            <label>Nom complet</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons tech_mobile"/></span>
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
                        </div>
                        <div className="col-md-6 pl-2">
                            <label>Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                </div>
                                <input id='email'
                                       type='email'
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
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Suject</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                </div>
                                <input type="text" className="form-control"
                                       placeholder="Suject..."/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Votre message</label>
                            <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.handleFieldChange}
                                                                 placeholder={'Posez ici toutes vos questions !'}
                                                                 className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 rows="10" />
                                {this.renderErrorFor('message')}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"/>
                                    <span className="form-check-sign"/>
                                    I'm not a robot
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-primary pull-right">
                                <i className="now-ui-icons ui-1_email-85"/> Contacter
                            </button>
                        </div>
                    </div>
                </div>


            </form>


        )
    }

}

export default FormContactProfileAccountUser;
