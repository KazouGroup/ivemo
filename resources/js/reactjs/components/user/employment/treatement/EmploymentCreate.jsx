import React, { Component } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    InputGroup,
    Row,
    CardBody,
    Col,
    CardTitle,
    FormGroup,
    UncontrolledTooltip
} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import moment from "moment";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import Navlinknewemployment from "./Navlinknewemployment";
import Navemploymentsbyuser from "../inc/Navemploymentsbyuser";
import HelmetSite from "../../../inc/user/HelmetSite";
import FieldInput from "../../../inc/vendor/FieldInput";
import Skeleton from "react-loading-skeleton";


class EmploymentCreate extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);

        this.state = {
            id: '',
            title: '',
            photo: '',
            price: '',
            status: '',
            district: '',
            description: '',
            link_contact: '',
            city_id: '',
            categoryemployment_id: '',
            status_link_contact: true,
            showDefaultImage: true,
            errors: [],
            cities: [],
            categoryemployments: [],
        };
        this.modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                [{ 'color': [] }, { 'background': [] }],
            ]
        };
        this.formats = [
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'link',
            'color', 'background'
        ];

    }

    // Handle Change
    handleChangeBody(value) {
        this.setState({ description: value });
        document.querySelector('.editor-control').classList.remove('is-invalid');
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

    handleCheckClick(event){
        this.setState({
            status_link_contact: !this.state.status_link_contact
        });
    };

    updateImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file['size'] < 6000775){
            reader.onloadend = (file) => {
                this.setState({ file: file, photo: reader.result, showDefaultImage: false });
            };
            reader.readAsDataURL(file);
        }else{
            $.notify({
                //,
                message: 'La fichier ne peut pas être supérieure à 15 MB'
            },
                {
                    allow_dismiss: false,
                    type: 'danger',
                    placement: {
                        from: 'top',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInDownBig",
                        exit: "animate__animated animate__fadeOutUp"
                    },
                });
        }
    }
    removeImage(e) {
        e.preventDefault();
        this.setState({ file: '', photo: '', showDefaultImage: true });
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
            title: this.state.title,
            photo: this.state.photo,
            district: this.state.district,
            price: this.state.price,
            city_id: this.state.city_id,
            description: this.state.description,
            link_contact: this.state.link_contact,
            status_link_contact: this.state.status_link_contact,
            categoryemployment_id: this.state.categoryemployment_id,
        };
        dyaxios.post(route('employmentstore_site'), item)
            .then(() => {
                $.notify({
                    //,
                    message: 'Votre offre a bien été sauvegardé'
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
                this.props.history.push(`/employments/`);
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
   // Lifecycle Component Method
    componentDidMount() {
        fetch(route('api.categoryemployment_site')).then(res => res.json()).then((result) => { this.setState({ categoryemployments: result }) });
        fetch(route('api.all_cities')).then(res => res.json()).then((result) => { this.setState({ cities: result }) });
    }

    render() {
        const { photo, categoryemployments,cities } = this.state;
        return (
            <>
                <HelmetSite title={`${this.state.title || 'Annonce'} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>
                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br />

                                <form role="form" onSubmit={this.saveItem} acceptCharset="UTF-8">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mx-auto">

                                            <Navlinknewemployment/>

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                <Navemploymentsbyuser/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="submit text-left">
                                                <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos offres </b>
                                                </button>
                                            </div>
                                            {!$guest &&(
                                                <>
                                                    {!$userIvemo.email_verified_at &&(
                                                        <LinkValicationEmail/>
                                                    )}
                                                </>
                                            )}
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <b>{this.state.title}</b>
                                                    </div>

                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            {$userIvemo.avatar ?
                                                                <NavLink to={`/pro/${$userIvemo.slug}`}>
                                                                    <img src={$userIvemo.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                </NavLink>
                                                                :<Skeleton circle={false} height={40} width={80} />}
                                                            <div className="mx-3">
                                                                <NavLink to={`/pro/${$userIvemo.slug}`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted"><b>{moment($userIvemo.created_at).format('LL')}</b></small>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <CardBody>

                                                        <Row>
                                                            <div className="col-md-12">
                                                                <label className="labels">
                                                                    Donner un titre à cet annonce
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <InputGroup>
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"/></span>
                                                                    </div>
                                                                    <FieldInput name="title" type='text' minLength="4" maxLength="200" placeholder="Titre de l'article" value={this.state.title || ""}
                                                                                handleFieldChange={this.handleFieldChange}
                                                                                hasErrorFor={this.hasErrorFor}
                                                                                renderErrorFor={this.renderErrorFor}/>
                                                                </InputGroup>
                                                            </div>
                                                        </Row>

                                                        <Row>
                                                            <div className="col-md-6">
                                                                <label className="labels">
                                                                    Quel est le montant de votre annonce
                                                                </label>
                                                                <InputGroup>
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons business_money-coins"/></span>
                                                                    </div>
                                                                    <FieldInput name="price" type='number' minLength="4" maxLength="13" placeholder="Montant de votre annonce" value={this.state.price || ""}
                                                                                handleFieldChange={this.handleFieldChange}
                                                                                hasErrorFor={this.hasErrorFor}
                                                                                renderErrorFor={this.renderErrorFor}/>
                                                                </InputGroup>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="labels">
                                                                    Quartier ou lieu?
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <InputGroup>
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"/></span>
                                                                    </div>
                                                                    <FieldInput name="district" type='text' minLength="4" maxLength="13" placeholder="Quartier ou lieu" value={this.state.district || ""}
                                                                                handleFieldChange={this.handleFieldChange}
                                                                                hasErrorFor={this.hasErrorFor}
                                                                                renderErrorFor={this.renderErrorFor}/>

                                                                </InputGroup>
                                                            </div>
                                                        </Row>

                                                        <Row>
                                                            <div className="col-md-6">
                                                                <label className="labels">
                                                                    Selectionez la ville
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <FormGroup>
                                                                    <select name={'city_id'} value={this.state.city_id || ""}
                                                                            className={`form-control ${this.hasErrorFor('city_id') ? 'is-invalid' : ''}`}
                                                                            id="city_id" onChange={this.handleFieldChange}>
                                                                        <option value="" disabled>Selectioner une ville</option>
                                                                        {cities.map((item) => (
                                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {this.renderErrorFor('city_id')}
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="labels">
                                                                    Selectionez la categorie
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <FormGroup>
                                                                    <select name={'categoryemployment_id'} value={this.state.categoryemployment_id || ""}
                                                                            className={`form-control ${this.hasErrorFor('categoryemployment_id') ? 'is-invalid' : ''}`}
                                                                            id="categoryemployment_id" onChange={this.handleFieldChange}>
                                                                        <option value="" disabled>Selectioner une category</option>
                                                                        {categoryemployments.map((item) => (
                                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {this.renderErrorFor('categoryemployment_id')}
                                                                </FormGroup>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <div className="col-md-6 mx-auto">
                                                                <div className="text-center">
                                                                    <img src={this.state.showDefaultImage ? `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg` : photo} alt={'name'} />
                                                                    <input id="photo" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="photo" accept="image/*" />
                                                                    {this.renderErrorFor('photo')}
                                                                    <div className="text-center">
                                                                        <label htmlFor="photo" className="btn btn-primary">
                                                                            <span className="btn-inner--text">Ajouter l'image</span>
                                                                        </label>
                                                                        <label hidden={this.state.showDefaultImage ? true : false} onClick={this.removeImage} className="btn btn-danger">
                                                                            <span className="btn-inner--text">Remove</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <div className="col-md-12">
                                                                <FormGroup>
                                                                    <label className="labels">
                                                                        Décrivez votre annonce
                                                                        <span className="text-danger">*</span>
                                                                    </label>
                                                                    <br />
                                                                    <ReactQuill theme="snow" modules={this.modules}
                                                                                formats={this.formats}
                                                                                placeholder="Laisser votre description..."
                                                                                className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                                value={this.state.description || ''}
                                                                                onChange={this.handleChangeBody} />
                                                                    {this.renderErrorFor('description')}
                                                                    <label className="labels">
                                                                        Les champs avec <span className="text-danger">*</span> sont obligatoires
                                                                    </label>
                                                                </FormGroup>
                                                            </div>
                                                        </Row>

                                                        <Row>
                                                            <div className="col-md-12">
                                                                <div className="form-check text-left">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" id="status_link_contact" type="checkbox"  checked={this.state.status_link_contact}
                                                                               onChange={this.handleCheckClick} value={this.state.status_link_contact} name="status_link_contact" />
                                                                        <span className="form-check-sign"></span>
                                                                        {!this.state.status_link_contact ?
                                                                            <span><b>Cliquer ici</b> si vous <b>voulez</b> être contacté depuis <b>{$name_site}</b> !</span>
                                                                            :
                                                                            <span><b>Cliquer ici</b> si vous <b>ne voulez pas</b> être contacté depuis <b>{$name_site}</b> !</span>
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </Row>
                                                        {!this.state.status_link_contact && (
                                                            <>
                                                                <br/>
                                                                <Row>
                                                                    <div className="col-md-12">
                                                                        <label className="labels">
                                                                            Lien de votre site internet
                                                                            <span className="text-danger">*</span>
                                                                        </label>
                                                                        <InputGroup>
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text"><i className="now-ui-icons objects_globe"/></span>
                                                                            </div>

                                                                            <FieldInput name="link_contact" type='text' minLength="3" placeholder="http://monsiteinternet.com" value={this.state.link_contact || ""}
                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </>
                                                        )}

                                                    </CardBody>

                                                    <div className="submit text-center">
                                                        <button className="btn btn-primary" type="submit">
                                                            <b>Sauvegarder votre offre</b>
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

export default withRouter(EmploymentCreate);
