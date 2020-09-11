import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";


class Navannonceventesbyuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannonceventes: [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannonceventes_by_user_site');
        dyaxios.get(url).then(response => this.setState({categoryannonceventes: response.data,}));
    }

    getcountcategoryannonceString(annonceventes_count) {
        annonceventes_count = annonceventes_count + '';
        if (annonceventes_count < 1000) {
            return annonceventes_count;
        }
        if (annonceventes_count < 10000) {
            return annonceventes_count.charAt(0) + ',' + annonceventes_count.substring(1);
        }
        return (annonceventes_count / 1000).toFixed(annonceventes_count % 1000 !== 0) + 'k';
    }

    render() {
        const {categoryannonceventes} = this.state;
        const mapCategoryannonceventes = categoryannonceventes.length ? (
            categoryannonceventes.map(item => {
                return (
                    <tr key={item.id}>
                        <td>
                            <strong>{item.name}</strong>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annonceventes_count)} {item.annonceventes_count < 1 ? "annonce" : "annonces"}</td>
                    </tr>
                )
            })
        ) : (
            <NavannoncecategorySkeleton/>
        );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingArticle">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseArticle" aria-expanded="true"
                       aria-controls="collapseArticle">
                        <b>Rubriques vente</b>
                    </a>
                </div>
                <div id="collapseArticle" className="collapse show" role="tabpanel" aria-labelledby="headingArticle">
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

export default withRouter(Navannonceventesbyuser);
