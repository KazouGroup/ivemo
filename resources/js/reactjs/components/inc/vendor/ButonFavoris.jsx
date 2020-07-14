import React,{Component} from "react";
import {Button} from "reactstrap";

class ButonFavoris extends Component {
    render() {
        const {iscontactuseremployment,bookmarked,favoriteItem} = this.props;
        return (
           <>
               {$guest ?
                   <Button  data-toggle="modal" data-target="#loginModal"
                            className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                       <i className="far fa-bookmark"></i>
                   </Button>
                   :
                   <>
                       {iscontactuseremployment && (
                           <Button className="btn btn-info btn-sm" title="Vous avez déjà postulé à cette annonce">
                               <b>Postulé</b>
                           </Button>
                       )}

                       {bookmarked ?
                           <Button onClick={() => favoriteItem(this.props)}
                                   className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                               <i className="fas fa-bookmark"></i>
                           </Button>

                           :
                           <Button onClick={() => favoriteItem(this.props)}
                                   className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                               <i className="far fa-bookmark"></i>
                           </Button>
                       }
                   </>
               }

           </>
        );
    }
}
export default ButonFavoris;
