import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";


class BlogannoncelocationList extends PureComponent {


    getDescription() {
        return { __html: (this.props.description.length > 60 ? this.props.description.substring(0, 60) + "..." : this.props.description) };
    }
    render() {
        return (

            <div className="card">
                <div className="card-body">

                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-8">

                                     <span className="title">
                                         <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link">
                                         {this.props.title.length > 80 ? this.props.title.substring(0, 80) + "..." : this.props.title} | </a>
                                         <Link to={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/`}
                                               className={`btn btn-sm btn-${this.props.categoryannoncelocation.color_name}`}>
                                             {this.props.categoryannoncelocation.name}
                                         </Link>
                                     </span>
                                <br/>
                                <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </a>

                                <div className="card-footer">
                                    <div className="author">
                                        <Link to={`/pro/${this.props.user.slug}/blogs/annonce_locations/`}>
                                            {this.props.user.avatar === null ?
                                                <img className="avatar img-raised" alt={this.props.user.first_name}
                                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                                :
                                                <img className="avatar img-raised" alt={this.props.user.first_name}
                                                     src={this.props.user.avatar}/>
                                            }
                                            <b>{this.props.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {this.props.user.first_name}</b>
                                        </Link>
                                    </div>


                                    <div className="stats stats-right">

                                        {/*
                                         <a href="#" className="nav-item">
                                            <i className="now-ui-icons location_bookmark text-dark"/>
                                        </a>
                                        */}

                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')} - {this.props.red_time}  min de lecture
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                        <LazyLoad>
                                            <img className="img rounded"
                                                 src={this.props.photo} alt={this.props.title}/>
                                        </LazyLoad>
                                    </a>
                                </div>
                                <div className="text-center">
                                    {$guest ?

                                        <Button  data-toggle="modal" data-target="#loginModal"
                                                 className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                            <i className="far fa-bookmark"></i>
                                        </Button>
                                        :

                                        <>

                                            {this.props.bookmarked ?

                                                <>
                                                    <Button onClick={() => this.props.unfavoriteItem(this.props.id)}
                                                            className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                        <i className="fas fa-bookmark"></i>
                                                    </Button>
                                                </>

                                                :
                                                <>
                                                    <Button onClick={() => this.props.favoriteItem(this.props.id)}
                                                            className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                        <i className="far fa-bookmark"></i>
                                                    </Button>
                                                </>
                                            }
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
                                                    <NavLink to={`/blogs/annonce_locations/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" title="Editer l'article">
                                                        <i className="now-ui-icons ui-2_settings-90"/>
                                                    </NavLink>
                                                    <Button
                                                        className="btn btn-icon btn-sm btn-danger" onClick={() => this.props.deleteItem(this.props.id)} title="Supprimer cette article">
                                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                                    </Button>{" "}
                                                </>
                                            )}

                                        </>
                                    }
                                    <Button  title="Signaler cette article" onClick={() => this.props.signalerUser(this.props)}
                                             className="btn btn-instagram btn-icon btn-sm">
                                        <i className="fas fa-flag"></i>
                                    </Button>
                                </div>


                            </div>

                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

export default BlogannoncelocationList;
