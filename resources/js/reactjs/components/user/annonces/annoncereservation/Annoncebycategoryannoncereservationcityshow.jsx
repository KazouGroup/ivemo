import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import BlogannoncereservationIntesseAnnonseShow
    from "../../blog/blogannoncereservation/BlogannoncereservationIntesseAnnonseShow";
import AnnonceservationInteresse from "./AnnonceservationInteresse";
import FormContactAnnoncereservationUser from "./inc/FormContactAnnoncereservationUser";
import FormcontactuseronreservationShow from "./inc/FormcontactuseronreservationShow";
import ProfileForallAnnonceShow from "../ProfileForallAnnonceShow";


class Annoncebycategoryannoncereservationcityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservation:{annoncetype:[],categoryannoncereservation:[],user:{profile:[]},imagereservations:[]},
        };

    }

    // lifecycle method
    componentDidMount() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemcityannonce = this.props.match.params.city;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        /*Ici c'est pour recuperer les annonce par villes*/
        let url = route('api.annoncelocationbycategoryannoncereservationslug_site',[itemannoncetype,itemCategoryannoncereservation,itemcityannonce,itemannoncereservation]);
        dyaxios.get(url).then(response => this.setState({annoncereservation: response.data,}));
    }

    render() {
        const {annoncereservation} = this.state;
        return (
            <>
                <Helmet>
                    <title>{`${annoncereservation.title || "Ivemo"}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar ivemoNarbarCustomisation navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card-body">
                                            <div className="submit text-left">
                                                <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour au annonces</b>
                                                </button>
                                            </div>

                                            <div className="card-image">

                                                <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                    <ol className="carousel-indicators">
                                                        {annoncereservation.imagereservations.map((value,index) => {
                                                            return <li key={value.id} data-target={`#carouselAnnonceIndicators`} data-slide-to={index} className={index === 0 ? "active" : ""}/>
                                                        })}
                                                    </ol>
                                                    <div className="carousel-inner" role="listbox">

                                                        {annoncereservation.imagereservations.map((item,index) => (
                                                            <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                                <img className="d-block"
                                                                     src={item.photo}
                                                                     alt={item.title}/>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                        <i className="now-ui-icons arrows-1_minimal-left"/>
                                                    </a>
                                                    <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                        <i className="now-ui-icons arrows-1_minimal-right"/>
                                                    </a>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    <NavLink to={`/annonces_reservations/${annoncereservation.annoncetype.slug}/${annoncereservation.categoryannoncereservation.slug}/`}>
                                                        <h6 className={`text-${annoncereservation.categoryannoncereservation.color_name} ml-auto mr-auto`}>
                                                            {annoncereservation.categoryannoncereservation.name}
                                                        </h6>
                                                    </NavLink>
                                                </div>

                                                {/*
                                                <div className="text-center ml-auto">
                                                    <a href="#pablo" className="btn btn-primary btn-round">
                                                        <i className="now-ui-icons ui-2_favourite-28"/> Dejà sauvegarder
                                                    </a>
                                                </div>
                                                */}

                                                <div className="text-right ml-auto">
                                                    <h5 className="text-success"><b>{(annoncereservation.price)} <small>FCFA</small></b></h5>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    Description
                                                </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>
                                                <hr />
                                                <h6 className="card-title">
                                                    A L'interieur
                                                </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>



                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">

                                                <ProfileForallAnnonceShow {...annoncereservation}/>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envie de visiter ? Une question sur cet appartement ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"/>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                                                        <FormContactAnnoncereservationUser {...this.props}/>


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
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <NavLink to={`/@${annoncereservation.user.slug}/`}>
                                                                        <img src={annoncereservation.user.avatar} style={{ height: "40px", width: "80px" }} alt={annoncereservation.user.first_name} className="avatar" />
                                                                    </NavLink>
                                                                    <div className="mx-3">
                                                                        <NavLink to={`/@${annoncereservation.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{annoncereservation.user.first_name}</b>
                                                                            <small className="d-block text-muted">12 janv 2019</small>
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                </Button>
                                                                <a href="https://www.kazoutech.com" className="btn btn-sm btn-success" target="_banck">
                                                                    <i className="now-ui-icons ui-2_chat-round"/>
                                                                </a>
                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <a href="#pablo" className="btn btn-sm btn-outline-success">
                                                                        <i className="now-ui-icons tech_mobile"/> <b>3425712192 / 34569821 ou 677688066</b>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    Contacter <b>{annoncereservation.user.first_name} </b>
                                                                </div>
                                                            </div>

                                                           <FormcontactuseronreservationShow {...this.props}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <AnnonceservationInteresse {...this.props}/>

                                <BlogannoncereservationIntesseAnnonseShow {...this.props} />

                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>
            </>



        )
    }
}

export default Annoncebycategoryannoncereservationcityshow;
