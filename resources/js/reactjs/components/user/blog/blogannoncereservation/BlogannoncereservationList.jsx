import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";


class BlogannoncereservationList extends Component {


    getDescription() {
        const md = new Remarkable();
        return { __html: md.render(this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
    }
    render() {
        return (

            <div className="card">
                <div className="card-body">

                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-8">

                                     <span className="title">
                                         <NavLink to={`/blogs/annonce_reservations/${this.props.categoryannoncereservation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link"> {this.props.title} | </NavLink>
                                         <Link to={`/blogs/annonce_reservations/${this.props.categoryannoncereservation.slug}/`}
                                               className={`btn btn-sm btn-${this.props.categoryannoncereservation.color_name}`}>
                                             {this.props.categoryannoncereservation.name}
                                         </Link>
                                     </span>
                                <Link to={`/blogs/annonce_reservations/${this.props.categoryannoncereservation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </Link>

                                <div className="card-footer">
                                    <div className="author">
                                        <Link to={`/@${this.props.user.slug}/`}>
                                            <img src={this.props.user.avatar} alt={this.props.user.first_name}
                                                 className="avatar img-raised"/>
                                            <b>{this.props.user.first_name}</b>
                                        </Link>
                                    </div>

                                    <div className="stats stats-right">
                                        <a href="#" className="nav-item">
                                            <i className="now-ui-icons location_bookmark"/>
                                        </a>
                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')} - {this.props.red_time}  min lecture
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <Link to={`/blogs/annonce_reservations/${this.props.categoryannoncereservation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                        <img className="img img-raised rounded"
                                             src={this.props.photo}/>
                                    </Link>
                                </div>
                                {!$guest &&(
                                    <>
                                        {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                            <div className="text-center">
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
                                                <UncontrolledTooltip placement="bottom" target="TooltipEdit">
                                                    Editer l'article
                                                </UncontrolledTooltip>
                                                <NavLink to={`/blogs/annonce_reservations/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" id="TooltipEdit">
                                                    <i className="now-ui-icons ui-2_settings-90"/>
                                                </NavLink>
                                                <UncontrolledTooltip placement="bottom" target="TooltipDelete">
                                                    Supprimer cette article
                                                </UncontrolledTooltip>
                                                <Button
                                                    className="btn btn-icon btn-sm btn-danger" onClick={() => this.props.deleteItem(this.props.id)} id="TooltipDelete">
                                                    <i className="now-ui-icons ui-1_simple-remove"/>
                                                </Button>{" "}
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

export default BlogannoncereservationList;
