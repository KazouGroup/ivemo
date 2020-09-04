import React, {Component,Fragment} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button} from "reactstrap";
import {Remarkable} from "remarkable";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
const abbrev = ['', 'k', 'M', 'B', 'T'];

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresseList extends Component {

    data_countuploadimageFormatter(countuploadimages, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countuploadimages)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countuploadimages / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        let showlink = `/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}/`;
        return (
            <Fragment>

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
                                                <b>{this.data_countuploadimageFormatter(this.props.countuploadimages)}</b>
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
                                                            <NavLink to={`/annonce_location/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                                                <i className="now-ui-icons ui-2_settings-90"/>
                                                            </NavLink>
                                                        </>
                                                    )}
                                                </>
                                            )}

                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-header d-flex align-items-center">
                                            <div className="text-left pull-left">
                                                <NavLink to={`/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/`}>
                                                    <h6 className={`text-${this.props.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                        {this.props.categoryannoncelocation.name}
                                                    </h6>
                                                </NavLink>
                                            </div>
                                            <div className="text-right ml-auto">
                                                <div className="col-md-12 col-12">
                                                    <h5 className="text-dark"><b>{this.props.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country} - le mois</b></small> : <>{$money_country}<small><b> - le mois</b></small></>}</b></h5>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-6">
                                                <h6 className="category text-dark">{this.props.pieces} p . {this.props.rooms && (<>{this.props.rooms} ch</>)}. {this.props.surface && (<>{this.props.surface} m<sup>2</sup></>)}</h6>
                                            </div>
                                            <div className="col-md-6 col-6">
                                                <NavLink to={`/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/`}>
                                                            <span className="ml-auto mr-auto">
                                                                <strong>{this.props.city.name} </strong>
                                                            </span>
                                                </NavLink>
                                                - {this.props.district.length > 8 ? this.props.district.substring(0, 8) + "..." : this.props.district}
                                            </div>
                                        </div>
                                        <h6 className="card-title">
                                            <NavLink to={showlink}>
                                                {this.props.title.length > 40 ? this.props.title.substring(0, 40) + "..." : this.props.title}
                                            </NavLink>
                                        </h6>

                                        <div className="card-header d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                {this.props.user.avatar ?
                                                    <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`}>
                                                        <img src={this.props.user.avatar}
                                                             style={{ height: "20px", width: "50px" }}
                                                             alt={this.props.user.first_name}
                                                             className="avatar" />
                                                    </NavLink>
                                                    :  <img className="avatar" style={{ height: "20px", width: "50px" }}
                                                            src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}
                                                <div className="mx-3">
                                                    <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
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

                                                            <>
                                                                <Button onClick={() => this.props.unfavoriteItem(this.props)}
                                                                        className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                    <i className="fas fa-bookmark"></i>
                                                                </Button>
                                                            </>
                                                            :
                                                            <>
                                                                <Button onClick={() => this.props.favoriteItem(this.props)}
                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                    <i className="far fa-bookmark"></i>
                                                                </Button>
                                                            </>
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

            </Fragment>
        )
    }

}

export default AnnoncelocationInteresseList;
