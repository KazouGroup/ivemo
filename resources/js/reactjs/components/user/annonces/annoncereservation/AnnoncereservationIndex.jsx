import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./inc/AnnoncereservationList";
import Categoriesannoncereservation from "./inc/Categoriesannoncereservation";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";


class AnnoncereservationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationbytype: {annoncereservations:{annoncetype:[],categoryannoncereservation:[],user:{profile:[]},imagereservations:[]}},
        }
    }

    loadItems(){
        let itemAnnoncereservation = this.props.match.params.annoncetype;
        let url = route('api.annoncereservationbyannoncetype_site', itemAnnoncereservation);
        dyaxios.get(url).then(response => this.setState({annoncereservationbytype: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {annoncereservationbytype} = this.state;
        const allannoncereservations = annoncereservationbytype.annoncereservations;
        const mapAnnoncereservations = allannoncereservations.length >= 0 ? (
            allannoncereservations.map(item => {
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
                    <title>Reservez une chambre d'hotel, un appartement ou une villa - {$name_site}</title>
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
                                        <h3 className="title">Reservez votre chambre d'hotel ou un appartement </h3>
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

export default AnnoncereservationIndex;
