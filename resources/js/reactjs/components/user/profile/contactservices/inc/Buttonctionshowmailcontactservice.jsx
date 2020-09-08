import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import { Badge } from "reactstrap";
import moment from "moment";
import {Button} from "reactstrap";


class Buttonctionshowmailcontactservice extends Component {

    render() {
        return (
            <>


                {/*
                 {this.props.status_red ?
                    <Button onClick={() => this.props.activecontactremoveItem(this.props.id)}
                            className="btn btn-success btn-icon btn-sm btn-neutral" title="Marquer comme non lu">
                        <i className="fas fa-envelope-open"></i>
                    </Button>
                    :
                    <Button onClick={() => this.props.activecontactaddItem(this.props.id)}
                            className="btn btn-primary btn-icon btn-sm btn-neutral" title="Marquer comme lu">
                        <i className="fas fa-envelope"></i>
                    </Button>
                }
                */}



                <Button onClick={() => this.props.deletecontactItem(this.props.id)}
                        className="btn btn-danger btn-icon btn-sm btn-neutral" rel="tooltip" data-original-title="Supprimer" title="Supprimer le message" data-placement="bottom">
                    <i className="far fa-trash-alt"></i>
                </Button>
            </>

        )
    }
}
export default Buttonctionshowmailcontactservice;
