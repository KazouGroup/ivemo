import React, {Component,Fragment} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button} from "reactstrap";
import {Remarkable} from "remarkable";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceventeInteresseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    render() {
        return (
            <Fragment>

                <div key={this.props.id} className="col-md-6 mx-auto">
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
                                                        <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                    </div>
                                                    <div className="carousel-item active">
                                                        <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
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
                                        <div className="text-center">
                                            <Button className="btn btn-sm btn-icon btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                <i className="now-ui-icons tech_mobile" />
                                            </Button>
                                            <NavLink to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/${this.props.city.slug}/${this.props.slug}/`} className="btn btn-sm btn-icon btn-primary">
                                                <i className="now-ui-icons location_pin" />
                                            </NavLink>

                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="text-left pull-left">
                                                <NavLink to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/`}>
                                                    <h6 className={`text-${this.props.categoryannoncevente.color_name} ml-auto mr-auto`}>
                                                        {this.props.categoryannoncevente.name}
                                                    </h6>
                                                </NavLink>
                                            </div>
                                            <div className="text-right ml-auto">
                                                <div className="col-md-12 col-12">
                                                    <h5 className="text-success"><b>{this.props.price.formatMoney(2,'.',',')} <small>FCFA/mois</small></b></h5>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-6">
                                                <h6 className="category text-dark">{this.props.pieces} p . {this.props.rooms && (<>{this.props.rooms} ch</>)}. {this.props.surface && (<>{this.props.surface} m<sup>2</sup></>)}</h6>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <NavLink to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/${this.props.city.slug}/`}>
                                                            <span className="ml-auto mr-auto">
                                                                <strong>{this.props.city.name} </strong>
                                                            </span>
                                                </NavLink>
                                                - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                            </div>
                                        </div>
                                        <h6 className="card-title">
                                            <NavLink to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                                {this.props.title.length > 30 ? this.props.title.substring(0, 30) + "..." : this.props.title}
                                            </NavLink>
                                        </h6>
                                        {/*
                                                <span dangerouslySetInnerHTML={this.getDescription(item)} />
                                                */}
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <NavLink to={`/pro/${this.props.user.slug}/annonces_ventes/`}>
                                                    <img src={this.props.user.avatar} style={{ height: "20px", width: "50px" }} alt={this.props.user.first_name} className="avatar" />
                                                </NavLink>
                                                <div className="mx-3">
                                                    <NavLink to={`/pro/${this.props.user.slug}/annonces_ventes/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                        <small className="d-block text-muted">{moment(this.props.created_at).format('LL')}</small>
                                                    </NavLink>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }

}

export default AnnonceventeInteresseList;
