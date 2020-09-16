import React, { Component, Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, Input } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import AnnonceventeList from "./inc/AnnonceventeList";
import Categoriesannoncevente from "./inc/Categoriesannoncevente";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import FormModalContactannonceUser from "../../../inc/user/annonce/FormModalContactannonceUser";
import Navlinknewannoncevente from "./treatment/Navlinknewannoncevente";
import HelmetSite from "../../../inc/user/HelmetSite";


class Annoncebycategoryannoncevente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            message: '',
            subject: '',
            errors: [],
            annonceItem: { user: [] },
            annonceventebycategory: [] ,
            cityannonceventes: { user: [] },
            annonceventes: { annoncetype: [], categoryannoncevente: [], city: [], user: [] }
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
        this.contactUser = this.contactUser.bind(this);
        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
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

    handleCheckClick(event) {
        this.setState({
            object: event.target.value
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

    favoriteItem(item) {
        const url = route('favoriteannonceventes_favorite.favorite', [item.id]);
        dyaxios.get(url).then(() => {
            if(item.bookmarked){
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
            }else {
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
            }
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

    contactUser(item) {
        $('#contactNew').modal('show');
        this.setState({
            annonceItem: item
        });
    }

    sendmessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            full_name: this.state.full_name,
            phone: this.state.phone,
            subject: this.state.subject,
            user_id: this.state.annonceItem.user.id,
            annoncevente_id: this.state.annonceItem.id,
            message: this.state.message,
        };
        let url = route('contactusersventes.site');
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                    message: `Votre message a bien été envoyé à cette utilisateur`
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
                    phone: "",
                    subject: "",
                    message: "",
                });

                //Masquer le modal après la création
                $('#contactNew').modal('hide');
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
    }

    statusItem(item) {
        Swal.fire({
            title: 'Désactiver l\'annonce?',
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

                let isNotId = data => data.id !== item.id;
                let updatedItems = this.state.annonceventes.filter(isNotId);
                this.setState({ annonceventes: updatedItems });

                //Envoyer la requet au server
                let url = route('annonces_ventes_status.site', item.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(item.status){
                        $.notify({

                                //message: 'Annonce désactiver avec succès',
                                message: "Annonce masquée aux utilisateurs",
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
                    }else {
                        $.notify({

                                //message: 'Annonce désactiver avec succès',
                                message: "Annonce masquée visible aux utilisateurs",
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
                    /** End alert ***/
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.annonceventes.filter(isNotId);
                this.setState({ annonceventes: updatedItems });

                const url = route('annonces_ventes_delete.site', id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Annonce suprimée avec success'
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
                    this.loadItems();
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


    loadItems() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        dyaxios.get(route('api.annonceventebycategoryannonceventes_site', [itemannoncetype, itemCategoryannoncevente])).then(response => this.setState({ annonceventes: response.data }));
        dyaxios.get(route('api.annonceventebycategoryannonceventescount_site', [itemannoncetype, itemCategoryannoncevente])).then(response => this.setState({ annonceventebycategory: response.data }));
        let url1 = route('api.annonceventebycategorycitycount_site', [itemCategoryannoncevente]);
        dyaxios.get(url1).then(response => this.setState({ cityannonceventes: response.data, }));

    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryannonceString(annonceventes_count) {
        annonceventes_count = annonceventes_count + '';
        if (annonceventes_count < 1000) {
            return annonceventes_count;
        }
        if (annonceventes_count < 10000) {
            return annonceventes_count.charAt(0) + ',' + annonceventes_count.substring(1);
        }
        return (annonceventes_count / 1000).toFixed(annonceventes_count % 1000 !== 0) + 'k';
    }
    render() {
        const { annonceventes,annonceventebycategory, cityannonceventes, annonceItem } = this.state;
        const mapAnnonceventes = annonceventes.length >= 0 ? (
            annonceventes.map(item => {
                return (
                    <AnnonceventeList key={item.id} {...item} favoriteItem={this.favoriteItem} deleteItem={this.deleteItem} statusItem={this.statusItem} contactUser={this.contactUser} />
                )
            })
        ) : (
                <AnnoncesListSkeleton />
            );
        return (
            <Fragment>
                <HelmetSite title={`Vente ${annonceventebycategory.name || $name_site} - ${$name_site}`} />

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

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
                                            <Link to={`/avs/${this.props.match.params.annoncetype}/`} >
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces </b>
                                            </Link>
                                        </div>
                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail />
                                                )}
                                            </>
                                        )}

                                        {mapAnnonceventes}

                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <Navlinknewannoncevente {...this.props} />
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                                        <b>Ventes {annonceventebycategory.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down" />
                                                                    </a>
                                                                </div>

                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                                {cityannonceventes.length >= 0 ?
                                                                                    <>
                                                                                        {cityannonceventes.map((item) => (
                                                                                            <tr key={item.id}>
                                                                                                <td>
                                                                                                    <NavLink to={`/avs/${this.props.match.params.annoncetype}/${annonceventebycategory.slug}/${item.slug}/`}>
                                                                                                        <b style={{ textTransform: "lowercase" }}>achat {annonceventebycategory.name} à {item.name}</b>
                                                                                                    </NavLink>
                                                                                                </td>
                                                                                                <td className="text-right"> {this.getcountcategoryannonceString(item.annonceventes_count)}  {item.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </>
                                                                                    :
                                                                                    <NavannoncecategorySkeleton />}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncevente />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <FormModalContactannonceUser {...this.props} {...annonceItem}
                                        renderErrorFor={this.renderErrorFor}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        sendmessageItem={this.sendmessageItem} />

                                </div>
                            </div>

                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default Annoncebycategoryannoncevente;
