import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import UploadimageList from "../../../uploadimages/inc/UploadimageList";
import {activeaslItem} from "../../../../../redux/actions/contactserviceActions";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PrivateUserAnnonceslocationList extends PureComponent {


    getDescription() {
        return { __html: (this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
    }

    data_countuploadimageFormatter(uploadimages_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(uploadimages_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (uploadimages_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        return (

            <>
                <div className="card ivemoCardContainer">
                    <div className="card-body">
                        <div className="card card-plain card-blog">
                            <div className="row">
                                <div className="col-md-5">

                                    <UploadimageList {...this.props} />

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
                                    </div>

                                </div>

                                <div className="col-md-7">
                                    <div className="text-left pull-left">
                                        <NavLink to={`/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/`}>
                                            <h6 className={`text-${this.props.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                {this.props.categoryannoncelocation.name}
                                            </h6>
                                        </NavLink>
                                    </div>
                                    <div className="text-right ml-auto">
                                        <h5 className="text-dark"><b>{this.props.price.formatMoney(2,'.',',') || "0"} {$money_country.length > 2 ? <small><b>{$money_country} {this.props.periodeannonce_id !== null && (" - " + this.props.periodeannonce.name)}</b></small> : <>{$money_country}<small><b>{this.props.periodeannonce_id !== null && (" - " + this.props.periodeannonce.name)}</b></small></>} </b></h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-6">
                                            <h6 className="text-dark">{this.props.pieces > 0 ?<>{this.props.pieces} p.</>:null } {this.props.rooms > 0 ? <>{this.props.rooms} ch.</>:null} {this.props.surface > 0 ? <>{this.props.surface} m<sup>2</sup></>:null}</h6>
                                        </div>
                                        <div className="col-md-7 col-6">
                                            <NavLink to={`/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                            </NavLink>
                                            - {this.props.district.length > 10 ? this.props.district.substring(0, 10) + "..." : this.props.district}
                                        </div>

                                    </div>
                                    <h6 className="card-title">
                                        <Link to={`/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}/`}>
                                            {this.props.title.length > 90 ? this.props.title.substring(0, 90) + "..." : this.props.title}
                                        </Link>
                                    </h6>
                                    <Link to={`/als/${this.props.annoncetype.slug}/${this.props.categoryannoncelocation.slug}/${this.props.city.slug}/${this.props.user.slug}/${this.props.slug}/`}>
                                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                                    </Link>
                                    <div className="card-header d-flex align-items-center">
                                        <div className="d-flex align-items-center">
                                            {this.props.user.avatar ?
                                                <NavLink to={`/pro/${this.props.user.slug}/als/${this.props.annoncetype.slug}/`}>
                                                    <img src={this.props.user.avatar}
                                                         style={{ height: "40px", width: "80px" }}
                                                         alt={this.props.user.first_name}
                                                         className="avatar" />
                                                </NavLink>
                                                :  <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                        src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}
                                            <div className="mx-3">
                                                <NavLink to={`/pro/${this.props.user.slug}/als/${this.props.annoncetype.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                    <small className="d-block text-muted"><b> {moment(this.props.created_at).format('LL')}</b></small>
                                                </NavLink>
                                            </div>
                                        </div>

                                        <div className="text-right mx-auto">

                                            {!$guest && (
                                                <>
                                                    {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                        <>
                                                            <NavLink to={`/statistics/als/${this.props.annoncetype.slug}/${this.props.slugin}/`} className="btn btn-sm btn-icon btn-secondary" title="Statistiques">
                                                                <i className="now-ui-icons business_chart-bar-32"/>
                                                            </NavLink>

                                                            {this.props.status ?
                                                                <>
                                                                    <button type="button" rel="tooltip" onClick={() => this.props.unactiveprivatealsItem(this.props)}
                                                                            className="btn btn-success btn-icon btn-sm">
                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button type="button" onClick={() => this.props.activeaslItem(this.props)}
                                                                            className="btn btn-primary btn-icon btn-sm">
                                                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                                                    </button>
                                                                </>
                                                            }

                                                            <NavLink to={`/al_data/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
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
                                <span>Cette annonce à éte momentanément désactivée car elle ne respecte pas nos régle et nos principe <a href="#pablo">Cliquez sur ce lien</a> pour en savoir plus</span>
                            </div>
                        )}
                    </div>
                </div>

            </>
        )
    }

}

export default PrivateUserAnnonceslocationList;
