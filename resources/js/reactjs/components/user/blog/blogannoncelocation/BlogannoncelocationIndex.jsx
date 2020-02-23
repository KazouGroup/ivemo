import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Helmet} from "react-helmet";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import {Button} from "reactstrap";
import Swal from "sweetalert2";
import Navblogannoncelocations from "./inc/Navblogannoncelocations";
import BlogannoncelocationList from "./BlogannoncelocationList";
require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations:{categoryannoncelocation:[],user:[]},

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
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

                //Envoyer la requet au server
                let url = route('blogannoncecategorylocationunactive_site.site',id);
                dyaxios.get(url).then(() => {

                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.blogannoncelocations.filter(isNotId);
                    this.setState({blogannoncelocations: updatedItems});

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette annonce a été masquée <a href=\"/profile/personal_settings/blogs/annonces_locations/\" target=\"_blank\" class=\"btn btn-info btn-sm\">Modifier ici</a>",
                            url: "/profile/personal_settings/blogs/annonces_locations/",
                            target: "_blank"
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

                const url = route('blogannoncecategorylocationdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.blogannoncelocations.filter(isNotId);
                    this.setState({blogannoncelocations: updatedItems});
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

    componentDidMount() {
        dyaxios.get(route('api.blogannoncelocations_site')).then(response =>
            this.setState({
                blogannoncelocations: [...response.data.data],
            }));
    }

    render() {
        const {blogannoncelocations} = this.state;
        const mapAnnoncelocations = blogannoncelocations.length ? (
            blogannoncelocations.map(item => {
                return(
                    <BlogannoncelocationList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Conseils tout savoir sur les locations - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">Trouver une maison, une chambre ou un appartement à louer  </h3>
                                    </div>
                                </div>
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

                                        {mapAnnoncelocations}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-primary" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article</b>
                                            </NavLink>
                                        </div>

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

export default BlogannoncelocationIndex;
