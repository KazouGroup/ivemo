import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormGroup, Input, Row} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import moment from "moment";
import HelmetSite from "../../../../inc/user/HelmetSite";
import FieldInput from "../../../../inc/vendor/FieldInput";
import NavProfileTraitement from "../../inc/NavProfileTraitement";
import FieldInputCheck from "../../../../inc/vendor/FieldInputCheck";
import LazyLoad from "react-lazyload";
import LoaderLdsDefaultPage from "../../../../inc/user/annimation/LoaderLdsDefaultPage";
import Navlinknewannoncereservation from "./Navlinknewannoncereservation";
import Navannoncereservationsbyuser from "../inc/Navannoncereservationsbyuser";


class AnnoncereservationEdit extends Component {
    constructor(props) {
        super(props);


        this.updateItem = this.updateItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

        this.uploadimagesModalItem = this.uploadimagesModalItem.bind(this);
        this.uploadPhotoImage = this.uploadPhotoImage.bind(this);
        this.saveimageItem = this.saveimageItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.updateimageItem = this.updateimageItem.bind(this);
        this.deleteimageItem = this.deleteimageItem.bind(this);
        this.statusadminuploadimagesItem = this.statusadminuploadimagesItem.bind(this);
        this.statusuploadimagesItem = this.statusuploadimagesItem.bind(this);

        this.handleStatusWifi = this.handleStatusWifi.bind(this);
        this.handleStatusLunch = this.handleStatusLunch.bind(this);
        this.handleStatusCarSharing = this.handleStatusCarSharing.bind(this);
        this.handleStatusParking = this.handleStatusParking.bind(this);
        this.handleDryCleaning = this.handleDryCleaning.bind(this);
        this.handleStatusConsiegerie = this.handleStatusConsiegerie.bind(this);

        this.handleStatusTerrace = this.handleStatusTerrace.bind(this);
        this.handleStatusFurniture = this.handleStatusFurniture.bind(this);
        this.handleStatusBalcony = this.handleStatusBalcony.bind(this);
        this.handleStatusElevator = this.handleStatusElevator.bind(this);

        this.state = {
            id: '',
            status: '',
            slugin: '',
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
            balcony_number: '',
            link_video: '',
            status_wifi: '',
            status_lunch: '',
            status_car_sharing: '',
            status_parking: '',
            dry_cleaning: '',
            status_consiegerie: '',
            photo: '',
            categoryannoncereservation_id: '',
            periodeannonce_id: '',
            uploadimages_count: '',
            user: [],
            uploadimages: [],
            errors: [],
            cities: [],
            periodeannonces: [],
            categoryannoncereservations: [],
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
    }


    handleStatusWifi() {this.setState({status_wifi: !this.state.status_wifi});};
    handleStatusLunch() {this.setState({status_lunch: !this.state.status_lunch});};
    handleStatusCarSharing() {this.setState({status_car_sharing: !this.state.status_car_sharing});};
    handleStatusParking() {this.setState({status_parking: !this.state.status_parking});};
    handleDryCleaning() {this.setState({dry_cleaning: !this.state.dry_cleaning});};
    handleStatusConsiegerie() {this.setState({status_consiegerie: !this.state.status_consiegerie});};

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


    uploadimagesModalItem(title) {
        //console.log(id);
        $('#uploadimgNew').modal('show');
        this.setState({
            //annonceItem: item
        });
    }

    // Handle Upload Image
    uploadPhotoImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file['size'] < 6000775){
            reader.onloadend = (file) => {
                this.setState({ file: file, photo: reader.result, showDefaultNewPhotoImage: false });
            };
            reader.readAsDataURL(file);
        }else{
            $.notify({message: 'Le fichier ne peut pas être supérieure à 15 MB'}, {
                allow_dismiss: false,
                type: 'danger',
                placement: {from: 'top', align: 'center'},
                animate: {
                    enter: "animate__animated animate__fadeInDownBig",
                    exit: "animate__animated animate__fadeOutUp"
                },
            });
        }
    }

    saveimageItem(e) {
        e.preventDefault();
        let item = {
            photo: this.state.photo,
        };
        let itemannoncereservation = this.props.match.params.annoncereservation;
        dyaxios.post(route('annoncereservationgetuploadimage_site',[itemannoncereservation]), item)
            .then((response) => {
                //Masquer le modal après la création
                $('#uploadimgNew').modal('hide');

                /** Debut de l'alert **/
                $.notify({message: `Data updated successfully`,},{
                    allow_dismiss: false,
                    type: 'info',
                    placement: {from: 'top', align: 'center'},
                    animate: {enter: "animated fadeInDown", exit: "animated fadeOutUp"},
                });
                /** Fin alert **/

                this.setState({photo: "",});

                this.loadItems();

            }).catch(error => console.error(error))
    }
    updateimageItem(e) {
        e.preventDefault();
    }

    deleteimageItem(item) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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

                const url = route('destroyuploadimage_site', item.id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Image supprimé avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.loadItems();

                }).catch(error => console.error(error))
            }
        });
    }

    loadmoresItem() {
        this.setState((old) => {
            return {visiable: old.visiable + 10}
        })
    }

    statusadminuploadimagesItem(item) {
        Swal.fire({
            title: 'Changer le status cette immage?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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

                let url = route('adminstatusuploadimage_site', [item.id]);
                //Envoyer la requet au server
                dyaxios.post(url).then(() => {
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    statusuploadimagesItem(item) {
        //Envoyer la requet au server
        let url = route('statusuploadimage_site', [item.id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        }).catch(error => console.error(error))
    }


    updateItem(e) {
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
            balcony_number: this.state.balcony_number,
            furniture: this.state.furniture,
            terrace: this.state.terrace,
            balcony: this.state.balcony,
            phone_seller: this.state.phone_seller,
            elevator: this.state.elevator,
            link_video: this.state.link_video,

            status_wifi: this.state.status_wifi,
            status_lunch: this.state.status_lunch,
            status_car_sharing: this.state.status_car_sharing,
            status_parking: this.state.status_parking,
            dry_cleaning: this.state.dry_cleaning,
            status_consiegerie: this.state.status_consiegerie,

            categoryannoncereservation_id: this.state.categoryannoncereservation_id,
            periodeannonce_id: this.state.periodeannonce_id,
        };
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        dyaxios.put(route('annoncereservationsupdate_site', [itemannoncetype,itemannoncereservation]), item)
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

                //window.location = response.data.redirect;
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

    activeItem(slugin) {
        //Envoyer la requet au server
        let url = route('annonces_reservations_status.site', [slugin]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrap **/
            $.notify({
                    //,
                    message: 'Annonce activée avec succès'
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
            /** End alert ***/
            this.loadItems();
        }).catch(() => {
            //Failled message
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })

    }

    unactiveItem(slugin) {
        //Envoyer la requet au server
        let url = route('annonces_reservations_status.site', [slugin]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    // title: 'Update',
                    message: 'Annonce désactivée avec succès'
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
            /** End alert ***/
            this.loadItems();
        }).catch(() => {
            //Failled message
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })

    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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

                let itemannoncetype = this.props.match.params.annoncetype;
                const url = route('annonces_reservations_delete.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Annonce supprimé avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.props.history.push(`/ar_data/${itemannoncetype}/new/`);
                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    loadItems() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        let url = route('api.annoncereservationsbyannoncetypebyannoncereservation_site', [itemannoncetype,itemannoncereservation]);
        dyaxios.get(url).then(response =>
            this.setState({
                id: response.data.id,
                title: response.data.title,
                status: response.data.status,
                description: response.data.description,
                district: response.data.district,
                surface: response.data.surface,
                rooms: response.data.rooms,
                pieces: response.data.pieces,
                price: response.data.price,
                city_id: response.data.city_id,
                balcony_number: response.data.balcony_number,
                furniture: response.data.furniture,
                terrace: response.data.terrace,
                balcony: response.data.balcony,
                phone_seller: response.data.phone_seller,
                elevator: response.data.elevator,
                link_video: response.data.link_video,
                status_wifi: response.data.status_wifi,
                status_lunch: response.data.status_lunch,
                status_car_sharing: response.data.status_car_sharing,
                status_parking: response.data.status_parking,
                dry_cleaning: response.data.dry_cleaning,
                status_consiegerie: response.data.status_consiegerie,
                periodeannonce_id: response.data.periodeannonce_id,
                city: response.data.city,
                user_id: response.data.user_id,
                user: response.data.user,
                slug: response.data.slug,
                slugin: response.data.slugin,
                uploadimages_count: response.data.uploadimages_count,
                annoncetype: response.data.annoncetype,
                uploadimages: response.data.uploadimages,
                categoryannoncereservation_id: response.data.categoryannoncereservation_id,
                categoryannoncereservation: response.data.categoryannoncereservation,
            }));
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
        fetch(route('api.categoryannoncereservation_site')).then(res => res.json()).then((result) => { this.setState({ categoryannoncereservations: result }) });
        fetch(route('api.all_cities')).then(res => res.json()).then((result) => { this.setState({ cities: result }) });
        dyaxios.get(route('api.periodeannonces')).then(response => this.setState({ periodeannonces: response.data, }));

    }

    render() {
        const {categoryannoncereservations,cities,periodeannonces,visiable,user, uploadimages} = this.state;
        const avatar_style = {
            width: "80px",
            height: "40px",
            top: "15px",
            left: "15px",
        };
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
                                    <div className="row">

                                        <div className="col-lg-4">

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                  <Navannoncereservationsbyuser/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-lg-8 mx-auto">
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <button type="button" className="btn btn-neutral btn-sm"
                                                            onClick={this.props.history.goBack}>
                                                        <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à
                                                        vos annonces </b>
                                                    </button>
                                                </div>
                                                <div className="text-right ml-auto">
                                                    <Navlinknewannoncereservation {...this.props} />
                                                    {this.state.status && (
                                                        <Link
                                                            to={`/ars/${this.state.annoncetype.slug}/${this.state.categoryannoncereservation.slug}/${this.state.city.slug}/${this.state.user.slug}/${this.state.slug}/`}
                                                            className="btn btn-info">
                                                            <b>Voir votre annonce</b>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-header d-flex align-items-center">
                                                        <NavProfileTraitement/>

                                                        <div className="text-right ml-auto">
                                                            {($userIvemo.id === user.id) && (
                                                                <>
                                                                    <NavLink to={`/statistics/ars/${this.state.annoncetype.slug}/${this.state.slugin}/`} className="btn btn-sm btn-icon btn-secondary" title="Statistiques">
                                                                        <i className="now-ui-icons business_chart-bar-32"/>
                                                                    </NavLink>
                                                                    {this.state.status ?
                                                                        <>
                                                                            <Button
                                                                                onClick={() => this.unactiveItem(this.state.slugin)}
                                                                                className="btn btn-success btn-icon btn-sm"
                                                                                title="Annonce activé">
                                                                                <i className="now-ui-icons ui-1_check"/>
                                                                            </Button>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Button
                                                                                onClick={() => this.activeItem(this.state.slugin)}
                                                                                className="btn btn-primary btn-icon btn-sm"
                                                                                title="Annonce déactivé">
                                                                                <i className="now-ui-icons ui-1_simple-delete"/>
                                                                            </Button>
                                                                        </>

                                                                    }
                                                                    <Button
                                                                        className="btn btn-sm btn-icon btn-danger"
                                                                        onClick={() => this.deleteItem(this.state.id)}
                                                                        title="Suprimer cette annonce">
                                                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                     <hr/>
                                                    <div id="accordion" role="tablist" aria-multiselectable="false"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab"
                                                                 id="headingTypeimage">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseTypeimage" aria-expanded="true"
                                                                   aria-controls="collapseTypeimage">
                                                                    <b>Gestions de vos images </b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTypeimage" className="collapse show"
                                                                 role="tabpanel" aria-labelledby="headingTypeimage">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">

                                                                                {uploadimages.length >= 1 && (
                                                                                    <>
                                                                                        {($userIvemo.id === user.id) && (
                                                                                            <div className="toolbar">
                                                                                                {this.state.uploadimages_count < 10 && (

                                                                                                    <div className="submit text-center">
                                                                                                        <a style={{cursor: "pointer"}}
                                                                                                           onClick={() => this.uploadimagesModalItem(this.state.title)}
                                                                                                           className="text-info">
                                                                                       <span className="btn-label">
                                                                                           <i className="now-ui-icons ui-1_simple-add"/>
                                                                                       </span>
                                                                                                            <b className="title_hover"> Nouvelle image</b>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                )}


                                                                                                <br/>
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                )}

                                                                                {this.state.slug ?
                                                                                    <>
                                                                                        {uploadimages.length >= 1 ?

                                                                                            <div className="table-responsive">
                                                                                                <table
                                                                                                    className="table">

                                                                                                    <tbody>
                                                                                                    <>
                                                                                                        {uploadimages.slice(0, visiable).map((item) => (
                                                                                                            <tr key={item.id}>
                                                                                                                <td>
                                                                                                                    <LazyLoad>
                                                                                                                        <img
                                                                                                                            src={item.photo}
                                                                                                                            alt={this.state.title}
                                                                                                                            style={avatar_style}/>
                                                                                                                    </LazyLoad>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    <div
                                                                                                                        className="timeline-heading">
                                                                                                                        {item.status ?
                                                                                                                            < h6
                                                                                                                                className="card-category text-success">
                                                                                                                                Visible
                                                                                                                            </h6>
                                                                                                                            :
                                                                                                                            < h6
                                                                                                                                className="card-category text-primary">
                                                                                                                                Non
                                                                                                                                visible
                                                                                                                            </h6>
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                    <div
                                                                                                                        className="timeline-heading">
                                                                                                                        {!item.status_admin && (
                                                                                                                            <h6 className="card-category text-primary">
                                                                                                                                CETTE IMAGE N'EST PAS CONFORME
                                                                                                                            </h6>
                                                                                                                        ) }
                                                                                                                    </div>
                                                                                                                </td>

                                                                                                                <th  className="text-right">
                                                                                                                    {moment(item.created_at).fromNow()}
                                                                                                                </th>
                                                                                                                <td className="text-right">

                                                                                                                    {($userIvemo.id === user.id) && (
                                                                                                                        <>
                                                                                                                            {item.status ?
                                                                                                                                <>
                                                                                                                                    <Button
                                                                                                                                        onClick={() => this.statusuploadimagesItem(item)}
                                                                                                                                        className="btn btn-success btn-icon btn-sm btn-neutral"
                                                                                                                                        title={item.full_name}>
                                                                                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                                                                                    </Button>
                                                                                                                                </>
                                                                                                                                :
                                                                                                                                <>
                                                                                                                                    <Button
                                                                                                                                        onClick={() => this.statusuploadimagesItem(item)}
                                                                                                                                        className="btn btn-primary btn-icon btn-sm btn-neutral"
                                                                                                                                        title={item.full_name}>
                                                                                                                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                                                                                                                    </Button>
                                                                                                                                </>

                                                                                                                            }
                                                                                                                            <button
                                                                                                                                type="button"
                                                                                                                                onClick={() => this.deleteimageItem(item)}
                                                                                                                                className="btn btn-danger btn-icon btn-sm btn-neutral">
                                                                                                                                <i className="now-ui-icons ui-1_simple-remove"></i>
                                                                                                                            </button>
                                                                                                                        </>
                                                                                                                    )}

                                                                                                                    {($userIvemoIsadmin.status_user) && (
                                                                                                                        <>
                                                                                                                            {item.status_admin ?
                                                                                                                                <>
                                                                                                                                    <Button
                                                                                                                                        onClick={() => this.statusadminuploadimagesItem(item)}
                                                                                                                                        className="btn btn-success btn-icon btn-sm btn-neutral"
                                                                                                                                        title={item.full_name}>
                                                                                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                                                                                    </Button>
                                                                                                                                </>
                                                                                                                                :
                                                                                                                                <>
                                                                                                                                    <Button
                                                                                                                                        onClick={() => this.statusadminuploadimagesItem(item)}
                                                                                                                                        className="btn btn-primary btn-icon btn-sm btn-neutral"
                                                                                                                                        title={item.full_name}>
                                                                                                                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                                                                                                                    </Button>
                                                                                                                                </>

                                                                                                                            }
                                                                                                                        </>
                                                                                                                    )}

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        ))}
                                                                                                    </>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>

                                                                                            :
                                                                                            <>
                                                                                                {this.state.slug && (
                                                                                                    <>
                                                                                                        {($userIvemo.id === user.id) && (
                                                                                                            <div className="row">
                                                                                                                <div className="col-md-8 ml-auto mr-auto text-center">
                                                                                                                    <a style={{cursor: "pointer"}}
                                                                                                                       className="text-info"
                                                                                                                       onClick={() => this.uploadimagesModalItem(this.state.title)}>
                                                                                                                        <b>Aucune image enregisté sur cette annonce <i className="now-ui-icons ui-1_simple-add"/> ajouter une image
                                                                                                                        </b>
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </>
                                                                                                )}
                                                                                            </>

                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    <LoaderLdsDefaultPage />
                                                                                }

                                                                                {visiable < uploadimages.length && (
                                                                                    <div className="row">
                                                                                        <div className="col-md-8 ml-auto mr-auto text-center">
                                                                                            <a style={{cursor: "pointer"}}
                                                                                               onClick={this.loadmoresItem}
                                                                                               className="text-info">
                                                                                                <b>Afficher la totalité
                                                                                                    des {this.state.uploadimages_count} images</b>
                                                                                            </a>
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

                                                    {/* Ini upload image */}
                                                    <div className="modal fade" id="uploadimgNew" tabIndex="-1" role="dialog" aria-labelledby="uploadimgNewLabel"
                                                         aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title text-center"><b>Sauvegarder une image</b></h5>
                                                                    <button type="button" className="close" data-dismiss="modal"
                                                                            aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>

                                                                <Form role="form" onSubmit={this.state.editmode ? this.updateimageItem : this.saveimageItem}  acceptCharset="UTF-8">

                                                                    <div className="modal-body">

                                                                        <div className="card-body">

                                                                            <Row>
                                                                                <div className="col-md-6 mx-auto">
                                                                                    <div className="text-center">
                                                                                        <img src={this.state.showDefaultNewPhotoImage ? '' : this.state.photo} alt={'Selectioner une image'} />
                                                                                        <input id="photo" type="file" onChange={this.uploadPhotoImage} className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="photo" accept="image/*" />
                                                                                        <div className="text-center">
                                                                                            <label htmlFor="photo" className="btn btn-primary">
                                                                                                <span className="btn-inner--text">Selectioner / Changer</span>
                                                                                            </label>
                                                                                            {this.renderErrorFor('photo')}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Row>
                                                                            <div className="submit text-center">
                                                                                <button type="button" className="btn btn-secondary btn-raised" data-dismiss="modal">
                                                                                    Annuler
                                                                                </button>
                                                                                <button className="btn btn-primary" type="submit">
                                                                                    Sauvegarder
                                                                                </button>
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </Form>


                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* End */}

                                                    <Form role="form" id="contact-form" onSubmit={this.updateItem} acceptCharset="UTF-8">

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
                                                                                    <FieldInput name="title" type='text' minLength="5" maxLength="200" placeholder="Titre du bien" value={this.state.title || ''}
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
                                                                                                        value={this.state.price || ''}
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
                                                                                                value={this.state.periodeannonce_id || ''}
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

                                                                                    <div className="col-md-4">
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
                                                                                                        value={this.state.district || ''}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
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
                                                                                                name="categoryannoncereservation_id"
                                                                                                value={this.state.categoryannoncereservation_id || ''}
                                                                                                className={`form-control`}
                                                                                                id="categoryannoncereservation_id"
                                                                                                onChange={this.handleFieldChange}
                                                                                                required="required">
                                                                                                <option value=""
                                                                                                        disabled>Sélectionner
                                                                                                    une catégorie
                                                                                                </option>
                                                                                                {categoryannoncereservations.map((item) => (
                                                                                                    <option
                                                                                                        key={item.id}
                                                                                                        value={item.id}>{item.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                            {this.renderErrorFor('categoryannoncereservation_id')}
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

                                                                                    <div className="col-md-4 ml-auto mr-auto">
                                                                                        <label className="labels">
                                                                                            Surface
                                                                                            <span className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="surface" type='number' placeholder="Surface" value={this.state.surface || ''}
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

                                                                                    <div className="col-md-6 ml-auto mr-auto">
                                                                                        <label htmlFor="pieces">
                                                                                            Pièces (optionnel)
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="pieces" type='number'
                                                                                                        placeholder="Pièces"
                                                                                                        maxLength="2"
                                                                                                        value={this.state.pieces || ''}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-6 ml-auto mr-auto">
                                                                                        <label htmlFor="Chambres">Chambres
                                                                                            (optionnel)</label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="rooms" type='number'
                                                                                                        placeholder="Chambres"
                                                                                                        value={this.state.rooms || ''}
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
                                                                                                <FieldInput name="phone_seller" type='text' placeholder="Téléphone du vendeur" value={this.state.phone_seller || ''}
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
                                                                                                <FieldInput name="contact_seller" type='text' placeholder="Email du vendeur" value={this.state.contact_seller || ''}
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

                                                                                <div className={"row"}>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="status_wifi"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Wifi`}
                                                                                                         checked={this.state.status_wifi || false}
                                                                                                         value={this.state.status_wifi}
                                                                                                         onChange={this.handleStatusWifi}/>

                                                                                    </div>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="status_lunch"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Petit-déjeuner`}
                                                                                                         checked={this.state.status_lunch || false}
                                                                                                         value={this.state.status_lunch}
                                                                                                         onChange={this.handleStatusLunch}/>

                                                                                    </div>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="status_car_sharing"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Service voiturié`}
                                                                                                         checked={this.state.status_car_sharing || false}
                                                                                                         value={this.state.status_car_sharing}
                                                                                                         onChange={this.handleStatusCarSharing}/>

                                                                                    </div>
                                                                                    <div className="col-md-3 mx-auto">

                                                                                        <FieldInputCheck name="status_parking"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Parking`}
                                                                                                         checked={this.state.status_parking || false}
                                                                                                         value={this.state.status_parking}
                                                                                                         onChange={this.handleStatusParking}/>

                                                                                    </div>
                                                                                </div>

                                                                                <div className={"row"}>
                                                                                    <div className="col-md-3">

                                                                                        <FieldInputCheck name="dry_cleaning"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Pressing`}
                                                                                                         checked={this.state.dry_cleaning || false}
                                                                                                         value={this.state.dry_cleaning}
                                                                                                         onChange={this.handleDryCleaning}/>

                                                                                    </div>
                                                                                    <div className="col-md-3">

                                                                                        <FieldInputCheck name="status_consiegerie"
                                                                                                         type='checkbox'
                                                                                                         namecheck={`Bagagerie`}
                                                                                                         checked={this.state.status_consiegerie || false}
                                                                                                         value={this.state.status_consiegerie}
                                                                                                         onChange={this.handleStatusConsiegerie}/>

                                                                                    </div>
                                                                                </div>

                                                                                <br/>
                                                                                <div className="row">

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
                                                            <b>Enregister</b>
                                                        </button>
                                                    </div>

                                                    </Form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            </div>
                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>

            </Fragment>

        )
    }
}

export default AnnoncereservationEdit;
