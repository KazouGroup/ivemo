import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import {FormGroup, Row} from "reactstrap";


class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.state = {
            username: '',
            first_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            categoryprofile_id: '',
            errors: [],
        }

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

    saveItem(e) {
        e.preventDefault();

        let item = {
            username: this.state.username,
            first_name: this.state.first_name,
            email: this.state.email,
            categoryprofile_id: this.state.categoryprofile_id,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };
        dyaxios.post(route('register'), item)
            .then(() => {
                window.location.replace(`/`);
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Quelque chose ne va pas. Essayer plus tard...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        const composantTitle = 'Inscription - Ivemo';
        document.title = `${composantTitle}`;
    }
    render() {
        return (
            <div className="register-page sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="page-header header-filter" filter-color="black">
                    <div className="page-header-image" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/login.jpg' + ")" }}/>
                    <div className="content">
                        <div className="container">

                            <div className="col-md-7 ml-auto mr-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title text-center">S'inscrire</h4>
                                        <div className="social text-center">
                                            <a href={route('social.oauth', 'facebook')} className="btn btn-facebook">
                                                <i className="fab fa-facebook"> </i>
                                            </a>
                                            <h5 className="card-description"> ou</h5>
                                        </div>
                                        <form className="form" method="POST" onSubmit={this.saveItem}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="now-ui-icons users_circle-08"/>
                                                    </span>
                                                        </div>
                                                        <input type="text" placeholder="Pseudo" aria-label="Pseudo"
                                                               required="required"
                                                               id="username"
                                                               className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                               name='username'
                                                               value={this.state.username}
                                                               onChange={this.handleFieldChange} autoComplete="username" autoFocus />
                                                        {this.renderErrorFor('username')}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="now-ui-icons users_circle-08"/>
                                                    </span>
                                                        </div>
                                                        <input type="text" placeholder="Nom complete" aria-label="Nom complete"
                                                               required="required"
                                                               id="first_name"
                                                               className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                               name='first_name'
                                                               value={this.state.first_name}
                                                               onChange={this.handleFieldChange} autoComplete="first_name" autoFocus />
                                                        {this.renderErrorFor('first_name')}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/>
                                                        </span>
                                                </div>
                                                <input type="email" placeholder="Votre E-mail ..." aria-label="Votre E-mail ..."
                                                       required="required"
                                                       id="email"
                                                       className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                       name='email'
                                                       value={this.state.email}
                                                       onChange={this.handleFieldChange}/>
                                                {this.renderErrorFor('email')}
                                            </div>
                                            {/*

                                            <div className="row">
                                                <div className="col-md-6">

                                                </div>

                                                 <div className="col-md-6">
                                                    <FormGroup>
                                                        <select name={'categoryprofile_id'} value={this.state.categoryprofile_id}
                                                                className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                id="categoryprofile_id"  required="required" onChange={this.handleFieldChange}>
                                                            <option value="" disabled>Pourquoi êtes-vous sur Ivemo?</option>
                                                            <option value="">Je souhaite reserver</option>
                                                            <option value="">Je souhaite acheter</option>
                                                            <option value="">Je souhaite louer</option>
                                                            <option value="">Je souhaite reserver, acheter et/ ou louer</option>
                                                            <option value="">Je suis un professionel</option>
                                                            <option value="">Autre</option>
                                                        </select>
                                                        {this.renderErrorFor('categoryprofile_id')}
                                                    </FormGroup>
                                                </div>

                                            </div>
                                            */}



                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                        </span>
                                                        </div>
                                                        <input type="password" placeholder="Mot de pass" aria-label="Mot de passe"
                                                               required="required"
                                                               id="password"
                                                               className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                                               name='password'
                                                               value={this.state.password}
                                                               onChange={this.handleFieldChange}
                                                               autoComplete="password" autoFocus />
                                                        {this.renderErrorFor('password')}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                        </span>
                                                        </div>
                                                        <input type="password" placeholder="Confirmer le mot de passe" aria-label="Confirmer le mot de passe"
                                                               required="required"
                                                               id="password_confirmation"
                                                               className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
                                                               name='password_confirmation'
                                                               value={this.state.password_confirmation}
                                                               onChange={this.handleFieldChange}
                                                               autoComplete="password_confirmation" autoFocus />
                                                        {this.renderErrorFor('password_confirmation')}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="card-footer text-center">
                                                <input type="submit" value="Se connecter" className="btn btn-primary "/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <FooterUserSite/>
                </div>
            </div>
        )
    }
}

export default RegisterUser;
