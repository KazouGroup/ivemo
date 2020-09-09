import React, {Fragment, PureComponent} from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";
import ButonFavorisLikedForInteressActivity from "../../../inc/vendor/ButonFavorisLikedForInteressActivity";


class ActivitycityInteresseList extends PureComponent {


    render() {
        const mapUploadimages = this.props.uploadimages.length >= 0 ? (
            this.props.uploadimages.map(item => {
                return (
                    <Fragment key={item.id} >
                        <Link to={`/city/${this.props.city.slug}/a/${this.props.slug}/`}>
                            <LazyLoad>
                                <img className="img img-raised rounded"
                                     src={item.photo} alt={this.props.title}/>
                            </LazyLoad>
                        </Link>
                    </Fragment>

                )
            })
        ) : (
            <></>
        );
        return (

            <Fragment >
                <div className="col-md-4 mx-auto">
                    <div className="card card-blog card-plain">
                        <div className="card-image">
                            {mapUploadimages}
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <h6 className="card-title">
                                    <Link className="card-link" to={`/city/${this.props.city.slug}/a/${this.props.slug}/`}>
                                        {this.props.title}
                                    </Link>
                                </h6>
                            </div>
                            <Link className="card-link" to={`/city/${this.props.city.slug}/a/${this.props.slug}/`}>
                                <span dangerouslySetInnerHTML={{__html: (this.props.description.length > 96 ? this.props.description.substring(0, 96) + "..." : this.props.description)}}/>
                            </Link>


                            <ButonFavorisLikedForInteressActivity {...this.props} unfavoriteItem={this.props.unfavoriteItem}
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

export default ActivitycityInteresseList;
