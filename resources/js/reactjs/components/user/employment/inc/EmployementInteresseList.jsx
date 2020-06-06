import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";


class EmployementInteresseList extends Component {


    getDescription() {
        return { __html: (this.props.description.length > 80 ? this.props.description.substring(0, 80) + "..." : this.props.description) };
    }
    render() {
        return (

            <div className="col-md-6 mx-auto">
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
                                         <NavLink to={`/employments/${this.props.categoryemployment.slug}/${this.props.city.slug}/${this.props.slug}/`} className="card-link">
                                            {this.props.title.length > 50 ? this.props.title.substring(0, 50) + "..." : this.props.title}
                                         </NavLink>
                                     </span>

                                    <br/>
                                    <div className="card-header d-flex align-items-center">


                                        <div className="d-flex align-items-center">
                                            <NavLink to={`/pro/${this.props.user.slug}/`}>
                                                <img src={this.props.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                            </NavLink>
                                            <div className="mx-3">
                                                <NavLink to={`/pro/${this.props.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.user.first_name.length > 9 ? this.props.user.first_name.substring(0, 9) + "..." : this.props.user.first_name}
                                                    <small className="d-block text-muted"><b><i className="now-ui-icons tech_watch-time"/> {moment(this.props.created_at).format('ll')}</b></small>
                                                </NavLink>
                                            </div>
                                        </div>

                                        <div className="text-right mx-auto">
                                            {this.props.price && (
                                                <h5 className="text-success"><b>{this.props.price.formatMoney(2,'.',',')} <small>FCFA</small></b></h5>
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
                                        <NavLink to={`/employments/${this.props.categoryemployment.slug}/${this.props.city.slug}/${this.props.slug}/`}>
                                            <LazyLoad>
                                                <img className="img rounded"
                                                     src={this.props.photo} alt={this.props.title}/>
                                            </LazyLoad>
                                        </NavLink>
                                    </div>

                                    <div className="text-center">


                                        {$guest  ?

                                            <Button  data-toggle="modal" data-target="#loginModal"
                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                <i className="far fa-bookmark"></i>
                                            </Button>
                                            :
                                            <>
                                                {this.props.bookmarked ?

                                                    <>
                                                        <Button onClick={() => this.props.unfavoriteItem(this.props.id)}
                                                                className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                            <i className="fas fa-bookmark"></i>
                                                        </Button>
                                                    </>

                                                    :
                                                    <>
                                                        <Button onClick={() => this.props.favoriteItem(this.props.id)}
                                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                            <i className="far fa-bookmark"></i>
                                                        </Button>
                                                    </>
                                                }


                                                {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                                    <>
                                                        {this.props.status ?
                                                            <button type="button" rel="tooltip" onClick={() => this.props.unactiveItem(this.props.id)}
                                                                    className="btn btn-success btn-icon btn-sm" title="Desactiver l'annonce">
                                                                <i className="now-ui-icons ui-1_check"/>
                                                            </button>
                                                            :null}
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

                                        }
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }

}

export default EmployementInteresseList;
