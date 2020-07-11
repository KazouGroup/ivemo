import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";


class BlogannonceventeForIndexList extends Component {


    getDescription() {
        return { __html: (this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
    }
    render() {
        return (

            <div className="card">
                <div className="card-body">

                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-8">

                                     <span className="title">
                                         <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link"> {this.props.title.length > 80 ? this.props.title.substring(0, 80) + "..." : this.props.title} | </a>
                                         <Link to={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/`}
                                               className={`btn btn-sm btn-${this.props.categoryannoncevente.color_name}`}>
                                             {this.props.categoryannoncevente.name}
                                         </Link>
                                     </span>
                                <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </a>

                                <div className="card-footer">
                                    <div className="author">
                                        <Link to={`/pro/${this.props.user.slug}/`}>
                                            {this.props.user.avatar === null ?
                                                <img className="avatar img-raised" alt={this.props.user.first_name}
                                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                                :
                                                <img className="avatar img-raised" alt={this.props.user.first_name}
                                                     src={this.props.user.avatar}/>
                                            }
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
                                    <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
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
                                                <NavLink to={`/blogs/annonce_ventes/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" title=" Editer l'article">
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

export default BlogannonceventeForIndexList;
