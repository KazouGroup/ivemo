import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, CardBody, Row} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";


class ProfileAccountUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            sex: '',
            color_name: '',
            avatar: '',
            avatarcover: '',
            email: '',
            phone: '',
            categoryprofiles: [],
            errors: [],
            showDefaultImage: false,
        };
        this.saveItem = this.saveItem.bind(this);
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

    saveItem(e) {
        e.preventDefault();

        let item = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            sex: this.state.sex,
            color_name: this.state.color_name,
            avatar: this.state.avatar,
            avatarcover: this.state.avatarcover,
            email: this.state.email,
            phone: this.state.phone,
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
        dyaxios.get(route('api.categoryprofiles')).then(response => this.setState({ categoryprofiles: response.data, }));
        dyaxios.get(route('api_profile_account.site')).then(response =>
            this.setState({
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                sex: response.data.sex,
                color_name: response.data.color_name,
                avatar: response.data.avatar,
                avatarcover: response.data.avatarcover,
                email: response.data.email,
                phone: response.data.phone,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const { categoryprofiles,avatar } = this.state;
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

                                <form role="form" id="contact-form" onSubmit={this.saveItem} acceptCharset="UTF-8">

                                    <div className="row">

                                        <div className="col-lg-4 col-md-12 mx-auto">


                                            <NavProfileAccountPrivate />

                                        </div>


                                        <div className="col-lg-8 col-md-12 mx-auto">

                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="row">
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="address"><b>Pseudo</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
                                                                    </span>
                                                                </div>
                                                                <input id='username'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
                                                                       name='username'
                                                                       placeholder="Ajouter un pseudo"
                                                                       aria-label="Address"
                                                                       autoComplete="username"
                                                                       required={'required'}
                                                                       value={this.state.username || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('username')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="title"><b>Nom</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons user-profile"/>
                                                                    </span>
                                                                </div>
                                                                <input id='first_name'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                                                                       name='first_name'
                                                                       placeholder="Non de l'agence ou celle personnelle"
                                                                       aria-label="first_name"
                                                                       autoComplete="first_name"
                                                                       required={'required'}
                                                                       value={this.state.first_name || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('first_name')}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {/*

                                                    <Row>
                                                        <div className="col-md-8">
                                                            <div className="profile text-center">
                                                                <label><b>Couverture</b></label>
                                                                <img src={this.state.showDefaultImage ? "https://www.kazoucoin.com/assets/img/photo.jpg" : avatar} alt={$userIvemo.first_name}/>
                                                                <input id="avatar" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('avatar') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="avatar"/>
                                                                {this.renderErrorFor('avatar')}
                                                                <label htmlFor="avatar" className="btn btn-primary">
                                                                    <span className="btn-inner--text">Ajouter l'image</span>
                                                                </label>
                                                                <button hidden={this.state.showDefaultImage ? true : false} onClick={this.removeImage} className="btn btn-danger">
                                                                    <span className="btn-inner--text">Remove</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="profile text-center">
                                                                <label><b>Avavtar</b></label>
                                                                <img src={this.state.showDefaultImage ? "https://www.kazoucoin.com/assets/img/photo.jpg" : avatar} alt={$userIvemo.first_name}/>
                                                                <input id="avatar" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('avatar') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="avatar"/>
                                                                {this.renderErrorFor('avatar')}
                                                                <label htmlFor="avatar" className="btn btn-primary">
                                                                    <span className="btn-inner--text">Ajouter l'image</span>
                                                                </label>
                                                                <button hidden={this.state.showDefaultImage ? true : false} onClick={this.removeImage} className="btn btn-danger">
                                                                    <span className="btn-inner--text">Remove</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    */}

                                                    <div className="row">
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="address"><b>Email</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons ui-1_email-85"/>
                                                                    </span>
                                                                </div>
                                                                <input id='email'
                                                                       type='email'
                                                                       className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                       name='email'
                                                                       placeholder="Email de l'agence "
                                                                       aria-label="email"
                                                                       autoComplete="email"
                                                                       required={'required'}
                                                                       value={this.state.email || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('email')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="phone"><b>Teléphone</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons user-profile"/>
                                                                    </span>
                                                                </div>
                                                                <input id='phone'
                                                                       type='number'
                                                                       className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                                                       name='phone'
                                                                       placeholder="Teléphone"
                                                                       aria-label="phone"
                                                                       autoComplete="phone"
                                                                       required={'required'}
                                                                       value={this.state.phone || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('phone')}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="address"><b>Sex</b></label>
                                                            <div className="form-group">

                                                                <select value={this.state.sex} className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="sex" required="required">
                                                                    <option value="female"> Mme</option>
                                                                    <option value="male"> M</option>
                                                                </select>

                                                                {this.renderErrorFor('sex')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="phone"><b>Pourquoi êtes-vous sur Ivemo ?</b></label>
                                                            <div className="form-group">

                                                                <select value={this.state.sex} className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="sex" required="required">
                                                                    <option value="" disabled>Pourquoi êtes-vous sur Ivemo</option>
                                                                    {categoryprofiles.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>

                                                                {this.renderErrorFor('sex')}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="submit text-center">
                                                        <button className="btn btn-primary btn-round" type="submit">
                                                            <i className="now-ui-icons ui-1_check"/>
                                                            <b>Enregistrer</b>
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
