import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Button} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";


class AnnonceBienAvendreCreate extends Component {
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
        const composantTitle = 'Annonce show - Ivemo';
        document.title = `${composantTitle}`;
    }

    render() {
        return (
            <div className="about-us sidebar-collapse">

                <nav className="navbar navbar-expand-lg bg-primary">
                    <NavUserSite/>
                </nav>

                <div className="wrapper">

                    <div className="main main-raised">

                        <div className="container">
                            <br/>

                            <form role="form" id="contact-form" onSubmit={this.createItem} acceptCharset="UTF-8">

                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <b>Contact de votre agence</b>
                                                </div>
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`/annonce/show/`}>
                                                            <img src="/assets/vendor/assets/img/bg1.jpg"
                                                                 style={{height: "40px", width: "80px"}} alt=""
                                                                 className="avatar"/>
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/annonce/show/`}
                                                                     className="text-dark font-weight-600 text-sm"><b>Boclair
                                                                Temgoua</b>
                                                                <small className="d-block text-muted">12 janv
                                                                    2019</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        <Button className="btn btn-sm btn-info" rel="tooltip"
                                                                title="3426712192" data-placement="bottom">
                                                            <i className="now-ui-icons tech_mobile"></i>
                                                        </Button>
                                                        <a href="https://www.kazoutech.com"
                                                           className="btn btn-sm btn-primary" target="_banck">
                                                            <i className="now-ui-icons objects_globe"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="card-title">
                                                    <i className="now-ui-icons location_pin"></i> <b>91 RUE DU FAUBOURG
                                                    SAINT HONORE 75008 PARIS 8EME</b>
                                                    <br/>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-6 col-6">
                                                                <a href="https://www.kazoutech.com"
                                                                   title="Profil agence">
                                                                    <small><b>Consulter le profil de votre
                                                                        agence</b></small>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <a href="https://www.kazoutech.com"
                                                                   title="Site internet de agence">
                                                                    <small><b>Consulter le site de votre
                                                                        agence</b></small>
                                                                </a>
                                                            </div>
                                                        </div>
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
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
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

                                                                            <label htmlFor="title">Donner un titre a ce
                                                                                bien</label>
                                                                            <div className="input-group">
                                                                                <div className="input-group-prepend">
                                                                                    <span
                                                                                        className="input-group-text"><i
                                                                                        className="now-ui-icons users_circle-08"></i></span>
                                                                                </div>
                                                                                <input id='last_name'
                                                                                       type='text'
                                                                                       className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                                       name='last_name'
                                                                                       placeholder="Titre du bien"
                                                                                       aria-label="Last Name"
                                                                                       autoComplete="last_name"
                                                                                       value={this.state.last_name}
                                                                                       onChange={this.handleFieldChange}
                                                                                />
                                                                                {this.renderErrorFor('last_name')}
                                                                            </div>
                                                                            <label htmlFor="title">Quelle est le type de
                                                                                bien ?</label>
                                                                            <div className="form-group">
                                                                                <select name={'city_id'}
                                                                                        value={this.state.city_id}
                                                                                        className={`form-control`}
                                                                                        id="city_id"
                                                                                        onChange={this.handleFieldChange}>
                                                                                    <option value=""
                                                                                            disabled>Selectionez votre
                                                                                        votre type be bien
                                                                                    </option>
                                                                                    <option value="">Appartement
                                                                                    </option>
                                                                                    <option value="">Maison</option>
                                                                                    <option value="">Terrain</option>
                                                                                    <option value="">Voituve</option>

                                                                                </select>
                                                                                {this.renderErrorFor('email')}
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
                                                                <b>Caracteristique du bien uniquement pour
                                                                    (Appartement,Maison,Terrain)</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
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
                                                                                    <label
                                                                                        htmlFor="Chambres">Surface</label>
                                                                                    <div className="form-group">
                                                                                        <input id='last_name'
                                                                                               type='text'
                                                                                               className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                                               name='last_name'
                                                                                               placeholder="Surface"
                                                                                               aria-label="Surface"
                                                                                               autoComplete="last_name"
                                                                                               value={this.state.last_name}
                                                                                               onChange={this.handleFieldChange}
                                                                                        />
                                                                                        {this.renderErrorFor('last_name')}
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="col-md-4 ml-auto mr-auto">
                                                                                    <label htmlFor="Chambres">Pièces
                                                                                        (optionnel)</label>
                                                                                    <div className="form-group">
                                                                                        <input id='last_name'
                                                                                               type='text'
                                                                                               className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                                               name='last_name'
                                                                                               placeholder="Pièces"
                                                                                               aria-label="Pièces"
                                                                                               autoComplete="last_name"
                                                                                               value={this.state.last_name}
                                                                                               onChange={this.handleFieldChange}
                                                                                        />
                                                                                        {this.renderErrorFor('last_name')}
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="col-md-4 ml-auto mr-auto">
                                                                                    <label htmlFor="Chambres">Chambres
                                                                                        (optionnel)</label>
                                                                                    <div className="form-group">
                                                                                        <input id='email'
                                                                                               type='email'
                                                                                               className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                                               name='email'
                                                                                               placeholder="Chambres"
                                                                                               aria-label="Chambres"
                                                                                               autoComplete="email"
                                                                                               value={this.state.email}
                                                                                               onChange={this.handleFieldChange}
                                                                                        />
                                                                                        {this.renderErrorFor('email')}
                                                                                    </div>
                                                                                </div>
                                                                                <small>*optionnel: les champs ne sont
                                                                                    pas obligatoires vous avez le cjoix
                                                                                    de le remplire ou pas</small>
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
                                                        <div className="card-header" role="tab"
                                                             id="headingDisponibilité">
                                                            <a data-toggle="collapse" data-parent="#accordion"
                                                               href="#collapseDisponibilité" aria-expanded="true"
                                                               aria-controls="collapseDisponibilité">
                                                                <b>Disponibilité(e)</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                            </a>
                                                        </div>
                                                        <div id="collapseDisponibilité" className="collapse show"
                                                             role="tabpanel" aria-labelledby="headingDisponibilité">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist"
                                                                             aria-multiselectable="true"
                                                                             className="card-collapse">

                                                                            <label htmlFor="Chambres">Disponible à
                                                                                partir de </label>
                                                                            <div className="form-group">
                                                                                <input id='last_name'
                                                                                       type='text'
                                                                                       className={`form-control datepicker ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                                       name='last_name'
                                                                                       placeholder="Disponible à partir de"
                                                                                       aria-label="Disponible à partir de"
                                                                                       autoComplete="last_name"
                                                                                       value={this.state.last_name}
                                                                                       onChange={this.handleFieldChange}
                                                                                />
                                                                                {this.renderErrorFor('last_name')}
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
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
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
                                                                                <textarea name="message"
                                                                                          value={this.state.message}
                                                                                          onChange={this.handleFieldChange}
                                                                                          placeholder={'Ex: Ensoleillé toute la journée, profitez d\'un emplacement idéal proche du marché, convivial et animé. Le salon vous ravira par ses volumes accueillants...'}
                                                                                          className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                                          id="message"
                                                                                          rows="10"/>
                                                                                {this.renderErrorFor('message')}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="submit text-center">
                                                    <button className="btn btn-primary btn-lg" type="submit">
                                                        <i className="now-ui-icons ui-1_check"></i> <b>Poster votre
                                                        annonce</b>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true"
                                                             className="card-collapse">

                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <b>Quel est le montant de votre bien ?</b>
                                                                </div>
                                                            </div>

                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i
                                                                        className="now-ui-icons business_money-coins"></i></span>
                                                                </div>
                                                                <input id='last_name'
                                                                       type='text'
                                                                       className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
                                                                       name='last_name'
                                                                       placeholder="Montant de votre bien"
                                                                       aria-label="Loyer mensuel charges comprises"
                                                                       autoComplete="last_name"
                                                                       value={this.state.last_name}
                                                                       onChange={this.handleFieldChange}
                                                                />
                                                                {this.renderErrorFor('last_name')}
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

                                </div>

                            </form>

                        </div>


                    </div>


                    <FooterBigUserSite/>
                </div>
            </div>
        )
    }
}

export default AnnonceBienAvendreCreate;
