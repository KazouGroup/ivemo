import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import Skeleton from "react-loading-skeleton";


class AnnonceslocationList extends Component {


    getDescription() {

        return { __html: (this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
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

                                    <div className="text-center">

                                        {!$guest && (
                                            <>
                                                {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                    <>
                                                        {this.props.status ?
                                                            <>
                                                                <button type="button" rel="tooltip" onClick={() => this.props.unactiveItem(this.props.id)}
                                                                        className="btn btn-success btn-icon btn-sm">
                                                                    <i className="now-ui-icons ui-1_check"/>
                                                                </button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" onClick={() => this.props.activeItem(this.props.id)}
                                                                        className="btn btn-primary btn-icon btn-sm">
                                                                    <i className="now-ui-icons ui-1_simple-delete"/>
                                                                </button>
                                                            </>
                                                        }

                                                        <NavLink to={`/annonce_location/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                                            <i className="now-ui-icons ui-2_settings-90"/>
                                                        </NavLink>
                                                        <Button
                                                            className="btn btn-icon btn-sm btn-danger" onClick={() => this.props.deleteItem(this.props.id)} title="Supprimer cette annonce">
                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                        </Button>{" "}
                                                    </>
                                                )}
                                            </>
                                        )}


                                    </div>



                                    <br />
                                    <div className="card-header d-flex align-items-center">
                                        {/*
                                     <div className="text-left pull-left">
                                        <NavLink to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/`}>
                                            <h6 className="text-info ml-auto mr-auto">
                                                {this.props.city.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto text-success">
                                        <Link  to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                            <h6 className="text-primary ml-auto mr-auto">
                                                Reserver
                                            </h6>
                                        </Link>
                                    </div>
                                    */}

                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="text-left pull-left">
                                        <NavLink to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/`}>
                                            <h6 className={`text-${this.props.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                {this.props.categoryannoncelocation.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto">
                                        <h5 className="text-success"><b>{this.props.price.formatMoney(2,'.',',') || "0"} <small>FCFA/mois</small></b></h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-6">
                                            <h6 className="text-dark">{this.props.pieces > 0 ?<>{this.props.pieces} p.</>:null } {this.props.rooms > 0 ? <>{this.props.rooms} ch.</>:null} {this.props.surface > 0 ? <>{this.props.surface} m<sup>2</sup></>:null}</h6>
                                        </div>
                                        <div className="col-md-7 col-6">
                                            <NavLink to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                            </NavLink>
                                            - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                        </div>

                                    </div>
                                    <h6 className="card-title">
                                        <Link to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                            {this.props.title.length > 90 ? this.props.title.substring(0, 90) + "..." : this.props.title}
                                        </Link>
                                    </h6>
                                    <Link to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                                    </Link>
                                    <div className="card-header d-flex align-items-center">
                                        <div className="d-flex align-items-center">
                                            {this.props.user.avatar ?
                                                <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`}>
                                                    <img src={this.props.user.avatar}
                                                         style={{ height: "40px", width: "80px" }}
                                                         alt={this.props.user.first_name}
                                                         className="avatar" />
                                                </NavLink>
                                                : <Skeleton circle={false} height={40} width={80} />}
                                            <div className="mx-3">
                                                <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                    <small className="d-block text-muted"><b>{moment(this.props.created_at).format('LL')}</b></small>
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

                                                        <>
                                                            <Button onClick={() => this.props.unfavoriteItem(this.props.id)}
                                                                    className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                <i className="fas fa-bookmark"></i>
                                                            </Button>
                                                        </>

                                                        :
                                                        <>
                                                            <Button onClick={() => this.props.favoriteItem(this.props.id)}
                                                                    className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                <i className="far fa-bookmark"></i>
                                                            </Button>
                                                        </>
                                                    }
                                                </>
                                            }

                                            <Button className="btn btn-icon btn-sm btn-warning" onClick={() => this.props.contactUser(this.props)} title={`Contacter ${this.props.user.first_name}`}>
                                                <i className="far fa-envelope"/>
                                            </Button>
                                            <button type="button" title="Signaler" onClick={() => this.props.signalerUser(this.props)}
                                                className="btn btn-instagram btn-icon btn-sm">
                                                <i className="far fa-flag"></i>
                                            </button>
                                            {/*
                                            <NavLink to={`/annonces_locations/locations/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.slug}/`} className="btn btn-icon btn-sm btn-primary">
                                                <i className="now-ui-icons location_pin"/>
                                            </NavLink>
                                            */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {!this.props.status_admin &&(
                            <div className="alert alert-danger text-center" role="alert">
                                <span>Cette annonce à éte momentanément désactivée car elle ne respecte pas nos régle et nos principe <a href="#pablo">Clique sur ce lien</a> pour en savoir plus</span>
                            </div>
                        )}
                    </div>
                </div>

            </>
        )
    }

}

export default AnnonceslocationList;
