import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";


class ProfileForallAnnonceShow extends Component {


    render() {
        return (

            <>
                <div className="card-title">
                    <b>Contacter l'agence</b>
                </div>
                <div className="card-header d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`}>
                            <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt={this.props.user.first_name} className="avatar" />
                        </NavLink>
                        <div className="mx-3">
                            <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm"><b>{this.props.user.first_name}</b>
                                <small className="d-block text-muted">{moment(this.props.user.created_at).format('LL')}</small>
                            </NavLink>
                        </div>
                    </div>
                    <div className="text-right ml-auto">
                        <UncontrolledTooltip placement="bottom" target="TooltipPhone">
                            3425712192
                        </UncontrolledTooltip>
                        <Button className="btn btn-icon btn-sm btn-info" id="TooltipPhone">
                            <i className="now-ui-icons tech_mobile"/>
                        </Button>
                        {this.props.user.profile.site_internet && (
                            <a href={`${this.props.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
                                <i className="now-ui-icons objects_globe"/>
                            </a>
                        )}

                        {!$guest && (
                            <>
                                {($userIvemo.id === this.props.user.id || $userIvemo.id === this.props.user_id) && (
                                    <>
                                        <UncontrolledTooltip placement="bottom" target="TooltipEditer">
                                            Desactiver cette annonce
                                        </UncontrolledTooltip>

                                        <button type="button" rel="tooltip" onClick={() => this.props.unactiveItem(this.props.id)}
                                                className="btn btn-success btn-icon btn-sm" id="TooltipEditer">
                                            <i className="now-ui-icons ui-1_check"/>
                                        </button>

                                        <NavLink to={`/annonce_location/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer">
                                            <i className="now-ui-icons ui-2_settings-90"/>
                                        </NavLink>

                                        <UncontrolledTooltip placement="bottom" target="TooltipDelete">
                                            Supprimer cette annonce
                                        </UncontrolledTooltip>
                                        <Button onClick={() => this.deleteItem(this.props.id)}
                                                className="btn btn-icon btn-sm btn-danger" id="TooltipDelete">
                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                        </Button>{" "}
                                    </>
                                )}

                            </>
                        )}

                    </div>
                </div>
                <div className="card-title">
                    {this.props.user.profile.address && (
                        <>
                            <i className="now-ui-icons location_pin"/>
                            <b>{this.props.user.profile.address}</b>
                        </>
                    )}
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-6">
                                <UncontrolledTooltip placement="bottom" target="TooltipShowprofile">
                                    Profile de {this.props.user.first_name}
                                </UncontrolledTooltip>
                                <Link to={`/pro/${this.props.user.slug}/`} title="Profil agence" id="TooltipShowprofile">
                                    <small><b>Consulter le profil de l'utilisateur</b></small>
                                </Link>
                            </div>
                            {this.props.user.profile.site_internet && (
                                <div className="col-md-6 col-6">
                                    <a href={`${this.props.user.profile.site_internet}`} target="_blank" title="Site internet de agence">
                                        <small><b>Consulter le site de l'utilisateur</b></small>
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <hr />
                {this.props.user.profile.description && (
                    <>
                        <b>Informations légales de l'utilisateur</b>
                        <br />
                        <b dangerouslySetInnerHTML={{__html: (this.props.user.profile.description)}}/>
                    </>
                )}
            </>


        )
    }

}

export default ProfileForallAnnonceShow;
