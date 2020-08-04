import React,{PureComponent} from "react";
import {Button} from "reactstrap";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ButonFavorisLikedForInteressBlog extends PureComponent {

    data_countfavoriteFormatter(countfavorites, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfavorites)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfavorites / Math.pow(10, order * 3)).toFixed(precision) + suffix;
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
                <div className="author">
                    {this.props.user.avatar === null ?
                        <img className="avatar" alt={this.props.user.first_name}
                             src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                        :
                        <img className="avatar" alt={this.props.user.first_name}
                             src={this.props.user.avatar}/>
                    }
                    <b>{(this.props.user.first_name.length > 15 ? this.props.user.first_name.substring(0, 15) + "..." : this.props.user.first_name)}</b>
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
export default ButonFavorisLikedForInteressBlog;
