import React,{Component} from "react";
import {Button} from "reactstrap";

class ButonFavoris extends Component {

    data_countfavoriteFormatter(countfavorites, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfavorites)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfavorites / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {iscontactuseremployment,favoriteted,favoriteItem,unfavoriteItem} = this.props;
        return (
           <>
               {$guest ?
                   <Button  data-toggle="modal" data-target="#loginModal"
                            className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                       <i className="far fa-bookmark"></i>   <b>{this.data_countfavoriteFormatter(this.props.countfavorites || "0")}</b>
                   </Button>
                   :
                   <>
                       {iscontactuseremployment && (
                           <Button className="btn btn-info btn-sm" title="Vous avez déjà postulé à cette annonce">
                               <b>Postulé</b>
                           </Button>
                       )}

                       {favoriteted ?
                           <Button onClick={() => unfavoriteItem(this.props)}
                                   className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                               <i className="fas fa-bookmark"></i>   <b>{this.data_countfavoriteFormatter(this.props.countfavorites || "0")}</b>
                           </Button>

                           :
                           <Button onClick={() => favoriteItem(this.props)}
                                   className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                               <i className="far fa-bookmark"></i>   <b>{this.data_countfavoriteFormatter(this.props.countfavorites || "0")}</b>
                           </Button>
                       }
                   </>
               }

           </>
        );
    }
}
export default ButonFavoris;
