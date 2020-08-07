import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button} from "reactstrap";
import {Remarkable} from "remarkable";
import Skeleton from "react-loading-skeleton";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncereservationInteresseList extends Component {

    getDescription() {
        const md = new Remarkable();
        return { __html: md.render(this.props.description.length > 40 ? this.props.description.substring(0, 40) + "..." : this.props.description) };
    }
    numberWithCommas() {
        return this.props.price.toLocaleString();
    }

    render() {
        return (
            <>

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

                                            {!$guest && (
                                                <>
                                                    {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                        <>
                                                            {this.props.status && (
                                                                <>
                                                                    <button type="button" rel="tooltip" onClick={() => this.props.unactiveItem(this.props)}
                                                                            className="btn btn-success btn-icon btn-sm">
                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                    </button>
                                                                </>
                                                            )}
                                                            <NavLink to={`/annonces_reservation/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                                                <i className="now-ui-icons ui-2_settings-90"/>
                                                            </NavLink>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            <NavLink to={`/annonces_reservation/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`} className="btn btn-sm btn-icon btn-primary">
                                                <i className="now-ui-icons location_pin" />
                                            </NavLink>

                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="text-left pull-left">
                                                <NavLink to={`/annonces_reservations/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/`}>
                                                    <h6 className="text-info ml-auto mr-auto">
                                                        {this.props.categoryannoncereservation.name}
                                                    </h6>
                                                </NavLink>
                                            </div>
                                            <div className="text-right ml-auto">
                                                <div className="col-md-12 col-12">
                                                    <h5 className="text-dark"><b>{this.numberWithCommas(this.props)} {$money_country.length > 2 ? <small><b>{$money_country} - {this.props.periodeannonce.name}</b></small> : <>{$money_country}<small><b> - {this.props.periodeannonce.name}</b></small></>}</b></h5>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 col-6">
                                                <h6 className="category text-dark">{this.props.pieces > 0 ?<>{this.props.pieces} p.</>:null } {this.props.rooms > 0 ? <>{this.props.rooms} ch.</>:null} {this.props.surface > 0 ? <>{this.props.surface} m<sup>2</sup></>:null}</h6>
                                            </div>

                                            <div className="col-md-7 col-6">
                                                <NavLink to={`/annonces_reservations/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                                </NavLink>
                                                - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                            </div>
                                        </div>
                                        <h6 className="card-title">
                                            <Link to={`/annonces_reservations/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}/`}>
                                                {this.props.title.length > 30 ? this.props.title.substring(0, 30) + "..." : this.props.title}
                                            </Link>
                                        </h6>

                                        {this.props.status_wifi && (
                                            <Button
                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Wi-Fi gratuit">
                                                <i className="fas fa-wifi"></i>
                                            </Button>
                                        )}
                                        {this.props.status_lunch && (
                                            <Button
                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Petit-déjeuner compris">
                                                <i className="fas fa-coffee"></i>
                                            </Button>
                                        )}
                                        {this.props.status_car_sharing && (
                                            <Button className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Service voiturié">
                                                <i className="fas fa-car"></i>
                                            </Button>
                                        )}
                                        {this.props.status_parking && (
                                            <Button className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Parking compris">
                                                <i className="fas fa-parking"></i>
                                            </Button>
                                        )}
                                        {this.props.dry_cleaning && (
                                            <Button
                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Pressing">
                                                <i className="fas fa-tshirt"></i>
                                            </Button>
                                        )}

                                        {this.props.status_consiegerie && (
                                            <Button
                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Bagagerie : laissez en dépôt vos valises et bagages gratuitement le jour d'arrivée ou de départ et profitez librement de votre journée à yaounde.">
                                                <i className="fas fa-luggage-cart"></i>
                                            </Button>
                                        )}

                                        {/*
                                        <span dangerouslySetInnerHTML={this.getDescription(this.props)}/>
                                        */}
                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                {this.props.user.avatar ?
                                                    <NavLink to={`/pro/${this.props.user.slug}/annonces_reservations/`}>
                                                        <img src={this.props.user.avatar}
                                                             style={{ height: "20px", width: "50px" }}
                                                             alt={this.props.user.first_name}
                                                             className="avatar" />
                                                    </NavLink>
                                                    : <Skeleton circle={false} height={20} width={50} />}
                                                <div className="mx-3">
                                                    <NavLink to={`/pro/${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                        <small className="d-block text-muted">{moment(this.props.created_at).format('LL')}</small>
                                                    </NavLink>
                                                </div>

                                            </div>

                                            <div className="text-right mx-auto">

                                                {$guest ?
                                                    <Button  data-toggle="modal" data-target="#loginModal"
                                                             className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                        <i className="far fa-bookmark"></i>
                                                    </Button>
                                                    :
                                                    <>
                                                        {this.props.favoriteted ?
                                                            <Button onClick={() => this.props.unfavoriteItem(this.props)}
                                                                    className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                <i className="fas fa-bookmark"></i>
                                                            </Button>

                                                            :
                                                            <Button onClick={() => this.props.favoriteItem(this.props)}
                                                                    className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                <i className="far fa-bookmark"></i>
                                                            </Button>
                                                        }
                                                    </>
                                                }

                                            </div>

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

export default AnnoncereservationInteresseList;
