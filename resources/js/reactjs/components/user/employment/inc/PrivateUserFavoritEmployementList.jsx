import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";


class PrivateUserFavoritEmployementList extends PureComponent {

    getDescription() {
        return { __html: (this.props.employment.description.length > 80 ? this.props.employment.description.substring(0, 80) + "..." : this.props.employment.description) };
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
                                        <NavLink to={`/employments/${this.props.employment.categoryemployment.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.employment.categoryemployment.name} </strong>
                                            </span>
                                        </NavLink>
                                    </div>
                                    <div className="col-md-7 col-6">
                                        <NavLink to={`/employments/${this.props.employment.categoryemployment.slug}/${this.props.employment.city.slug}/`}>
                                            <span className="ml-auto mr-auto">
                                                <strong>{this.props.employment.city.name} </strong>
                                            </span>
                                        </NavLink>
                                        - {this.props.employment.district.length > 15 ? this.props.employment.district.substring(0, 15) + "..." : this.props.employment.district}
                                    </div>

                                </div>

                                     <span className="title">
                                         {this.props.employment.status ?
                                             <a target="_blank" href={`/employments/${this.props.employment.categoryemployment.slug}/${this.props.employment.city.slug}/${this.props.employment.slug}/`} className="card-link">
                                                 {this.props.employment.title.length > 90 ? this.props.employment.title.substring(0, 90) + "..." : this.props.employment.title}
                                             </a>
                                             :
                                             <>{this.props.employment.title.length > 90 ? this.props.employment.title.substring(0, 90) + "..." : this.props.employment.title}</>
                                         }
                                     </span>
                                    <br/>

                                    <a target="_blank" href={`/employments/${this.props.employment.categoryemployment.slug}/${this.props.employment.city.slug}/${this.props.employment.slug}/`}>
                                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                                    </a>


                                <br/>
                                <div className="card-header d-flex align-items-center">


                                    <div className="d-flex align-items-center">
                                        {this.props.employment.user.avatar ?
                                            <NavLink to={`/pro/${this.props.employment.user.slug}/employments/`}>
                                                <img src={this.props.employment.user.avatar}
                                                     style={{ height: "40px", width: "80px" }}
                                                     alt={this.props.employment.user.first_name}
                                                     className="avatar" />
                                            </NavLink>
                                            : <Skeleton circle={false} height={40} width={80} />}
                                        <div className="mx-3">
                                            <NavLink to={`/pro/${this.props.employment.user.slug}/`} className="text-dark font-weight-600 text-sm">{this.props.employment.user.first_name}
                                                <small className="d-block text-muted"><b><i className="now-ui-icons tech_watch-time"/> {moment(this.props.employment.created_at).format('ll')}</b></small>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="text-right mx-auto">
                                        {this.props.employment.price && (
                                            <h5 className="text-dark"><b>{this.props.employment.price.formatMoney(2,'.',',') || "0"} <small>FCFA</small></b></h5>
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
                                    <a target="_blank" href={`/employments/${this.props.employment.categoryemployment.slug}/${this.props.employment.city.slug}/${this.props.employment.slug}/`}>
                                        <LazyLoad>
                                            <img className="img rounded"
                                                 src={this.props.employment.photo} alt={this.props.employment.title}/>
                                        </LazyLoad>
                                    </a>

                                </div>

                                {!$guest &&(
                                            <>
                                                <div className="text-center">
                                                    <button type="button"
                                                        className="btn btn-danger btn-icon btn-sm" onClick={() => this.props.unfavoriteItem(this.props.employment.id)} title="Supprimer cette annonce">
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
