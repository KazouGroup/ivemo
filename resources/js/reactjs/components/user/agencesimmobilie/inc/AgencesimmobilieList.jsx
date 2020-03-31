import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Form, UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import moment from "moment";
import ReadMoreAndLess from "react-read-more-less";


class AgencesimmobilieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    render() {
        return (

            <div key={this.props.id} className="card">
                <div className="card-body">
                    <div className="card card-plain card-blog">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card-image">
                                    <a target="_blank" href={`/blogs/annonce_locations/`}>
                                        <img className="img rounded"
                                            src={this.props.avatar} />
                                    </a>
                                </div>

                                <div className="text-center">
                                    {this.props.profile.facebook_link && (
                                        <a href={this.props.profile.facebook_link} target="_banck" className="btn btn-icon btn-sm btn-facebook">
                                            <i className="fab fa-facebook-square" />
                                        </a>
                                    )}

                                    {this.props.profile.twitter_link && (
                                        <a href={this.props.profile.twitter_link} target="_banck" className="btn btn-icon btn-sm btn-twitter">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    )}

                                    {this.props.profile.instagram_link && (
                                        <a href={this.props.profile.instagram_link} target="_banck" className="btn btn-icon btn-sm btn-instagram">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    )}

                                    {this.props.profile.youtube_link && (
                                        <a href={this.props.profile.youtube_link} target="_banck" className="btn btn-icon btn-sm btn-youtube">
                                            <i className="fab fa-youtube" />
                                        </a>
                                    )}

                                    {this.props.profile.linkedin_link && (
                                        <a href={this.props.profile.linkedin_link} target="_banck" className="btn btn-icon btn-sm btn-linkedin">
                                            <i className="fab fa-linkedin" />
                                        </a>
                                    )}

                                </div>

                            </div>
                            <div className="col-md-8">
                                <div className="text-left pull-left">
                                    <NavLink to={`/annonce/show/`}>
                                        <h6 className="text-info">
                                            <b>{this.props.first_name || ""}</b>
                                        </h6>
                                    </NavLink>
                                </div>
                                {this.props.profile.city_id && (
                                    <div className="text-right ml-auto">
                                        <NavLink to={`/annonce/show/`}>
                                            <h6 className="text-dark">
                                                <b>{this.props.profile.city.name || ""}</b>
                                            </h6>
                                        </NavLink>
                                    </div>
                                )}

                                <h6 className="card-title">
                                    <a href="#">{this.props.profile.address || "."}</a>
                                </h6>
                                <ReadMoreAndLess
                                    className="read-more-content"
                                    charLimit={100}
                                    readMoreText="(Plus)"
                                    readLessText="(Reduire)"
                                >
                                    {this.props.profile.description || ""}
                                </ReadMoreAndLess>
                                {this.props.phone && (
                                    <a href={`${this.props.phone}`} className="btn btn-sm btn-dark">
                                        {this.props.phone}
                                    </a>
                                )}
                                <button type="button" onClick={() => this.props.contactUser(this.props)} className="btn btn-sm btn-info">
                                    Contacter
                                </button>
                                {this.props.profile.site_internet && (
                                    <a href={this.props.profile.site_internet} className="btn btn-sm btn-primary" target="_banck">
                                        Site internet
                                    </a>
                                )}
                                {!$guest && (
                                    <Fragment>
                                        {$userIvemo.id === this.props.id && (
                                            <NavLink to={`/profile/account/`} className="btn btn-sm btn-success">
                                                Editer
                                            </NavLink>
                                        )}
                                    </Fragment>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AgencesimmobilieList;
