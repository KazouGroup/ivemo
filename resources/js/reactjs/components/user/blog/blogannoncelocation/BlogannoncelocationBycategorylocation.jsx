import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import BlogannoncelocationList from "./inc/BlogannoncelocationList";
import Navblogannoncelocations from "./inc/Navblogannoncelocations";
import Navlinknewblogannoncelocation from "./treatement/Navlinknewblogannoncelocation";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import BlogannonceListSkeleton from "../../../inc/user/blog/BlogannonceListSkeleton";
import {Form, Input} from "reactstrap";
import HelmetSite from "../../../inc/user/HelmetSite";


class BlogannoncelocationBycategorylocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            message: '',
            subject: 'Mauvaise catégorie',
            errors: [],
            blogannonceItem: [],
            blogannoncelocationsData: [],
            blogannoncelocations:{categoryannoncelocation:[],user:[]},
            visiable: 20,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.signalemessageItem = this.signalemessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
        })
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    handleCheckClick(event){
        this.setState({
            subject: event.target.value
        });

    };
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

    signalerUser(item) {
        $('#addNew').modal('show');
        this.setState({
            blogannonceItem: item
        });
    }

    favoriteItem(id) {
        const url = route('favoriteblogannoncelocations_favorite.favorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Article ajoutée à vos favoris",
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

    unfavoriteItem(id) {
        const url = route('favoriteblogannoncelocations_unfavorite.unfavorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Article retirée de vos favoris",
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

    signalemessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            blogannoncelocation_id: this.state.blogannonceItem.id,
            full_name: this.state.full_name,
            subject: this.state.subject,
            message: this.state.message,
        };
        let url = route('signalblogannoncelocations.site');
        dyaxios.post(url, item)
            .then(() => {

                //Masquer le modal après la création
                $('#addNew').modal('hide');

                $.notify({
                        message: `Cette article a été signalé avec succès`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInDown",
                            exit: "animate__animated animate__fadeOutUp"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    message: "",
                });
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

    unactiveItem(id){
        Swal.fire({
            title: 'Masquer cette article?',
            text: "êtes vous sure de vouloir confirmer cette action?",
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.blogannoncelocations.filter(isNotId);
                this.setState({blogannoncelocations: updatedItems});

                //Envoyer la requet au server
                let url = route('blogannoncecategorylocationunactive_site.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette article a été masquée aux utilisateurs",
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.blogannoncelocations.filter(isNotId);
                this.setState({blogannoncelocations: updatedItems});

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
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
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

    loadItems(){
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.blogannonceblogcategorylocations_site', [itemCategoryannoncelocation])).then(response => this.setState({ blogannoncelocations: response.data }));
        dyaxios.get(route('api.blogannonceblogcategorylocationscount_site', [itemCategoryannoncelocation])).then(response => this.setState({ blogannoncelocationsData: response.data }));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {blogannoncelocations,blogannoncelocationsData,blogannonceItem,visiable} = this.state;
        const mapBlogannoncelocations = blogannoncelocations.length >= 0 ? (
            blogannoncelocations.slice(0,visiable).map(item => {
                return(

                    <BlogannoncelocationList key={item.id} {...item} favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} signalerUser={this.signalerUser}/>
                )
            })
        ):(
            <BlogannonceListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Guides et conseils locations ${blogannoncelocationsData.name || 'Annonce'} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="500">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + blogannoncelocationsData.photo + ")" }}>
                            </div>
                            <div className="content-center">

                                <h2 className="title">{blogannoncelocationsData.name || ""}</h2>

                                {blogannoncelocationsData.name ?
                                    <Link to={`/blogs/annonce_locations/`} className="text-white">
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour aux articles</b>
                                    </Link>
                                    :
                                    <></>
                                }


                                {blogannoncelocationsData.blogannoncelocations_count >= 0 ?
                                    <h5><b>{blogannoncelocationsData.blogannoncelocations_count}</b> {blogannoncelocationsData.blogannoncelocations_count > 1 ? "articles" : "article"} posté sur la location</h5>
                                    :
                                   <></>
                                }

                            </div>
                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">

                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">


                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <Link to={`/blogs/annonce_locations/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour aux articles</b>
                                            </Link>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapBlogannoncelocations}

                                        {visiable < blogannoncelocations.length && (
                                            <div className="col-md-4 ml-auto mr-auto text-center">
                                                <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                    <b>Voir plus </b>
                                                </button>
                                            </div>
                                        )}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewblogannoncelocation/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navblogannoncelocations/>


                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        <b>Annonces locations populaire</b>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            MateLabs mixes machine learning model
                                                                                      </span>
                                                                                    </a>

                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/julie.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            Temgoua mixes machine learning model
                                                                                      </span>
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/examples/card-blog11.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            Bokino mixes machine learning model
                                                                                      </span>
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/examples/card-blog11.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="modal fade" id="addNew" tabIndex="-1" role="dialog" aria-labelledby="addNewLabel"
                                         aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title"><b>Signaler des erreurs publicitaires</b></h5>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                                <Form role="form"  onSubmit={this.signalemessageItem}  acceptCharset="UTF-8">

                                                    <div className="modal-body">

                                                        <div className="card-body">

                                                            <div className="alert alert-danger text-center" role="alert">
                                                                <div className="container">
                                                                    {blogannonceItem.title}
                                                                </div>
                                                            </div>

                                                            <p className="category">Spécifie le type d'erreur</p>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Mauvaise catégorie" onChange={this.handleCheckClick} checked={this.state.subject === "Mauvaise catégorie"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Mauvaise catégorie
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Information incomplète" onChange={this.handleCheckClick} checked={this.state.subject === "Information incomplète"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Information incomplète
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">

                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Mauvaise redaction" onChange={this.handleCheckClick} checked={this.state.subject === "Mauvaise redaction"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Mauvaise redaction
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Autre (précisez dans le commentaire)" onChange={this.handleCheckClick} checked={this.state.subject === "Autre (précisez dans le commentaire)"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Autre (précisez dans le commentaire)
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="row">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                                                                    </div>
                                                                    <input id='full_name'
                                                                           type='text'
                                                                           required="required"
                                                                           className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                                           name='full_name'
                                                                           placeholder="Nom complet"
                                                                           aria-label="Nom complet"
                                                                           autoComplete="full_name"
                                                                           value={this.state.full_name}
                                                                           onChange={this.handleFieldChange}
                                                                    />
                                                                    {this.renderErrorFor('full_name')}
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                                                                    </div>
                                                                    <input id='email'
                                                                           type='email'
                                                                           required="required"
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
                                                            </div>
                                                            <div className="row">

                                                                <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.handleFieldChange}
                                                                 placeholder={'Pourquoi signalez-vous cette article?'}
                                                                 className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 required="required"
                                                                 rows="10" />
                                                                    {this.renderErrorFor('message')}
                                                                </div>
                                                            </div>

                                                            <div className="submit text-center">
                                                                <button className="btn btn-primary btn-lg btn-block" type="submit">
                                                                    <b>Signaler</b>
                                                                </button>
                                                            </div>


                                                        </div>

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
            </>

        )
    }
}
export default BlogannoncelocationBycategorylocation;
