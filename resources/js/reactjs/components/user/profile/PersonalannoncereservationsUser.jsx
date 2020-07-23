import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,Alert} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import './file_private/ProfileAccountUser.css';
import Categoriesannoncereservation from "../annonces/annoncereservation/inc/Categoriesannoncereservation";
import moment from "moment";
import {Remarkable} from "remarkable";


class PersonalannoncereservationsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personnalannoncereservations:{annoncereservation:{imagereservations:[]},user:[]},
        };

    }


    loadItem() {
        fetch(route('api.profile_personal_reservations.site')).then(res => res.json()).then((result) => {
            this.setState({
                personnalannoncereservations: [...result]
            });
        })
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItem();

    }

    getDescription(item) {
        const md = new Remarkable();
        return { __html: md.render(item.annoncereservation.description.length > 80 ? item.annoncereservation.description.substring(0, 80) + "..." : item.annoncereservation.description) };
    }
    render() {
        const {personnalannoncereservations} = this.state;

        return (

            <>
                <Helmet>
                    <title>Reservations {`${$userIvemo.first_name}`} - ${$name_site}</title>
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


                                        <div className="col-lg-8 col-md-12 mx-auto">


                                            {personnalannoncereservations.length > 0 && (

                                                <>
                                                    {personnalannoncereservations.map((item) =>(

                                                        <div key={item.id} className="card">

                                                            <div className="card-body">
                                                                {item.status ?
                                                                    <Alert color="danger">
                                                                        <span>Votre reservation n'à pas ancore été approuver par <b>{item.annoncereservation.user.first_name}</b></span>
                                                                    </Alert>
                                                                    :
                                                                    <Alert color="success">
                                                                        <span>Reservation approuver par <b>{item.annoncereservation.user.first_name}</b></span>
                                                                    </Alert>
                                                                }

                                                                <h4 className="text-center">
                                                                    Vous avez reserver cet(te) <strong>{item.annoncereservation.categoryannoncereservation.name}</strong> du <b>12/09/2019 au 23/10/2020</b>
                                                                </h4>

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

                                                                                        {item.annoncereservation.imagereservations.map((image,index) => (
                                                                                            <div key={image.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                                                                <Link to={`/annonces_reservations/reservations/${item.annoncereservation.categoryannoncereservation.slug}/${item.annoncereservation.city.slug}/${item.annoncereservation.slug}/`}>
                                                                                                    <img className="d-block"
                                                                                                         src={image.photo}
                                                                                                         alt={image.title}/>
                                                                                                </Link>
                                                                                            </div>
                                                                                        ))}
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
                                                                                    <NavLink to={`/annonces_reservations/reservations/${item.annoncereservation.categoryannoncereservation.slug}/${item.annoncereservation.city.slug}/`}>
                                                                                        <h6 className={`text-info ml-auto mr-auto`}>
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
                                                                                    <NavLink to={`/annonces_reservations/reservations/${item.annoncereservation.categoryannoncereservation.slug}/`}>
                                                                                        <h6 className={`text-${item.annoncereservation.categoryannoncereservation.color_name} ml-auto mr-auto`}>
                                                                                            {item.annoncereservation.categoryannoncereservation.name}
                                                                                        </h6>
                                                                                    </NavLink>
                                                                                </div>
                                                                                <div className="text-right ml-auto">
                                                                                    <h5 className="text-success"><b>{(item.annoncereservation.price).toLocaleString()} <small>FCFA</small></b></h5>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-6 col-6">
                                                                                    <h6 className="category text-dark">4 p . 3 ch . 180 m2</h6>
                                                                                </div>


                                                                            </div>
                                                                            <h6 className="card-title">
                                                                                <Link to={`/annonces_reservations/reservations/${item.annoncereservation.categoryannoncereservation.slug}/${item.annoncereservation.city.slug}/${item.annoncereservation.slug}/`}>
                                                                                    {item.annoncereservation.title}
                                                                                </Link>
                                                                            </h6>
                                                                            <span dangerouslySetInnerHTML={this.getDescription(item)}/>
                                                                            <div className="card-header d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <NavLink to={`/po/${item.annoncereservation.user.slug}/`}>
                                                                                        <img src={item.annoncereservation.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                                    </NavLink>
                                                                                    <div className="mx-3">
                                                                                        <NavLink to={`/po/${item.annoncereservation.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{item.annoncereservation.user.first_name}</b>
                                                                                            <small className="d-block text-muted">{moment(item.annoncereservation.created_at).format('LL')}</small>
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>
                                                                                <Button className="btn btn-icon btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                                </Button>
                                                                                <NavLink to={`/annonces/`} className="btn btn-icon btn-sm btn-primary">
                                                                                    <i className="now-ui-icons location_pin"/>
                                                                                </NavLink>
                                                                                <NavLink to={`/annonces/`} className="btn btn-icon btn-sm btn-success" rel="tooltip" title="Editer cette reservation" data-placement="bottom">
                                                                                    <i className="now-ui-icons ui-1_simple-delete"/>
                                                                                </NavLink>
                                                                                <Button
                                                                                    className="btn btn-icon btn-sm btn-danger" rel="tooltip" title="Supprimer cette reservation" data-placement="bottom">
                                                                                    <i className="now-ui-icons ui-1_simple-remove"/>
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
PersonalannoncereservationsUser.defaultProps = {
    backgroundColor: "black",
};

PersonalannoncereservationsUser.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default PersonalannoncereservationsUser;
