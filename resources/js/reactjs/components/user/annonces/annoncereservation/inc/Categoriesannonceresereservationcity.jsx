import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";


class Categoriesannonceresereservationcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncereservations : [],
        }
    }

    componentDidMount() {
        let itemCity = this.props.match.params.city;
        let url = route('api.categoryannoncereservationbycity_site',[itemCity]);
        dyaxios.get(url).then(response => this.setState({categoryannoncereservations: response.data,}));
    }

    getcountcategoryannonceString (annoncereservations_count) {
        annoncereservations_count = annoncereservations_count +'';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count/1000).toFixed(annoncereservations_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannoncereservations} = this.state;
        const mapCategoryannoncereservations = categoryannoncereservations.length ? (
            categoryannoncereservations.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/annonces_reservations/reservations/${item.slug}/${this.props.slug}/`}>
                                reservation <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <b>{this.props.name}</b>
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} {item.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
                    </tr>                )
            })
        ):(
            <NavannoncecategorySkeleton/>
        );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingIni">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseIni" aria-expanded="true" aria-controls="collapseIni">
                        <b>Reservation à {this.props.name}?</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseIni" className="collapse show" role="tabpanel" aria-labelledby="headingIni">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {mapCategoryannoncereservations}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Categoriesannonceresereservationcity);
