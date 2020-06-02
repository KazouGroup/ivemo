import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button} from "reactstrap";
import moment from "moment";
require("moment/min/locales.min");
moment.locale('fr');

class PremiumUserEmployementMessageList extends Component {

    render() {
        return (

            <tr key={this.props.id}>
                <td>
                    {this.props.status_red ?
                        <Button onClick={() => this.props.unactiveItem(this.props.id)}
                                className="btn btn-link btn-secondary btn-just-icon btn-sm" title="Message lu">
                            <i className="material-icons">fiber_manual_record</i>
                        </Button>
                        :
                        <Button onClick={() => this.props.activeItem(this.props.id)}
                                className="btn btn-link btn-info btn-just-icon btn-sm" title="Nouveau message">
                            <i className="material-icons">fiber_manual_record</i>
                        </Button>

                    }
                    <a style={{ cursor: "pointer" }} onClick={() => this.props.readItem(this.props)} title="Voir ce message">
                        { (this.props.full_name.length > 50 ? this.props.full_name.substring(0,50)+ "..." : this.props.full_name) }
                    </a>
                </td>
                <td>
                     <a style={{ cursor: "pointer" }} onClick={() => this.props.readItem(this.props)} title="Voir ce message">
                         { this.props.email }
                    </a>
                </td>
                <td>
                     <a style={{ cursor: "pointer" }} onClick={() => this.props.readItem(this.props)} title="Voir ce message">
                         { this.props.phone}
                    </a>
                </td>
                <td><b>{moment(this.props.created_at).fromNow()}</b></td>
                <td className="text-right">
                    <Button onClick={() => this.props.readItem(this.props)}
                            className="btn btn-link btn-warning btn-just-icon btn-sm" title="Voir ce message">
                        <i className="material-icons">visibility</i>
                    </Button>

                    <Button onClick={() => this.props.deleteItem(this.props.id)}
                            className="btn btn-link btn-danger btn-just-icon btn-sm" title="Supprimer ce message">
                        <i className="material-icons">delete_forever</i>
                    </Button>
                </td>
            </tr>

        )
    }
}

export default PremiumUserEmployementMessageList;
