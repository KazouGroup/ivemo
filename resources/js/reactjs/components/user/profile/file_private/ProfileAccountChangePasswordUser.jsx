import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";


class ProfileAccountChangePasswordUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            password: '',
            password_confirmation: '',
            errors: [],
        };
        this.updateItem = this.updateItem.bind(this);
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

    updateItem(e) {
        e.preventDefault();

        let item = {
            password: this.state.password,
            old_password: this.state.old_password,
            password_confirmation: this.state.password_confirmation,
        };
        dyaxios.put(route('update_password.site'), item)
            .then(() => {
                $.notify({
                        message: 'Mot de passe mis à jour'
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
                    password: "",
                    old_password: "",
                    password_confirmation: "",
                });
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    loadItems() {
        dyaxios.get(route('api_profile_account.site')).then(response =>
            this.setState({
                password: response.data.password,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }

    render() {
        return (

            <>
                <Helmet>
                    <title> {`${$userIvemo.first_name || "Profile"}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <form role="form" id="contact-form" onSubmit={this.updateItem} acceptCharset="UTF-8">

                                    <div className="row">

                                        <div className="col-lg-4 col-md-12 mx-auto">

                                            <NavProfileAccountPrivate/>

                                        </div>

                                        <div className="col-lg-8 col-md-12 mx-auto">

                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist"
                                                                 aria-multiselectable="true"
                                                                 className="card-collapse">


                                                                <label htmlFor="address">
                                                                    <b>Mot de passe actuelle</b>
                                                                </label>
                                                                <div className="input-group">
                                                                    <div
                                                                        className="input-group-prepend">
                                                                                        <span className="input-group-text">
                                                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                                                        </span>
                                                                    </div>
                                                                    <input id='old_password'
                                                                           type='password'
                                                                           className={`form-control ${this.hasErrorFor('old_password') ? 'is-invalid' : ''}`}
                                                                           name='old_password'
                                                                           required={'required'}
                                                                           placeholder="Mot de passe actuel"
                                                                           aria-label="old_password"
                                                                           autoComplete="old_password"
                                                                           value={this.state.old_password || ''}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('old_password')}
                                                                </div>
                                                                <label htmlFor="address"><b>Nouveau mot
                                                                    de passe</b></label>
                                                                <div className="input-group">
                                                                    <div
                                                                        className="input-group-prepend">
                                                                                        <span className="input-group-text">
                                                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                                                        </span>
                                                                    </div>
                                                                    <input id='password'
                                                                           type='password'
                                                                           className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                                                           name='password'
                                                                           required={'required'}
                                                                           placeholder="Nouveau mot de passe"
                                                                           aria-label="password"
                                                                           autoComplete="password"
                                                                           value={this.state.password || ''}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('password')}
                                                                </div>
                                                                <label htmlFor="address"><b>Confirmer le
                                                                    mot de passe</b></label>
                                                                <div className="input-group">
                                                                    <div
                                                                        className="input-group-prepend">
                                                                                        <span
                                                                                            className="input-group-text">
                                                                                            <i className="now-ui-icons ui-1_lock-circle-open"/>
                                                                                        </span>
                                                                    </div>
                                                                    <input id='password_confirmation'
                                                                           type='password'
                                                                           className={`form-control ${this.hasErrorFor('password_confirmation') ? 'is-invalid' : ''}`}
                                                                           name='password_confirmation'
                                                                           required={'required'}
                                                                           placeholder="Confirmer le mot de psse"
                                                                           aria-label="password_confirmation"
                                                                           autoComplete="password_confirmation"
                                                                           value={this.state.password_confirmation || ''}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('password_confirmation')}
                                                                </div>

                                                                <div className="submit text-center">
                                                                    <button className="btn btn-primary"
                                                                            type="submit">
                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                        <b>Enregistrer</b>
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>





                                    </div>

                                </form>

                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>


            </>

        )
    }
}
ProfileAccountChangePasswordUser.defaultProps = {
    backgroundColor: "black",
};

ProfileAccountChangePasswordUser.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default ProfileAccountChangePasswordUser;
