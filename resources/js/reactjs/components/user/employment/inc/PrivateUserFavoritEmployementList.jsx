import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";


class PrivateUserFavoritEmployementList extends PureComponent {

    getDescription() {
        return { __html: (this.props.favoriteable.description.length > 80 ? this.props.favoriteable.description.substring(0, 80) + "..." : this.props.favoriteable.description) };
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
                                        <NavLink to={`/employments/${this.props.favoriteable.categoryemployment.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.favoriteable.categoryemployment.name} </strong>
                                            </span>
                                        </NavLink>
                                    </div>
                                    <div className="col-md-7 col-6">
                                        <NavLink to={`/employments/${this.props.favoriteable.categoryemployment.slug}/${this.props.favoriteable.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.favoriteable.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.favoriteable.district.length > 15 ? this.props.favoriteable.district.substring(0, 15) + "..." : this.props.favoriteable.district}
                                    </div>

                                </div>

                                     <span className="title">
                                         {this.props.favoriteable.status ?
                                             <a target="_blank" href={`/employments/${this.props.favoriteable.categoryemployment.slug}/${this.props.favoriteable.city.slug}/${this.props.favoriteable.user.slug}/${this.props.favoriteable.slug}/`} className="card-link">
                                                 {this.props.favoriteable.title.length > 90 ? this.props.favoriteable.title.substring(0, 90) + "..." : this.props.favoriteable.title}
                                             </a>
                                             :
                                             <>{this.props.favoriteable.title.length > 90 ? this.props.favoriteable.title.substring(0, 90) + "..." : this.props.favoriteable.title}</>
                                         }
                                     </span>
                                    <br/>

                                    <a target="_blank" href={`/employments/${this.props.favoriteable.categoryemployment.slug}/${this.props.favoriteable.city.slug}/${this.props.favoriteable.user.slug}/${this.props.favoriteable.slug}/`}>
                                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                                    </a>


                                <br/>
                                <div className="card-header d-flex align-items-center">


                                    <div className="d-flex align-items-center">
                                        {this.props.favoriteable.user.avatar ?
                                            <NavLink to={`/pro/${this.props.favoriteable.user.slug}/employments/`}>
                                                <img src={this.props.favoriteable.user.avatar}
                                                     style={{ height: "40px", width: "80px" }}
                                                     alt={this.props.favoriteable.user.first_name}
                                                     className="avatar" />
                                            </NavLink>
                                            : <Skeleton circle={false} height={40} width={80} />}
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.favoriteable.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.favoriteable.user.first_name}
                                                <small className="d-block text-muted"><b><i className="now-ui-icons tech_watch-time"/> {moment(this.props.favoriteable.created_at).format('ll')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">
                                        {this.props.favoriteable.price && (
                                            <h5 className="text-dark"><b>{this.props.favoriteable.price.formatMoney(2,'.',',') || "0"} <small>FCFA</small></b></h5>
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
                                    <a target="_blank" href={`/employments/${this.props.favoriteable.categoryemployment.slug}/${this.props.favoriteable.city.slug}/${this.props.favoriteable.user.slug}/${this.props.favoriteable.slug}/`}>
                                        <LazyLoad>
                                            <img className="img rounded"
                                                 src={this.props.favoriteable.photo} alt={this.props.favoriteable.title}/>
                                        </LazyLoad>
                                    </a>

                                </div>

                                {!$guest &&(
                                            <>
                                                <div className="text-center">
                                                    <button type="button"
                                                        className="btn btn-danger btn-icon btn-sm" onClick={() => this.props.unfavoritemploymentItem(this.props)} title="Supprimer cette annonce">
                                                        <i className="fas fa-bookmark"></i>
                                                    </button>
                                                </div>

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

export default PrivateUserFavoritEmployementList;
