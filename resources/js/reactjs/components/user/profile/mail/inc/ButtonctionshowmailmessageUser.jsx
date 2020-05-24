import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import { Badge } from "reactstrap";
import moment from "moment";
import {Button} from "reactstrap";


class ButtonctionshowmailmessageUser extends Component {

    render() {
        return (
            <>

                {this.props.status_favorite ?
                    <Button onClick={() => this.props.unfavoriteItem(this.props.id)}
                            className="btn btn-warning btn-icon btn-sm btn-neutral" title="Suivis">
                        <i className="fas fa-star"/>
                    </Button>
                    :
                    <Button onClick={() => this.props.favoriteItem(this.props.id)}
                            className="btn btn-warning btn-icon btn-sm btn-neutral" title="Non suivis">
                        <i className="far fa-star"/>
                    </Button>
                }
                {this.props.status_red ?
                    <Button onClick={() => this.props.unactiveItem(this.props.id)}
                            className="btn btn-primary btn-icon btn-sm btn-neutral" title="Marquer comme lu">
                        <i className="fas fa-envelope"></i>
                    </Button>
                    :
                    <Button onClick={() => this.props.activeItem(this.props.id)}
                            className="btn btn-success btn-icon btn-sm btn-neutral" title="Marquer comme non lu">
                        <i className="fas fa-envelope-open"></i>
                    </Button>
                }

                {this.props.status_archvement ?
                    <Button onClick={() => this.props.unarchvementItem(this.props.id)}
                            className="btn btn-info btn-icon btn-sm btn-neutral" title="Archive">
                        <i className="fas fa-bookmark"/>
                    </Button>
                    :
                    <Button onClick={() => this.props.archvementItem(this.props.id)}
                            className="btn btn-info btn-icon btn-sm btn-neutral" title="Non archive">
                        <i className="far fa-bookmark"/>
                    </Button>
                }
                <Button onClick={() => this.props.deleteItem(this.props.id)}
                        className="btn btn-danger btn-icon btn-sm btn-neutral" title="Supprimer ce message">
                    <i className="far fa-trash-alt"></i>
                </Button>
            </>

        )
    }
}
export default ButtonctionshowmailmessageUser;
