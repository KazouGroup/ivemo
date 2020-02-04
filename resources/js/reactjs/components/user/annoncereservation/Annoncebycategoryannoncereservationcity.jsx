import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./AnnoncereservationList";
import PropTypes from "prop-types";


class Annoncebycategoryannoncereservationcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationbycity:[],
            categoryannoncereservations: [],
            citiesannoncesreservations: [],
        }
    }

    loadItem(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemcityannonce = this.props.match.params.city;
        let url = route('api.annoncereservationbycities_site',[itemannoncetype,itemCategoryannoncereservation,itemcityannonce]);
        dyaxios.get(url).then(response => this.setState({annoncereservationbycity: response.data,}));
        dyaxios.get(route('api.categoryannoncereservation_site')).then(response => this.setState({categoryannoncereservations: response.data,}));
        fetch(route('api.citiesannonces_reservations_site')).then(res => res.json()).then((result) => {
            this.setState({
                citiesannoncesreservations: [...result]
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();
    }

    getRepString (annoncereservations_count) {
        annoncereservations_count = annoncereservations_count +'';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count/1000).toFixed(annoncereservations_count % 1000 !== 0)+'k';
    }

    render() {
        const {annoncereservationbycity,categoryannoncereservations,citiesannoncesreservations} = this.state;
        let Slugannoncetype = this.props.match.params.annoncetype;
        let Slugategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let Slugcity = this.props.match.params.city;
        return (
            <>
                <Helmet>
                    <title>Reservation dans la ville de {`${Slugcity}`} - Ivemo</title>
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

                                        <ul className="nav nav-tabs nav-tabs-neutral justify-content-center"
                                            role="tablist" data-background-color={this.props.backgroundColor}>

                                            {categoryannoncereservations.map((item) => (
                                                <li key={item.id} className="nav-item">
                                                    <NavLink to={`/annonces_reservations/reservations/${item.slug}/${Slugcity}/`} className="nav-link">
                                                        <b>{item.name}</b>
                                                    </NavLink>
                                                </li>
                                            ))}

                                        </ul>
                                        <br/>

                                        {annoncereservationbycity.length >= 0 && (
                                            <>
                                                {annoncereservationbycity.map((item) => (
                                                    <AnnoncereservationList key={item.id} {...item} />
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
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Faites une reservation dans ces villes</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {citiesannoncesreservations.map((item) => (
                                                                                <tr key={item.id}>
                                                                                    <td>
                                                                                        <NavLink to={`/annonces_reservations/${Slugannoncetype}/${Slugategoryannoncereservation}/${item.slug}/`}>
                                                                                            Reservation {Slugategoryannoncereservation} à  {item.name}
                                                                                        </NavLink>
                                                                                    </td>
                                                                                    <td className="text-right">{this.getRepString(item.annoncereservations_count)}  annonces</td>
                                                                                </tr>
                                                                            ))}

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
Annoncebycategoryannoncereservationcity.defaultProps = {
    backgroundColor: "black",
};

Annoncebycategoryannoncereservationcity.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default Annoncebycategoryannoncereservationcity;
