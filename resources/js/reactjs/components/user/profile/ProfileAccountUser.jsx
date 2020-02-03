import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';


class ProfileAccountUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            first_name: '',
            username: '',
            last_name: '',
            subject: '',
            description: '',
            url_site: '',
            address: '',
            phone: '',
            avatar: '',
            errors: [],
            showDefaultImage: false,
        };
        this.createItem = this.createItem.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
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
    // Handle Upload Image
    updateImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({ file: file, avatar: reader.result, showDefaultImage: false });
            document.querySelector('.kazouImageCarousel-file-upload').classList.remove('is-invalid');
        };
        reader.readAsDataURL(file)
    }
    removeImage(e) {
        e.preventDefault();
        this.setState({ file: '', avatar: '', showDefaultImage: true });
        document.querySelector('.kazouImageCarousel-file-upload').classList.add('is-invalid');
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

    loadItem() {
        dyaxios.get(route('api_profile_account.site')).then(response =>
            this.setState({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                username: response.data.username,
                url_site: response.data.url_site,
                description: response.data.description,
                address: response.data.address,
                phone: response.data.phone,
                avatar: response.data.avatar,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const { avatar } = this.state;
        return (

            <>
                <Helmet>
                    <title> {`${this.state.first_name}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <form role="form" id="contact-form" onSubmit={this.createItem} acceptCharset="UTF-8">

                                    <div className="row">

                                        <div className="col-lg-4 col-md-12 mx-auto">


                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                                                <div className="card-header text-center">

                                                                    <div className="profile text-center">
                                                                        <img src={this.state.showDefaultImage ? "/assets/vendor/assets/img/bg1.jpg" : avatar} alt={this.state.first_name} />
                                                                        <input id="avatar" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('avatar') ? 'is-invalid' : ''} kazouImageCarousel-file-upload`} name="avatar" />
                                                                        {this.renderErrorFor('avatar')}

                                                                    </div>

                                                                    <label className="btn btn-raised btn-info">
                                                                        <span className="btn-inner--icon">
                                                                            <i className="now-ui-icons ui-1_simple-add"></i>
                                                                        </span>
                                                                        <span className="btn-inner--text">Add Image</span>
                                                                    </label>

                                                                    <button hidden={this.state.showDefaultImage ? true : false} onClick={this.removeImage} className="btn btn-danger">
                                                                        <span className="btn-inner--icon">
                                                                            <i className="now-ui-icons ui-1_simple-remove"></i>
                                                                        </span>
                                                                        <span className="btn-inner--text">Remove</span>
                                                                    </button>

                                                                </div>

                                                                <label htmlFor="title"><b>Pseudo</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='username'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                                        name='username'
                                                                        placeholder="Pseudo"
                                                                        aria-label="Pseudo"
                                                                        autoComplete="username"
                                                                        value={this.state.username || ''}
                                                                        onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('username')}
                                                                </div>
                                                                <label htmlFor="title"><b>Nom</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='first_name'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                                        name='first_name'
                                                                        placeholder="Non"
                                                                        aria-label="Nom"
                                                                        autoComplete="first_name"
                                                                        value={this.state.first_name || ''}
                                                                        onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('first_name')}
                                                                </div>
                                                                <label htmlFor="title"><b>Prénom</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='last_name'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                        name='last_name'
                                                                        placeholder="Prénom"
                                                                        aria-label="Loyer mensuel charges comprises"
                                                                        autoComplete="last_name"
                                                                        value={this.state.last_name || ''}
                                                                        onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('last_name')}
                                                                </div>

                                                            </div>
                                                            <div className="submit text-center">
                                                                <button className="btn btn-success" type="submit">
                                                                    <i className="now-ui-icons ui-1_check"></i> <b>Enregistrer</b>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="col-lg-8 col-md-12 mx-auto">

                                            <ul class="nav nav-tabs nav-tabs-neutral justify-content-center" role="tablist" data-background-color={this.props.backgroundColor}>
                                                <li class="nav-item">
                                                    <NavLink to={`/profile/account/`} className="nav-link">
                                                        <i className="now-ui-icons users_circle-08"></i> Profile
                                                    </NavLink>
                                                </li>
                                                <li class="nav-item">
                                                    <NavLink to={`/profile/change_password/`} className="nav-link">
                                                        <i className="now-ui-icons ui-1_lock-circle-open"></i> Changer le mot de passe
                                                    </NavLink>
                                                </li>
                                            </ul>
                                            <br />


                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <b>Contact de votre agence</b>
                                                    </div>
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <NavLink to={`/profile/account/`}>
                                                                <img src={this.state.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                            </NavLink>
                                                            <div className="mx-3">
                                                                <NavLink to={`/profile/account/`} className="text-dark font-weight-600 text-sm"><b>{this.state.first_name}</b>
                                                                    <small className="d-block text-muted"><b>{this.state.last_name} {moment($userIvemo.created_at).format('DD/MM/YYYY')}</b></small>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"></i>
                                                            </Button>
                                                            {this.state.url_site !== null && (
                                                                <a href={this.state.url_site} className="btn btn-sm btn-primary" target="_banck">
                                                                    <i className="now-ui-icons objects_globe"></i>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="card-title">
                                                        {this.state.address !== null && (
                                                            <><i className="now-ui-icons location_pin"></i> <b>{this.state.address}</b></>
                                                        )}
                                                        <br />
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6 col-6">
                                                                    <a href="https://www.kazoutech.com" title="Profil agence">
                                                                        <small><b>Consulter le profil de votre agence</b></small>
                                                                    </a>
                                                                </div>
                                                                {this.state.url_site !== null && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={this.state.url_site} title="Site internet de agence" target="_banck">
                                                                            <small><b>Consulter votre site</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTypebien">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTypebien" aria-expanded="true" aria-controls="collapseTypebien">
                                                                    <b>Address et contact </b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTypebien" className="collapse show" role="tabpanel" aria-labelledby="headingTypebien">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                                <div className="row">
                                                                                    <div className="col-md-7 col-7">
                                                                                        <label htmlFor="address"><b>Addres</b></label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                                            </div>
                                                                                            <input id='address'
                                                                                                type='text'
                                                                                                className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`}
                                                                                                name='address'
                                                                                                placeholder="Ou est citué votre agence"
                                                                                                aria-label="Address"
                                                                                                autoComplete="address"
                                                                                                value={this.state.address || ''}
                                                                                                onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('address')}
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-5 col-5">
                                                                                        <label htmlFor="title"><b>Numero telephone</b></label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                                                                                            </div>
                                                                                            <input id='phone'
                                                                                                type='text'
                                                                                                className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                                                                                name='phone'
                                                                                                placeholder="+237 77688066"
                                                                                                aria-label="Phone"
                                                                                                autoComplete="phone"
                                                                                                value={this.state.phone || ''}
                                                                                                onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('phone')}
                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col-md-6 col-6">
                                                                                        <label htmlFor="url_site"><b>Site internet</b></label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text"><i className="now-ui-icons objects_globe"></i></span>
                                                                                            </div>
                                                                                            <input id='url_site'
                                                                                                type='text'
                                                                                                className={`form-control ${this.hasErrorFor('url_site') ? 'is-invalid' : ''}`}
                                                                                                name='url_site'
                                                                                                placeholder="https://www.kazoutech.com"
                                                                                                aria-label="https://www.kazoutech.com"
                                                                                                autoComplete="url_site"
                                                                                                value={this.state.url_site || ''}
                                                                                                onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('url_site')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6 col-6">

                                                                                        <label htmlFor="url_site"><b>Email </b></label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                                                                                            </div>
                                                                                            <input id='email'
                                                                                                type='email'
                                                                                                className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                                                name='email'
                                                                                                placeholder="email@gmail.com"
                                                                                                aria-label="email@gmail.com"
                                                                                                autoComplete="email"
                                                                                                value={this.state.email || ''}
                                                                                                onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('email')}
                                                                                        </div>
                                                                                    </div>

                                                                                </div>




                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingDescription">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseDescription" aria-expanded="true" aria-controls="collapseDescription">
                                                                    <b>Description sur vous ou sur votre agence </b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseDescription" className="collapse show" role="tabpanel" aria-labelledby="headingDescription">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                                <div className="form-group">
                                                                                    <textarea name="description" value={this.state.description || ''}
                                                                                        onChange={this.handleFieldChange}
                                                                                        placeholder={'Ex: Crée depuis 2020 nous evrons dans l\'esposion et l\'echange'}
                                                                                        className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                                        id="description"
                                                                                        rows="10" />
                                                                                    {this.renderErrorFor('description')}
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="submit text-center">
                                                        <button className="btn btn-success" type="submit">
                                                            <i className="now-ui-icons ui-1_check"></i> <b>Enregistrer</b>
                                                        </button>
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
ProfileAccountUser.defaultProps = {
    backgroundColor: "black",
};

ProfileAccountUser.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default ProfileAccountUser;
