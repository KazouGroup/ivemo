import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";


class LoginUser extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.state = {
            username: '',
            email: '',
            password: '',
            remember: true,
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
            password: this.state.password,
            remember: this.state.remember,
        };
        dyaxios.post(route('login'), item)
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
        const composantTitle = `Connexion - ${$name_site}`;
        document.title = `${composantTitle}`;
    }
    render() {
        return (
            <div className="login-page sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="page-header header-filter" >
                    <div className="page-header-image" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/login.jpg' + ")" }}></div>
                    <div className="content">
                        <div className="container">
                            <div className="col-md-5 ml-auto mr-auto">
                                <div className="card card-login card-plain">
                                    <form className="form" method="POST" onSubmit={this.saveItem}>
                                        <div className="card-header text-center">
                                            <div className="logo-container">
                                                <img src="/assets/vendor/assets/img/now-logo.png" alt="Connextion Ivemo" />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="input-group no-border input-lg">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="now-ui-icons users_circle-08"/>
                                                    </span>
                                                </div>
                                                <input type="text" placeholder="Pseudo, email" aria-label="Pseudo, email"
                                                    required="required"
                                                    id="username"
                                                    className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                    name='username'
                                                    value={this.state.username}
                                                    onChange={this.handleFieldChange} autoComplete="username" autoFocus />
                                                {this.renderErrorFor('username')}
                                            </div>
                                            <div className="input-group no-border input-lg">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
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
                                            <div className="form-check text-left">
                                                <label className="form-check-label">
                                                    <input className="form-check-input" id="remember" type="checkbox" defaultChecked={this.state.remember} value={this.state.remember} name="remember" onChange={this.handleFieldChange} />
                                                    <span className="form-check-sign"></span>
                                                    <span>Se souvenir de moi</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="card-footer text-center">
                                            <button type="submit" className="btn btn-primary btn-round btn-lg btn-block">Se connecter</button>
                                        </div>
                                        <div className="pull-left">
                                            <h6>
                                                <Link to={`/register/`} className="link footer-link">Inscription</Link>
                                            </h6>
                                        </div>
                                        <div className="pull-right">
                                            <h6>
                                                <Link to={`/password/reset/`} className="link footer-link">Mot de passe oublié?</Link>
                                            </h6>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterUserSite />
                </div>
            </div>
        )
    }
}

export default LoginUser;
