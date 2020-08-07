import React, {Fragment, PureComponent} from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";
import ButonFavorisLikedForInteressBlog from "../../../../inc/vendor/ButonFavorisLikedForInteressBlog";


class BlogannoncereservationInteresseList extends PureComponent {


    render() {
        return (

            <Fragment >
                <div className="col-md-4 mx-auto">
                    <div className="card card-blog card-plain">
                        <div className="card-image">
                            <Link  to={`/blogs/annonce_reservations/${this.props.categoryannoncereservation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                <img className="img img-raised rounded" alt={this.props.title} src={this.props.photo}/>
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <a target="_blank"
                                   href={`${route('blogannoncecategoryreservation_site', this.props.categoryannoncereservation.slug)}`}
                                   className={`btn btn-sm btn-${this.props.categoryannoncereservation.color_name}`}>
                                    {this.props.categoryannoncereservation.name}
                                </a>
                                {!$guest && (
                                    <>
                                        {($userIvemo.id === this.props.user_id && $userIvemo.id === this.props.user.id) && (
                                            <div className="row">
                                                <div className="mx-auto">
                                                    {this.props.status ?
                                                        <>
                                                            <button type="button" rel="tooltip" onClick={() => this.props.unactiveItem(this.props)}
                                                                    className="btn btn-success btn-icon btn-sm">
                                                                <i className="now-ui-icons ui-1_check"/>
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" onClick={() => this.props.activeItem(this.props)}
                                                                    className="btn btn-primary btn-icon btn-sm">
                                                                <i className="now-ui-icons ui-1_simple-delete"/>
                                                            </button>
                                                        </>
                                                    }
                                                    <NavLink
                                                        to={`/blogs/annonce_reservations/${this.props.slugin}/edit/`}
                                                        className="btn btn-sm btn-icon btn-info"
                                                        title="Editer cet article">
                                                        <i className="now-ui-icons ui-2_settings-90"/>
                                                    </NavLink>
                                                    <Button
                                                        className="btn btn-sm btn-icon btn-danger"
                                                        onClick={() => this.props.deleteItem(this.props)}
                                                        color="secondary" title="Supprimer cette annonce">
                                                        <i className="now-ui-icons ui-1_simple-remove"/>
                                                    </Button>
                                                </div>
                                            </div>

                                        )}

                                    </>
                                )}
                                <h6 className="card-title">
                                    <Link className="card-link" to={`/blogs/annonce_reservations/${this.props.categoryannoncereservation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                                        {this.props.title.length > 56 ? this.props.title.substring(0, 56) + "..." : this.props.title}
                                    </Link>
                                </h6>
                            </div>
                            <span
                                dangerouslySetInnerHTML={{__html: (this.props.description.length > 96 ? this.props.description.substring(0, 96) + "<a class='text-dark' target=\"_blank\" href=" + route('blogannoncecategoryreservationslug_site', [this.props.categoryannoncereservation.slug, moment(this.props.created_at).format('YYYY-MM-DD'), this.props.slug]) + ">...<b>lire plus</b></a>" : this.props.description)}}/>


                            <ButonFavorisLikedForInteressBlog {...this.props} unfavoriteItem={this.props.unfavoriteItem}
                                                              favoriteItem={this.props.favoriteItem}
                                                              likeItem={this.props.likeItem}
                                                              unlikeItem={this.props.unlikeItem} />



                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }

}

export default BlogannoncereservationInteresseList;
