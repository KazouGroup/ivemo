import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button} from "reactstrap";
import moment from "moment";
require("moment/min/locales.min");
moment.locale('fr');
const photo_style = {
    width: "80px",
    height: "50px",
    top: "15px",
    borderRadius: "4%"
};

class PremiumUserBlogannonceList extends Component {
    constructor(props) {
        super(props);
        this.state = {};


    }

    componentDidMount() {
        //
    }

    data_countFormatter(blogannoncelocations_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        return (

            <Fragment key={this.props.id}>

                <tr>
                    <td>
                        <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                            <img src={this.props.photo} alt={this.props.user.first_name} style={photo_style}/>
                        </a>
                    </td>

                    <td>{ (this.props.title.length > 30 ? this.props.title.substring(0,30)+ "..." : this.props.title) }</td>
                    <td>
                        {this.props.categoryannoncelocation_id ?
                            <NavLink to={`/dashboard/premium/${this.props.user.slug}/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/`}>
                                <b>{ (this.props.categoryannoncelocation.name.length > 30 ? this.props.categoryannoncelocation.name.substring(0,30)+ "..." : this.props.categoryannoncelocation.name) }</b>
                            </NavLink>
                            :
                            <b v-else>user don't exist</b>
                        }
                    </td>
                    <td>
                        <div className="timeline-heading">
                            {this.props.status ?
                                <>
                                    <span className="badge badge-success"><b>Visible</b></span>
                                    {!this.props.status_admin && (
                                        <a href="#">
                                            <span className="badge badge-danger"><b>Masquer par le moderateur</b></span>
                                        </a>
                                    )}
                                </>
                                :
                                <>
                                    <span className="badge badge-primary"><b>Deactivé</b></span>
                                    {!this.props.status_admin && (
                                        <a href="#">
                                            <span className="badge badge-danger"><b>Masquer par le moderateur</b></span>
                                        </a>
                                    )}
                                </>
                            }
                        </div>
                    </td>
                    <td><b>{this.data_countFormatter(this.props.visits_count)}</b></td>
                    <td><b>{moment(this.props.created_at).fromNow()}</b></td>
                    <td className="text-right">
                        {this.props.status ?
                            <Fragment>
                                <Button onClick={() => this.props.unactiveItem(this.props.id)}
                                        className="btn btn-success btn-just-icon btn-sm" title="Desactiver" >
                                    <i className="material-icons">remove</i>
                                </Button>
                            </Fragment>
                            :
                            <Fragment>
                                <Button onClick={() => this.props.activeItem(this.props.id)}
                                        className="btn btn-rose btn-just-icon btn-sm" title="Activer" >
                                    <i className="material-icons">done</i>
                                </Button>
                            </Fragment>

                        }
                        <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="btn btn-warning btn-sm btn-just-icon">
                            <i className="material-icons">visibility</i>
                        </a>
                        <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/${this.props.slugin}/edit/`} className="btn btn-info btn-sm btn-just-icon" data-toggle="tooltip" data-placement="bottom" title={`Éditer cette ${this.props.full_name}`}>
                            <i className="material-icons">edit</i>
                        </Link>
                        <button type="button" onClick={() => this.props.deleteItem(this.props.id)}
                                className="btn btn-danger btn-sm btn-just-icon">
                            <i className="material-icons">delete_forever</i>
                        </button>
                    </td>
                </tr>
            </Fragment>

        )
    }
}

export default PremiumUserBlogannonceList;
