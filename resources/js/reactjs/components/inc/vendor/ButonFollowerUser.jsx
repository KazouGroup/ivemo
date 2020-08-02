import React,{Component} from "react";
import {Button, FormText} from "reactstrap";

class ButonFollowerUser extends Component {

    data_countFormatter(visits_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {nameununfollower,nameunfollower,countfollowerusers,followeruser} = this.props;
        return (
           <>
               {$guest ?

                   <button type="button" data-toggle="modal" data-target="#loginModal"
                      className="btn btn-danger btn-sm" title="Suivre">
                       <b> {nameunfollower}</b>
                   </button>
                   :
                   <>
                       {this.props.id !== $userIvemo.id && (
                           <>
                               {followeruser ?
                                   <>
                                       <Button onClick={() => this.props.unfollowerItem(this.props)}
                                               className="btn btn-info btn-sm" title="Abonné">
                                           <b> {nameununfollower}</b>
                                       </Button>
                                   </>
                                   :
                                   <>
                                       <Button onClick={() => this.props.followerItem(this.props)}
                                               className="btn btn-danger btn-sm" title="Suivre">
                                           <b> {nameunfollower}</b>
                                       </Button>
                                   </>

                               }
                           </>
                       )}

                   </>
               }
           </>
        );
    }
}
export default ButonFollowerUser;
