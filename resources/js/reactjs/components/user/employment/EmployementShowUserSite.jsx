import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormText, Input, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import FooterUserSite from "../../inc/user/FooterUserSite";
import moment from "moment";
import ContactFromEmployementIndex from "./inc/ContactFromEmployementIndex";
import SignalFromEmployementForShow from "./inc/SignalFromEmployementForShow";
import Swal from "sweetalert2";
import Navlinknewemployment from "./treatement/Navlinknewemployment";
import EmployementInteresse from "./EmployementInteresse";
import HelmetSite from "../../inc/user/HelmetSite";
import ButonFavoris from "../../inc/vendor/ButonFavoris";


class EmployementShowUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employment:{categoryemployment:[],user:{profile:[]},city:[]},
            employmentItem:[],
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.phoneShow = this.phoneShow.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);
    }

    favoriteItem(id) {
        const url = route('employments_favorite.favorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Annonce ajoutée à vos favoris",
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
        const url = route('employments_unfavorite.unfavorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Annonce retirée de vos favoris",
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

    copyToClipboard(){
        navigator.clipboard.writeText(window.location.toString());
        //Swal.fire({
        //    title: `Lien copié correctement avec succès`,
        //    icon: 'success',
        //    showConfirmButton: false,
        //    timer: 1500,
        //});

        $.notify({
                message: "Lien copié correctement avec succès",
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
    }
    phoneShow(employment){
        Swal.fire({
            title: `${employment.user.phone}`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info",
            confirmButtonText: 'Oui, Contacter',
            reverseButtons: true,
        })

    }

    signalerUser(id){
        Swal.fire({
            title: 'Masquer cette offre?',
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

                //Envoyer la requet au server
                let url = route('employmentsunactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette offre a été masquée aux utilisateurs",
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
                    // remove from local state
                    this.props.history.push('/employments/');
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

    signalerUser(item) {
        $('#addNew').modal('show');
        this.setState({
            employmentItem: item
        });
    }

    unactiveItem(id){
        Swal.fire({
            title: 'Masquer cette offre?',
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

                //Envoyer la requet au server
                let url = route('employmentsunactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette offre a été masquée aux utilisateurs",
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
                    // remove from local state
                    this.props.history.push('/employments/');
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

                const url = route('employmentsdelete_site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Offre suprimée avec succès'
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
                    this.props.history.push('/employments/');
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
        let itemEmployment = this.props.match.params.employment;
        let itemCity = this.props.match.params.city;
        let itemCategoryemployment = this.props.match.params.categoryemployment;
        let url = route('api.employmentsbycategorybycityslug_site',[itemCategoryemployment,itemCity,itemEmployment]);
        dyaxios.get(url).then(response => this.setState({ employment: response.data, }));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    getDescription(employment) {
        return { __html: employment.description};
    }
    data_countFormatter(visits_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {employment} = this.state;
        return (
            <>
                <HelmetSite title={`${employment.title || $name_site} - ${$name_site}`}/>

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
                                        <div className="submit text-left">

                                            <NavLink className="btn btn-neutral btn-sm" to={`/employments/${employment.categoryemployment.slug}/`}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour</b>
                                            </NavLink>

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
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        {employment.user.avatar ?
                                                            <NavLink to={`/pro/${employment.user.slug}/employments/`}>
                                                                <img src={employment.user.avatar}
                                                                     style={{ height: "40px", width: "80px" }}
                                                                     alt={employment.user.first_name}
                                                                     className="avatar" />
                                                            </NavLink>
                                                            : <Skeleton circle={false} height={40} width={80} />}
                                                        <div className="mx-3">
                                                            <NavLink to={`/pro/${employment.user.slug}/employments/`} className="text-dark font-weight-600 text-sm"><b>{employment.user.first_name}</b>
                                                                <small className="d-block text-muted"><i className="now-ui-icons tech_watch-time"/> {moment(employment.created_at).format('LL')}</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">

                                                        {employment.price && (
                                                            <h5 className="text-dark"><b>{employment.price.formatMoney(2,'.',',') || "0"} <small>FCFA</small></b></h5>
                                                        )}

                                                    </div>
                                                </div>

                                                {employment.title && (
                                                    <>
                                                        <h5 className="card-title">
                                                            <b>{employment.title}</b>
                                                        </h5>

                                                        <span className="card-title">
                                                            <Link to={`/employments/${employment.categoryemployment.slug}/`}><b>{employment.categoryemployment.name}</b></Link> - <Link to={`/employments/${employment.categoryemployment.slug}/${employment.city.slug}/`}><b>{employment.city.name}</b></Link> - <i className="now-ui-icons tech_watch-time"/> {moment(employment.created_at).format('ll')} {!$guest &&(<>{employment.status_user &&(<>- <i className="far fa-eye"></i> {this.data_countFormatter(employment.visits_count)}</>)}</>)}
                                                        </span>

                                                        {employment.photo !== null ?
                                                            <img alt={employment.title} src={employment.photo}
                                                                 className="img-fluid rounded" />
                                                            : null}
                                                        <div className="text-center">
                                                            {$guest ?
                                                                <Button data-toggle="modal" data-target="#loginModal"
                                                                        className="btn btn-facebook btn-sm btn-neutral btn-round" title="Ajouter à vos favoris">
                                                                    <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                                </Button>
                                                                :
                                                                <>
                                                                    {employment.bookmarked ?

                                                                        <>
                                                                            <Button onClick={() => this.unfavoriteItem(employment.id)}
                                                                                    className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                                <i className="fas fa-bookmark"></i> <b>Sauvegardé</b>
                                                                            </Button>
                                                                        </>

                                                                        :
                                                                        <>
                                                                            <Button onClick={() => this.favoriteItem(employment.id)}
                                                                                    className="btn btn-facebook btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                                <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                                            </Button>
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </div>
                                                    </>
                                                )}

                                                {employment.description ? <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(employment)} />: <Skeleton count={5}/>}
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        {employment.user.avatar ?
                                                            <NavLink to={`/pro/${employment.user.slug}/employments/`}>
                                                                <img src={employment.user.avatar}
                                                                     style={{ height: "40px", width: "80px" }}
                                                                     alt={employment.user.first_name}
                                                                     className="avatar" />
                                                            </NavLink>
                                                            : <Skeleton circle={false} height={40} width={80} />}
                                                        <div className="mx-3">
                                                            <NavLink to={`/pro/${employment.user.slug}/employments/`} className="text-dark font-weight-600 text-sm"><b>{employment.user.first_name}</b>
                                                                <small className="d-block text-muted"><i className="now-ui-icons tech_watch-time"/> {moment(employment.user.created_at).format('LL')}</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">

                                                        <ButonFavoris favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem} {...employment} />

                                                        <Button className="btn btn-icon btn-sm btn-facebook" title="Copier le lien" onClick={() => this.copyToClipboard()}>
                                                            <i className="fas fa-copy"></i>
                                                        </Button>
                                                        <Button className="btn btn-icon btn-sm btn-info" onClick={() => this.phoneShow(employment)} id={employment.user.phone}>
                                                             <i className="fas fa-mobile"></i>
                                                        </Button>
                                                        {employment.user.profile.site_internet && (
                                                            <a href={`${employment.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
                                                                <i className="now-ui-icons objects_globe"/>
                                                            </a>
                                                        )}
                                                        <UncontrolledTooltip placement="bottom" target="TooltipSignale">
                                                            Signaler cette offre
                                                        </UncontrolledTooltip>
                                                        <Button  id="TooltipSignale" onClick={() => this.signalerUser(employment.id)}
                                                                className="btn btn-instagram btn-icon btn-sm">
                                                            <i className="fas fa-flag"></i>
                                                        </Button>

                                                        {!$guest && (
                                                            <>
                                                                {($userIvemo.id === employment.user.id && $userIvemo.id === employment.user_id) && (
                                                                    <>
                                                                        <a href={`#${employment.visits_count}`}
                                                                           className="btn btn-sm btn-secondary" title={`${employment.visits_count} ${employment.visits_count > 1 ? "vues" : "vue"}`}>
                                                                            <i className="far fa-eye"></i> <b>{this.data_countFormatter(employment.visits_count)}</b>
                                                                        </a>
                                                                        <UncontrolledTooltip placement="bottom" target="TooltipStatus">
                                                                            Déactiver cette offre
                                                                        </UncontrolledTooltip>

                                                                        <button type="button" rel="tooltip" onClick={() => this.unactiveItem(employment.id)}
                                                                                className="btn btn-success btn-icon btn-sm" title=" Desactiver cette annonce">
                                                                            <i className="now-ui-icons ui-1_check"/>
                                                                        </button>

                                                                        <UncontrolledTooltip placement="bottom" target="TooltipEditer">
                                                                            Editer cette offre
                                                                        </UncontrolledTooltip>

                                                                        <NavLink to={`/employment/ab/${employment.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" id="TooltipEditer">
                                                                            <i className="now-ui-icons ui-2_settings-90"/>
                                                                        </NavLink>

                                                                        <UncontrolledTooltip placement="bottom" target="TooltipDelete">
                                                                            Supprimer cette offre
                                                                        </UncontrolledTooltip>
                                                                        <Button onClick={() => this.deleteItem(employment.id)}
                                                                                className="btn btn-icon btn-sm btn-danger" title="Supprimer cette annonce">
                                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                                        </Button>{" "}
                                                                    </>
                                                                )}

                                                            </>
                                                        )}

                                                    </div>
                                                </div>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envoyez vos contacts</b>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                            <ContactFromEmployementIndex {...this.props} />

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

                                        <Navlinknewemployment/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <b>Envoyez vos contacts</b>
                                                                </div>
                                                            </div>

                                                            <ContactFromEmployementIndex {...this.props} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <SignalFromEmployementForShow {...this.props} />

                                </div>


                                <EmployementInteresse {...this.props} />

                            </div>

                        </div>

                        <FooterUserSite />
                    </div>
                </div>
            </>



        )
    }
}

export default EmployementShowUserSite;
