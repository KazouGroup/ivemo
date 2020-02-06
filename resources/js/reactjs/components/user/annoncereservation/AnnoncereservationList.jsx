import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button } from "reactstrap";
import moment from "moment";


class AnnoncereservationList extends Component {


    getDescription() {
        const md = new Remarkable();
        return { __html: md.render(this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
    }
    render() {
        return (



            <div className="card">
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
                                        <NavLink to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/`}>
                                            <h6 className="text-info ml-auto mr-auto">
                                                {this.props.city.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto text-success">
                                        <a href="#pablo">
                                            <h6 className="text-primary ml-auto mr-auto">
                                                Reserver
                                            </h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="card-header d-flex align-items-center">
                                    <div className="text-left pull-left">
                                        <NavLink to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/`}>
                                            <h6 className={`text-${this.props.categoryannoncereservation.color_name} ml-auto mr-auto`}>
                                                {this.props.categoryannoncereservation.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto">
                                        <a href="#pablo" className="btn btn-sm btn-outline-primary">
                                            <i className="now-ui-icons ui-2_favourite-28" />
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
                                    <Link to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>Warner Music Group buys concert</Link>
                                </h6>
                                <span dangerouslySetInnerHTML={this.getDescription()}/>
                                <div className="card-header d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <NavLink to={`/@${this.props.user.slug}/`}>
                                            <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                        </NavLink>
                                        <div className="mx-3">
                                            <NavLink to={`/@${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                <small className="d-block text-muted">{moment(this.props.created_at).format('LL')}</small>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                        <i className="now-ui-icons tech_mobile"/>
                                    </Button>
                                    <NavLink to={`/annonces/`} className="btn btn-sm btn-primary">
                                        <i className="now-ui-icons location_pin"/>
                                    </NavLink>

                                    {!$guest && (
                                        <>
                                            {$userIvemo.id === this.props.user_id && (
                                                <>
                                                    <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer" data-placement="bottom">
                                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                                    </NavLink>
                                                    <Button
                                                        className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                                    </Button>{" "}
                                                </>
                                            )}

                                        </>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

export default AnnoncereservationList;
