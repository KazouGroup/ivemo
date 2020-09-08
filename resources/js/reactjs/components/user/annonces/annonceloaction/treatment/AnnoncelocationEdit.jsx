import React, {Component, Fragment} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Row, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import moment from "moment";
import Navlinknewannoncelocation from "./Navlinknewannoncelocation";
import HelmetSite from "../../../../inc/user/HelmetSite";
import FieldInput from "../../../../inc/vendor/FieldInput";
import LoaderLdsDefaultPage from "../../../../inc/user/annimation/LoaderLdsDefaultPage";
import LazyLoad from "react-lazyload";
import Navannoncelocationsbyuser from "../inc/Navannoncelocationsbyuser";

class AnnoncelocationEdit extends Component {
    constructor(props) {
        super(props);


        this.updateimageItem = this.updateimageItem.bind(this);
        this.saveimageItem = this.saveimageItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteimageItem = this.deleteimageItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.statusuploadimagesItem = this.statusuploadimagesItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.uploadimagesModalItem = this.uploadimagesModalItem.bind(this);
        this.uploadPhotoImage = this.uploadPhotoImage.bind(this);
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
            slug: '',
            link_video: '',
            award_price: '',
            photo: '',
            created_at: '',
            countuploadimages: '',
            visiable: 6,
            categoryannoncelocation_id: '',
            periodeannonce_id: '',
            annoncetype: [],
            categoryannoncelocation: [],
            uploadimages: [],
            city: [],
            user: [],
            errors: [],
            cities: [],
            periodeannonces: [],
            categoryannoncelocations: [],
            editmode: false,
            showDefaultNewPhotoImage: false,
        };
        this.modules = {
            toolbar: [
                [{'size': ['small', false, 'large', 'huge']}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'align': []}],
                ['link'],
                [{'color': []}, {'background': []}],
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
        this.setState({description: value});
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
        let itemannoncelocation = this.props.match.params.annoncelocation;
        dyaxios.post(route('annoncelocationsenduploadimage_site',[itemannoncelocation]), item)
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
            award_price: this.state.award_price,
            link_video: this.state.link_video,
            city_id: this.state.city_id,
            categoryannoncelocation_id: this.state.categoryannoncelocation_id,
            periodeannonce_id: this.state.periodeannonce_id,
        };
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemannoncelocation = this.props.match.params.annoncelocation;
        dyaxios.put(route('annoncelocationsupdate_site', [itemannoncetype, itemannoncelocation]), item)
            .then(() => {
                $.notify({
                        //,
                        message: 'Votre annonce a bien été modifiée'
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
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooops! Quelque chose ne va pas. Essayer plus tard...", {
                allow_dismiss: false,
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
                const url = route('annonces_locations_delete.site', id);
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
                    this.props.history.push(`/al_data/${itemannoncetype}/new/`);
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

    activeItem(id) {
        //Envoyer la requet au server
        let url = route('annonces_locations_status.site', [id]);
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

    statusuploadimagesItem(item) {
        //Envoyer la requet au server
        let url = route('statusuploadimage_site', [item.id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        }).catch(error => console.error(error))
    }

    unactiveItem(id) {
        //Envoyer la requet au server
        let url = route('annonces_locations_status.site', [id]);
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


    loadItems() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemannoncelocation = this.props.match.params.annoncelocation;
        let url = route('api.annoncelocationsbyannoncetypebyannoncelocation_site', [itemannoncetype, itemannoncelocation]);
        dyaxios.get(url).then(response =>
            this.setState({
                id: response.data.id,
                title: response.data.title,
                status: response.data.status,
                surface: response.data.surface,
                price: response.data.price,
                pieces: response.data.pieces,
                district: response.data.district,
                rooms: response.data.rooms,
                description: response.data.description,
                city_id: response.data.city_id,
                link_video: response.data.link_video,
                award_price: response.data.award_price,
                slug: response.data.slug,
                created_at: response.data.created_at,
                categoryannoncelocation_id: response.data.categoryannoncelocation_id,
                periodeannonce_id: response.data.periodeannonce_id,
                annoncetype: response.data.annoncetype,
                categoryannoncelocation: response.data.categoryannoncelocation,
                city: response.data.city,
                user: response.data.user,
                uploadimages: response.data.uploadimages,
                countuploadimages: response.data.countuploadimages,
            }));
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
        fetch(route('api.categoryannoncelocation_site')).then(res => res.json()).then((result) => {
            this.setState({categoryannoncelocations: result})
        });
        fetch(route('api.all_cities')).then(res => res.json()).then((result) => {
            this.setState({cities: result})
        });
        dyaxios.get(route('api.periodeannonces')).then(response => this.setState({ periodeannonces: response.data, }));

    }

    numberWithCommas() {
        return this.state.price.toLocaleString(navigator.language, {minimumFractionDigits: 0});
    }

    render() {
        const {categoryannoncelocations, cities,periodeannonces, visiable, uploadimages} = this.state;
        const avatar_style = {
            width: "80px",
            height: "40px",
            top: "15px",
            left: "15px",
        };
        return (
            <Fragment>
                <HelmetSite title={`${this.state.title || $name_site} - ${$name_site}`}/>
                <div className="landing-page sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite/>
                    </nav>
                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br/>
                                <div className="row">
                                    <div className="col-md-4">

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

                                    <div className="col-md-8 mx-auto">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <button type="button" className="btn btn-neutral btn-sm"
                                                        onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à
                                                    vos annonces </b>
                                                </button>
                                            </div>
                                            <div className="text-right ml-auto">
                                                <Navlinknewannoncelocation {...this.props} />
                                                {this.state.status && (
                                                    <Link
                                                        to={`/als/${this.state.annoncetype.slug}/${this.state.categoryannoncelocation.slug}/${this.state.city.slug}/${this.state.user.slug}/${this.state.slug}/`}
                                                        className="btn btn-info">
                                                        <b>Voir votre annonce</b>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        {$userIvemo.avatar === null ?
                                                            <img style={{height: "40px", width: "80px"}}
                                                                 alt={$userIvemo.first_name}
                                                                 src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                            :
                                                            <img src={$userIvemo.avatar}
                                                                 style={{height: "40px", width: "80px"}}
                                                                 alt={$userIvemo.first_name}
                                                                 className="avatar"/>
                                                        }
                                                        <div className="mx-3">
                                                                <span className="text-dark font-weight-600 text-sm">
                                                                    <b>{$userIvemo.first_name}</b>
                                                                    <small className="d-block text-muted">
                                                                        <b>{moment($userIvemo.created_at).format('LL')}</b>
                                                                    </small>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        {!this.state.status ?
                                                            <>
                                                                <Button
                                                                    onClick={() => this.activeItem(this.state.id)}
                                                                    className="btn btn-primary btn-icon btn-sm"
                                                                    title="Annonce activé">
                                                                    <i className="now-ui-icons ui-1_simple-delete"/>
                                                                </Button>
                                                            </>
                                                            :
                                                            <>
                                                                <Button
                                                                    onClick={() => this.unactiveItem(this.state.id)}
                                                                    className="btn btn-success btn-icon btn-sm"
                                                                    title="Annonce déactivé">
                                                                    <i className="now-ui-icons ui-1_check"/>
                                                                </Button>
                                                            </>

                                                        }
                                                        <Button
                                                            className="btn btn-sm btn-icon btn-danger"
                                                            onClick={() => this.deleteItem(this.state.id)}
                                                            title="Suprimer cette annonce">
                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                        </Button>
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

                                                                                <div className="toolbar">
                                                                                    {this.state.countuploadimages > 10 && (

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

                                                                                                            <th  className="text-right">
                                                                                                                {moment(item.created_at).fromNow()}
                                                                                                            </th>
                                                                                                            <td className="text-right">
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
                                                                                                des {this.state.countuploadimages} images</b>
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
                                                                                    {this.renderErrorFor('photo')}
                                                                                    <div className="text-center">
                                                                                        <label htmlFor="photo" className="btn btn-primary">
                                                                                            <span className="btn-inner--text">Selectioner / Changer</span>
                                                                                        </label>
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
                                                    <div id="accordion" role="tablist" aria-multiselectable="false"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab"
                                                                 id="headingTypebien">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseTypebien" aria-expanded="true"
                                                                   aria-controls="collapseTypebien">
                                                                    <b>Type de bien </b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTypebien" className="collapse"
                                                                 role="tabpanel" aria-labelledby="headingTypebien">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">
                                                                                <label className="labels">
                                                                                    Donner un titre a ce bien
                                                                                    <span
                                                                                        className="text-danger">*</span>
                                                                                </label>
                                                                                <div className="input-group">
                                                                                    <div
                                                                                        className="input-group-prepend">
                                                                                    <span
                                                                                        className="input-group-text"><i
                                                                                        className="now-ui-icons users_circle-08"></i></span>
                                                                                    </div>
                                                                                    <FieldInput name="title" type='text'
                                                                                                minLength="5"
                                                                                                maxLength="200"
                                                                                                placeholder="Titre du bien"
                                                                                                value={this.state.title}
                                                                                                handleFieldChange={this.handleFieldChange}
                                                                                                hasErrorFor={this.hasErrorFor}
                                                                                                renderErrorFor={this.renderErrorFor}
                                                                                                required="required"/>
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
                                                                                            Garantie ?
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
                                                                                            Periode ?
                                                                                            <span
                                                                                                className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <select
                                                                                                name="periodeannonce_id"
                                                                                                value={this.state.periodeannonce_id}
                                                                                                className={`form-control`}
                                                                                                id="periodeannonce_id"
                                                                                                onChange={this.handleFieldChange}
                                                                                                required="required">
                                                                                                <option value=""
                                                                                                        disabled>Selectioner
                                                                                                    une periode
                                                                                                </option>
                                                                                                {periodeannonces.map((item) => (
                                                                                                    <option
                                                                                                        key={item.id}
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
                                                                                                        disabled>Selectioner
                                                                                                    une category
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
                                                                                                        disabled>Selectioner
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
                                                                                            Localisation du bien?
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

                                                    <div id="accordion" role="tablist" aria-multiselectable="false"
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
                                                            <div id="collapseOne" className="collapse" role="tabpanel"
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
                                                                                            <span
                                                                                                className="text-danger">*</span>
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="surface"
                                                                                                        type='number'
                                                                                                        placeholder="Surface"
                                                                                                        value={this.state.surface}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4 ml-auto mr-auto">
                                                                                        <label htmlFor="pieces">
                                                                                            Pièces (optionnel)
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="pieces"
                                                                                                        type='number'
                                                                                                        placeholder="Pièces"
                                                                                                        value={this.state.pieces}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-4 ml-auto mr-auto">
                                                                                        <label htmlFor="Chambres">Chambres
                                                                                            (optionnel)</label>
                                                                                        <div className="form-group">
                                                                                            <FieldInput name="rooms"
                                                                                                        type='number'
                                                                                                        placeholder="Chambres"
                                                                                                        value={this.state.rooms}
                                                                                                        handleFieldChange={this.handleFieldChange}
                                                                                                        hasErrorFor={this.hasErrorFor}
                                                                                                        renderErrorFor={this.renderErrorFor}
                                                                                                        required="required"/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <small>*optionnel: les champs ne
                                                                                        sont
                                                                                        pas obligatoires vous avez le
                                                                                        choix
                                                                                        de les remplire ou pas</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id="accordion" role="tablist" aria-multiselectable="false"
                                                         className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab"
                                                                 id="headingDescription">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseDescription" aria-expanded="true"
                                                                   aria-controls="collapseDescription">
                                                                    <b>Description de l'annonce </b>
                                                                </a>
                                                            </div>
                                                            <div id="collapseDescription" className="collapse"
                                                                 role="tabpanel" aria-labelledby="headingDescription">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">

                                                                                {/*
                                                                                   <label className="labels">
                                                                                    Description du bien en video (optionnel)
                                                                                </label>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                    <span
                                                                                        className="input-group-text"><i
                                                                                        className="now-ui-icons users_circle-08"></i></span>
                                                                                    </div>
                                                                                    <FieldInput name="link_video" type='text' minLength="5" maxLength="5000" placeholder="Description en video" value={this.state.link_video}
                                                                                                handleFieldChange={this.handleFieldChange}
                                                                                                hasErrorFor={this.hasErrorFor}
                                                                                                renderErrorFor={this.renderErrorFor}/>
                                                                                </div>

                                                                                */}

                                                                                <div className="form-group">
                                                                                    <label className="labels">
                                                                                        Décrivez votre article
                                                                                        <span
                                                                                            className="text-danger">*</span>
                                                                                    </label>
                                                                                    <br/>
                                                                                    <ReactQuill theme="snow"
                                                                                                modules={this.modules}
                                                                                                formats={this.formats}
                                                                                                className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                                                value={this.state.description || ''}
                                                                                                onChange={this.handleChangeBody}/>
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
                                                        <button className="btn btn-secondary" type="button"
                                                                onClick={this.props.history.goBack} title="Annuler">
                                                            <b>Annuler</b>
                                                        </button>
                                                        <button className="btn btn-primary" type="submit"
                                                                title="Mettre à jour l'annonce">
                                                            <b>Mettre à jour votre annonce</b>
                                                        </button>
                                                    </div>
                                                </Form>

                                            </div>
                                        </div>
                                    </div>


                                    {/*
                                        <div className="col-lg-4 col-md-12 mx-auto">
                                            <div className="submit text-center">
                                                <Navlinknewannoncelocation {...this.props} />
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
                                        */}
                                </div>

                            </div>
                        </div>

                        <FooterBigUserSite/>
                    </div>
                </div>

            </Fragment>

        )
    }
}

export default AnnoncelocationEdit;
