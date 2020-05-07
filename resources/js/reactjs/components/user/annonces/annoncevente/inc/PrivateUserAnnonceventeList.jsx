import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Button, UncontrolledTooltip} from "reactstrap";
import moment from "moment";


class PrivateUserAnnonceventeList extends Component {


    getDescription() {
        return { __html: (this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
    }
    numberWithCommas() {
        return this.props.price.toLocaleString();
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
                                    <NavLink to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/`}>
                                        <h6 className={`text-${this.props.categoryannoncevente.color_name} ml-auto mr-auto`}>
                                            {this.props.categoryannoncevente.name}
                                        </h6>
                                    </NavLink>
                                </div>
                                <div className="text-right ml-auto">
                                    <h5 className="text-success"><b>{this.numberWithCommas()} <small>FCFA</small></b></h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 col-6">
                                        <h6 className="text-dark">{this.props.pieces > 0 ?<>{this.props.pieces} p.</>:null } {this.props.rooms > 0 ? <>{this.props.rooms} ch.</>:null} {this.props.surface > 0 ? <>{this.props.surface} m<sup>2</sup></>:null}</h6>
                                    </div>
                                    <div className="col-md-7 col-6">
                                        <NavLink to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                    </div>

                                </div>
                                <h6 className="card-title">
                                    <Link to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                        {this.props.title}
                                    </Link>
                                </h6>
                                <Link to={`/annonces_ventes/${this.props.annoncetype.slug}/${this.props.categoryannoncevente.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </Link>
                                <div className="card-header d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <NavLink to={`/@${this.props.user.slug}/`}>
                                            <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt={`${this.props.user.first_name}`} className="avatar" />
                                        </NavLink>
                                        <div className="mx-3">
                                            <NavLink to={`/@${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                <small className="d-block text-muted"><b>{moment(this.props.created_at).format('LL')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">

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
                                                        <NavLink to={`/annonce_vente/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
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


        )
    }

}

export default PrivateUserAnnonceventeList;