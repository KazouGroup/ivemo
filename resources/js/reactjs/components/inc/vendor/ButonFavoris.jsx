import React,{Component} from "react";
import {Button} from "reactstrap";

class ButonFavoris extends Component {
    render() {
        return (
           <>
               {this.props.bookmarked ?
                   <Button onClick={() => this.props.unfavoriteItem(this.props.id)}
                           className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                       <i className="fas fa-bookmark"></i>
                   </Button>

                   :
                   <Button onClick={() => this.props.favoriteItem(this.props.id)}
                           className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                       <i className="far fa-bookmark"></i>
                   </Button>
               }
           </>
        );
    }
}
export default ButonFavoris;
