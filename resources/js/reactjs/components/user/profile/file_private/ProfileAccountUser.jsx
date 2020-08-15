import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
import { Button, Row, UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import NavProfileAccountPrivate from "./NavProfileAccountPrivate";
import Swal from "sweetalert2";
import HeaderProfileAccountPrivate from "./HeaderProfileAccountPrivate";
import FieldInput from "../../../inc/vendor/FieldInput";

class ProfileAccountUser extends PureComponent {
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
            showDefaultAvatarCoverImage: false,
        };
        this.saveItem = this.saveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateAvatarImage = this.updateAvatarImage.bind(this);
        this.updateAvatarCoverImage = this.updateAvatarCoverImage.bind(this);
        this.removeAvatarImage = this.removeAvatarImage.bind(this);
        this.removeAvatarCoverImage = this.removeAvatarCoverImage.bind(this);
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
    updateAvatarImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({file: file, avatar: reader.result, showDefaultImage: true});
            //document.querySelector('.kazouImageCarousel-file-upload').classList.remove('is-invalid');
        };
        reader.readAsDataURL(file)
    }

    // Handle Upload Image
    updateAvatarCoverImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (file) => {
            this.setState({file: file, avatarcover: reader.result, showDefaultAvatarCoverImage: true});
            //document.querySelector('.kazouImageCarousel-file-upload').classList.remove('is-invalid');
        };
        reader.readAsDataURL(file)
    }

    removeAvatarImage(e) {
        e.preventDefault();
        this.setState({file: '', avatar: '', showDefaultImage: false});
        //document.querySelector('.kazouImageCarousel-file-upload').classList.add('is-invalid');
    }

    removeAvatarCoverImage(e) {
        e.preventDefault();
        this.setState({file: '', avatarcover: '', showDefaultAvatarCoverImage: false});
        //document.querySelector('.kazouImageCarousel-file-upload').classList.add('is-invalid');
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
                        message: 'Votre profil a été mis à jour avec succès.'
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
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
            title: 'Confirmer la supression de mon profil?',
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
        dyaxios.get(route('api.categoryprofiles')).then(response => this.setState({categoryprofiles: response.data,}));
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

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItem();
    }

    render() {
        const {categoryprofiles, avatar, avatarcover, showDefaultImage, showDefaultAvatarCoverImage} = this.state;
        return (
            <>
                <Helmet>
                    <title> {`${$userIvemo.first_name || "Profile"}`} - {$name_site}</title>
                </Helmet>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite/>
                    </nav>
                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br/>
                                <form role="form" id="contact-form" onSubmit={this.saveItem} acceptCharset="UTF-8">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mx-auto">
                                            <NavProfileAccountPrivate/>
                                        </div>
                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">
                                                <div className="card-body">
                                                    <HeaderProfileAccountPrivate />
                                                    <hr/>
                                                    <Row className="my-2">
                                                        <div className="col-md-2">
                                                            <label htmlFor="address"><b>Sex</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.sex || ''}
                                                                        className={`form-control ${this.hasErrorFor('sex') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange} name="sex"
                                                                        required="required">
                                                                    <option value="female"> Mme</option>
                                                                    <option value="male"> Mr</option>
                                                                </select>
                                                                {this.renderErrorFor('sex')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5 col-5">
                                                            <label htmlFor="first_name"><b>Nom</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
                                                                    </span>
                                                                </div>

                                                                <FieldInput name="first_name" type='text' minLength="2" maxLength="200"
                                                                            required="required"
                                                                            placeholder="Non de l'agence ou celle personnelle"
                                                                            value={this.state.first_name || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5 col-5">
                                                            <label htmlFor="last_name"><b>Prénom</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
                                                                    </span>
                                                                </div>


                                                                <FieldInput name="last_name" type='text' minLength="2" maxLength="200"
                                                                            placeholder="Prenom"
                                                                            value={this.state.last_name || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row className="my-2">
                                                        <div className="col-md-6 mx-auto">
                                                            <label htmlFor="address"><b>Pseudo</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons users_circle-08"/>
                                                                    </span>
                                                                </div>


                                                                <FieldInput name="username" type='text' minLength="2" maxLength="200"
                                                                            required="required"
                                                                            placeholder="Ajouter un pseudo"
                                                                            value={this.state.username || ""}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mx-auto">
                                                            <label htmlFor="title"><b>Pseudo profil</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons text_caps-small"/>
                                                                    </span>
                                                                </div>

                                                                <FieldInput name="slug" type='text' minLength="2" maxLength="200"
                                                                            placeholder="mypseudo_profile"
                                                                            value={this.state.slug || ""}
                                                                            required="required"
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>

                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row className="my-2">
                                                        <div className="col-md-6">
                                                            <label htmlFor="address"><b>Votre status</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.status_profile || ''}
                                                                        className={`form-control ${this.hasErrorFor('status_profile') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}
                                                                        name="status_profile" required="required">
                                                                    <option value="0"> Particulier</option>
                                                                    <option value="1"> Professionnel</option>
                                                                </select>
                                                                {this.renderErrorFor('status_profile')}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="phone"><b>Pourquoi êtes-vous sur Ivemo ?</b></label>
                                                            <div className="form-group">
                                                                <select value={this.state.categoryprofile_id || ''}
                                                                        className={`form-control ${this.hasErrorFor('categoryprofile_id') ? 'is-invalid' : ''}`}
                                                                        onChange={this.handleFieldChange}
                                                                        name="categoryprofile_id" required="required">
                                                                    <option value="" disabled>Pourquoi êtes-vous sur Ivemo</option>
                                                                    {categoryprofiles.map((item) => (
                                                                        <option key={item.id}
                                                                                value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryprofile_id')}
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Row className="my-2">
                                                        <div className="col-md-6 mx-auto">
                                                            <label htmlFor="address"><b>Email</b></label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons ui-1_email-85"/>
                                                                    </span>
                                                                </div>

                                                                <FieldInput name="email" type='email' minLength="2" maxLength="200"
                                                                            placeholder="Email de l'agence"
                                                                            value={this.state.email || ""}
                                                                            required="required"
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            renderErrorFor={this.renderErrorFor}/>
                                                            </div>
                                                        </div>
                                                        {this.state.status_profile && (

                                                            <div className="col-md-6 mx-auto">
                                                                <label htmlFor="phone"><b>Téléphone</b></label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="now-ui-icons tech_mobile"/>
                                                                    </span>
                                                                    </div>

                                                                    <FieldInput name="phone" type='number' minLength="2" maxLength="30"
                                                                                placeholder="Teléphone"
                                                                                value={this.state.phone || ""}
                                                                        //required="required"
                                                                                handleFieldChange={this.handleFieldChange}
                                                                                hasErrorFor={this.hasErrorFor}
                                                                                renderErrorFor={this.renderErrorFor}/>
                                                                </div>
                                                            </div>
                                                        )}

                                                    </Row>
                                                    <hr/>
                                                    <Row className="my-4">
                                                        <div className="col-md-6">
                                                            <div className="text-center">
                                                                <label className="d-block mb-4"><b>Ma Photo de Profil</b></label>
                                                                <img className="ivemoAvatar"
                                                                    // src={showDefaultImage ? `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg` : avatar || `${$url_site}/assets/vendor/assets/img/placeholder.jpg`}
                                                                    src={avatar === '' ? `${$userIvemo.avatar}` : avatar || `https://dummyimage.com/wsvga/0077ee/009900&text=qui`}
                                                                    alt={'avatar'}/>
                                                                <input id="avatar" type="file"
                                                                       onChange={this.updateAvatarImage}
                                                                       className={`form-control ${this.hasErrorFor('avatar') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`}
                                                                       name="avatar"/>
                                                                {this.renderErrorFor('avatar')}
                                                                <div className="text-center mt-4">
                                                                    <label htmlFor="avatar" className="btn btn-primary btn-sm">
                                                                        <span className="btn-inner--text"><i className="now-ui-icons media-1_album "/> Choisir une image</span>
                                                                    </label>
                                                                    <label
                                                                        hidden={!showDefaultImage}
                                                                        onClick={this.removeAvatarImage}
                                                                        className="btn btn-danger btn-sm">
                                                                        <span className="btn-inner--text"><i className="now-ui-icons ui-1_simple-remove "/> Effacer</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="text-center">
                                                                <label className="mb-4"><b>Ma Photo de Couverture</b></label>
                                                                <img className="fileinput-new thumbnail img-raised"
                                                                    //src={showDefaultAvatarCoverImage ? `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg` : avatarcover || `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg`}
                                                                     src={avatarcover === '' ? `${$userIvemo.avatarcover}` : avatarcover || `https://dummyimage.com/wsvga/0077ee/009900&text=qui`}
                                                                     alt={'avatarcover'}/>
                                                                <input id="avatarcover" type="file"
                                                                       onChange={this.updateAvatarCoverImage}
                                                                       className={`form-control ${this.hasErrorFor('avatarcover') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`}
                                                                       name="avatarcover"/>
                                                                {this.renderErrorFor('avatarcover')}
                                                                <div className="text-center mt-4">
                                                                    <label htmlFor="avatarcover"
                                                                           className="btn btn-primary btn-sm">
                                                                        <span className="btn-inner--text"><i className="now-ui-icons media-1_album "/> Choisir une image</span>
                                                                    </label>
                                                                    <label
                                                                        hidden={!showDefaultAvatarCoverImage}
                                                                        onClick={this.removeAvatarCoverImage}
                                                                        className="btn btn-danger btn-sm">
                                                                        <span className="btn-inner--text"><i className="now-ui-icons ui-1_simple-remove "/> Effacer</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <hr/>
                                                    <div className="submit text-center">
                                                        <button type="submit" className="btn btn-primary">
                                                            <b><i className="now-ui-icons ui-1_check "/> Enregistrer</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <nav className="navbar navbar-expand-lg bg-danger">
                                                <div className="container">
                                                    <div className="navbar-translate">
                                                        <div className="row">
                                                            <div className="col-md-8 my-2">
                                                                <span className="text-white">Une fois que vous supprimez votre profil, il n'y a plus de retour en arrière. Soyez certain.</span>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <Button onClick={() => this.deleteItem(this.state.id)}
                                                                        className="btn pull-right" id="TooltipDelete">
                                                                    <i className="far fa-trash-alt"/> Supprimer Mon Profil ?
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </nav>

                                            <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                Supprimer Mon Profil
                                            </UncontrolledTooltip>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <FooterBigUserSite/>
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
