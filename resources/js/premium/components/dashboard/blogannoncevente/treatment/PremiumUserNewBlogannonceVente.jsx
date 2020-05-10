import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../../inc/FooterPremiumUser";
import {Button, CardBody, FormGroup, Input, InputGroup, Row} from "reactstrap";
import NavPremiumUserBlogannonceVente from "../NavPremiumUserBlogannonceVente";
import ReactQuill from "react-quill";




class PremiumUserNewBlogannonceVente extends Component {
    constructor(props) {
        super(props);

        this.saveItem = this.saveItem.bind(this);
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
            showDefaultImage: true,
            errors: [],
            categoryannonceventes: [],
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

    saveItem(e) {
        e.preventDefault();

        let item = {
            title: this.state.title,
            photo: this.state.photo,
            red_time: this.state.red_time,
            description: this.state.description,
            categoryannoncevente_id: this.state.categoryannoncevente_id,
        };
        dyaxios.post(route('blogannoncecategoryventestore_site'), item)
            .then(() => {
                $.notify({
                        //,
                        message: 'Votre article de blogs a bien été crée'
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
                this.props.history.push(`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/`);
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Something wrong. Try later...", {
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
        fetch(route('api.categoryannoncevente_site')).then(res => res.json()).then((result) => { this.setState({ categoryannonceventes: result }) })
    }

    render() {
        const {categoryannonceventes,photo} = this.state;
        return (
            <>
                <Helmet title={`Dashboard ${$userIvemo.first_name || ""} article de blog ventes - Ivemo`} />


                <div className="wrapper ">

                    <PremiumVerticalNavUserSite {...this.props}/>

                    <div className="main-panel" id="main-panel">

                        <PremiumHorizontalNavUserSite/>

                        <div className="panel-header">
                            <div className="header text-center">
                                <h3 className="title">Articles annonces ventes</h3>
                                <p className="text-white">{this.state.title}</p>
                                <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/`} className="text-white">
                                    <i className="fa fa-chevron-circle-left"></i> Retour aux annonces
                                </Link>
                            </div>
                        </div>

                        <div className="content">

                         <NavPremiumUserBlogannonceVente/>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">

                                            <div className="toolbar">


                                            </div>


                                            <form role="form" onSubmit={this.saveItem} acceptCharset="UTF-8">

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
                                                            <label htmlFor="title">Estimer en temp <b>{this.state.red_time} min lecture</b></label>
                                                            <InputGroup>
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="now-ui-icons tech_watch-time"/></span>
                                                                </div>
                                                                <Input id='red_time'
                                                                       type='number'
                                                                       className={`form-control ${this.hasErrorFor('red_time') ? 'is-invalid' : ''}`}
                                                                       name='red_time'
                                                                       maxLength="20"
                                                                       minLength="1"
                                                                       placeholder="Estimer un temp de lecture en min"
                                                                       aria-label="Estimer un temp de lecture "
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
                                                                <select name={'categoryannoncevente_id'} value={this.state.categoryannoncevente_id}
                                                                        className={`form-control`}
                                                                        id="categoryannoncevente_id" onChange={this.handleFieldChange}>
                                                                    <option value="" disabled>Selectioner une category</option>
                                                                    {categoryannonceventes.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                                {this.renderErrorFor('categoryannoncevente_id')}
                                                            </FormGroup>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="col-md-4 mx-auto">
                                                            <div className="text-center">
                                                                <img src={this.state.showDefaultImage ? "https://www.kazoucoin.com/assets/img/photo.jpg" : photo} alt={'name'} />
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
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/`} className="btn btn-secondary">
                                                        <i className="now-ui-icons ui-1_simple-delete"/> Annuler
                                                    </Link>
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Sauvegarder l'article de blog</b>
                                                    </button>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <FooterPremiumUser/>

                    </div>
                </div>
            </>

        )
    }
}

export default PremiumUserNewBlogannonceVente;
