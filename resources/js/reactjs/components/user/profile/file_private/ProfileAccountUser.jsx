import React, { Component} from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, CardBody, Row, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import Swal from "sweetalert2";


class ProfileAccountUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            sex: '',
            color_name: '',
            slug: '',
            avatar: '',
            avatarcover: '',
            status_profile: '',
            email: '',
            phone: '',
            categoryprofile_id: '',
            categoryprofiles: [],
            errors: [],
            showDefaultImage: false,
            showDefaultavatarcoverImage: false,
        };
        this.saveItem = this.saveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateavatarImage = this.updateavatarImage.bind(this);
        this.updateavatacoverImage = this.updateavatacoverImage.bind(this);
        this.removeavatarImage = this.removeavatarImage.bind(this);
        this.removeavatarcoverImage = this.removeavatarcoverImage.bind(this);
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
    updateavatarImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({ file: file, avatar: reader.result, showDefaultImage: false });
            document.querySelector('.kazouImageCarousel-file-upload').classList.remove('is-invalid');
        };
        reader.readAsDataURL(file)
    }

    // Handle Upload Image
    updateavatacoverImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({ file: file, avatarcover: reader.result, showDefaultImage: false });
            document.querySelector('.kazouImageCarousel-file-upload').classList.remove('is-invalid');
        };
        reader.readAsDataURL(file)
    }

    removeavatarImage(e) {
        e.preventDefault();
        this.setState({ file: '', avatar: '', showDefaultImage: true });
        document.querySelector('.kazouImageCarousel-file-upload').classList.add('is-invalid');
    }

    removeavatarcoverImage(e) {
        e.preventDefault();
        this.setState({ file: '', avatarcover: '', showDefaultavatarcoverImage: true });
        document.querySelector('.kazouImageCarousel-file-upload').classList.add('is-invalid');
    }

    saveItem(e) {
        e.preventDefault();

        let item = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            status_profile: this.state.status_profile,
            sex: this.state.sex,
            color_name: this.state.color_name,
            slug: this.state.slug,
            avatar: this.state.avatar,
            avatarcover: this.state.avatarcover,
            categoryprofile_id: this.state.categoryprofile_id,
            email: this.state.email,
            phone: this.state.phone,
        };
        dyaxios.put(route('profile_add_info_account_update.site'), item)
            .then(() => {

                $.notify({
                        message: 'Votre profile a été mise à jour avec succès'
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
                setTimeout(() => {
                    window.location.reload(true);
                }, 3000);
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression de mon profile?',
            text: "êtes-vous sûr de vouloir executer cette action",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                const url = route('profile_add_info_account_delete.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    window.location.reload(true)
                })
            }
        });
    }

    loadItem() {
        dyaxios.get(route('api.categoryprofiles')).then(response => this.setState({ categoryprofiles: response.data, }));
        dyaxios.get(route('api_profile_account.site')).then(response =>
            this.setState({
                id: response.data.id,
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                status_profile: response.data.status_profile,
                sex: response.data.sex,
                slug: response.data.slug,
                color_name: response.data.color_name,
                avatar: response.data.avatar,
                avatarcover: response.data.avatarcover,
                categoryprofile_id: response.data.categoryprofile_id,
                email: response.data.email,
                phone: response.data.phone,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const { categoryprofiles,avatar,avatarcover} = this.state;
        return (

            <>
                <Helmet>
                    <title> {`${$userIvemo.first_name || "Profile"}`} - {$name_site}</title>
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
                                                <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <NavLink to={`/pro/${$userIvemo.slug}/`}>
                                                                <img src={$userIvemo.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                            </NavLink>
                                                            <div className="mx-3">
                                                                <NavLink to={`/pro/${$userIvemo.slug}/`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted">{moment($userIvemo.created_at).format('LL')}</small>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr/>
                                                    <Row>
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="first_name"><b>Nom</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
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
                                                                       maxLength="250"
                                                                       value={this.state.first_name || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('first_name')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="last_name"><b>Prénom</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
                                                                    </span>
                                                                </div>
                                                                <input id='last_name'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                       name='last_name'
                                                                       placeholder="Prenom "
                                                                       aria-label="last_name"
                                                                       autoComplete="last_name"
                                                                       maxLength="250"
                                                                       value={this.state.last_name || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('last_name')}
                                                            </div>
                                                        </div>
                                                    </Row>

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
                                                                       maxLength="100" minLength="2"
                                                                       value={this.state.username || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('username')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-6">
                                                            <label htmlFor="title"><b>Pseudo profile</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons text_caps-small"/>
                                                                    </span>
                                                                </div>
                                                                <input id='slug'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('slug') ? 'is-invalid' : ''}`}
                                                                       name='slug'
                                                                       placeholder="@mypseudo_profile"
                                                                       aria-label="slug"
                                                                       autoComplete="slug"
                                                                       required={'required'}
                                                                       maxLength="250"
                                                                       value={this.state.slug || ''}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('slug')}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <Row>
                                                        <div className="col-md-6">
                                                            <div className="text-center">
                                                                <img src={this.state.showDefaultImage ? `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg` : avatar || `${$url_site}/assets/vendor/assets/img/placeholder.jpg`} alt={'avatar'} />
                                                                <input id="avatar" type="file" onChange={this.updateavatarImage} className={`form-control ${this.hasErrorFor('avatar') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="avatar" />
                                                                {this.renderErrorFor('avatar')}
                                                                <div className="text-center">
                                                                    <label htmlFor="avatar" className="btn btn-primary">
                                                                        <span className="btn-inner--text">Modifier le profile</span>
                                                                    </label>
                                                                    <label hidden={this.state.showDefaultImage ? true : false} onClick={this.removeavatarImage} className="btn btn-danger">
                                                                        <span className="btn-inner--text">Enlever</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">

                                                            <div className="text-center">
                                                                <img src={this.state.showDefaultavatarcoverImage ? `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg` : avatarcover || `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg`} alt={'avatarcover'} />
                                                                <input id="avatarcover" type="file" onChange={this.updateavatacoverImage} className={`form-control ${this.hasErrorFor('avatarcover') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="avatarcover" />
                                                                {this.renderErrorFor('avatarcover')}
                                                                <div className="text-center">
                                                                    <label htmlFor="avatarcover" className="btn btn-primary">
                                                                        <span className="btn-inner--text">Modifier la couverture</span>
                                                                    </label>
                                                                    <label hidden={this.state.showDefaultavatarcoverImage ? true : false} onClick={this.removeavatarcoverImage} className="btn btn-danger">
                                                                        <span className="btn-inner--text">Enlever</span>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </Row>


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
                                                                       maxLength="100" minLength="2"
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
                                                                        <i className="now-ui-icons tech_mobile"/>
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
                                                        <div className="col-md-4">
                                                            <label htmlFor="address"><b>Votre status</b></label>
                                                            <div className="form-group">

                                                                <select value={this.state.status_profile || ''} className={`form-control ${this.hasErrorFor('status_profile') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="status_profile" required="required">
                                                                    <option value="0"> Particulier</option>
                                                                    <option value="1"> Professionnel</option>
                                                                </select>

                                                                {this.renderErrorFor('status_profile')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label htmlFor="phone"><b>Pourquoi êtes-vous sur Ivemo ?</b></label>
                                                            <div className="form-group">

                                                                <select value={this.state.categoryprofile_id || ''} className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="categoryprofile_id" required="required">
                                                                    <option value="" disabled>Pourquoi êtes-vous sur Ivemo</option>
                                                                    {categoryprofiles.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>

                                                                {this.renderErrorFor('categoryprofile_id')}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label htmlFor="address"><b>Sex</b></label>
                                                            <div className="form-group">

                                                                <select value={this.state.sex || ''} className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="sex" required="required">
                                                                    <option value="female"> Mme</option>
                                                                    <option value="male"> Mr</option>
                                                                </select>

                                                                {this.renderErrorFor('sex')}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="submit text-center">
                                                        <button className="btn btn-primary" type="submit">
                                                            <b>Enregistrer</b>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                            <Button onClick={() => this.deleteItem(this.state.id)} className="btn btn-outline-danger pull-right"  id="TooltipDelete">
                                                <i className="far fa-trash-alt"/> Supprimer le profile
                                            </Button>{" "}
                                            <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                Supprimer mon profile
                                            </UncontrolledTooltip>
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
