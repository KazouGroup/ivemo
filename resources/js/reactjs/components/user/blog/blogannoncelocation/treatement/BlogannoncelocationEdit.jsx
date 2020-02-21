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
import NavUserSite from "../../../../inc/user/NavUserSite";
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";


class BlogannoncelocationEdit extends Component {
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
            status: '',
            description: '',
            red_time: '',
            categoryannoncelocation_id: '',
            showDefaultImage: false,
            errors: [],
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
        reader.onloadend = (file) => {
            this.setState({ file: file, photo: reader.result, showDefaultImage: false });
        };
        reader.readAsDataURL(file)
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
        let url = route('blogannoncecategorylocationactive_site.site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    //,
                    message: 'Article de blogs activé avec succès'
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
            /** End alert ***/
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
        })

    }

    unactiveItem(id){
        //Envoyer la requet au server
        let url = route('blogannoncecategorylocationunactive_site.site',[id]);
        dyaxios.get(url).then(() => {

            /** Alert notify bootstrapp **/
            $.notify({
                    // title: 'Update FAQ',
                    message: 'Article de blogs désactiver avec succès'
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
            /** End alert ***/
            this.loadItems();
        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
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

                const url = route('blogannoncecategorylocationdelete_site',id);
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
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
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
            red_time: this.state.red_time,
            description: this.state.description,
            categoryannoncelocation_id: this.state.categoryannoncelocation_id,
        };
        let itemslugin = this.props.match.params.blogannoncelocation;
        dyaxios.put(route('blogannoncecategorylocationupdate_site', [itemslugin]), item)
            .then(() => {
                $.notify({
                    //,
                    message: 'Votre article de blogs a bien été modifié'
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
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    loadItems() {
        let Itemdata = this.props.match.params.blogannoncelocation;
        let url = route('api.blogannonceblogcategorylocationslugin_site', [Itemdata]);
        dyaxios.get(url).then(response =>
            this.setState({
                id: response.data.id,
                title: response.data.title,
                photo: response.data.photo,
                status: response.data.status,
                red_time: response.data.red_time,
                categoryannoncelocation_id: response.data.categoryannoncelocation_id,
                description: response.data.description,
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
        fetch(route('api.categoryannoncelocation_site')).then(res => res.json()).then((result) => { this.setState({ categoryannoncelocations: result }) })
    }

    render() {
        const { photo, categoryannoncelocations } = this.state;
        const composantTitle = `${this.state.title || 'Ivemo'}`;
        document.title = `Edit ${composantTitle} | Ivemo`;
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

                                    <div className="col-lg-10 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos blogs </b>
                                            </button>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <b>{this.state.title}</b>
                                                </div>

                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`/@${$userIvemo.slug}`}>
                                                            <img src={$userIvemo.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/@${$userIvemo.slug}`} className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name}</b>
                                                                <small className="d-block text-muted">12 janv 2019</small>
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
                                                            <label htmlFor="title">Donner un titre à cet article</label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="now-ui-icons users_circle-08"/></span>
                                                                </div>
                                                                <Input id='title'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                                       name='title'
                                                                       placeholder="Titre de l'article"
                                                                       aria-label="Titre de l'article"
                                                                       value={this.state.title || ''}
                                                                       required
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('title')}
                                                            </InputGroup>
                                                        </div>
                                                    </Row>

                                                    <Row>
                                                        <div className="col-md-6">
                                                            <label htmlFor="title">Estmer en temp de lecture en mim</label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="now-ui-icons tech_watch-time"/></span>
                                                                </div>
                                                                <Input id='red_time'
                                                                       type='number'
                                                                       className={`form-control ${this.hasErrorFor('red_time') ? 'is-invalid' : ''}`}
                                                                       name='red_time'
                                                                       placeholder="Ex: 8"
                                                                       aria-label="Titre de l'article"
                                                                       value={this.state.red_time || ''}
                                                                       required
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('red_time')}
                                                            </InputGroup>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="title">Selectionez la categorie</label>
                                                            <FormGroup>
                                                                <select name={'categoryannoncelocation_id'} value={this.state.categoryannoncelocation_id}
                                                                    className={`form-control`}
                                                                    id="categoryannoncelocation_id" onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Selectioner une category</option>
                                                                    {categoryannoncelocations.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryannoncelocation_id')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="col-md-4 mx-auto">
                                                            <div className="profile text-center">
                                                                <img src={this.state.showDefaultImage ? "https://www.kazoucoin.com/assets/img/photo.jpg" : photo} alt={'name'} />
                                                                <input id="photo" type="file" onChange={this.updateImage} className={`form-control ${this.hasErrorFor('photo') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="photo" />
                                                                {this.renderErrorFor('photo')}
                                                                <label htmlFor="photo" className="btn btn-primary">
                                                                    <span className="btn-inner--text">Ajouter l'image</span>
                                                                </label>
                                                                <button hidden={this.state.showDefaultImage ? true : false} onClick={this.removeImage} className="btn btn-danger">
                                                                    <span className="btn-inner--text">Remove</span>
                                                                </button>
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
                                                        <b>Mettre à jour l'article de blog</b>
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

export default withRouter(BlogannoncelocationEdit);