import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import { Button,UncontrolledTooltip,Row,CardBody,CardFooter } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";



class PublicUserBlogannonceventeList extends Component {

    render() {
        return (

            <div key={this.props.id} className="col-md-6 mx-auto">
                <div className="card card-blog">
                    <div className="card-image">
                        <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                            <LazyLoad>
                                <img className="img rounded" alt={this.props.title} src={this.props.photo}/>
                            </LazyLoad>
                        </a>
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
                                            <NavLink to={`/blogs/annonce_ventes/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" id="TooltipEdit">
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
                                <Link to={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/`} className={`btn btn-sm btn-${this.props.categoryannoncevente.color_name} text-center`}>
                                    {this.props.categoryannoncevente.name}
                                </Link>
                            </div>
                        </Row>
                        <h6 className="card-title text-center">
                            <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="card-link"> {this.props.title}</a>
                        </h6>
                        <p className="card-description">
                            <b dangerouslySetInnerHTML={{__html: (this.props.description.length > 40 ? this.props.description.substring(0, 40) + "..." : this.props.description)}}/>
                            <Link to={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}> lire la suite </Link>
                        </p>
                        <CardFooter>
                            <div className="d-flex align-items-center">

                                <div className="author">
                                    <Link to={`/pro/${this.props.user.slug}/`}>
                                        <img src={this.props.user.avatar} alt={this.props.user.first_name}
                                             className="avatar img-raised"/>
                                    </Link>
                                </div>
                                <div className="mx-3">
                                    <NavLink to={`/pro/${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">
                                        <b>{this.props.user.first_name}</b>
                                        <small className="d-block text-muted"><b>{moment(this.props.created_at).format('ll')}</b></small>
                                    </NavLink>
                                </div>

                                <div className="stats stats-right">
                                    <i className="now-ui-icons tech_watch-time"/> {this.props.red_time} min de lecture
                                </div>
                            </div>





                        </CardFooter>
                    </CardBody>
                </div>
            </div>


        )
    }

}

export default PublicUserBlogannonceventeList;
