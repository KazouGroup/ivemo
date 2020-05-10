import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";


class AnnonceShowUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            subject: '',
            message: '',
            errors: [],
        };
        this.createItem = this.createItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
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

    createItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            subject: this.state.subject,
            message: this.state.message,
        };
        dyaxios.post(route('contact.save'), item)
            .then(() => {
                $.notify('<strong>Merçi pour votre message ...</strong>', {
                    allow_dismiss: false,
                    type: 'success',
                    placement: {
                        from: 'bottom',
                        align: 'right'
                    },
                    animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    },
                });

                this.setState({
                    email: "",
                    first_name: "",
                    last_name: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    // lifecycle method
    componentDidMount() {
        //
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Annonce show - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card-body">

                                            <div className="card-image">

                                                <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                    <ol className="carousel-indicators">
                                                        <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                        <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                        <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                    </ol>
                                                    <div className="carousel-inner" role="listbox">
                                                        <div className="carousel-item">
                                                            <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                        </div>
                                                        <div className="carousel-item">
                                                            <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                        </div>
                                                        <div className="carousel-item active">
                                                            <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                        </div>
                                                    </div>
                                                    <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                        <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                    </a>
                                                    <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                        <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    <NavLink to={`/annonce/show/`}>
                                                        <h6 className="text-info ml-auto mr-auto">
                                                            Appartement
                                                                        </h6>
                                                    </NavLink>
                                                </div>

                                                <div className="text-center ml-auto">
                                                    <a href="#pablo" className="btn btn-primary btn-round">
                                                        <i className="now-ui-icons ui-2_favourite-28"></i> Dejà sauvegarder
                                                </a>
                                                </div>
                                                <div className="text-right ml-auto">
                                                    <strong className="title text-dark"><b>50 000 FCFA/mois</b></strong>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    Description
                                            </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>
                                                <hr />
                                                <h6 className="card-title">
                                                    A L'interieur
                                            </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>



                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <b>Contacter l'agence</b>
                                                </div>
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`/annonce/show/`}>
                                                            <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/annonce/show/`} className="text-dark font-weight-600 text-sm"><b>Boclair Temgoua</b>
                                                                <small className="d-block text-muted">12 janv 2019</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                            <i className="now-ui-icons tech_mobile"></i>
                                                        </Button>
                                                        <a href="https://www.kazoutech.com" className="btn btn-sm btn-primary" target="_banck">
                                                            <i className="now-ui-icons objects_globe"></i>
                                                        </a>
                                                        <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer" data-placement="bottom">
                                                            <i className="now-ui-icons ui-1_simple-delete"></i>
                                                        </NavLink>
                                                        <Button
                                                            className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                            <i className="now-ui-icons ui-1_simple-remove"></i>
                                                        </Button>{" "}
                                                    </div>
                                                </div>
                                                <div className="card-title">
                                                    <i className="now-ui-icons location_pin"></i> <b>91 RUE DU FAUBOURG SAINT HONORE 75008 PARIS 8EME</b>
                                                    <br />
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-6 col-6">
                                                                <a href="https://www.kazoutech.com" title="Profil agence">
                                                                    <small><b>Consulter le profil de l'agence</b></small>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <a href="https://www.kazoutech.com" title="Site internet de agence">
                                                                    <small><b>Consulter le site de l'agence</b></small>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <b>Informations légales de l'agence</b>
                                                <br />
                                                <span>
                                                    EIFFEL HOUSING SAS, au capital de 10000,00€

                                                    Carte professionnelle 6282 délivrée par la Préfecture de Paris.

                                                    Siège : 91, rue du Faubourg Saint Honoré 75008 PARIS FRANCE

                                                    Garantie Financière Galian pour un montant de 120000,00€

                                                    RCS : Paris 801151929
                                                </span>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envie de visiter ? Une question sur cet appartement ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                                                            <form role="form" id="contact-form" onSubmit={this.createItem} acceptCharset="UTF-8">

                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                                    </div>
                                                                                    <input id='last_name'
                                                                                        type='text'
                                                                                        className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                                        name='last_name'
                                                                                        placeholder="Nom"
                                                                                        aria-label="Last Name"
                                                                                        autoComplete="last_name"
                                                                                        value={this.state.last_name}
                                                                                        onChange={this.handleFieldChange}
                                                                                    />
                                                                                    {this.renderErrorFor('last_name')}
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                                                                                    </div>
                                                                                    <input id='email'
                                                                                        type='email'
                                                                                        className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                                        name='email'
                                                                                        placeholder="Email"
                                                                                        aria-label="Email"
                                                                                        autoComplete="email"
                                                                                        value={this.state.email}
                                                                                        onChange={this.handleFieldChange}
                                                                                    />
                                                                                    {this.renderErrorFor('email')}
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                                                                                    </div>
                                                                                    <input id='phone'
                                                                                        type='text'
                                                                                        className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                                                                        name='phone'
                                                                                        placeholder="Téléphone"
                                                                                        aria-label="Téléphone"
                                                                                        value={this.state.phone}
                                                                                        onChange={this.handleFieldChange}
                                                                                    />
                                                                                    {this.renderErrorFor('phone')}
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <textarea name="message" value={this.state.message}
                                                                                        onChange={this.handleFieldChange}
                                                                                        placeholder={'Posez ici toutes vos questions !'}
                                                                                        className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                                        id="message"
                                                                                        rows="10" />
                                                                                    {this.renderErrorFor('message')}
                                                                                </div>
                                                                                <div className="form-check text-left">
                                                                                    <label className="form-check-label">
                                                                                        <input className="form-check-input" id="remember" type="checkbox" defaultChecked={this.state.remember} value={this.state.remember} name="remember" onChange={this.handleFieldChange} />
                                                                                        <span className="form-check-sign"></span>
                                                                                        <span>Je ne souhaite pas recevoir les annonces similaires. En savoir plus</span>
                                                                                    </label>
                                                                                </div>
                                                                                <div className="submit text-center">
                                                                                    <button className="btn btn-primary btn-lg" type="submit">
                                                                                        <i className="now-ui-icons ui-1_email-85"></i> Contacter l'agence
                                                                            </button>
                                                                                </div>
                                                                            </form>


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

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"></i> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <NavLink to={`/annonce/show/`}>
                                                                        <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                    </NavLink>
                                                                    <div className="mx-3">
                                                                        <NavLink to={`/annonce/show/`} className="text-dark font-weight-600 text-sm"><b>Boclair Temgoua</b>
                                                                            <small className="d-block text-muted">12 janv 2019</small>
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                    <i className="now-ui-icons tech_mobile"></i>
                                                                </Button>
                                                                <a href="https://www.kazoutech.com" className="btn btn-sm btn-success" target="_banck">
                                                                    <i className="now-ui-icons ui-2_chat-round"></i>
                                                                </a>
                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <a href="#pablo" className="btn btn-sm btn-outline-success">
                                                                        <i className="now-ui-icons tech_mobile"></i> <b>3425712192 / 34569821 ou 677688066</b>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <b>Contactez l'agence par email</b>
                                                                </div>
                                                            </div>
                                                            <form role="form" id="contact-form" onSubmit={this.createItem} acceptCharset="UTF-8">

                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons users_circle-08"></i></span>
                                                                    </div>
                                                                    <input id='last_name'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                        name='last_name'
                                                                        placeholder="Nom"
                                                                        aria-label="Last Name"
                                                                        autoComplete="last_name"
                                                                        value={this.state.last_name}
                                                                        onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('last_name')}
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons ui-1_email-85"></i></span>
                                                                    </div>
                                                                    <input id='email'
                                                                        type='email'
                                                                        className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                        name='email'
                                                                        placeholder="Email"
                                                                        aria-label="Email"
                                                                        autoComplete="email"
                                                                        value={this.state.email}
                                                                        onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('email')}
                                                                </div>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="now-ui-icons tech_mobile"></i></span>
                                                                    </div>
                                                                    <input id='phone'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                                                        name='phone'
                                                                        placeholder="Téléphone"
                                                                        aria-label="Téléphone"
                                                                        value={this.state.phone}
                                                                        onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('phone')}
                                                                </div>
                                                                <div className="form-group">
                                                                    <textarea name="message" value={this.state.message}
                                                                        onChange={this.handleFieldChange}
                                                                        placeholder={'Posez ici toutes vos questions !'}
                                                                        className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                        id="message"
                                                                        rows="10" />
                                                                    {this.renderErrorFor('message')}
                                                                </div>
                                                                <div className="form-check text-left">
                                                                    <label className="form-check-label">
                                                                        <input className="form-check-input" id="remember" type="checkbox" defaultChecked={this.state.remember} value={this.state.remember} name="remember" onChange={this.handleFieldChange} />
                                                                        <span className="form-check-sign"></span>
                                                                        <span>Je ne souhaite pas recevoir les annonces similaires. En savoir plus</span>
                                                                    </label>
                                                                </div>
                                                                <div className="submit text-center">
                                                                    <button className="btn btn-primary btn-lg" type="submit">
                                                                        <i className="now-ui-icons ui-1_email-85"></i> Contacter l'agence
                                                                </button>
                                                                </div>
                                                            </form>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="text-center">
                                    <h4 className="title">Votre projet immobilier en toute sérénité</h4>
                                </div>

                                <div className="card">
                                    <div className="card-body">

                                        <div className="row">


                                            <div className="col-md-6 col-lg-4">
                                                <div className="card card-blog card-plain">
                                                    <div className="card-image">
                                                        <a href="#pablo">
                                                            <img className="img img-raised rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg" />
                                                        </a>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="text-center">
                                                            <h6 className="category text-danger">
                                                                <i className="now-ui-icons media-2_sound-wave"></i> business
                                                    </h6>
                                                            <h5 className="card-title">
                                                                <a href="#nuk">Axel Springer Spends $343M To Buy Business Insider</a>
                                                            </h5>
                                                        </div>
                                                        <p>
                                                            German media giant Axel Springer has announced it’s acquiring online business news publication Business Inside..</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4">
                                                <div className="card card-blog card-plain">
                                                    <div className="card-image">
                                                        <a href="#pablo">
                                                            <img className="img img-raised rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg" />
                                                        </a>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="text-center">
                                                            <h6 className="category text-danger">
                                                                <i className="now-ui-icons media-2_sound-wave"></i> business
                                                    </h6>
                                                            <h5 className="card-title">
                                                                <a href="#nuk">Buy Business Insider</a>
                                                            </h5>
                                                        </div>
                                                        <p>
                                                            German media giant Axel Springer has announced it’s acquiring online business news publication Business Inside..</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4">
                                                <div className="card card-blog card-plain">
                                                    <div className="card-image">
                                                        <a href="#pablo">
                                                            <img className="img img-raised rounded" src="/assets/vendor/assets/img/bg32.jpg" />
                                                        </a>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="text-center">
                                                            <h6 className="category text-danger">
                                                                <i className="now-ui-icons media-2_sound-wave"></i> business
                                                    </h6>
                                                            <h5 className="card-title">
                                                                <a href="#nuk">Insider Axel Springer Spends</a>
                                                            </h5>
                                                        </div>
                                                        <p>
                                                            German media giant Axel Springer has announced it’s acquiring online business news publication Business Inside..</p>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>



                                <div className="card-body">

                                    <div className="text-center">
                                        <h4 className="title">Annonces similaires</h4>
                                    </div>
                                    <div className="row">


                                        <div className="col-md-6 col-lg-4">
                                            <div className="card card-blog">
                                                <div className="card-image">
                                                    <img className="img rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg" />
                                                </div>
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <h6 className="category text-info"> Appartement</h6>
                                                    </div>
                                                    <h6 className="card-title">
                                                        <a href="#pablo">Indispensible to nature photography: the hide je suis dans la place la famille je suis erdus dans tout cette erte</a>
                                                    </h6>
                                                    <div className="card-footer">
                                                        <div className="stats stats-right">
                                                            <b>2 245 FCFA</b>
                                                        </div>
                                                        <div className="author">
                                                            <img src="/assets/vendor/assets/img/examples/card-blog6.jpg" alt="..." className="avatar img-raised" />
                                                            <span>Devin Coldewey</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-lg-4">
                                            <div className="card card-blog">
                                                <div className="card-image">
                                                    <img className="img rounded" src="/assets/vendor/assets/img/bg32.jpg" />
                                                </div>
                                                <div className="card-body">
                                                    <h6 className="category text-warning">
                                                        <i className="now-ui-icons media-1_camera-compact"></i> Photo</h6>
                                                    <h5 className="card-title">
                                                        <a href="#pablo">Indispensible to nature photography: the hide</a>
                                                    </h5>
                                                    <div className="card-footer">
                                                        <div className="stats stats-right">
                                                            <i className="now-ui-icons ui-2_favourite-28"></i> 342 ·
                                                    <i className="now-ui-icons files_single-copy-04"></i> 45
                                                    </div>
                                                        <div className="author">
                                                            <img src="/assets/vendor/assets/img/james.jpg" alt="..." className="avatar img-raised" />
                                                            <span>Devin Coldewey</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-lg-4">
                                            <div className="card card-blog">
                                                <div className="card-image">
                                                    <img className="img rounded" src="/assets/vendor/assets/img/examples/card-blog6.jpg" />
                                                </div>
                                                <div className="card-body">
                                                    <h6 className="category text-warning">
                                                        <i className="now-ui-icons media-1_camera-compact"></i> Photo</h6>
                                                    <h6 className="card-title">
                                                        <a href="#pablo">Indispensible to nature photography: the hide</a>
                                                    </h6>
                                                    <div className="card-footer">
                                                        <div className="stats stats-right">
                                                            <i className="now-ui-icons ui-2_favourite-28"></i> 342 ·
                                                    <i className="now-ui-icons files_single-copy-04"></i> 45
                                                    </div>
                                                        <div className="author">
                                                            <img src="/assets/vendor/assets/img/james.jpg" alt="..." className="avatar img-raised" />
                                                            <span>Devin Coldewey</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>
            </>



        )
    }
}

export default AnnonceShowUserSite;
