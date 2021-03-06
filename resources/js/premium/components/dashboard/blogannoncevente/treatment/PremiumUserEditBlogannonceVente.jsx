import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../../inc/FooterPremiumUser";
import {Button, CardBody, Form, FormGroup, Input, InputGroup, Row} from "reactstrap";
import NavPremiumUserBlogannonceVente from "../NavPremiumUserBlogannonceVente";
import ReactQuill from "react-quill";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PremiumUserEditBlogannonceVente extends Component {
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
            title: '',
            photo: '',
            description: '',
            red_time: '',
            categoryannoncevente_id: '',
            showDefaultImage: false,
            errors: [],
            categoryannonceventes: [],
            blogannonceventes_count: [],
            blogannonceventesactive_count: [],
            blogannonceventesunactive_count: [],
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
                    message: 'Le fichier ne peut pas ??tre sup??rieure ?? 15 MB'
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

    updateItem(e) {
        e.preventDefault();

        let item = {
            title: this.state.title,
            status: this.state.status,
            photo: this.state.photo,
            red_time: this.state.red_time,
            description: this.state.description,
            categoryannoncevente_id: this.state.categoryannoncevente_id,
        };
        let itemslugin = this.props.match.params.blogannoncevente;
        dyaxios.put(route('blogannoncecategoryventeupdate_site', [itemslugin]), item)
            .then(() => {
                $.notify({
                        //,
                        message: 'Votre article de blog a bien ??t?? modifi??'
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
            $.notify("Ooops! Something wrong. Try later...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    activeItem(id){
        //Envoyer la requet au server
        let url = route('blogannoncecategoryventeactivated_site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    //,
                    message: 'Article de blog activ?? avec succ??s'
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

    unactiveItem(id){
        //Envoyer la requet au server
        let url = route('blogannoncecategoryventeunactivated_site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    // title: 'Update FAQ',
                    message: 'Article de blog d??sactiv?? avec succ??s'
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
            text: "??tes-vous s??r de vouloir ex??cuter cette action?",
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

                const url = route('blogannoncecategoryventedelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blog supprim?? avec succ??s'
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

    loadItems() {
        let itemuser = this.props.match.params.user;
        let Itemdata = this.props.match.params.blogannoncevente;
        dyaxios.get(route('api.blogannonceventes_premium_count',[itemuser])).then(response =>
            this.setState({blogannonceventes_count: response.data}));

        dyaxios.get(route('api.blogannonceventes_premiumactive_count',[itemuser])).then(response => {
            this.setState({blogannonceventesactive_count: response.data})});

        dyaxios.get(route('api.blogannonceventes_premiumunactive_count',[itemuser])).then(response =>
            this.setState({blogannonceventesunactive_count: response.data}));
        let url = route('api.blogannonceblogcategoryventeslugin_site', [Itemdata]);
        dyaxios.get(url).then(response =>
            this.setState({
                id: response.data.id,
                title: response.data.title,
                status: response.data.status,
                photo: response.data.photo,
                red_time: response.data.red_time,
                categoryannoncevente_id: response.data.categoryannoncevente_id,
                description: response.data.description,
            }));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
        fetch(route('api.categoryannoncevente_site')).then(res => res.json()).then((result) => { this.setState({ categoryannonceventes: result }) })
    }

    data_countFormatter(blogannonceventes_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(blogannonceventesactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(blogannonceventesunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {categoryannonceventes,photo,blogannonceventes_count,blogannonceventesactive_count,blogannonceventesunactive_count} = this.state;
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
                                                <i className="material-icons">view_headline</i>
                                            </div>
                                            <p className="card-category"><b>Articles</b></p>
                                            <h3 className="card-title"><b>{this.data_countFormatter(blogannonceventes_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">view_headline</i> Articles sur les
                                                annonces ventes
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
                                            <p className="card-category"><b>Activ??s</b></p>
                                            <h3 className="card-title"><b>{this.dataactive_countFormatter(blogannonceventesactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">done</i> Articles activ??s
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
                                            <p className="card-category"><b>D??sactiv??s</b></p>
                                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(blogannonceventesunactive_count)}</b></h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">remove</i> Articles d??sactiv??s
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
                                                <i className="material-icons">view_headline</i>
                                            </div>
                                            <p className="card-category">
                                                <b>Articles sur les annonces ventes</b>
                                            </p>
                                            <h3 className="card-title" style={{ color: "red" }}>
                                                <b>{this.data_countFormatter(blogannonceventes_count)}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">view_headline</i>
                                                <b>Articles sur les annonces ventes</b>
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
                                                        <b>Articles sur les annonces ventes</b>
                                                    </h4>
                                                    <p className="card-title">Articles sur les annonces ventes</p>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                <span>
                                                    <i id="tooltipSize" className="material-icons">view_headline</i>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="toolbar">
                                                <div className="text-right ml-auto">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/`}
                                                          className="btn btn-secondary btn-just-icon btn-sm" title="Retour a vos articles">
                                                        <i className="material-icons">arrow_back</i>
                                                    </Link>
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/create/`}
                                                          className="btn btn-primary btn-just-icon btn-sm" title="Poster un votre article sur la vents">
                                                        <i className="material-icons">add</i>
                                                    </Link>
                                                    {this.state.status ?
                                                        <>
                                                            <button type="button" rel="tooltip" onClick={() => this.unactiveItem(this.state.id)}
                                                                    className="btn btn-success btn-just-icon btn-sm" title="D??activer" >
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
                                                            <label htmlFor="title">Donner un titre ?? cet article</label>
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
                                                            <label htmlFor="title">Estimer <b>{this.state.red_time} min lecture</b></label>
                                                            <FormGroup>
                                                                <Input id='red_time'
                                                                       type='number'
                                                                       className={`form-control ${this.hasErrorFor('red_time') ? 'is-invalid' : ''}`}
                                                                       name='red_time'
                                                                       maxLength="20"
                                                                       minLength="1"
                                                                       placeholder="Estimer un temps de lecture en min"
                                                                       aria-label="Estimer un temp de lecture "
                                                                       value={this.state.red_time || ''}
                                                                       required
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('red_time')}
                                                            </FormGroup>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label htmlFor="title">Selectionez la cat??gorie</label>
                                                            <FormGroup>

                                                                <select name={'categoryannoncevente_id'} value={this.state.categoryannoncevente_id}
                                                                        className={`form-control ${this.hasErrorFor('categoryannoncevente_id') ? 'is-invalid' : ''}`}
                                                                        id="categoryannoncevente_id" onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Selectioner une cat??gorie</option>
                                                                    {categoryannonceventes.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryannoncevente_id')}
                                                                <br/>
                                                                {this.renderErrorFor('categoryannoncelocation_id')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>
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
                                                                    D??crivez votre article
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <br />
                                                                <ReactQuill theme="snow" modules={this.modules}
                                                                            formats={this.formats}
                                                                            placeholder="Laisser votre d??scription..."
                                                                            className={`editor-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                                                            value={this.state.description || ''}
                                                                            onChange={this.handleChangeBody} />
                                                                {this.renderErrorFor('description')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>

                                                </CardBody>

                                                <div className="submit text-center">
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/`} className="btn btn-secondary">
                                                        <i className="now-ui-icons ui-1_simple-delete"/> Annuler
                                                    </Link>
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Mettre ?? jour l'article de blog</b>
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

export default PremiumUserEditBlogannonceVente;
