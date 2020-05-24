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


class EmploymentEdit extends Component {
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
    activeItem(id){
        //Envoyer la requet au server
        let url = route('employmentsactivated_site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    //,
                    message: 'Annonce activé avec succès'
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
                    message: 'Annonce désactiver avec succès'
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

                const url = route('employmentsdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blogs suprimée avec success'
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
                    $.notify("Ooop! Une erreur est survenue", {
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
                    message: 'Votre annonce a bien été modifié'
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
                $.notify("Ooop! Quelque chose ne va pas. Essayer plus tard...", {
                    allow_dismiss: false,
                    type: 'danger',
                    animate: {
                        enter: 'animate__animated animate__bounceInDown',
                        exit: 'animate__animated animate__bounceOutUp'
                    }
                });
            })
    }

    loadItems() {
        let Itemdata = this.props.match.params.employment;
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

    render() {
        const { photo, categoryemployments,cities } = this.state;
        const composantTitle = `${this.state.title || $name_site}`;
        document.title = `${composantTitle} - ${$name_site}`;
        return (
            <div className="about-us sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-primary">
                    <NavUserSite />
                </nav>
                <div className="wrapper">

                    <div className="main main-raised">
                        <div className="container">
                            <br />

                            <form role="form" onSubmit={this.updateItem} acceptCharset="UTF-8">

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
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces </b>
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
                                                        <NavLink to={`/pro/${$userIvemo.slug}`}>
                                                            <img src={$userIvemo.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/pro/${$userIvemo.slug}`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                <small className="d-block text-muted"><b>{moment($userIvemo.created_at).format('LL')}</b></small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        {this.state.status ?
                                                            <>
                                                                <button type="button" rel="tooltip" onClick={() => this.unactiveItem(this.state.id)}
                                                                        className="btn btn-success btn-icon btn-sm" >
                                                                    <i className="now-ui-icons ui-1_check"/>
                                                                </button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" onClick={() => this.activeItem(this.state.id)}
                                                                        className="btn btn-primary btn-icon btn-sm">
                                                                    <i className="now-ui-icons ui-1_simple-delete"/>
                                                                </button>
                                                            </>

                                                        }
                                                        <Button
                                                            className="btn btn-sm btn-icon btn-danger" onClick={() => this.deleteItem(this.state.id)} >
                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                        </Button>{" "}
                                                    </div>
                                                </div>
                                                <hr />
                                                <CardBody>

                                                    <Row>
                                                        <div className="col-md-12">
                                                            <label className="labels">
                                                                Donner un titre à cet article
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="now-ui-icons users_circle-08"/></span>
                                                                </div>
                                                                <Input id='title'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                       name='title'
                                                                       maxLength="200"
                                                                       minLength="4"
                                                                       placeholder="Titre de l'article"
                                                                       aria-label="Titre de l'article"
                                                                       value={this.state.title || ''}

                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('title')}
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
                                                                <Input id='price'
                                                                       type='number'
                                                                       maxLength="13"
                                                                       minLength="4"
                                                                       className={`form-control ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
                                                                       name='price'
                                                                       placeholder="Montant de votre annonce"
                                                                       aria-label="Montant de votre annonce"
                                                                       autoComplete="price"
                                                                       value={this.state.price || ""}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('price')}
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
                                                                <input id="photo" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="photo" />
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
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                </CardBody>

                                                <div className="submit text-center">
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Mettre à jour l'annonce</b>
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
        )
    }
}

export default withRouter(EmploymentEdit);