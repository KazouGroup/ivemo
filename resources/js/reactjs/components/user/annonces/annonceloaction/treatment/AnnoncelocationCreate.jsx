import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormGroup, Input} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import moment from "moment";
import HelmetSite from "../../../../inc/user/HelmetSite";
import FieldInput from "../../../../inc/vendor/FieldInput";
import Navannoncelocationsbyuser from "../inc/Navannoncelocationsbyuser";
import NavProfileTraitement from "../../inc/NavProfileTraitement";
import FieldInputCheck from "../../../../inc/vendor/FieldInputCheck";


class AnnoncelocationCreate extends Component {
    constructor(props) {
        super(props);


        this.saveItem = this.saveItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);


        this.handleStatusTerrace = this.handleStatusTerrace.bind(this);
        this.handleStatusFurniture = this.handleStatusFurniture.bind(this);
        this.handleStatusBalcony = this.handleStatusBalcony.bind(this);
        this.handleStatusElevator = this.handleStatusElevator.bind(this);

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
            award_price: '',
            city_id: '',
            furniture: '',
            terrace: '',
            balcony: '',
            elevator: '',
            phone_seller: '',
            contact_seller: '',
            terrace_number: '',
            balcony_number: '',
            link_video: '',
            categoryannoncelocation_id: '',
            periodeannonce_id: '',
            errors: [],
            cities: [],
            periodeannonces: [],
            categoryannoncelocations: [],
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
     //document.querySelector('editor-control').classList.remove('is-invalid');
    }


    handleStatusTerrace() {this.setState({terrace: !this.state.terrace});};
    handleStatusFurniture() {this.setState({furniture: !this.state.furniture});};
    handleStatusBalcony() {this.setState({balcony: !this.state.balcony});};
    handleStatusElevator() {this.setState({elevator: !this.state.elevator});};

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
            award_price: this.state.award_price,
            surface: this.state.surface,
            rooms: this.state.rooms,
            pieces: this.state.pieces,
            price: this.state.price,
            city_id: this.state.city_id,
            balcony_number: this.state.balcony_number,
            terrace_number: this.state.terrace_number,
            furniture: this.state.furniture,
            terrace: this.state.terrace,
            balcony: this.state.balcony,
            phone_seller: this.state.phone_seller,
            elevator: this.state.elevator,
            link_video: this.state.link_video,
            categoryannoncelocation_id: this.state.categoryannoncelocation_id,
            periodeannonce_id: this.state.periodeannonce_id,
        };
        let itemannoncetype = this.props.match.params.annoncetype;
        dyaxios.post(route('annoncelocationsstore_site', [itemannoncetype]), item)
            .then((response) => {

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
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });

                window.location = response.data.redirect;
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
        fetch(route('api.categoryannoncelocation_site')).then(res => res.json()).then((result) => { this.setState({ categoryannoncelocations: result }) });
        fetch(route('api.all_cities')).then(res => res.json()).then((result) => { this.setState({ cities: result }) });
        dyaxios.get(route('api.periodeannonces')).then(response => this.setState({ periodeannonces: response.data, }));

    }

    numberWithCommas() {
        return this.state.price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    }

    render() {
        const {categoryannoncelocations,cities,periodeannonces} = this.state;
        return (
            <Fragment>
                <HelmetSite title={`${this.state.title || "Nouvelle annonce"} - ${$name_site}`}/>
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

                                        <div className="col-lg-4">

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                <Navannoncelocationsbyuser/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-lg-8 mx-auto">
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                        <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces </b>
                                                    </button>
                                                </div>
                                                <div className="text-right ml-auto">
                                                    <button className="btn btn-secondary" type="button" onClick={this.props.history.goBack} title="Ne pas poster">
                                                        <b>Annuler</b>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-header d-flex align-items-center">
                                                        <NavProfileTraitement/>

                                                        <div className="text-right ml-auto">

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
                                                                                        className="input-group-text">
                                                                                        <i className="now-ui-icons users_circle-08"></i></span>
                                                                                    </div>
                                                                                    <FieldInput name="title" type='text' minLength="5" maxLength="200" placeholder="Titre du bien" value={this.state.title}
                                                                                                handleFieldChange={this.handleFieldChange}
                                                                                                hasErrorFor={this.hasErrorFor}
                                                                                                renderErrorFor={this.renderErrorFor} required="required"/>
                                                                                </div>

                                                                                <div className="row">

                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Prix de ce bien ?
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                    <span
                                                                                        className="input-group-text"><i
                                                                                        className="now-ui-icons business_money-coins"></i></span>
                                                                                            </div>
                                                                                            <FieldInput name="price"
                                                                                                        type='number'
                                                                                                        placeholder="Motant de votre bien"
                                                                                                        value={this.state.price}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Caution ?
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <span className="input-group-text">
                                                                                                    <i className="now-ui-icons business_money-coins"/>
                                                                                                </span>
                                                                                            </div>
                                                                                            <FieldInput name="award_price"
                                                                                                        type='number'
                                                                                                        placeholder="Garantie"
                                                                                                        value={this.state.award_price}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Période ?
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <select
                                                                                                name="periodeannonce_id"
                                                                                                value={this.state.periodeannonce_id}
                                                                                                className={`form-control`}
                                                                                                id="periodeannonce_id"
                                                                                                onChange={this.handleFieldChange}
                                                                                                required="required">
                                                                                                <option value="" disabled>Sélectionner une période
                                                                                                </option>
                                                                                                {periodeannonces.map((item) => (
                                                                                                    <option key={item.id}
                                                                                                        value={item.id}>{item.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                            {this.renderErrorFor('periodeannonce_id')}
                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                                <div className="row">

                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Type de bien ?
                                                                                            <span
                                                                                                className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <select
                                                                                                name="categoryannoncelocation_id"
                                                                                                value={this.state.categoryannoncelocation_id}
                                                                                                className={`form-control`}
                                                                                                id="categoryannoncelocation_id"
                                                                                                onChange={this.handleFieldChange}
                                                                                                required="required">
                                                                                                <option value=""
                                                                                                        disabled>Sélectionner
                                                                                                    une catégorie
                                                                                                </option>
                                                                                                {categoryannoncelocations.map((item) => (
                                                                                                    <option
                                                                                                        key={item.id}
                                                                                                        value={item.id}>{item.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                            {this.renderErrorFor('categoryannoncelocation_id')}
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Ville du bien ?
                                                                                            <span
                                                                                                className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <select name="city_id"
                                                                                                    value={this.state.city_id}
                                                                                                    className={`form-control`}
                                                                                                    id="city_id"
                                                                                                    onChange={this.handleFieldChange}
                                                                                                    required="required">
                                                                                                <option value=""
                                                                                                        disabled>Sélectionner
                                                                                                    une ville
                                                                                                </option>
                                                                                                {cities.map((item) => (
                                                                                                    <option
                                                                                                        key={item.id}
                                                                                                        value={item.id}>{item.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                            {this.renderErrorFor('city_id')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4">
                                                                                        <label className="labels">
                                                                                            Quartier ou lieu ?
                                                                                            <span
                                                                                                className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="district"
                                                                                                        type='text'
                                                                                                        minLength="3"
                                                                                                        maxLength="200"
                                                                                                        placeholder="Quartier"
                                                                                                        value={this.state.district}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
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
                                                                    <b>Caractéristique du bien uniquement pour
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
                                                                                            <FieldInput name="surface" type='number' placeholder="Surface" value={this.state.surface}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4 ml-auto mr-auto">
                                                                                        <label htmlFor="pieces">
                                                                                            Pièces (optionnel)
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="pieces" type='number'
                                                                                                        placeholder="Pièces"
                                                                                                        maxLength="2"
                                                                                                        value={this.state.pieces}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4 ml-auto mr-auto">
                                                                                        <label htmlFor="Chambres">Chambres
                                                                                            (optionnel)</label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="rooms" type='number'
                                                                                                        placeholder="Chambres"
                                                                                                        value={this.state.rooms}
                                                                                                        maxLength="2"
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <small>*optionnel: les champs ne sont
                                                                                        pas obligatoires vous avez le choix
                                                                                        de les remplire ou pas</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {$auth.can('dashboard') && (
                                                        <div id="accordion" role="tablist" aria-multiselectable="true"
                                                             className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingAdmin">
                                                                    <a data-toggle="collapse" data-parent="#accordion"
                                                                       href="#collapseAdmin" aria-expanded="true"
                                                                       aria-controls="collapseOne">
                                                                        <b>Information en plus (Pour les moderateurs à ne pas ramplire si le bien vous appartient)</b>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseAdmin" className="collapse show" role="tabpanel"
                                                                     aria-labelledby="headingAdmin">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div id="accordion" role="tablist"
                                                                                     aria-multiselectable="true"
                                                                                     className="card-collapse">

                                                                                    <div className="row">
                                                                                        <div
                                                                                            className="col-md-6 ml-auto mr-auto">
                                                                                            <label className="labels">
                                                                                                Téléphone du vendeur
                                                                                                <span className="text-danger">*</span>
                                                                                            </label>
                                                                                            <div className="form-group">
                                                                                                <FieldInput name="phone_seller" type='text' placeholder="Téléphone du vendeur" value={this.state.phone_seller}
                                                                                                            handleFieldChange={this.handleFieldChange}
                                                                                                            hasErrorFor={this.hasErrorFor}
                                                                                                            renderErrorFor={this.renderErrorFor}/>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6 ml-auto mr-auto">
                                                                                            <label htmlFor="pieces">
                                                                                                Email du vendeur
                                                                                            </label>
                                                                                            <div className="form-group">
                                                                                                <FieldInput name="contact_seller" type='text' placeholder="Email du vendeur" value={this.state.contact_seller}
                                                                                                            handleFieldChange={this.handleFieldChange}
                                                                                                            hasErrorFor={this.hasErrorFor}
                                                                                                            renderErrorFor={this.renderErrorFor}/>
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
                                                    )}

                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingTre">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseTre" aria-expanded="false"
                                                                   aria-controls="collapseTre">
                                                                    <b>Les avantages de mon bien</b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTre" className="collapse show" role="tabpanel"
                                                                 aria-labelledby="headingTre">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">

                                                                                <div className="row">
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="furniture"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Meublé`}
                                                                                                         checked={this.state.furniture || false}
                                                                                                         value={this.state.furniture}
                                                                                                         onChange={this.handleStatusFurniture}/>

                                                                                    </div>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="terrace"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Terrasse`}
                                                                                                         checked={this.state.terrace || false}
                                                                                                         value={this.state.terrace}
                                                                                                         onChange={this.handleStatusTerrace}/>
                                                                                    </div>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="balcony"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Balcon`}
                                                                                                         checked={this.state.balcony || false}
                                                                                                         value={this.state.balcony}
                                                                                                         onChange={this.handleStatusBalcony}/>
                                                                                    </div>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="elevator"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Ascenseur`}
                                                                                                         checked={this.state.elevator || false}
                                                                                                         value={this.state.elevator}
                                                                                                         onChange={this.handleStatusElevator}/>
                                                                                    </div>
                                                                                </div>

                                                                                <br/>
                                                                                <div className="row">

                                                                                    {this.state.terrace && (
                                                                                        <div className="col-md-6 mx-auto">
                                                                                            <label className="labels">
                                                                                                Nombre de terrasse
                                                                                                <span className="text-danger">*</span>
                                                                                            </label>
                                                                                            <div className="form-group">
                                                                                                <FieldInput name="terrace_number"
                                                                                                            type='number'
                                                                                                            placeholder="Nombre de terrasse"
                                                                                                            value={this.state.terrace_number || ''}
                                                                                                            handleFieldChange={this.handleFieldChange}
                                                                                                            hasErrorFor={this.hasErrorFor}
                                                                                                            renderErrorFor={this.renderErrorFor}/>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}

                                                                                    {this.state.balcony && (
                                                                                        <div className="col-md-6 mx-auto">
                                                                                            <label className="labels">
                                                                                                Nombre de balcon
                                                                                                <span className="text-danger">*</span>
                                                                                            </label>
                                                                                            <div className="form-group">
                                                                                                <FieldInput name="balcony_number"
                                                                                                            type='number'
                                                                                                            placeholder="Nombre de balcon"
                                                                                                            value={this.state.balcony_number || ''}
                                                                                                            handleFieldChange={this.handleFieldChange}
                                                                                                            hasErrorFor={this.hasErrorFor}
                                                                                                            renderErrorFor={this.renderErrorFor}/>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}

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
                                                                                        Décrivez votre annonce
                                                                                        <span className="text-danger">*</span>
                                                                                    </label>
                                                                                    <br />
                                                                                    <ReactQuill theme="snow" modules={this.modules}
                                                                                                formats={this.formats}
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
                                                        <button className="btn btn-secondary" type="button" onClick={this.props.history.goBack} title="Ne pas postée l'annonce">
                                                            <b>Annuler</b>
                                                        </button>
                                                        <button className="btn btn-primary" type="submit" title="Poster l'annonce">
                                                            <b>Continuer</b>
                                                        </button>
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
