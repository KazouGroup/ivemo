import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Helmet} from "react-helmet";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import {Button, Form,Alert,Input} from "reactstrap";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import Navemployements from "./inc/Navemployements";
import NavannoncecategorySkeleton from "../../inc/user/NavannoncecategorySkeleton";
import EmploymentListSkeleton from "../../inc/user/employment/EmploymentListSkeleton";
import Navlinknewemployment from "./treatement/Navlinknewemployment";
import EmployementList from "./inc/EmployementList";
require("moment/min/locales.min");
moment.locale('fr');

class EmployementBycategoryemployementbycity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncebycity:{employments:{categoryemployment:[],user:[],city:[]},user:[]},
            categoryemployment:[],
            cities:{user:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    unactiveItem(id){
        Swal.fire({
            title: 'Masquer cette annonce?',
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
                            message: "Cette annonce a été masquée aux utilisateurs",
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
        let itemCategoryemployment = this.props.match.params.categoryemployment;
        let itemCity = this.props.match.params.city;
        let url = route('api.employmentscategory_site', [itemCategoryemployment]);
        let urldata = route('api.employmentscategorybycity_site', [itemCategoryemployment,itemCity]);
        dyaxios.get(url).then(response => this.setState({ categoryemployment: response.data }));
        dyaxios.get(urldata).then(response => this.setState({ annoncebycity: response.data }));
        dyaxios.get(route('api.employmentbycategorybycount_site', [itemCategoryemployment])).then(response => this.setState({ cities: response.data }));
    }

    componentDidMount() {
        this.loadItems();
    }

    getdataString(employments_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {annoncebycity,categoryemployment,cities} = this.state;
        const mapEmployments = annoncebycity.employments.length >= 0 ? (
            annoncebycity.employments.map(item => {
                return(

                    <EmployementList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} />
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>

                <Helmet title={`${categoryemployment.name || 'Annonce'} ${annoncebycity.name || ""} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400" >
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + categoryemployment.photo + ")" }}>
                            </div>
                            <div className="content-center">

                                {categoryemployment.name && (
                                    <>
                                        <h2 className="title">{categoryemployment.name || ""} à {annoncebycity.name}</h2>

                                        <Link to={`/employments/`} className="text-white">
                                            <i className="fa fa-chevron-circle-left" /> <b>Retour aux annonces</b>
                                        </Link>

                                        <h5><b>{annoncebycity.employments_count}</b> {annoncebycity.employments_count > 1 ? "annonces" : "annonce"} posté</h5>

                                    </>
                                )}


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
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapEmployments}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewemployment/>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>{categoryemployment.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cities.length >= 0 ?
                                                                                <>
                                                                                    {cities.map((item) => (
                                                                                        <tr key={item.id}>
                                                                                            <td>
                                                                                                <NavLink to={`/employments/${categoryemployment.slug}/${item.slug}/`}>
                                                                                                     <b style={{ textTransform: "lowercase" }}>{categoryemployment.name}</b> à <b>{item.name}</b>
                                                                                                </NavLink>
                                                                                            </td>
                                                                                            <td className="text-right"> {this.getdataString(item.employments_count)}  {item.employments_count > 1 ? "annonces" : "annonce"}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </>
                                                                                :
                                                                                <NavannoncecategorySkeleton/>}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <Navemployements/>

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

export default EmployementBycategoryemployementbycity;