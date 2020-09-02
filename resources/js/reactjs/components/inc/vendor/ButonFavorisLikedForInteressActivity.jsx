import React,{PureComponent} from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ButonFavorisLikedForInteressActivity extends PureComponent {

    data_countfavoriteFormatter(countfavorites, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfavorites)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfavorites / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countcommentFormatter(countcomments, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countcomments)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countcomments / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countuploadimageFormatter(countuploadimages, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countuploadimages)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countuploadimages / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        return (

            <div className="card-footer">
                <div className="stats stats-left">

                    <>
                        <Link to={`/city/${this.props.city.slug}/a/${this.props.slug}/`}
                           className="nav-item">
                            <i className="now-ui-icons media-1_album"></i>
                            <b>{this.data_countuploadimageFormatter(this.props.countuploadimages)}</b> ·
                        </Link>
                        <Link to={`/city/${this.props.city.slug}/a/${this.props.slug}/`}
                           className="nav-item">
                            <i className="now-ui-icons files_single-copy-04"></i>
                            <b>{this.data_countcommentFormatter(this.props.countcomments)}</b> ·
                        </Link>
                    </>

                </div>
                <div className="stats stats-right">

                    {$guest ?
                        <>
                            <a style={{cursor:"pointer"}} data-toggle="modal" data-target="#loginModal"
                               className="nav-item">
                                <i className="now-ui-icons ui-2_favourite-28"></i>
                                <b>{this.data_countlikeFormatter(this.props.countlikes)}</b> ·
                            </a>
                            <a style={{cursor:"pointer"}} data-toggle="modal" data-target="#loginModal"
                               className="nav-item">
                                <i className="now-ui-icons location_bookmark"/>
                                <b>{this.data_countfavoriteFormatter(this.props.countfavorites)}</b>
                            </a>
                        </>

                        :
                        <>
                            {this.props.likeked ?

                                <a style={{cursor:"pointer"}} onClick={() => this.props.unlikeItem(this.props)}
                                   className="nav-item" title="Je n'aime plus cette article">
                                    <i className="now-ui-icons ui-2_favourite-28 text-danger"></i>
                                    <b>{this.data_countlikeFormatter(this.props.countlikes)}</b> ·
                                </a>
                                :
                                <a style={{cursor:"pointer"}} onClick={() => this.props.likeItem(this.props)}
                                   className="nav-item" title="J'aime cette article">
                                    <i className="now-ui-icons ui-2_favourite-28"></i>
                                    <b>{this.data_countlikeFormatter(this.props.countlikes)}</b> ·
                                </a>
                            }

                            {this.props.favoriteted ?
                                <a style={{cursor:"pointer"}} onClick={() => this.props.unfavoriteItem(this.props)}
                                   className="nav-item" title="Retirer de vos favoris">
                                    <i className="now-ui-icons location_bookmark text-danger"></i>
                                    <b>{this.data_countfavoriteFormatter(this.props.countfavorites)}</b>
                                </a>
                                :
                                <a style={{cursor:"pointer"}} onClick={() => this.props.favoriteItem(this.props)}
                                   className="nav-item" title="Ajouter à vos favoris">
                                    <i className="now-ui-icons location_bookmark"></i>
                                    <b>{this.data_countfavoriteFormatter(this.props.countfavorites)}</b>
                                </a>
                            }
                        </>
                    }

                </div>

            </div>

        );
    }
}
export default ButonFavorisLikedForInteressActivity;
