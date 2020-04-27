import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";


class Categoriesannoncereselocationcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncelocations : [],
        }
    }

    componentDidMount() {
        let itemCity = this.props.match.params.city;
        let url = route('api.categoryannoncelocationbycity_site',[itemCity]);
        dyaxios.get(url).then(response => this.setState({categoryannoncelocations: response.data,}));
    }

    getcountcategoryannonceString (annoncelocations_count) {
        annoncelocations_count = annoncelocations_count +'';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count/1000).toFixed(annoncelocations_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannoncelocations} = this.state;
        const mapCategoryannoncelocations = categoryannoncelocations.length ? (
            categoryannoncelocations.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/annonces_locations/locations/${item.slug}/${this.props.slug}/`}>
                                location <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <b>{this.props.name}</b>
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} {item.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                    </tr>                )
            })
        ):(
            <NavannoncecategorySkeleton/>
        );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingIni">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseIni" aria-expanded="true" aria-controls="collapseIni">
                        <b>Location à {this.props.name}?</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseIni" className="collapse show" role="tabpanel" aria-labelledby="headingIni">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {mapCategoryannoncelocations}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Categoriesannoncereselocationcity);