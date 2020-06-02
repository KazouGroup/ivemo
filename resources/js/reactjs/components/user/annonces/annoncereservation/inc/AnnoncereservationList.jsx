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
                                        <Link  to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                            <h6 className="text-primary ml-auto mr-auto">
                                                Reserver
                                            </h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="text-left pull-left">
                                    <NavLink to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/`}>
                                        <h6 className={`text-${this.props.categoryannoncereservation.color_name} ml-auto mr-auto`}>
                                            {this.props.categoryannoncereservation.name}
                                        </h6>
                                    </NavLink>
                                </div>
                                <div className="text-right ml-auto">
                                    <h5 className="text-success"><b>{this.numberWithCommas()} <small>FCFA</small></b></h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <h6 className="category text-dark">{this.props.pieces} p . {this.props.rooms && (<>{this.props.rooms} ch</>)}. {this.props.surface && (<>{this.props.surface} m<sup>2</sup></>)}</h6>
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <h6 className="category text-dark">la nuit</h6>
                                    </div>

                                </div>
                                <h6 className="card-title">
                                    <Link to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                        {this.props.title.length > 90 ? this.props.title.substring(0, 90) + "..." : this.props.title}
                                    </Link>
                                </h6>
                                <Link to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </Link>
                                <div className="card-header d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <NavLink to={`/pro/${this.props.user.slug}/`}>
                                            <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                        </NavLink>
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                <small className="d-block text-muted"><b>{moment(this.props.created_at).format('LL')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">

                                        <Button className="btn btn-icon btn-sm btn-warning" rel="tooltip" title="3426712192" data-placement="bottom">
                                            <i className="now-ui-icons tech_mobile"/>
                                        </Button>
                                        <NavLink to={`/annonces_reservations/reservations/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.slug}/`} className="btn btn-icon btn-sm btn-primary">
                                            <i className="now-ui-icons location_pin"/>
                                        </NavLink>

                                        {!$guest && (
                                            <>
                                                {$userIvemo.id === this.props.user_id && (
                                                    <>
                                                        <NavLink to={`/annonces/`} className="btn btn-icon btn-sm btn-info" rel="tooltip" title="Editer" data-placement="bottom">
                                                            <i className="now-ui-icons ui-2_settings-90"/>
                                                        </NavLink>
                                                        <Button
                                                            className="btn btn-icon btn-sm btn-danger" rel="tooltip" title="Supprimer" onClick={() => this.props.deleteItem(this.props.id)} data-placement="bottom">
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
                            <span>Cette article à éte momentanément désactivée car elle ne respecte pas nos régle et nos principe <a href="#pablo">Clique sur ce lien</a> pour en savoir plus</span>
                        </div>
                    )}
                </div>
            </div>


        )
    }

}

export default AnnoncereservationList;
