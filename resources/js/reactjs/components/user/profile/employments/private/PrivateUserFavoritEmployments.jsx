import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../configurations/inc/NavlinkconfigurationUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import EmploymentListSkeleton from "../../../../inc/user/employment/EmploymentListSkeleton";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import HelmetSite from "../../../../inc/user/HelmetSite";
import PrivateUserFavoritEmployementList from "../../../employment/inc/PrivateUserFavoritEmployementList";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PrivateUserFavoritEmployments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritemployments_count:[],
            useremploymentsPrivate:{favoritemployments:{employment:{categoryemployment:[],user:[],city:[]}}},
            visiable: 20,

        };

        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
        })
    }
    unfavoriteItem(id){
        Swal.fire({
            title: 'Retirer cette annonce?',
            text: "êtes vous sure de vouloir retirer cette annonce de vos favoris?",
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
                let url = route('employments_unfavorite.unfavorite',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette annonce a été retiré de vos favoris",
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
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    loadItems(){
        let itemuser = this.props.match.params.user;

        dyaxios.get(route('api.userfavoritemployment_count',[itemuser])).then(response => this.setState({ favoritemployments_count: response.data, }));
        dyaxios.get(route('api.userfavoritemployment',[itemuser])).then(response => this.setState({useremploymentsPrivate: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    data_countFormatter(favoritemployments_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(favoritemployments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (favoritemployments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {useremploymentsPrivate,visiable,favoritemployments_count} = this.state;
        const mapEmployments = useremploymentsPrivate.favoritemployments.length >= 0 ? (
            useremploymentsPrivate.favoritemployments.slice(0,visiable).map(item => {
                return(
                    <PrivateUserFavoritEmployementList key={item.id} {...item} unfavoriteItem={this.unfavoriteItem}/>
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Mes favoris Emplois, Formation & Services ${$userIvemo.first_name || 'Profile'} - {$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

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

                                        <NavlinkconfigurationUser {...useremploymentsPrivate} />

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="row">
                                            <div className="col-md-4 mx-auto">
                                                <div className="info info-hover">
                                                    <div className="icon icon-warning icon-circle">
                                                        <i className="now-ui-icons business_briefcase-24"></i>                                                    </div>
                                                    <h4 className="info-title"><b>{this.data_countFormatter(favoritemployments_count)}</b></h4>
                                                </div>
                                            </div>
                                        </div>


                                        {mapEmployments}

                                        {visiable < useremploymentsPrivate.favoritemployments.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

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

export default PrivateUserFavoritEmployments;
