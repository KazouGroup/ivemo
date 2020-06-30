import React,{Component} from "react";
import {Button, FormText} from "reactstrap";

class ButonSubscribedAnnonce extends Component {
    render() {
        const {namesubscribed,nameunsubscribed,titleToltipeSubscribed,titleToltipeUnsubscribed} = this.props;
        return (
           <>
               {$guest ?

                   <button type="button" data-toggle="modal" data-target="#loginModal"
                      className="btn btn-danger btn-raised" title={`${titleToltipeSubscribed} ${this.props.first_name}`}>
                       <i className="far fa-bell"></i> <b>{namesubscribed}</b>
                   </button>
                   :
                   <>
                       {this.props.id !== $userIvemo.id && (
                           <>
                               {this.props.subscribannonced ?
                                   <>
                                       <Button onClick={() => this.props.unsubscribedItem(this.props.id)}
                                               className="btn btn-info btn-raised" title={`${titleToltipeUnsubscribed} ${this.props.first_name}`}>
                                           <i className="fas fa-bell-slash"></i> <b>{nameunsubscribed}</b>
                                       </Button>
                                   </>
                                   :
                                   <>
                                       <Button onClick={() => this.props.subscribeItem(this.props.id)}
                                               className="btn btn-danger btn-raised" title={`${titleToltipeSubscribed} ${this.props.first_name}`}>
                                           <i className="far fa-bell"></i> <b>{namesubscribed}</b>
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
export default ButonSubscribedAnnonce;
