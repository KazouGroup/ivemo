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
                    <td>{moment(this.props.created_at).fromNow()}</td>
                    <td className="text-right">
                        {this.props.status ?
                            <Fragment>
                                <Button onClick={() => this.props.unactiveItem(this.props.id)}
                                        className="btn btn-round btn-success btn-icon btn-sm" title="Desactiver" >
                                    <i className="now-ui-icons ui-1_check"/>
                                </Button>
                            </Fragment>
                            :
                            <Fragment>
                                <Button onClick={() => this.props.activeItem(this.props.id)}
                                        className="btn btn-round btn-primary btn-icon btn-sm" title="Activer" >
                                    <i className="now-ui-icons ui-1_simple-delete"/>
                                </Button>
                            </Fragment>

                        }
                        <a target="_blank" href={`/blogs/annonce_locations/${this.props.categoryannoncelocation.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="btn btn-warning btn-icon btn-sm btn-round">
                            <i className="fas fa-eye"></i>
                        </a>
                        <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_locations/${this.props.slugin}/edit/`} className="btn btn-info btn-icon btn-sm btn-round" data-toggle="tooltip" data-placement="bottom" title={`Éditer cette ${this.props.full_name}`}>
                            <i className="now-ui-icons ui-2_settings-90"/>
                        </Link>
                        <button type="button" onClick={() => this.props.deleteItem(this.props.id)}
                                className="btn btn-danger btn-icon btn-sm btn-round">
                            <i className="far fa-trash-alt"/>
                        </button>
                    </td>
                </tr>
            </Fragment>

        )
    }
}

export default PremiumUserBlogannonceList;
