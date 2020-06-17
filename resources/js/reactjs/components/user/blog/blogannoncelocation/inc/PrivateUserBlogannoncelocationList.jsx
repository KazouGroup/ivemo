import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";


class PrivateUserBlogannoncelocationList extends PureComponent {


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
                                         <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link"> {this.props.title.length > 80 ? this.props.title.substring(0, 80) + "..." : this.props.title} | </a>
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
                                            <img src={this.props.user.avatar} alt={this.props.user.first_name}
                                                 className="avatar img-raised"/>
                                            <b>{this.props.user.first_name}</b>
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
                                            <img className="img img-raised rounded"
                                                 src={this.props.photo} alt={this.props.title}/>
                                        </LazyLoad>
                                    </a>
                                </div>
                                {!$guest &&(
                                    <>
                                        {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                            <div className="text-center">
                                                <NavLink to={`/profile/${this.props.user.slug}/personal_settings/blogs/annonce_location/statistique/${this.props.slugin}/`} className="btn btn-sm btn-icon btn-secondary" title="Statistique l'article">
                                                    <i className="now-ui-icons business_chart-bar-32"/>
                                                </NavLink>
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
                                            </div>
                                        )}

                                    </>
                                )}

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

export default PrivateUserBlogannoncelocationList;
