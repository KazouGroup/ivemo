import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./inc/AnnoncereservationList";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import Categoriesannoncereservation from "./inc/Categoriesannoncereservation";


class Annoncebycategoryannoncereservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationbycategory: {annoncereservations:{annoncetype:[],categoryannoncereservation:[],user:{profile:[]},imagereservations:[]}},
            citiesannoncesreservations: [],
        }
    }

    loadItem(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let url = route('api.annoncelocationbycategoryannoncereservations_site',[itemannoncetype,itemCategoryannoncereservation]);
        dyaxios.get(url).then(response => this.setState({annoncereservationbycategory: response.data}));
        fetch(route('api.annoncereservationbycategorycount_site',[itemCategoryannoncereservation])).then(res => res.json()).then((result) => {
            this.setState({
                citiesannoncesreservations: [...result]
            });
        });
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();
    }

    getcountcategoryannonceString (annoncereservations_count) {
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
        const {annoncereservationbycategory,citiesannoncesreservations} = this.state;
        const allannoncereservationsbycategory = annoncereservationbycategory.annoncereservations;
        const annoncetype = this.props.match.params.annoncetype;
        const mapAnnoncereservations = allannoncereservationsbycategory.length >= 0 ? (
            allannoncereservationsbycategory.map(item => {
                return(
                    <AnnoncereservationList key={item.id} {...item} />
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <>
                <Helmet>
                    <title>{`${annoncereservationbycategory.name || $name_site} - `} {$name_site}</title>
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
                                            <Link to={`/annonces_reservations/reservations/`} >
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos annonces </b>
                                            </Link>
                                        </div>
                                        <br/>
                                        {mapAnnoncereservations}

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
                                                                        <b>Reservater un(e) {annoncereservationbycategory.name}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {citiesannoncesreservations.length ?
                                                                                <>  {citiesannoncesreservations.map((item) => (
                                                                                    <tr key={item.id}>
                                                                                        <td>
                                                                                            <NavLink to={`/annonces_reservations/${annoncetype}/${annoncereservationbycategory.slug}/${item.slug}/`}>
                                                                                                Reserver un(e) <b style={{ textTransform: "lowercase" }}>{annoncereservationbycategory.name}</b> à <strong> {item.name}</strong>
                                                                                            </NavLink>
                                                                                        </td>
                                                                                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} annonces</td>
                                                                                    </tr>
                                                                                ))}
                                                                                </>: <NavannoncecategorySkeleton/>}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <Categoriesannoncereservation/>

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
