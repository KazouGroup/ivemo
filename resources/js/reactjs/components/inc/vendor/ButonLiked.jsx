import React,{Component} from "react";
import {Button} from "reactstrap";

class ButonLiked extends Component {

    data_countlikeFormatter(countlikes, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        return (
           <>
               {this.props.likeked ?
                   <Button onClick={() => this.props.unlikeItem(this.props)}
                           className="btn btn-info btn-sm" title="Je n'aime plus cette article">
                         <i className="fas fa-heart"></i> <b>{this.data_countlikeFormatter(this.props.countlikes || "0")}</b>
                   </Button>

                   :
                   <Button onClick={() => this.props.likeItem(this.props)}
                           className="btn btn-facebook btn-sm btn-neutral" title="J'aime cette article">
                        <i className="far fa-heart"></i> <b>{this.data_countlikeFormatter(this.props.countlikes || "0")}</b>
                   </Button>
               }
           </>
        );
    }
}
export default ButonLiked;
