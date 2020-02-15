import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";
import Swal from "sweetalert2";


class Annoncelocationbycity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationbycity: {annoncelocations:[]},
            cityannoncelocations:[],

        };
        this.deleteItem = this.deleteItem.bind(this);
    }

    loadItem(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCity = this.props.match.params.city;
        let url = route('api.annoncelocationbycities_site',[itemannoncetype,itemCategoryannoncelocation,itemCity]);
        dyaxios.get(url).then(response => this.setState({annoncelocationbycity: response.data,}));

        let url1 = route('api.annoncelocationcategorybycitycount_site',[itemCategoryannoncelocation,itemCity]);
        dyaxios.get(url1).then(response => this.setState({cityannoncelocations: response.data,}));

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

                const url = route('annonces_locations_delete.site',id);
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


    // lifecycle method
    componentDidMount() {
        this.loadItem();
    }

    getcountcategoryannonceString (annoncelocations_count) {
        annoncelocations_count = annoncelocations_count +'';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count/1000).toFixed(annoncelocations_count % 1000 !== 0)+'k';
    }
    render() {
        const {annoncelocationbycity,cityannoncelocations} = this.state;
        const allannoncelocationbycity = annoncelocationbycity.annoncelocations;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        return (
            <>
                <Helmet>
                    <title>Locations {`${itemCategoryannoncelocation || "Ivemo"}`} dans la ville de {`${annoncelocationbycity.name}`} - Ivemo</title>
                </Helmet>

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


                                        <br/>
                                        {allannoncelocationbycity.length >= 0 && (
                                            <>

                                                {allannoncelocationbycity.map((item) => (
                                                    <AnnonceslocationList key={item.id} {...item} deleteItem={this.deleteItem}/>
                                                ))}

                                            </>
                                        )}


                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>



                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        <b>Locations à {annoncelocationbycity.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cityannoncelocations.map((item) => (
                                                                                <tr key={item.id}>
                                                                                    <td>
                                                                                        <NavLink to={`/annonces_locations/locations/${item.slug}/${annoncelocationbycity.slug}/`}>
                                                                                            locations <b>{item.name}</b> à <b>{annoncelocationbycity.name}</b>
                                                                                        </NavLink>
                                                                                    </td>
                                                                                    <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} annonces</td>
                                                                                </tr>
                                                                            ))}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncereselocation/>




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

export default Annoncelocationbycity;
