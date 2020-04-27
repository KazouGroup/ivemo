import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";


class Categoriesannoncereseventecity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannonceventes : [],
        }
    }

    componentDidMount() {
        let itemCity = this.props.match.params.city;
        let url = route('api.categoryannonceventebycity_site',[itemCity]);
        dyaxios.get(url).then(response => this.setState({categoryannonceventes: response.data,}));
    }

    getcountcategoryannonceString (annonceventes_count) {
        annonceventes_count = annonceventes_count +'';
        if (annonceventes_count < 1000) {
            return annonceventes_count;
        }
        if (annonceventes_count < 10000) {
            return annonceventes_count.charAt(0) + ',' + annonceventes_count.substring(1);
        }
        return (annonceventes_count/1000).toFixed(annonceventes_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannonceventes} = this.state;
        const mapCategoryannonceventes = categoryannonceventes.length ? (
            categoryannonceventes.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/annonces_ventes/ventes/${item.slug}/${this.props.slug}/`}>
                                ventes <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <b>{this.props.name}</b>
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annonceventes_count)} {item.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                    </tr>                )
            })
        ):(
            <NavannoncecategorySkeleton/>
        );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingIni">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseIni" aria-expanded="true" aria-controls="collapseIni">
                        <b>Achat à {this.props.name}</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseIni" className="collapse show" role="tabpanel" aria-labelledby="headingIni">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {mapCategoryannonceventes}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Categoriesannoncereseventecity);