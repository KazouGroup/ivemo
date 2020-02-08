import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import './ProfileAccountUser.css';
import Categoriesannoncereservation from "../annoncereservation/inc/Categoriesannoncereservation";


class Profileannoncesreservationsbooked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncesreservationsbookeds:{annoncereservation:[],user:[]},
        };

    }


    loadItem() {
        fetch(route('api.annonces_bookeds.site')).then(res => res.json()).then((result) => {
            this.setState({
                annoncesreservationsbookeds: [...result]
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const {annoncesreservationsbookeds} = this.state;

        return (

            <>
                <Helmet>
                    <title>Reservations {`${$userIvemo.first_name}`} - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">




                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <ul className="nav nav-tabs nav-tabs-neutral justify-content-center" role="tablist" data-background-color={this.props.backgroundColor}>
                                            <li className="nav-item">
                                                <NavLink to={`/profile/personal_reservations/`} className="nav-link">
                                                    Reservations
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to={`/profile/annonces_reservations_booked/`} className="nav-link">
                                                    Annonces reservées
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <br />


                                        {annoncesreservationsbookeds.length > 0 && (

                                            <>
                                                {annoncesreservationsbookeds.map((item) =>(

                                                    <div key={item.id} className="card">

                                                        <div className="card-body">

                                                            <div className="card card-plain card-blog">
                                                                <div className="row">
                                                                    <div className="col-md-5">
                                                                        <div className="card-image">
                                                                            <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                                                <ol className="carousel-indicators">
                                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                                                </ol>
                                                                                <div className="carousel-inner" role="listbox">
                                                                                    <div className="carousel-item">
                                                                                        <Link to={`/annonce/show/`}>
                                                                                            <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="carousel-item">
                                                                                        <Link to={`/annonce/show/`}>
                                                                                            <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="carousel-item active">
                                                                                        <Link to={`/annonce/show/`}>
                                                                                            <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                                                    <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                                                </a>
                                                                                <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                                                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <br />
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="text-left pull-left">
                                                                                <NavLink to={`/annonce/show/`}>
                                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                                        {item.annoncereservation.city.name}
                                                                                    </h6>
                                                                                </NavLink>
                                                                            </div>
                                                                            <div className="text-right ml-auto">
                                                                                <a href="#pablo">
                                                                                    <b>Partager</b>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-7">
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="text-left pull-left">
                                                                                <NavLink to={`/annonce/show/`}>
                                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                                        {item.annoncereservation.categoryannoncereservation.name}
                                                                                    </h6>
                                                                                </NavLink>
                                                                            </div>
                                                                            <div className="text-right ml-auto">
                                                                                <a href="#pablo" className="btn btn-sm btn-outline-primary">
                                                                                    <i className="now-ui-icons ui-2_favourite-28"></i>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6 col-6">
                                                                                <h6 className="category text-dark">4 p . 3 ch . 180 m2</h6>
                                                                            </div>
                                                                            <div className="col-md-6 col-6">
                                                                                <strong className="text-dark"><b>50 000 FCFA/mois</b></strong>
                                                                            </div>

                                                                        </div>
                                                                        <h6 className="card-title">
                                                                            <a href="#pablo">Warner Music Group buys concert</a>
                                                                        </h6>
                                                                        <p>
                                                                            Warner Music Group announced today it’s
                                                                            acquiring the selected .
                                                                        </p>
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="d-flex align-items-center">
                                                                                <NavLink to={`/annonce/show/`}>
                                                                                    <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                                </NavLink>
                                                                                <div className="mx-3">
                                                                                    <NavLink to={`/annonce/show/`} className="text-dark font-weight-600 text-sm">Boclair Temgoua
                                                                                        <small className="d-block text-muted">12 janv 2019</small>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>
                                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                                <i className="now-ui-icons tech_mobile"></i>
                                                                            </Button>
                                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-primary">
                                                                                <i className="now-ui-icons location_pin"></i>
                                                                            </NavLink>
                                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer cette reservation" data-placement="bottom">
                                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                                            </NavLink>
                                                                            <Button
                                                                                className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer cette reservation" data-placement="bottom">
                                                                                <i className="now-ui-icons ui-1_simple-remove"></i>
                                                                            </Button>{" "}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                ))}

                                            </>


                                        )}





                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Ajouter une reservation</b>
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
Profileannoncesreservationsbooked.defaultProps = {
    backgroundColor: "black",
};

Profileannoncesreservationsbooked.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default Profileannoncesreservationsbooked;
