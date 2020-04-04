import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import styles from "./ContactUserSite.module.css";


class ContactUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            subject: '',
            message: '',
            errors: [],
        };
        this.createItem = this.createItem.bind(this);
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

    createItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
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
        const composantTitle = 'Contactez Nous - Ivemo';
        document.title = `${composantTitle}`;
    }

    render() {
        return (
            <div className="about-us sidebar-collapse">
                <nav className="navbar ivemoNarbarCustomisation navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">
                    <div className="page-header page-header-small">
                        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg40.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">Contactez-nous</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main">
                        <div className="contact-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h2 className="title text-center">Laissez-nous un message</h2>
                                        <h4 className="description text-center">Si vous rencontrez un problème, vous pouvez nous envoyer un message en remplissant le formulaire ci-dessous
                                        <br />
                                            <br />
                                        </h4>
                                        <form role="form" id="contact-form" onSubmit={this.createItem} acceptCharset="UTF-8">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Nom <span className={styles.requiredColor}>*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                        </div>
                                                        <input id='last_name'
                                                            type='text'
                                                            className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                            name='last_name'
                                                            placeholder="Nom ..."
                                                            aria-label="Last Name ..."
                                                            autoComplete="last_name"
                                                            value={this.state.last_name}
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('last_name')}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Prénom <span className={styles.requiredColor}>*</span></label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                        </div>
                                                        <input id='first_name'
                                                            type='text'
                                                            className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                            name='first_name'
                                                            placeholder="Prénom ..."
                                                            autoComplete="first_name"
                                                            value={this.state.first_name}
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('first_name')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Email address</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                                                        </div>
                                                        <input id='email'
                                                            type='email'
                                                            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                            name='email'
                                                            placeholder="Email ..."
                                                            aria-label="Email ..."
                                                            autoComplete="email"
                                                            value={this.state.email}
                                                            onChange={this.handleFieldChange}
                                                        />
                                                        {this.renderErrorFor('email')}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Phone</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Number Here..." autoComplete="number" />
                                                    </div>
                                                </div>
                                            </div>

                                            <label>Objet </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="now-ui-icons text_caps-small"></i></span>
                                                </div>
                                                <input id='subject'
                                                    type='text'
                                                    className={`form-control ${this.hasErrorFor('subject') ? 'is-invalid' : ''}`}
                                                    name='subject'
                                                    placeholder="Object ..."
                                                    aria-label="Object ..."
                                                    value={this.state.subject}
                                                    onChange={this.handleFieldChange}
                                                />
                                                {this.renderErrorFor('subject')}
                                            </div>
                                            <div className="form-group">
                                                <label>Votre message</label>
                                                <textarea name="message" value={this.state.message}
                                                    onChange={this.handleFieldChange}
                                                    placeholder={'Message ...'}
                                                    className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                    id="message"
                                                    rows="10" />
                                                {this.renderErrorFor('message')}
                                            </div>
                                            <div className="submit text-center">
                                                <button className="btn btn-primary" type="submit">
                                                    <i className="now-ui-icons ui-1_send"></i> Envoyer mon message
                                            </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FooterBigUserSite />
                </div>
            </div>
        )
    }
}

export default ContactUserSite;
