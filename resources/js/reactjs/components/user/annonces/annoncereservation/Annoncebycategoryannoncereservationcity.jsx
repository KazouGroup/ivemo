import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./inc/AnnoncereservationList";
import PropTypes from "prop-types";
import Categoriesannoncereservation from "./inc/Categoriesannoncereservation";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";


class Annoncebycategoryannoncereservationcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationbycity: { annoncereservations: {annoncetype:[],categoryannoncereservation:[],user:{profile:[]},imagereservations:[]} },
            categoryannoncereservations: [],
            citiesannoncesreservations: [],
            annoncereservationbycategory: [],
        }
    }

    loadItem() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemcityannonce = this.props.match.params.city;
        /*Ici c'est pour recuperer les annonce par villes*/
        let url = route('api.annoncereservationbycities_site', [itemannoncetype, itemCategoryannoncereservation, itemcityannonce]);
        dyaxios.get(url).then(response => this.setState({ annoncereservationbycity: response.data, }));
        /* Ici c'est le lien pour recuperer les annonces par categorie */
        let lien = route('api.annoncelocationbycategoryannoncereservations_site', [itemannoncetype, itemCategoryannoncereservation]);
        dyaxios.get(lien).then(response => this.setState({ annoncereservationbycategory: response.data, }));
        /* Ici c'est pour recuperer les categories*/
        dyaxios.get(route('api.annoncereservationcategorybycitycount_site', [itemCategoryannoncereservation, itemcityannonce])).then(response => this.setState({ categoryannoncereservations: response.data, }));
        /* Ici c'est pour recuperer les articles par annonces decroissant*/
        fetch(route('api.annoncereservationcategorybycitycount_site', [itemCategoryannoncereservation, itemcityannonce])).then(res => res.json()).then((result) => {
            this.setState({
                citiesannoncesreservations: [...result]
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();
    }

    getcountcategoryannonceString(annoncereservations_count) {
        annoncereservations_count = annoncereservations_count + '';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count / 1000).toFixed(annoncereservations_count % 1000 !== 0) + 'k';
    }

    render() {
        const { annoncereservationbycity, categoryannoncereservations, citiesannoncesreservations, annoncereservationbycategory } = this.state;
        let SlugCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let allannoncereservationbycity = annoncereservationbycity.annoncereservations;
        return (
            <>
                <Helmet>
                    <title>Reservation {`${SlugCategoryannoncereservation || $name_site}`} dans la ville de {`${annoncereservationbycity.name || ""}`} - {$name_site}</title>
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

                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour aux annonces</b>
                                            </button>
                                        </div>

                                        {allannoncereservationbycity.length >= 0 && (
                                            <>
                                                {allannoncereservationbycity.map((item) => (
                                                    <AnnoncereservationList key={item.id} {...item} />
                                                ))}
                                            </>
                                        )}

                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add" /> <b>Poster votre annonce</b>
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
                                                                        <b>Faites vos reservations à {annoncereservationbycity.name}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down" />
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {categoryannoncereservations.length >= 0 ?
                                                                                <>{categoryannoncereservations.map((item) => (
                                                                                    <tr key={item.id}>
                                                                                        <td>
                                                                                            <NavLink to={`/annonces_reservations/reservations/${item.slug}/${annoncereservationbycity.slug}/`} >
                                                                                                Reserver un(e) <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <strong> {annoncereservationbycity.name}</strong>
                                                                                            </NavLink>
                                                                                        </td>
                                                                                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} annonces</td>
                                                                                    </tr>
                                                                                ))}</>:<NavannoncecategorySkeleton/>}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncereservation />
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
