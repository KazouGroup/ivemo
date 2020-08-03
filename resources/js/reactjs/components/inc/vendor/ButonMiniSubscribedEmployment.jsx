import React,{Component} from "react";
import {Button, FormText} from "reactstrap";

class ButonMiniSubscribedEmployment extends Component {
    render() {

        return (
           <>
               {this.props.id !== $userIvemo.id && (
                   <>
                       {this.props.subscribedemployment ?
                           <>
                               <Button onClick={() => this.props.unsubscribeItem(this.props)}
                                       className="btn btn-info btn-sm btn-icon btn-round btn-raised">
                                   <i className="fas fa-bell"></i>
                               </Button>
                           </>
                           :
                           <>
                               <Button onClick={() => this.props.subscribeItem(this.props)}
                                       className="btn btn-outline-info btn-icon btn-round btn-sm btn-raised">
                                   <i className="far fa-bell"></i>
                               </Button>
                           </>

                       }
                   </>
               )}
           </>
        );
    }
}
export default ButonMiniSubscribedEmployment;
