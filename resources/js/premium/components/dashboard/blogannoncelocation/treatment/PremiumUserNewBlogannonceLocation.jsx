import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import PremiumVerticalNavUserSite from "../../../inc/PremiumVerticalNavUserSite";
import PremiumHorizontalNavUserSite from "../../../inc/PremiumHorizontalNavUserSite";
import FooterPremiumUser from "../../../inc/FooterPremiumUser";
import {Button, CardBody, FormGroup, Input, InputGroup, Row} from "reactstrap";
import ReactQuill from "react-quill";
import NavPremiumUserBlogannonceLocation from "../NavPremiumUserBlogannonceLocation";
const abbrev = ['', 'k', 'M', 'B', 'T'];




class PremiumUserNewBlogannonceLocation extends Component {
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
            categoryannoncelocation_id: '',
            showDefaultImage: true,
            errors: [],
            categoryannoncelocations: [],
            blogannoncelocations_count: [],
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
        if(file['size'] < 15111775){
            reader.onloadend = (file) => {
                this.setState({ file: file, photo: reader.result, showDefaultImage: false });
            };
            reader.readAsDataURL(file)
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
                        enter: "animated fadeInDownBig",
                        exit: "animated fadeOutUp"
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
            red_time: this.state.red_time,
            description: this.state.description,
            categoryannoncelocation_id: this.state.categoryannoncelocation_id,
        };
        dyaxios.post(route('blogannoncecategorylocationstore_site'), item)
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
                this.props.history.push(`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/`);
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
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.blogannoncelocations_premium_count',[itemuser])).then(response =>
            this.setState({blogannoncelocations_count: response.data}));
        fetch(route('api.categoryannoncelocation_site')).then(res => res.json()).then((result) => { this.setState({ categoryannoncelocations: result }) })
    }
    data_countFormatter(blogannoncelocations_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {categoryannoncelocations,photo,blogannoncelocations_count} = this.state;
        return (
            <>

                <Helmet title={`${this.state.title || "Dashboard"} - ${$name_site}`} />

                <PremiumVerticalNavUserSite {...this.props} />

                <div className="main-panel">

                    <PremiumHorizontalNavUserSite />

                    <div className="content">
                        <div className="container-fluid">

                         <NavPremiumUserBlogannonceLocation/>

                            <div className="row">
                                <div className="col-md-12 expo">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-icon card-header-primary">
                                            <div className="card-icon">
                                                <i className="material-icons">view_headline</i>
                                            </div>
                                            <p className="card-category">
                                                <b>Articles sur les annonces locations</b>
                                            </p>
                                            <h3 className="card-title" style={{ color: "red" }}>
                                                <b>{this.data_countFormatter(blogannoncelocations_count)}</b>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">view_headline</i>
                                                <b>Articles sur les annonces locations</b>
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
                                                        <b>Articles sur les annonces locations</b>
                                                    </h4>
                                                    <p className="card-title">Articles sur les annonces locations</p>
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
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/`}
                                                          className="btn btn-secondary btn-just-icon btn-sm" title="Retour a vos articles">
                                                        <i className="material-icons">arrow_back</i>
                                                    </Link>
                                                </div>

                                            </div>

                                            <form role="form" onSubmit={this.saveItem} acceptCharset="UTF-8">

                                                <CardBody>

                                                    <Row>
                                                        <div className="col-md-12">
                                                            <label htmlFor="title">Donner un titre à cet article</label>
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
                                                            <label htmlFor="title">Estimer en temp <b>{this.state.red_time} min lecture</b></label>
                                                            <FormGroup>
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
                                                            </FormGroup>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label htmlFor="title">Selectionez la categorie</label>
                                                            <FormGroup>

                                                                <select name={'categoryannoncelocation_id'} value={this.state.categoryannoncelocation_id}
                                                                        className={`form-control ${this.hasErrorFor('categoryannoncelocation_id') ? 'is-invalid' : ''}`}
                                                                        id="categoryannoncelocation_id" onChange={this.handleFieldChange} required>
                                                                    <option value="" disabled>Selectioner une category</option>
                                                                    {categoryannoncelocations.map((item) => (
                                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
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
                                                                    Décrivez votre article
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
                                                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/`} className="btn btn-secondary">
                                                        <i className="now-ui-icons ui-1_simple-delete"/> Annuler
                                                    </Link>
                                                    <button className="btn btn-primary" type="submit">
                                                        <b>Mettre à jour l'article de blog</b>
                                                    </button>
                                                </div>
                                            </form>


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

export default PremiumUserNewBlogannonceLocation;
