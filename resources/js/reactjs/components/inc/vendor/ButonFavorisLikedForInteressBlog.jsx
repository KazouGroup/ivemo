import React,{Component} from "react";
import {Button} from "reactstrap";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ButonFavorisLikedForInteressBlog extends Component {

    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        return (
           <>

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
                       </a>
                   </>

                   :
                   <>
                       {this.props.likeked ?

                           <a style={{cursor:"pointer"}} onClick={() => this.props.unlikeItem(this.props.id)}
                              className="nav-item" title="Je n'aime plus cette article">
                               <i className="now-ui-icons ui-2_favourite-28 text-danger"></i>
                               <b>{this.data_countlikeFormatter(this.props.countlikes)}</b> ·
                           </a>
                           :
                           <a style={{cursor:"pointer"}} onClick={() => this.props.likeItem(this.props.id)}
                              className="nav-item" title="J'aime cette article">
                               <i className="now-ui-icons ui-2_favourite-28"></i>
                               <b>{this.data_countlikeFormatter(this.props.countlikes)}</b> ·
                           </a>
                       }

                       {this.props.bookmarked ?
                           <a style={{cursor:"pointer"}} onClick={() => this.props.unfavoriteItem(this.props.id)}
                              className="nav-item" title="Retirer de vos favoris">
                               <i className="now-ui-icons location_bookmark text-danger"></i>
                           </a>
                           :
                           <a style={{cursor:"pointer"}} onClick={() => this.props.favoriteItem(this.props.id)}
                              className="nav-item" title="Ajouter à vos favoris">
                               <i className="now-ui-icons location_bookmark"></i>
                           </a>
                       }
                   </>
               }
           </>
        );
    }
}
export default ButonFavorisLikedForInteressBlog;
