import React, {Fragment, PureComponent} from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button } from "reactstrap";
import moment from "moment";
import UploadimageList from "../../../uploadimages/inc/UploadimageList";
const abbrev = ['', 'k', 'M', 'B', 'T'];

class PrivateUserAnnoncereservationList extends PureComponent {


    data_countuploadimageFormatter(uploadimages_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(uploadimages_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (uploadimages_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {

        let showlink = `/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}`;
        return (

            <div className="card">
                <div className="card-body">
                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-5">
                                <div className="card-image">

                                    <UploadimageList {...this.props} />

                                </div>


                                <div className="text-center">
                                        <button type="button" className="btn btn-dark btn-sm">
                                            <i className="now-ui-icons media-1_album"></i>
                                            <b>{this.data_countuploadimageFormatter(this.props.uploadimages_count)}</b>
                                        </button>

                                        {this.props.link_video && (
                                            <button type="button" className="btn btn-dark btn-sm">
                                                <b>video</b>
                                            </button>
                                        )}
                                    {!$guest && (
                                        <>
                                            {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                <>
                                                    {this.props.status ?
                                                        <>
                                                            <button type="button" rel="tooltip" onClick={() => this.props.unactiveprivatearsItem(this.props)}
                                                                    className="btn btn-success btn-icon btn-sm">
                                                                <i className="now-ui-icons ui-1_check"/>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" onClick={() => this.props.activearsItem(this.props)}
                                                                    className="btn btn-primary btn-icon btn-sm">
                                                                <i className="now-ui-icons ui-1_simple-delete"/>
                                                            </button>
                                                        </>
                                                    }

                                                    <NavLink to={`/ar_data/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
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
                                    <NavLink to={`/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/`}>
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
                                        <NavLink to={`/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                    </div>
                                </div>
                                <h6 className="card-title">
                                    <Link to={`/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}/`}>
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
                                {this.props.elevator && (
                                    <Button
                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ascenceur">
                                        <i className="fas fa-square"></i>
                                    </Button>
                                )}
                                {this.props.status_consiegerie && (
                                    <Button
                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Bagagerie : laissez en dépôt vos valises et bagages gratuitement le jour d'arrivée ou de départ et profitez librement de votre journée à yaounde.">
                                        <i className="fas fa-luggage-cart"></i>
                                    </Button>
                                )}


                                <div className="card-header d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        {this.props.user.avatar ?
                                            <NavLink to={`/pro/${this.props.user.slug}/ars/${this.props.annoncetype.slug}/`}>
                                                <img src={this.props.user.avatar}
                                                     style={{ height: "40px", width: "80px" }}
                                                     alt={this.props.user.first_name}
                                                     className="avatar" />
                                            </NavLink>
                                            :  <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                    src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.user.slug}/ars/${this.props.annoncetype.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                <small className="d-block text-muted"><b> {moment(this.props.created_at).format('LL')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">
                                        <NavLink to={showlink} className="btn btn-sm btn-info">
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

export default PrivateUserAnnoncereservationList;
