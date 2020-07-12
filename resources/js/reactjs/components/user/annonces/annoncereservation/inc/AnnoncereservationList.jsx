import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button } from "reactstrap";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import ButonFavoris from "../../../../inc/vendor/ButonFavoris";


class AnnoncereservationList extends PureComponent {


    render() {
        return (

            <div className="card">
                <div className="card-body">
                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-5">
                                {/*
                                 <div className="card-image">
                                    <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            {this.props.imagereservations.map((value,index) => {
                                                return <li key={value.id} data-target={`#carouselAnnonceIndicators`} data-slide-to={index} className={index === 0 ? "active" : ""}/>
                                            })}
                                        </ol>
                                        <div className="carousel-inner" role="listbox">

                                            {this.props.imagereservations.map((item,index) => (
                                                <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                    <Link to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                                        <img className="d-block"
                                                             src={item.photo}
                                                             alt={item.title}/>
                                                    </Link>
                                                </div>
                                            ))}

                                        </div>

                                    </div>
                                </div>
                                */}
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


                                <div className="text-center">

                                    {!$guest && (
                                        <>
                                            {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                <>
                                                    {this.props.status ?
                                                        <>
                                                            <button type="button" rel="tooltip" onClick={() => this.props.statusItem(this.props)}
                                                                    className="btn btn-success btn-icon btn-sm">
                                                                <i className="now-ui-icons ui-1_check"/>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" onClick={() => this.props.statusItem(this.props)}
                                                                    className="btn btn-primary btn-icon btn-sm">
                                                                <i className="now-ui-icons ui-1_simple-delete"/>
                                                            </button>
                                                        </>
                                                    }

                                                    <NavLink to={`/annonce_reservation/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                                        <i className="now-ui-icons ui-2_settings-90"/>
                                                    </NavLink>
                                                    <Button
                                                        className="btn btn-icon btn-sm btn-danger" onClick={() => this.props.deleteItem(this.props.id)} title="Supprimer cette annonce">
                                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    )}


                                </div>

                                {/*
                                 <div className="card-header d-flex align-items-center">
                                    <div className="text-left pull-left">
                                        <NavLink to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/`}>
                                            <h6 className="text-info ml-auto mr-auto">
                                                {this.props.city.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto text-success">
                                        <Link  to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                            <h6 className="text-primary ml-auto mr-auto">
                                                Reserver
                                            </h6>
                                        </Link>
                                    </div>
                                </div>
                                */}



                            </div>

                            <div className="col-md-7">
                                <div className="text-left pull-left">
                                    <NavLink to={`/annonce_reservations/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/`}>
                                        <h6 className={`text-${this.props.categoryannoncereservation.color_name}`}>
                                            {this.props.categoryannoncereservation.name}
                                        </h6>
                                    </NavLink>
                                </div>
                                <div className="text-right ml-auto">
                                    <h5 className="text-dark"><b>{this.props.price.formatMoney(2,'.',',') || "0"} {$money_country.length > 2 ? <small><b>{$money_country} - {this.props.periodeannonce.name}</b></small> : <>{$money_country}<small><b> - {this.props.periodeannonce.name}</b></small></>}</b></h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 col-6">
                                        <h6 className="category text-dark">{this.props.pieces > 0 ?<>{this.props.pieces} p.</>:null } {this.props.rooms > 0 ? <>{this.props.rooms} ch.</>:null} {this.props.surface > 0 ? <>{this.props.surface} m<sup>2</sup></>:null}</h6>
                                    </div>

                                    <div className="col-md-7 col-6">
                                        <NavLink to={`/annonce_reservations/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                    </div>
                                </div>
                                <h6 className="card-title">
                                    <Link to={`/annonces_reservations/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                        {this.props.title.length > 90 ? this.props.title.substring(0, 90) + "..." : this.props.title}
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
                                <Button  data-toggle="modal" data-target="#loginModal"
                                         className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Wi-Fi gratuit">
                                    <svg><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"></path></svg>
                                </Button>
                                <Button  data-toggle="modal" data-target="#loginModal"
                                         className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Parking compris">
                                    <svg><path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"></path></svg>
                                </Button>
                                <Button  data-toggle="modal" data-target="#loginModal"
                                         className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Petit-déjeuner compris">
                                    <svg><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2a2 2 0 002-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"></path></svg>
                                </Button>
                                */}

                                <div className="card-header d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        {this.props.user.avatar ?
                                            <NavLink to={`/pro/${this.props.user.slug}/annonces_reservations/`}>
                                                <img src={this.props.user.avatar}
                                                     style={{ height: "40px", width: "80px" }}
                                                     alt={this.props.user.first_name}
                                                     className="avatar" />
                                            </NavLink>
                                            : <Skeleton circle={false} height={40} width={80} />}
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                <small className="d-block text-muted"><b>{this.props.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(this.props.created_at).format('LL')}</b></small>
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
                                                {this.props.bookmarked ?
                                                    <Button onClick={() => this.props.favoriteItem(this.props)}
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

                                        <NavLink to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`} className="btn btn-sm btn-info">
                                            Reserver
                                        </NavLink>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {!this.props.status_admin &&(
                        <div className="alert alert-danger text-center" role="alert">
                            <span>Cette article à éte momentanément désactivée car elle ne respecte pas nos régle et nos principe <a href="#pablo">Clique sur ce lien</a> pour en savoir plus</span>
                        </div>
                    )}
                </div>
            </div>


        )
    }

}

export default AnnoncereservationList;
