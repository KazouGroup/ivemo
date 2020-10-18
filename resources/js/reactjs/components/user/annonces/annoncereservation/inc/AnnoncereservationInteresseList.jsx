import React, {Component, Fragment} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button} from "reactstrap";
import {Remarkable} from "remarkable";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
const abbrev = ['', 'k', 'M', 'B', 'T'];

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncereservationInteresseList extends Component {
    data_countuploadimageFormatter(uploadimages_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(uploadimages_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (uploadimages_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        let showlink = `/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}`;

        return (
            <>

                <div key={this.props.id} className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="card card-plain card-blog">
                                <div className="row">
                                    <div className="col-md-5">

                                        {this.props.uploadimages < 1 ?
                                            <>
                                                <Link to={showlink}>
                                                    <LazyLoad>
                                                        <img className="img rounded"
                                                             src={`/assets/vendor/assets/img/blurredimage1.jpg`} alt={this.props.title}/>
                                                    </LazyLoad>
                                                </Link>
                                            </>
                                            :
                                            <>
                                                {this.props.uploadimages.map((item,index) => (
                                                    <Fragment key={item.id} >
                                                        <Link to={showlink}>
                                                            <LazyLoad>
                                                                <img className="img rounded"
                                                                     src={item.photo} alt={this.props.title}/>
                                                            </LazyLoad>
                                                        </Link>
                                                    </Fragment>
                                                ))}
                                            </>
                                        }

                                        <div className="text-center">
                                            <NavLink to={showlink} className="btn btn-dark btn-sm">
                                                <i className="now-ui-icons media-1_album"></i>
                                                <b>{this.data_countuploadimageFormatter(this.props.uploadimages_count)}</b>
                                            </NavLink>

                                            {this.props.link_video && (
                                                <NavLink to={showlink} className="btn btn-dark btn-sm">
                                                    <b>video</b>
                                                </NavLink>
                                            )}
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
                                                            <NavLink to={`/ar_data/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                                                <i className="now-ui-icons ui-2_settings-90"/>
                                                            </NavLink>
                                                        </>
                                                    )}
                                                    <NavLink to={`/messages/ars/${$userIvemo.slug}/${this.props.annoncetype.slug}/${this.props.slugin}`} className="btn btn-sm btn-icon btn-primary">
                                                        <i className="now-ui-icons ui-1_send" />
                                                    </NavLink>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <NavLink to={`/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/`}>
                                                    <h6 className={`text-${this.props.categoryannoncereservation.color_name} ml-auto mr-auto`}>
                                                        {this.props.categoryannoncereservation.name}
                                                    </h6>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-10">
                                                <h5 className="text-dark"><b>{this.props.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country} {this.props.periodeannonce_id !== null && (" - "+this.props.periodeannonce.name)}</b></small> : <>{$money_country}<small><b>{this.props.periodeannonce_id !== null && (" - "+this.props.periodeannonce.name)}</b></small></>}</b></h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <NavLink to={`/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/`}>
                                                    <strong>{this.props.city.name} </strong>
                                                </NavLink>
                                                - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                            </div>
                                        </div>
                                        <h6 className="card-title">
                                            <Link to={`/ars/${this.props.annoncetype.slug}/${this.props.categoryannoncereservation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}/`}>
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
                                                    :  <img className="avatar" style={{ height: "20px", width: "50px" }}
                                                            src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}
                                                <div className="mx-3">
                                                    <NavLink to={`/pro/${this.props.user.slug}/ars/${this.props.annoncetype.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                        <small className="d-block text-muted"><b> {moment(this.props.created_at).format('LL')}</b></small>
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
