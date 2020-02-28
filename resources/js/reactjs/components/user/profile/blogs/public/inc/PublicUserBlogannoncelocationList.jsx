import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip,Row,CardBody,CardFooter } from "reactstrap";
import moment from "moment";


class PublicUserBlogannoncelocationList extends Component {

    render() {
        return (

            <div key={this.props.id} className="col-md-6 mx-auto">
                <div className="card card-blog">
                    <div className="card-image">
                        <Link to={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                            <img className="img rounded" alt={this.props.title} src={this.props.photo}/>
                        </Link>
                    </div>
                    <CardBody>
                        {!$guest && (
                            <>
                                {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                    <Row>
                                        <div className="mx-auto">
                                            <UncontrolledTooltip placement="bottom" target="TooltipEdit">
                                                Editer cet article
                                            </UncontrolledTooltip>
                                            <NavLink to={`/blogs/annonce_locations/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" id="TooltipEdit">
                                                <i className="now-ui-icons ui-2_settings-90"/>
                                            </NavLink>
                                            <Button
                                                className="btn btn-sm btn-icon btn-danger" onClick={() => this.props.deleteItem(this.props.id)}>
                                                <i className="now-ui-icons ui-1_simple-remove"/>
                                            </Button>{" "}
                                        </div>
                                    </Row>

                                )}

                            </>
                        )}
                        <Row>
                            <div className="mx-auto">
                                <Link to={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/`} className={`btn btn-sm btn-${this.props.categoryannoncelocation.color_name} text-center`}>
                                    {this.props.categoryannoncelocation.name}
                                </Link>
                            </div>
                        </Row>
                        <h6 className="card-title text-center">
                            <NavLink to={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link"> {this.props.title}</NavLink>
                        </h6>
                        <p className="card-description">
                            <b dangerouslySetInnerHTML={{__html: (this.props.description.length > 48 ? this.props.description.substring(0, 48) + "..." : this.props.description)}}/>
                            <Link to={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}> lire la suite </Link>
                        </p>
                        <CardFooter>
                            <div className="author">
                                <Link to={`/@${this.props.user.slug}/`}>
                                    <img src={this.props.user.avatar} alt={this.props.user.first_name}
                                         className="avatar img-raised"/>
                                    <span>{this.props.user.first_name}</span>
                                </Link>
                            </div>
                            <div className="stats stats-right">
                                <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')} - {this.props.red_time} min lecture
                            </div>
                        </CardFooter>
                    </CardBody>
                </div>
            </div>


        )
    }

}

export default PublicUserBlogannoncelocationList;
