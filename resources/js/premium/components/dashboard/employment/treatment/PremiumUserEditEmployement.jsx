import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../../inc/FooterPremiumUser";
import {Button, CardBody, Form, FormGroup, Input, InputGroup, Row} from "reactstrap";
import NavPremiumUserEmployement from "../NavPremiumUserEmployement";
import ReactQuill from "react-quill";
const abbrev = ['', 'k', 'M', 'B', 'T'];




class PremiumUserEditEmployement extends Component {
    constructor(props) {
        super(props);


        this.updateItem = this.updateItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.state = {
            id: '',
            title: '',
            photo: '',
            price: '',
            status: '',
            district: '',
            description: '',
            city_id: '',
            categoryemployment_id: '',
            showDefaultImage: false,
            errors: [],
            cities: [],
            categoryemployments: [],
            employments_count: [],
            employmentsactive_count: [],
            employmentsunactive_count: [],
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

    updateImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file['size'] < 15111775){
            reader.onloadend = (file) => {
                this.setState({ file: file, photo: reader.result, showDefaultImage: false });
            };
            reader.readAsDataURL(file)
        }else{
            $.notify({
                    //,
                    message: 'Le fichier ne peut pas être supérieure à 15 MB'
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


    activeItem(id){
        //Envoyer la requet au server
        let url = route('employmentsactivated_site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    //,
                    message: 'Offre activée avec succès'
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
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })

    }

    unactiveItem(id){
        //Envoyer la requet au server
        let url = route('employmentsunactivated_site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    // title: 'Update FAQ',
                    message: 'Offre déactivée avec succès'
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
            $.notify("Ooop! Something wrong. Try later", {
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

                const url = route('employmentsdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Offre supprimée avec success'
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
                    this.props.history.goBack();
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

    updateItem(e) {
        e.preventDefault();

        let item = {
            title: this.state.title,
            photo: this.state.photo,
            district: this.state.district,
            price: this.state.price,
            city_id: this.state.city_id,
            description: this.state.description,
            categoryemployment_id: this.state.categoryemployment_id,
        };
        let Itemdata = this.props.match.params.employment;
        dyaxios.put(route('employmentsupdate_site', [Itemdata]), item)
            .then(() => {
                $.notify({
                        //,
                        message: 'Votre offre a bien été modifiée'
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

    loadItems(){

        let itemuser = this.props.match.params.user;
        let Itemdata = this.props.match.params.employment;
        dyaxios.get(route('api.employments_premium_count',[itemuser])).then(response =>
            this.setState({employments_count: response.data}));

        dyaxios.get(route('api.employments_premiumactive_count',[itemuser])).then(response => {
            this.setState({employmentsactive_count: response.data})});

        dyaxios.get(route('api.employments_premiumunactive_count',[itemuser])).then(response =>
            this.setState({employmentsunactive_count: response.data}));
        let url = route('api.employmentlugin_site', [Itemdata]);
        dyaxios.get(url).then(response =>
            this.setState({
                id: response.data.id,
                title: response.data.title,
                price: response.data.price,
                district: response.data.district,
                photo: response.data.photo,
                city_id: response.data.city_id,
                status: response.data.status,
                categoryemployment_id: response.data.categoryemployment_id,
                description: response.data.description,
            }));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
        fetch(route('api.categoryemployment_site')).then(res => res.json()).then((result) => { this.setState({ categoryemployments: result }) });
        fetch(route('api.all_cities')).then(res => res.json()).then((result) => { this.setState({ cities: result }) });
    }

    data_countFormatter(employments_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(employmentsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employmentsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(employmentsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employmentsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {categoryemployments,cities,photo,employments_count,employmentsactive_count,employmentsunactive_count} = this.state;
        return (

            <>
                <Helmet title={`${this.state.title || "Dashboard " + $userIvemo.first_name} - ${$name_site}`} />

                <PremiumVerticalNavUserSite {...this.props} />

                <div className="main-panel">

                    <PremiumHorizontalNavUserSite />

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-primary card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">dialpad</i>
                                            </div>
                                            <p className="card-category"><b>Offres d'emplois</b></p>
                                            <h3 className="card-title"><b>{this.data_countFormatter(employments_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">dialpad</i> Posts sur les offres d'emplois, services et formations
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-success card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">done</i>
                                            </div>
                                            <p className="card-category"><b>Activées</b></p>
                                            <h3 className="card-title"><b>{this.dataactive_countFormatter(employmentsactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">done</i> Offres activées
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-danger card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">remove</i>
                                            </div>
                                            <p className="card-category"><b>Déactivés</b></p>
                                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(employmentsunactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">remove</i> Offres déactivées
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-icon card-header-primary">
                                            <div className="card-icon">
                                                <i className="material-icons">dialpad</i>
                                            </div>
                                            <p className="card-category">
                                                <b>{this.state.title || "Annonces sur les offres d'emploi, services et formations"}</b>
                                            </p>
                                            <h3 className="card-title" style={{ color: "red" }}>
                                                <b>{this.data_countFormatter(employments_count)}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">dialpad</i>
                                                <b>{this.state.title || "Annonces sur les offres d'emplois, services et formations"}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-primary">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h4 className="card-title">
                                                        <b>{this.state.title || "Annonces sur les offres d'emplois, services et formations"}</b>
                                                    </h4>
                                                    <p className="card-title">{this.state.title || "Annonces sur les offres d'emplois, services et formations"}</p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                <span>
                                                    <i id="tooltipSize" className="material-icons">dialpad</i>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="toolbar">
                                                <div className="text-right ml-auto">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/employments/`}
                                                          className="btn btn-secondary btn-just-icon btn-sm" title="Retour a vos articles">
                                                        <i className="material-icons">arrow_back</i>
                                                    </Link>
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/employments/create/`}
                                                          className="btn btn-primary btn-just-icon btn-sm" title="Poster votre article sur la location">
                                                        <i className="material-icons">add</i>
                                                    </Link>
                                                    {this.state.status ?
                                                        <>
                                                            <button type="button" rel="tooltip" onClick={() => this.unactiveItem(this.state.id)}
                                                                    className="btn btn-success btn-just-icon btn-sm" title="Déactiver" >
                                                                <i className="material-icons">done</i>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" onClick={() => this.activeItem(this.state.id)}
                                                                    className="btn btn-rose btn-just-icon btn-sm" title="Activer" >
                                                                <i className="material-icons">remove</i>
                                                            </button>
                                                        </>

                                                    }

                                                    <Button
                                                        className="btn btn-danger btn-sm btn-just-icon" onClick={() => this.deleteItem(this.state.id)} title="Supprimer cette article">
                                                        <i className="material-icons">delete_forever</i>
                                                    </Button>{" "}
                                                </div>

                                            </div>

                                            <Form role="form" onSubmit={this.updateItem} acceptCharset="UTF-8">

                                                <CardBody>

                                                    <Row>
                                                        <div className="col-md-12">
                                                            <label className="labels">
                                                                Donner un titre à cet article
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <FormGroup>
                                                                <Input id='title'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                       name='title'
                                                                       maxLength="200"
                                                                       minLength="4"
                                                                       placeholder="Titre de l'article"
                                                                       aria-label="Titre de l'article"
                                                                       value={this.state.title || ''}
                                                                       required
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('title')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                    <Row>
                                                        <div className="col-md-6">
                                                            <label className="labels">
                                                                Quel est le montant de votre offre
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <FormGroup>
                                                                <Input id='price'
                                                                       type='number'
                                                                       maxLength="13"
                                                                       minLength="4"
                                                                       className={`form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
                                                                       name='price'
                                                                       placeholder="Montant de votre offre"
                                                                       aria-label="Montant de votre offre"
                                                                       autoComplete="price"
                                                                       value={this.state.price || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('price')}
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="labels">
                                                                Quartier ou lieu?
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <FormGroup>
                                                                <Input id='district'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('district') ? 'is-invalid' : ''}`}
                                                                       name='district'
                                                                       placeholder="Quartier"
                                                                       aria-label="Quartier"
                                                                       autoComplete="Quartier"
                                                                       value={this.state.district || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('district')}
                                                            </FormGroup>
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
                                                                Selectionez la catégorie
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <FormGroup>

                                                                <select name={'categoryemployment_id'} value={this.state.categoryemployment_id || ""}
                                                                        className={`form-control ${this.hasErrorFor('categoryemployment_id') ? 'is-invalid' : ''}`}
                                                                        id="categoryemployment_id" onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Selectioner une catégorie</option>
                                                                    {categoryemployments.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryemployment_id')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>
                                                    <br/>
                                                    <br/>
                                                    <Row>
                                                        <div className="col-md-6 mx-auto">
                                                            <div className="profile text-center">
                                                                <img src={this.state.showDefaultImage ? `${$url_site}/assets/vendor/assets/img/image_placeholder.jpg` : photo} alt={'name'} />
                                                                <input id="photo" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''}`} style={{display: "none"}} name="photo" />
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
                                                                    Décrivez votre article
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <br />
                                                                <ReactQuill theme="snow" modules={this.modules}
                                                                            formats={this.formats}
                                                                            placeholder="Laisser votre déscription..."
                                                                            className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                            value={this.state.description || ''}
                                                                            onChange={this.handleChangeBody} />
                                                                {this.renderErrorFor('description')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                </CardBody>

                                                <div className="submit text-center">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/employments/`} className="btn btn-secondary">
                                                        <i className="now-ui-icons ui-1_simple-delete"/> Annuler
                                                    </Link>
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Mettre à jour l'offre</b>
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FooterPremiumUser />

                </div>
            </>

        )
    }
}

export default PremiumUserEditEmployement;
