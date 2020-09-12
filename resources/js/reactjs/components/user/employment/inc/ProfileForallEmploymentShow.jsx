import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import moment from "moment";


class ProfileForallEmploymentShow extends Component {


    data_countvisiteFormatter(visits_count, precision) {
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
                    <b>Contacter l'Agence</b>
                </div>
                <div className="card-header d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        {this.props.user.avatar ?
                            <NavLink to={`/pro/${this.props.user.slug}/employments/`}>
                                <img src={this.props.user.avatar}
                                     style={{height: "40px", width: "80px"}}
                                     alt={this.props.user.first_name}
                                     className="avatar"/>
                            </NavLink>
                            : <img className="avatar" style={{height: "40px", width: "80px"}}
                                   src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}
                        <div className="mx-3">
                            <NavLink to={`/pro/${this.props.user.slug}/employments/`}
                                     className="text-dark font-weight-600 text-sm"><b>{this.props.user.first_name} </b>
                                <small className="d-block text-muted">{this.props.statusOnline && (
                                    <i className="fas fa-circle text-success"></i>)}
                                    <i className="now-ui-icons tech_watch-time"></i> {moment(this.props.created_at).format('LL')}
                                </small>
                            </NavLink>
                        </div>
                    </div>
                    <div className="text-right ml-auto">
                        {this.props.iscontactservice && (
                            <Button className="btn btn-info btn-sm" title="Vous avez déjà postulé à cette annonce">
                                <b>Postulé</b>
                            </Button>
                        )}
                        {$guest ?
                            <Button data-toggle="modal" data-target="#loginModal"
                                    className="btn btn-facebook btn-icon btn-sm btn-neutral"
                                    title="Ajouter à vos favoris">
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
                                            className="btn btn-facebook btn-icon btn-sm btn-neutral"
                                            title="Ajouter à vos favoris">
                                        <i className="far fa-bookmark"></i>
                                    </Button>
                                }
                            </>
                        }
                        <Button className="btn btn-icon btn-sm btn-facebook" title="Copier le lien"
                                onClick={() => this.props.copyToClipboard()}>
                            <i className="fas fa-copy"></i>
                        </Button>
                        {this.props.showPhonenumber ?
                            <button type="button" title="Cacher le numéro"
                                    onClick={() => this.props.showPhonenumberItem()}
                                    className="btn btn-sm btn-outline-info">
                                <i className="now-ui-icons tech_mobile"/><b>{this.props.user.phone !== null ? this.props.user.phone : <>absent</>}</b>
                            </button>
                            :
                            <button title="Afficher le numéro" type="button"
                                    onClick={() => this.props.showPhonenumberItem()}
                                    className="btn btn-icon btn-sm btn-info">
                                <i className="now-ui-icons tech_mobile"/>
                            </button>
                        }
                        {this.props.user.profile.site_internet && (
                            <a href={`${this.props.user.profile.site_internet}`} title="Aller sur le site du propriétaire"
                               className="btn btn-icon btn-sm btn-primary" target="_blank">
                                <i className="now-ui-icons objects_globe"/>
                            </a>
                        )}

                        {$guest ?

                            <button type="button" data-toggle="modal" data-target="#loginModal" title="Signaler cette annonce"
                                    className="btn btn-instagram btn-icon btn-sm">
                                <i className="far fa-flag"></i>
                            </button>
                            :
                            <>
                                {($userIvemo.id === this.props.user.id && $userIvemo.id === this.props.user_id) && (
                                    <>
                                        <a href={`#${this.props.visits_count}`}
                                           className="btn btn-sm btn-secondary"
                                           title={`${this.props.visits_count} ${this.props.visits_count > 1 ? "vues" : "vue"}`}>
                                            <i className="far fa-eye"></i>
                                            <b className="ml-1">{this.data_countvisiteFormatter(this.props.visits_count)}</b>
                                        </a>
                                        <NavLink
                                            to={`/profile/${this.props.user.slug}/statistics/employments/${this.props.slugin}/`}
                                            className="btn btn-sm btn-icon btn-secondary" title="Statistiques de l'annonce">
                                            <i className="now-ui-icons business_chart-bar-32"/>
                                        </NavLink>
                                        <button type="button" rel="tooltip"
                                                onClick={() => this.props.statusItem(this.props)}
                                                className="btn btn-success btn-icon btn-sm"
                                                title="Désactiver cette annonce">
                                            <i className="now-ui-icons ui-1_check"/>
                                        </button>
                                        {this.props.status_comments ?
                                            <Button onClick={() => this.props.statuscommentremoveItem(this.props)}
                                                    className="btn btn-primary btn-icon btn-sm"
                                                    title="Commentaires activés">
                                                <i className="fas fa-comments"/>
                                            </Button>
                                            :
                                            <Button onClick={() => this.props.statuscommentaddItem(this.props)}
                                                    className="btn btn-facebook btn-icon btn-sm btn-neutral"
                                                    title="Commentaires désactivés">
                                                <i className="far fa-comments"/>
                                            </Button>

                                        }
                                        <NavLink to={`/employment/ab/${this.props.slugin}/edit/`}
                                                 className="btn btn-sm btn-info btn-icon btn-sm"
                                                 title="Éditer cette annonce">
                                            <i className="now-ui-icons ui-2_settings-90"/>
                                        </NavLink>
                                        <Button onClick={() => this.props.deleteItem(this.props.id)}
                                                className="btn btn-icon btn-sm btn-danger"
                                                title="Supprimer cette annonce">
                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                        </Button>
                                    </>
                                )}

                                <button type="button" title="Signaler cette annonce"
                                        onClick={() => this.props.signalerUser(this.props)}
                                        className="btn btn-instagram btn-sm">
                                    <i className="far fa-flag"></i>
                                    <b>{$userIvemoIsadmin.status_user && (<>{this.props.countsignals}</>)}</b>
                                </button>

                            </>
                        }

                    </div>
                </div>
                <div className="card-title">
                    {this.props.user.profile.address && (
                        <>
                            <i className="now-ui-icons location_pin"/>
                            <b className="ivemoIconText">{this.props.user.profile.address}</b>
                        </>
                    )}
                    <br/>
                    <div className="mt-2">
                        <div className="row">
                            <div className="col-md-6 col-6">
                                <Link to={`/pro/${this.props.user.slug}/`}
                                      title={`Profile de ${this.props.user.first_name}`}>
                                    <i className="now-ui-icons users_circle-08"/>
                                    <small><b className="ivemoIconText">Consulter le profil de l'utilisateur</b></small>
                                </Link>
                            </div>
                            {this.props.user.profile.site_internet && (
                                <div className="col-md-6 col-6">
                                    <a href={`${this.props.user.profile.site_internet}`} target="_blank"
                                       title={this.props.user.profile.site_internet}>
                                        <i className="now-ui-icons objects_globe"/>
                                        <small><b className="ivemoIconText">Consulter le site de l'utilisateur</b>
                                        </small>
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <hr/>
                {this.props.user.profile.description && (
                    <>
                        <b>Description de l'utilisateur</b>
                        <br/>
                        <small dangerouslySetInnerHTML={{__html: (this.props.user.profile.description)}}/>
                    </>
                )}
            </>

        )
    }
}

export default ProfileForallEmploymentShow;
