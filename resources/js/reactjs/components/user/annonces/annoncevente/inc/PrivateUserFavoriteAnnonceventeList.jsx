import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Button, UncontrolledTooltip} from "reactstrap";
import moment from "moment";
import Skeleton from "react-loading-skeleton";


class PrivateUserFavoriteAnnonceventeList extends Component {

    getDescription() {
        return { __html: (this.props.annoncevente.description.length > 80 ? this.props.annoncevente.description.substring(0, 80) + "..." : this.props.annoncevente.description) };
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
                                                <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                            </div>
                                            <div className="carousel-item">
                                                <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                            </div>
                                            <div className="carousel-item active">
                                                <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col-md-7">
                                <div className="text-left pull-left">
                                    <NavLink to={`/annonces_ventes/${this.props.annoncevente.annoncetype.slug}/${this.props.annoncevente.categoryannoncevente.slug}/`}>
                                        <h6 className={`text-${this.props.annoncevente.categoryannoncevente.color_name} ml-auto mr-auto`}>
                                            {this.props.annoncevente.categoryannoncevente.name}
                                        </h6>
                                    </NavLink>
                                </div>
                                <div className="text-right ml-auto">
                                    <h5 className="text-success"><b>{this.props.annoncevente.price.formatMoney(2,'.',',') || "0"} <small>FCFA</small></b></h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 col-6">
                                        <h6 className="text-dark">{this.props.annoncevente.pieces > 0 ?<>{this.props.annoncevente.pieces} p.</>:null } {this.props.annoncevente.rooms > 0 ? <>{this.props.annoncevente.rooms} ch.</>:null} {this.props.annoncevente.surface > 0 ? <>{this.props.annoncevente.surface} m<sup>2</sup></>:null}</h6>
                                    </div>
                                    <div className="col-md-7 col-6">
                                        <NavLink to={`/annonces_ventes/${this.props.annoncevente.annoncetype.slug}/${this.props.annoncevente.categoryannoncevente.slug}/${this.props.annoncevente.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.annoncevente.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.annoncevente.district.length > 10 ? this.props.annoncevente.district.substring(0, 10) + "..." : this.props.annoncevente.district}
                                    </div>

                                </div>
                                <h6 className="card-title">
                                    <Link to={`/annonces_ventes/${this.props.annoncevente.annoncetype.slug}/${this.props.annoncevente.categoryannoncevente.slug}/${this.props.annoncevente.city.slug}/${this.props.annoncevente.slug}/`}>
                                        {this.props.annoncevente.title.length > 90 ? this.props.annoncevente.title.substring(0, 90) + "..." : this.props.annoncevente.title}
                                    </Link>
                                </h6>
                                <Link to={`/annonces_ventes/${this.props.annoncevente.annoncetype.slug}/${this.props.annoncevente.categoryannoncevente.slug}/${this.props.annoncevente.city.slug}/${this.props.annoncevente.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </Link>
                                <div className="card-header d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        {this.props.annoncevente.user.avatar ?
                                            <NavLink to={`/pro/${this.props.annoncevente.user.slug}/annonces_ventes/`}>
                                                <img src={this.props.annoncevente.user.avatar}
                                                     style={{ height: "40px", width: "80px" }}
                                                     alt={this.props.annoncevente.user.first_name}
                                                     className="avatar" />
                                            </NavLink>
                                            : <Skeleton circle={false} height={40} width={80} />}
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.annoncevente.user.slug}/annonces_ventes/`} className="text-dark font-weight-600 text-sm">{this.props.annoncevente.user.first_name}
                                                <small className="d-block text-muted"><b>{moment(this.props.annoncevente.created_at).format('LL')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">

                                        <Button onClick={() => this.props.unfavoriteItem(this.props.annoncevente.id)}
                                                className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                            <i className="fas fa-bookmark"></i>
                                        </Button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default PrivateUserFavoriteAnnonceventeList;
