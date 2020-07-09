import React, { Component } from "react";


class LoginModalUser extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
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
    handleCheckClick(){
        this.setState({ remember: !this.state.remember });
    };
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
                  //Masquer le modal après la connexion
                  $('#loginModal').modal('hide');
                  window.location.reload(true);
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
        return (

            <div className="modal fade modal-primary show" id="loginModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-modal="true">
                <div className="modal-dialog modal-login">
                    <div className="modal-content">
                        <div className="card card-login card-plain" data-background-color="">
                            <div className="modal-header justify-content-center">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    <i className="now-ui-icons ui-1_simple-remove"/>
                                </button>
                                <div className="header header-primary text-center">
                                    <b>Se connecter avec</b>
                                    <div className="modal-footer text-center">
                                        <a href={route('social.oauth','facebook')} className="btn btn-facebook btn-block btn-round">
                                            Facebook
                                        </a>
                                        <a href={route('social.oauth','google')} className="btn btn-google btn-block btn-round">
                                            Google
                                        </a>
                                    </div>
                                    <b>Ou</b>
                                </div>
                            </div>

                            <form className="form" method="POST" onSubmit={this.saveItem}>
                                <div className="modal-body">
                                    <div className="card-body">
                                        <div className="input-group no-border input-lg">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="now-ui-icons users_circle-08"/></span>
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
                                                    <i className="now-ui-icons ui-1_lock-circle-open"/></span>
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
                                                <input className="form-check-input" id="remember" type="checkbox" checked={this.state.remember} value={this.state.remember}  onChange={this.handleCheckClick} name="remember" />
                                                <span className="form-check-sign"/>
                                                <span>Se souvenir de moi</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div className="modal-footer text-center">
                                    <input type="submit" value="Se connecter" className="btn btn-neutral btn-round btn-lg btn-block"/>
                                </div>


                                <div className="modal-footer text-center">
                                    <div className="pull-left">
                                        <span>
                                            <a href="/register/" className="link footer-link">Inscription</a>
                                        </span>
                                    </div>
                                    <div className="pull-right">
                                        <span>
                                            <a href="/password/reset/" className="link footer-link">Mot de passe oublié?</a>
                                        </span>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default LoginModalUser;
