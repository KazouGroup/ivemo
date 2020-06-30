import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";


class PrivateFavoriteBlogannoncelocationList extends PureComponent {


    getDescription() {
        return { __html: (this.props.blogannoncelocation.description.length > 60 ? this.props.blogannoncelocation.description.substring(0, 60) + "..." : this.props.blogannoncelocation.description) };
    }
    render() {
        return (

            <div className="card">
                <div className="card-body">

                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-8">

                                     <span className="title">
                                         <a target="_blank" href={`/blogs/annonce_locations/${this.props.blogannoncelocation.categoryannoncelocation.slug}/${moment(this.props.blogannoncelocation.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncelocation.slug}/`} className="card-link">
                                         {this.props.blogannoncelocation.title.length > 80 ? this.props.blogannoncelocation.title.substring(0, 80) + "..." : this.props.blogannoncelocation.title} | </a>
                                         <Link to={`/blogs/annonce_locations/${this.props.blogannoncelocation.categoryannoncelocation.slug}/`}
                                               className={`btn btn-sm btn-${this.props.blogannoncelocation.categoryannoncelocation.color_name}`}>
                                             {this.props.blogannoncelocation.categoryannoncelocation.name}
                                         </Link>
                                     </span>
                                <br/>
                                <a target="_blank" href={`/blogs/annonce_locations/${this.props.blogannoncelocation.categoryannoncelocation.slug}/${moment(this.props.blogannoncelocation.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncelocation.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </a>

                                <div className="card-footer">
                                    <div className="author">
                                        <Link to={`/pro/${this.props.blogannoncelocation.user.slug}/blogs/annonce_locations/`}>
                                            <img src={this.props.blogannoncelocation.user.avatar} alt={this.props.blogannoncelocation.user.first_name}
                                                 className="avatar img-raised"/>
                                            <b>{this.props.blogannoncelocation.user.first_name}</b>
                                        </Link>
                                    </div>


                                    <div className="stats stats-right">
                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.blogannoncelocation.created_at).format('ll')} - {this.props.blogannoncelocation.red_time}  min de lecture
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <a target="_blank" href={`/blogs/annonce_locations/${this.props.blogannoncelocation.categoryannoncelocation.slug}/${moment(this.props.blogannoncelocation.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncelocation.slug}/`}>
                                        <LazyLoad>
                                            <img className="img rounded"
                                                 src={this.props.blogannoncelocation.photo} alt={this.props.blogannoncelocation.title}/>
                                        </LazyLoad>
                                    </a>
                                </div>
                                <div className="text-center">

                                    <Button onClick={() => this.props.unfavoriteItem(this.props.blogannoncelocation.id)}
                                            className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                        <i className="fas fa-bookmark"></i>
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

export default PrivateFavoriteBlogannoncelocationList;
