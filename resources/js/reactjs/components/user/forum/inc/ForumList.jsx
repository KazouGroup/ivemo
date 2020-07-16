import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormText, Input, UncontrolledTooltip} from "reactstrap";
import moment from "moment";
import Swal from "sweetalert2";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class ForumList extends Component {




    data_countviewFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countcommentFormatter(countcomments, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countcomments)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countcomments / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    getDescription() {
        return { __html: (this.props.description.length > 150 ? this.props.description.substring(0, 150) + "..." : this.props.description) };
    }
    render() {
        return (

            <>
                <div className="card">
                    <div className="card-body">

                        <div className="card-header d-flex align-items-center">
                            <div className="d-flex align-items-center">

                                {this.props.user.avatar === null ?
                                    <img className="avatar" alt={this.props.user.first_name}
                                         style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                         src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                    :
                                    <img className="avatar"
                                         style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                         alt={this.props.user.first_name}
                                         src={this.props.user.avatar}/>
                                }
                                <div className="mx-3">
                                    <NavLink to={`/pro/${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{this.props.user.first_name}</b>
                                        <small className="d-block text-muted">{this.props.statusOnline &&(<i className="fas fa-circle text-success"></i>)} <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('LL')}</small>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="text-right ml-auto">
                            <span className="card-title">
                                <Link to={`/forums/${this.props.categoryforum.slug}/`}><b>{this.props.categoryforum.name}</b></Link> - <Link to={`/employments/`}> </Link> <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).fromNow()}
                            </span>
                            </div>
                        </div>

                        <>
                            <h5 className="card-title">
                               <Link to={`/forums/${this.props.categoryforum.slug}/${this.props.slugin}/`}>
                                   <b>{this.props.title}</b>
                               </Link>
                            </h5>

                        </>

                        <span className="text-justify" dangerouslySetInnerHTML={this.getDescription()}/>

                        <div className="card-header d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <Button className="btn btn-default btn-icon btn-sm btn-neutral" title={`${this.props.visits_count} ${this.props.visits_count > 1 ? "Vues" : "Vue"}`}>
                                    <i className="far fa-eye"></i>
                                </Button> {this.data_countviewFormatter(this.props.visits_count)}

                                <Button className="btn btn-default btn-icon btn-sm btn-neutral" title={`${this.props.countcomments} ${this.props.countcomments > 1 ? "Commentaires" : "Commentaire"}`}>
                                    <i className="far fa-comments"></i>
                                </Button> {this.data_countcommentFormatter(this.props.countcomments)}

                                {$guest ?
                                    <>
                                        <Button data-toggle="modal" data-target="#loginModal"
                                                className="btn btn-default btn-icon btn-sm btn-neutral" title={`${this.props.countlikes} ${this.props.countlikes > 1 ? "Likes" : "Like"}`} >
                                            <i className="far fa-heart"></i>
                                        </Button> {this.data_countlikeFormatter(this.props.countlikes)}

                                        <Button data-toggle="modal" data-target="#loginModal"
                                                className="btn btn-default btn-icon btn-sm btn-neutral" title="Sauvegarder">
                                            <i className="far fa-bookmark"></i>
                                        </Button>
                                    </>

                                    :
                                    <>

                                        {this.props.likeked ?
                                            <>
                                                <Button onClick={() => this.props.unlikeItem(this.props)}
                                                        className="btn btn-info btn-icon btn-sm btn-neutral" title={`${this.props.countlikes} ${this.props.countlikes > 1 ? "Likes" : "Like"}`}>
                                                    <i className="fas fa-heart"></i>
                                                </Button> {this.data_countlikeFormatter(this.props.countlikes)}
                                            </>

                                            :
                                            <>
                                                <Button onClick={() => this.props.likeItem(this.props)}
                                                        className="btn btn-default btn-icon btn-sm btn-neutral" title={`${this.props.countlikes} ${this.props.countlikes > 1 ? "Likes" : "Like"}`}>
                                                    <i className="far fa-heart"></i>
                                                </Button> {this.data_countlikeFormatter(this.props.countlikes)}
                                            </>
                                        }

                                        {this.props.favoriteted ?
                                            <>
                                                <Button onClick={() => this.props.unfavoriteItem(this.props)}
                                                        className="btn btn-info btn-icon btn-sm btn-neutral" title="Suprimer la Sauvegarde">
                                                    <i className="fas fa-bookmark"></i>
                                                </Button>
                                            </>

                                            :
                                            <>
                                                <Button onClick={() => this.props.favoriteItem(this.props)}
                                                        className="btn btn-default btn-icon btn-sm btn-neutral" title="Sauvegarder">
                                                    <i className="far fa-bookmark"></i>
                                                </Button>
                                            </>
                                        }


                                    </>
                                }

                            </div>

                            <div className="text-right ml-auto">


                                {!$guest && (
                                    <>
                                        {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                            <>

                                                <NavLink to={`/forums/ab/${this.props.slugin}/edit/`} className="btn btn-info btn-neutral" title="Editer ce post">
                                                    <i className="now-ui-icons ui-2_settings-90"/> Editer
                                                </NavLink>

                                                <button className="btn btn-danger btn-neutral" onClick={() => this.props.deleteItem(this.props)} title="Supprimer ce post">
                                                    <i className="now-ui-icons ui-1_simple-remove"></i> Supprimer
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}

                                <Button className="btn btn-default btn-icon btn-sm btn-neutral" title="Signaler ce post">
                                    <i className="far fa-flag"></i>
                                </Button>
                            </div>
                        </div>



                    </div>
                </div>
            </>



        )
    }
}

export default ForumList;
