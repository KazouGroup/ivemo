import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import Skeleton from "react-loading-skeleton";


class PrivateUserFavoriteAnnonceslocationList extends Component {

    getDescription() {
        return { __html: (this.props.annoncelocation.description.length > 80 ? this.props.annoncelocation.description.substring(0, 80) + "..." : this.props.annoncelocation.description) };
    }
    render() {
        return (

            <>
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
                                        <NavLink to={`/annonces_locations/locations/${this.props.annoncelocation.categoryannoncelocation.slug}/`}>
                                            <h6 className={`text-${this.props.annoncelocation.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                {this.props.annoncelocation.categoryannoncelocation.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto">
                                        <h5 className="text-success"><b>{this.props.annoncelocation.price.formatMoney(2,'.',',') || "0"} <small>FCFA/mois</small></b></h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-6">
                                            <h6 className="text-dark">{this.props.annoncelocation.pieces > 0 ?<>{this.props.annoncelocation.pieces} p.</>:null } {this.props.annoncelocation.rooms > 0 ? <>{this.props.annoncelocation.rooms} ch.</>:null} {this.props.annoncelocation.surface > 0 ? <>{this.props.annoncelocation.surface} m<sup>2</sup></>:null}</h6>
                                        </div>
                                        <div className="col-md-7 col-6">
                                            <NavLink to={`/annonces_locations/locations/${this.props.annoncelocation.categoryannoncelocation.slug}/${this.props.annoncelocation.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.annoncelocation.city.name} </strong>
                                            </span>
                                            </NavLink>
                                            - {this.props.annoncelocation.district.length > 10 ? this.props.annoncelocation.district.substring(0, 10) + "..." : this.props.annoncelocation.district}
                                        </div>

                                    </div>
                                    <h6 className="card-title">
                                        <Link to={`/annonces_locations/locations/${this.props.annoncelocation.categoryannoncelocation.slug}/${this.props.annoncelocation.city.slug}/${this.props.annoncelocation.slug}/`}>
                                            {this.props.annoncelocation.title.length > 90 ? this.props.annoncelocation.title.substring(0, 90) + "..." : this.props.annoncelocation.title}
                                        </Link>
                                    </h6>
                                    <Link to={`/annonces_locations/locations/${this.props.annoncelocation.categoryannoncelocation.slug}/${this.props.annoncelocation.city.slug}/${this.props.annoncelocation.slug}/`}>
                                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                                    </Link>
                                    <div className="card-header d-flex align-items-center">
                                        <div className="d-flex align-items-center">
                                            {this.props.annoncelocation.user.avatar ?
                                                <NavLink to={`/pro/${this.props.annoncelocation.user.slug}/annonces_locations/`}>
                                                    <img src={this.props.annoncelocation.user.avatar}
                                                         style={{ height: "40px", width: "80px" }}
                                                         alt={this.props.annoncelocation.user.first_name}
                                                         className="avatar" />
                                                </NavLink>
                                                : <Skeleton circle={false} height={40} width={80} />}
                                            <div className="mx-3">
                                                <NavLink to={`/pro/${this.props.annoncelocation.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm">{this.props.annoncelocation.user.first_name}
                                                    <small className="d-block text-muted"><b>{moment(this.props.annoncelocation.created_at).format('LL')}</b></small>
                                                </NavLink>
                                            </div>
                                        </div>

                                        <div className="text-right mx-auto">

                                            <Button onClick={() => this.props.unfavoriteItem(this.props.annoncelocation.id)}
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

            </>
        )
    }

}

export default PrivateUserFavoriteAnnonceslocationList;
