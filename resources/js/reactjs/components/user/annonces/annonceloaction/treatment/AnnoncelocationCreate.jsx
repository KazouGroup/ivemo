import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, FormGroup, Input} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import moment from "moment";


class AnnoncelocationCreate extends Component {
    constructor(props) {
        super(props);


        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

        this.state = {
            id: '',
            status: '',
            title: '',
            surface: '',
            price: '',
            pieces: '',
            district: '',
            rooms: '',
            description: '',
            city_id: '',
            categoryannoncelocation_id: '',
            errors: [],
            cities: [],
            categoryannoncelocations: [],
        };
        this.modules = {
            toolbar: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
            ]
        };
        this.formats = [
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];


    }

    // Handle Change
    handleChangeBody(value) {
     this.setState({ description: value });
     document.querySelector('editor-control').classList.remove('is-invalid');

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
            title: this.state.title,
            description: this.state.description,
            district: this.state.district,
            surface: this.state.surface,
            rooms: this.state.rooms,
            pieces: this.state.pieces,
            price: this.state.price,
            city_id: this.state.city_id,
            categoryannoncelocation_id: this.state.categoryannoncelocation_id,
        };
        let itemannoncetype = this.props.match.params.annoncetype;
        dyaxios.post(route('annoncelocationsstore_site', [itemannoncetype]), item)
            .then(() => {

                $.notify({
                        //,
                        message: 'Votre annonce a bien été enregistrée'
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
                this.props.history.goBack();
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
        fetch(route('api.categoryannoncelocation_site')).then(res => res.json()).then((result) => { this.setState({ categoryannoncelocations: result }) });
        fetch(route('api.all_cities')).then(res => res.json()).then((result) => { this.setState({ cities: result }) })
    }

    numberWithCommas() {
        return this.state.price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    }

    render() {
        const {categoryannoncelocations,cities} = this.state;
        return (
            <Fragment>
                <Helmet title={`${this.state.title || "Nouvelle annonce"} - ${$name_site}`}/>
                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br/>

                                <Form role="form" id="contact-form" onSubmit={this.saveItem} acceptCharset="UTF-8">

                                    <div className="row">

                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="submit text-left">
                                                <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces </b>
                                                </button>
                                            </div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <NavLink to={`/annonce/show/`}>
                                                                <img src={$userIvemo.avatar}
                                                                     style={{height: "40px", width: "80px"}} alt={$userIvemo.first_name}
                                                                     className="avatar"/>
                                                            </NavLink>
                                                            <div className="mx-3">
                                                                <NavLink to={`/annonce/show/`}
                                                                         className="text-dark font-weight-600 text-sm">
                                                                    <b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted">
                                                                        <b>{moment($userIvemo.created_at).format('LL')}</b>
                                                                    </small>
                                                                </NavLink>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <hr/>
                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTypebien">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseTypebien" aria-expanded="true"
                                                                   aria-controls="collapseTypebien">
                                                                    <b>Type de bien </b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTypebien" className="collapse show"
                                                                 role="tabpanel" aria-labelledby="headingTypebien">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">
                                                                                <label className="labels">
                                                                                    Donner un titre a ce bien
                                                                                    <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                    <span
                                                                                        className="input-group-text"><i
                                                                                        className="now-ui-icons users_circle-08"></i></span>
                                                                                    </div>
                                                                                    <Input id='title'
                                                                                           type='text'
                                                                                           className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                                           name='title'
                                                                                           placeholder="Titre du bien"
                                                                                           aria-label="Title du bien"
                                                                                           autoComplete="title"
                                                                                           value={this.state.title}
                                                                                           onChange={this.handleFieldChange}
                                                                                    />
                                                                                    {this.renderErrorFor('title')}
                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Type de bien ?
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <select name={'categoryannoncelocation_id'} value={this.state.categoryannoncelocation_id}
                                                                                                    className={`form-control ${this.hasErrorFor('categoryannoncelocation_id') ? 'is-invalid' : ''}`}
                                                                                                    id="categoryannoncelocation_id" onChange={this.handleFieldChange}>
                                                                                                <option value="" disabled>Selectioner une category</option>
                                                                                                {categoryannoncelocations.map((item) => (
                                                                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                            {this.renderErrorFor('categoryannoncelocation_id')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Ville du bien ?
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <select name={'city_id'} value={this.state.city_id}
                                                                                                    className={`form-control ${this.hasErrorFor('city_id') ? 'is-invalid' : ''}`}
                                                                                                    id="city_id" onChange={this.handleFieldChange}>
                                                                                                <option value="" disabled>Selectioner une ville</option>
                                                                                                {cities.map((item) => (
                                                                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                            {this.renderErrorFor('city_id')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Quartier du bien?
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <Input id='district'
                                                                                                   type='text'
                                                                                                   className={`form-control ${this.hasErrorFor('district') ? 'is-invalid' : ''}`}
                                                                                                   name='district'
                                                                                                   placeholder="Quartier"
                                                                                                   aria-label="Quartier"
                                                                                                   autoComplete="Quartier"
                                                                                                   value={this.state.district}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('district')}
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

                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingOne">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseOne" aria-expanded="true"
                                                                   aria-controls="collapseOne">
                                                                    <b>Caracteristique du bien uniquement pour
                                                                        (Appartement,Maison,Terrain)</b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseOne" className="collapse show" role="tabpanel"
                                                                 aria-labelledby="headingOne">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">

                                                                                <div className="row">
                                                                                    <div
                                                                                        className="col-md-4 ml-auto mr-auto">
                                                                                        <label className="labels">
                                                                                            Surface
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <Input id='surface'
                                                                                                   type='number'
                                                                                                   className={`form-control ${this.hasErrorFor('surface') ? 'is-invalid' : ''}`}
                                                                                                   name='surface'
                                                                                                   placeholder="Surface"
                                                                                                   aria-label="Surface"
                                                                                                   autoComplete="surface"
                                                                                                   value={this.state.surface}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('surface')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4 ml-auto mr-auto">
                                                                                        <label htmlFor="pieces">
                                                                                            Pièces (optionnel)
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <Input id='pieces'
                                                                                                   type='number'
                                                                                                   className={`form-control ${this.hasErrorFor('pieces') ? 'is-invalid' : ''}`}
                                                                                                   name='pieces'
                                                                                                   placeholder="Pièces"
                                                                                                   aria-label="Pièces"
                                                                                                   autoComplete="pieces"
                                                                                                   value={this.state.pieces}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('pieces')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4 ml-auto mr-auto">
                                                                                        <label htmlFor="Chambres">Chambres
                                                                                            (optionnel)</label>
                                                                                        <div className="form-group">
                                                                                            <Input id='rooms'
                                                                                                   type='number'
                                                                                                   className={`form-control ${this.hasErrorFor('rooms') ? 'is-invalid' : ''}`}
                                                                                                   name='rooms'
                                                                                                   placeholder="Chambres"
                                                                                                   aria-label="Chambres"
                                                                                                   autoComplete="rooms"
                                                                                                   value={this.state.rooms}
                                                                                                   onChange={this.handleFieldChange}
                                                                                            />
                                                                                            {this.renderErrorFor('rooms')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <small>*optionnel: les champs ne sont
                                                                                        pas obligatoires vous avez le choix
                                                                                        de le remplire ou pas</small>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingDescription">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseDescription" aria-expanded="true"
                                                                   aria-controls="collapseDescription">
                                                                    <b>Description de l'annonce </b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseDescription" className="collapse show"
                                                                 role="tabpanel" aria-labelledby="headingDescription">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">

                                                                                <div className="form-group">
                                                                                    <label className="labels">
                                                                                        Décrivez votre article
                                                                                        <span className="text-danger">*</span>
                                                                                    </label>
                                                                                    <br />
                                                                                    <ReactQuill theme="snow" modules={this.modules}
                                                                                                formats={this.formats}
                                                                                                placeholder={"Écrivez quelque chose ★"}
                                                                                                className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                                                value={this.state.description || ''}
                                                                                                onChange={this.handleChangeBody} />
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
                                                        <button className="btn btn-secondary" type="button" onClick={this.props.history.goBack} title="Ne pas mettre à jour l'annonce">
                                                             <b>Annuler</b>
                                                        </button>
                                                        <button className="btn btn-primary" type="submit" title="Mettre à jour l'annonce">
                                                             <b>Poster votre annonce</b>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-lg-4 col-md-12 mx-auto">

                                            <div className="submit text-center">
                                              <button className="btn btn-secondary" type="button" onClick={this.props.history.goBack} title="Ne pas mettre à jour l'annonce">
                                                   <b>Annuler</b>
                                              </button>
                                            </div>

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist" aria-multiselectable="true"
                                                                 className="card-collapse">

                                                                <div className="card-header text-center">
                                                                    {this.state.price && (
                                                                        <div className="ml-auto">
                                                                            <h5 className="text-dark"><b>{this.numberWithCommas()} <small>FCFA/mois</small></b></h5>
                                                                        </div>
                                                                    )}
                                                                    <div className="card-title">
                                                                        <b>Quel est le montant de votre bien ?</b>
                                                                    </div>
                                                                </div>

                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text">
                                                                            <i className="now-ui-icons business_money-coins"></i>
                                                                        </span>
                                                                    </div>
                                                                    <Input id='price'
                                                                           type='number'
                                                                           maxLength="13"
                                                                           minLength="4"
                                                                           className={`form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
                                                                           name='price'
                                                                           placeholder="Montant de votre bien"
                                                                           aria-label="Montant de votre bien"
                                                                           autoComplete="price"
                                                                           value={this.state.price}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('price')}
                                                                </div>
                                                                <div id="accordion" role="tablist"
                                                                     aria-multiselectable="true" className="card-collapse">

                                                                    <div className="card card-plain">
                                                                        <div className="card-header" role="tab"
                                                                             id="headingAsavoir1">
                                                                            <a className="collapsed" data-toggle="collapse"
                                                                               data-parent="#accordion"
                                                                               href="#collapseAsavoir1"
                                                                               aria-expanded="false"
                                                                               aria-controls="collapseAsavoir1">
                                                                                Bon a savoir sur la vente !
                                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseAsavoir1" className="collapse"
                                                                             role="tabpanel"
                                                                             aria-labelledby="headingAsavoir1">
                                                                            <div className="card-body text-info">
                                                                                Pour trouver un client rapidement, il est
                                                                                préférable de fixer un prix conforme au
                                                                                marché locatif local.
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

                                    </div>

                                </Form>

                            </div>


                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>

            </Fragment>

        )
    }
}

export default AnnoncelocationCreate;
