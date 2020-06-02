import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";


class EmployementList extends Component {


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

                                <div className="row">
                                    <div className="col-md-5 col-6">
                                        <NavLink to={`/employments/${this.props.categoryemployment.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.categoryemployment.name} </strong>
                                            </span>
                                        </NavLink>
                                    </div>
                                    <div className="col-md-7 col-6">
                                        <NavLink to={`/employments/${this.props.categoryemployment.slug}/${this.props.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.district.length > 15 ? this.props.district.substring(0, 15) + "..." : this.props.district}
                                    </div>

                                </div>

                                     <span className="title">
                                         <a target="_blank" href={`/employments/${this.props.categoryemployment.slug}/${this.props.city.slug}/${this.props.slug}/`} className="card-link">
                                              {this.props.title.length > 90 ? this.props.title.substring(0, 90) + "..." : this.props.title}
                                         </a>
                                     </span>
                                    <br/>
                                    {/**
                                     *

                                    <a target="_blank" href={`/employments/${this.props.categoryemployment.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                                    </a>

                                     */}

                                <br/>
                                <div className="card-header d-flex align-items-center">


                                    <div className="d-flex align-items-center">
                                        <NavLink to={`/pro/${this.props.user.slug}/employments/`}>
                                            <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                        </NavLink>
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.user.slug}/employments/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name}
                                                <small className="d-block text-muted"><b><i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">
                                        {this.props.price && (
                                            <h5 className="text-success"><b>{this.props.price.formatMoney(2,'.',',') || "0"} <small>FCFA</small></b></h5>
                                        )}

                                        {/*
                                         <a href="#" className="nav-item">
                                            <i className="now-ui-icons location_bookmark"/>
                                        </a>
                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')}
                                        */}

                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <a target="_blank" href={`/employments/${this.props.categoryemployment.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                        <LazyLoad>
                                            <img className="img img-raised rounded"
                                                 src={this.props.photo} alt={this.props.title}/>
                                        </LazyLoad>
                                    </a>
                                </div>

                                <div className="text-center">


                                    {!$guest &&(
                                        <>
                                            {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                <>
                                                    {this.props.status ?
                                                        <>
                                                            <button type="button" rel="tooltip" onClick={() => this.props.unactiveItem(this.props.id)}
                                                                    className="btn btn-success btn-icon btn-sm" title="Desactiver l'annonce">
                                                                <i className="now-ui-icons ui-1_check"/>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" onClick={() => this.props.activeItem(this.props.id)}
                                                                    className="btn btn-primary btn-icon btn-sm" title="Activer l'annonce">
                                                                <i className="now-ui-icons ui-1_simple-delete"/>
                                                            </button>
                                                        </>
                                                    }
                                                    <NavLink to={`/employment/ab/${this.props.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" title=" Editer l'annonce">
                                                        <i className="now-ui-icons ui-2_settings-90"/>
                                                    </NavLink>
                                                    <Button
                                                        className="btn btn-icon btn-sm btn-danger" onClick={() => this.props.deleteItem(this.props.id)} title="Supprimer cette annonce">
                                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                                    </Button>{" "}
                                                </>
                                            )}

                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

export default EmployementList;
