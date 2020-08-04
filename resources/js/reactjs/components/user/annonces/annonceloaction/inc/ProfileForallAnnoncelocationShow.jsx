import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button, UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import Skeleton from "react-loading-skeleton";


class ProfileForallAnnoncelocationShow extends Component {


    data_countFormatter(visits_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        return (

            <>
                <div className="card-title">
                    <b>Contacter l'agence</b>
                </div>
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
                            <NavLink to={`/pro/${this.props.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm"><b>{this.props.user.first_name} </b>
                                <small className="d-block text-muted">{this.props.statusOnline && (<i className="fas fa-circle text-success"></i>)} {moment(this.props.created_at).format('LL')}</small>
                            </NavLink>
                        </div>
                    </div>
                    <div className="text-right ml-auto">
                        {$guest ?
                            <Button data-toggle="modal" data-target="#loginModal"
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
                        <Button className="btn btn-icon btn-sm btn-facebook" title="Copier le lien" onClick={() => this.props.copyToClipboard()}>
                            <i className="fas fa-copy"></i>
                        </Button>
                        <Button className="btn btn-icon btn-sm btn-info" data-container="body"
                            data-original-title="Phone number" data-toggle="popover" data-placement="bottom"
                            data-content={this.props.user.phone}>
                            <i className="now-ui-icons tech_mobile" />
                        </Button>
                        {this.props.user.profile.site_internet && (
                            <a href={`${this.props.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
                                <i className="now-ui-icons objects_globe" />
                            </a>
                        )}

                        {$guest ?

                            <button type="button" data-toggle="modal" data-target="#loginModal" title="Signaler"
                                className="btn btn-instagram btn-icon btn-sm">
                                <i className="far fa-flag"></i>
                            </button>
                            :
                            <>
                                {($userIvemo.id === this.props.user.id && $userIvemo.id === this.props.user_id) && (
                                    <>
                                        <a href={`#${this.props.visits_count}`}
                                            className="btn btn-sm btn-secondary" title={`${this.props.visits_count} ${this.props.visits_count > 1 ? "vues" : "vue"}`}>
                                            <i className="far fa-eye"></i> <b>{this.data_countFormatter(this.props.visits_count)}</b>
                                        </a>
                                        <button type="button" rel="tooltip" onClick={() => this.props.statusItem(this.props)}
                                            className="btn btn-success btn-icon btn-sm" title="Désactiver cette annonce">
                                            <i className="now-ui-icons ui-1_check" />
                                        </button>
                                        {this.props.status_comments ?
                                            <Button onClick={() => this.props.statuscommentremoveItem(this.props)}
                                                className="btn btn-primary btn-icon btn-sm" title="Commentaire activé">
                                                <i className="fas fa-comments" />
                                            </Button>
                                            :
                                            <Button onClick={() => this.props.statuscommentaddItem(this.props)}
                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Commentaire désactivé">
                                                <i className="far fa-comments" />
                                            </Button>

                                        }
                                        <NavLink to={`/annonce_location/${this.props.annoncetype.slug}/${this.props.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer cette annonce">
                                            <i className="now-ui-icons ui-2_settings-90" />
                                        </NavLink>
                                        <Button onClick={() => this.deleteItem(this.props.id)}
                                            className="btn btn-icon btn-sm btn-danger" title="Supprimer cette annonce">
                                            <i className="now-ui-icons ui-1_simple-remove" />
                                        </Button>
                                    </>
                                )}
                                <button type="button" title="Signaler l'annonce" onClick={() => this.props.signalerUser(this.props)}
                                    className="btn btn-instagram btn-sm" title={`Signaler`}>
                                    <i className="far fa-flag"></i> <b>{$userIvemoIsadmin.status_user && (<>{this.props.countsignals}</>)}</b>
                                </button>
                            </>
                        }

                    </div>
                </div>
                <div className="card-title">
                    {this.props.user.profile.address && (
                        <>
                            <i className="now-ui-icons location_pin" />
                            <b>{this.props.user.profile.address}</b>
                        </>
                    )}
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-6">
                                <Link to={`/pro/${this.props.user.slug}/`} title={`Profile de ${this.props.user.first_name}`}>
                                    <small><b>Consulter le profil de l'utilisateur</b></small>
                                </Link>
                            </div>
                            {this.props.user.profile.site_internet && (
                                <div className="col-md-6 col-6">
                                    <a href={`${this.props.user.profile.site_internet}`} target="_blank" title={this.props.user.profile.site_internet}>
                                        <small><b>Consulter le site web de l'utilisateur</b></small>
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
                        <b dangerouslySetInnerHTML={{ __html: (this.props.user.profile.description) }} />
                    </>
                )}
            </>

        )
    }

}

export default ProfileForallAnnoncelocationShow;
