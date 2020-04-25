import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";


class BlogannoncelocationForIndexList extends Component {


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
                                         <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link"> {this.props.title} | </a>
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
                                        <Link to={`/@${this.props.user.slug}/blogs/annonce_locations/`}>
                                            <img src={this.props.user.avatar} alt={this.props.user.first_name}
                                                 className="avatar img-raised"/>
                                            <b>{this.props.user.first_name}</b>
                                        </Link>
                                    </div>


                                    <div className="stats stats-right">
                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')} - {this.props.red_time}  min de lecture
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                        <LazyLoad>
                                            <img className="img img-raised rounded"
                                                 src={this.props.photo}/>
                                        </LazyLoad>
                                    </a>
                                </div>
                                {!$guest &&(
                                    <>
                                        {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                            <div className="text-center">
                                                <NavLink to={`/blogs/annonce_locations/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" title="Editer l'article">
                                                    <i className="now-ui-icons ui-2_settings-90"/>
                                                </NavLink>
                                            </div>
                                        )}

                                    </>
                                )}

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

export default BlogannoncelocationForIndexList;
