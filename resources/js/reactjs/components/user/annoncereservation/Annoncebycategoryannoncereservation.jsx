import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./AnnoncereservationList";
import PropTypes from "prop-types";
import Navtabscategoryreservation from "./inc/Navtabscategoryreservation";


class Annoncebycategoryannoncereservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationbycategory: {annoncereservations:[]},
        }
    }

    loadItem(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let url = route('api.annoncelocationbycategoryannoncereservations_site',[itemannoncetype,itemCategoryannoncereservation]);
        dyaxios.get(url).then(response => this.setState({annoncereservationbycategory: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();
    }

    render() {
        const {annoncereservationbycategory} = this.state;
        const allannoncereservationsbycategory = annoncereservationbycategory.annoncereservations;
        return (
            <>
                <Helmet>
                    <title>{`${annoncereservationbycategory.name}`} - Ivemo</title>
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

                                       <Navtabscategoryreservation/>
                                        <br/>

                                        {allannoncereservationsbycategory.map((item) => (
                                            <AnnoncereservationList key={item.id} {...item} />
                                        ))}

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
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Reservation {annoncereservationbycategory.name}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            <tr>
                                                                                <td>
                                                                                    <NavLink to={`/`}>
                                                                                        Reservez un(e) <strong>{annoncereservationbycategory.name}</strong> à Douala
                                                                                    </NavLink>
                                                                                </td>
                                                                                <td className="text-right"> 200 annonces</td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        Reservez un(e) <strong>{annoncereservationbycategory.name}</strong> à Yaounde
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right"> 1 300 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        Reservez un(e) <strong>{annoncereservationbycategory.name}</strong> à Daschang
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right"> 380 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        Reservez un(e) <strong>{annoncereservationbycategory.name}</strong> à Bafang
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right"> 9 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        Reservez un(e) <strong>{annoncereservationbycategory.name}</strong> à Bamenda
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right"> 5 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        Reservez un(e) <strong>{annoncereservationbycategory.name}</strong> à Douala
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right"> 1 200 annonces</td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        <b>Autres transactions à Douala </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Toutes les ventes de maison Douala</a></td>
                                                                                <td className="text-right"> 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Toutes les ventes de terrains Douala</a></td>
                                                                                <td className="text-right"> 1 300 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Tous les achats de maison de prestige Douala</a></td>
                                                                                <td className="text-right"> 380 annonces</td>
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

export default Annoncebycategoryannoncereservation;