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

class PremiumUserBlogannonceVenteList extends Component {
    constructor(props) {
        super(props);
        this.state = {};


    }

    componentDidMount() {
        //
    }

    data_countFormatter(blogannonceventes_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        return (

            <tr key={this.props.id}>
                <td>
                    <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`}>
                        <img src={this.props.photo} alt={this.props.user.first_name} style={photo_style}/>
                    </a>
                </td>

                <td>{ (this.props.title.length > 30 ? this.props.title.substring(0,30)+ "..." : this.props.title) }</td>
                <td>
                    {this.props.categoryannoncevente_id ?
                        <b>{ (this.props.categoryannoncevente.name.length > 30 ? this.props.categoryannoncevente.name.substring(0,30)+ "..." : this.props.categoryannoncevente.name) }</b>
                        :
                        <b v-else>user don't exist</b>
                    }
                </td>
                <td><b>{this.data_countFormatter(this.props.visits_count)}</b></td>
                <td>
                    <div className="timeline-heading">
                        {this.props.status ?
                            <>
                                {!this.props.status_admin ?
                                    <a href="#">
                                        <span className="badge badge-danger"><b>Masquer par le mod??rateur</b></span>
                                    </a>
                                    :
                                    <span className="badge badge-success"><b>Visible</b></span>
                                }
                            </>
                            :
                            <>
                                {!this.props.status_admin ?
                                    <a href="#">
                                        <span className="badge badge-danger"><b>Masquer par le mod??rateur</b></span>
                                    </a>
                                    :
                                    <span className="badge badge-rose"><b>D??sactiv??</b></span>
                                }
                            </>
                        }
                    </div>
                </td>
                <td><b>{moment(this.props.created_at).fromNow()}</b></td>
                <td className="text-right">
                    {this.props.status ?
                        <Button onClick={() => this.props.unactiveItem(this.props.id)}
                                className="btn btn-success btn-just-icon btn-sm" title="Desactiver" >
                            <i className="material-icons">done</i>
                        </Button>
                        :
                        <Button onClick={() => this.props.activeItem(this.props.id)}
                                className="btn btn-rose btn-just-icon btn-sm" title="Activer" >
                            <i className="material-icons">remove</i>
                        </Button>

                    }

                    <a target="_blank" href={`/blogs/annonce_ventes/${this.props.categoryannoncevente.slug}/${moment(this.props.created_at).format('YYYY-MM-DD')}/${this.props.slug}/`} className="btn btn-warning btn-sm btn-just-icon">
                        <i className="material-icons">visibility</i>
                    </a>
                    <Link to={`/dashboard/premium/${$userIvemo.slug}/blogs/annonce_ventes/${this.props.slugin}/edit/`} className="btn btn-info btn-sm btn-just-icon" data-toggle="tooltip" data-placement="bottom" title={`??diter cette ${this.props.title}`}>
                        <i className="material-icons">edit</i>
                    </Link>
                    <Button onClick={() => this.props.deleteItem(this.props.id)}
                            className="btn btn-danger btn-sm btn-just-icon" title="Supprimer cette article">
                        <i className="material-icons">delete_forever</i>
                    </Button>
                </td>
            </tr>

        )
    }
}

export default PremiumUserBlogannonceVenteList;
