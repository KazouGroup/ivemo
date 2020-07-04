import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";


class PrivateFavoriteBlogannoncereservationList extends PureComponent {


    getDescription() {
        return { __html: (this.props.blogannoncereservation.description.length > 80 ? this.props.blogannoncereservation.description.substring(0, 80) + "..." : this.props.blogannoncereservation.description) };
    }
    render() {
        return (

            <div className="card">
                <div className="card-body">

                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-8">

                                     <span className="title">
                                         <a target="_blank" href={`/blogs/annonce_reservations/${this.props.blogannoncereservation.categoryannoncereservation.slug}/${moment(this.props.blogannoncereservation.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncereservation.slug}/`} className="card-link"> {this.props.blogannoncereservation.title.length > 80 ? this.props.blogannoncereservation.title.substring(0, 80) + "..." : this.props.blogannoncereservation.title} | </a>
                                         <Link to={`/blogs/annonce_reservations/${this.props.blogannoncereservation.categoryannoncereservation.slug}/`}
                                               className={`btn btn-sm btn-${this.props.blogannoncereservation.categoryannoncereservation.color_name}`}>
                                             {this.props.blogannoncereservation.categoryannoncereservation.name}
                                         </Link>
                                     </span>
                                <br/>
                                <a target="_blank" href={`/blogs/annonce_reservations/${this.props.blogannoncereservation.categoryannoncereservation.slug}/${moment(this.props.blogannoncereservation.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncereservation.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </a>

                                <div className="card-footer">
                                    <div className="author">
                                        <Link to={`/pro/${this.props.blogannoncereservation.user.slug}/`}>
                                            {this.props.blogannoncereservation.user.avatar === null ?
                                                <img className="avatar img-raised" alt={this.props.blogannoncereservation.user.first_name}
                                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                                :
                                                <img className="avatar img-raised" alt={this.props.blogannoncereservation.user.first_name}
                                                     src={this.props.blogannoncereservation.user.avatar}/>
                                            }
                                            <b>{this.props.blogannoncereservation.user.first_name}</b>
                                        </Link>
                                    </div>

                                    <div className="stats stats-right">

                                        {/*
                                        <a href="#" className="nav-item">
                                            <i className="now-ui-icons ui-2_favourite-28 text-danger"/>
                                        </a>
                                        */}

                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.blogannoncereservation.created_at).format('ll')} - {this.props.blogannoncereservation.red_time}  min de lecture
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <a target="_blank" href={`/blogs/annonce_reservations/${this.props.blogannoncereservation.categoryannoncereservation.slug}/${moment(this.props.blogannoncereservation.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncereservation.slug}/`}>
                                        <LazyLoad>
                                            <img className="img rounded"
                                                 src={this.props.blogannoncereservation.photo} alt={this.props.blogannoncereservation.title}/>
                                        </LazyLoad>
                                    </a>
                                </div>
                                <div className="text-center">

                                    <Button onClick={() => this.props.unfavoriteItem(this.props.blogannoncereservation.id)}
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

export default PrivateFavoriteBlogannoncereservationList;
