import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";



class Navblogannoncelocationsbyuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncelocations: [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannoncelocations_by_user_site');
        dyaxios.get(url).then(response => this.setState({ categoryannoncelocations: response.data, }));
    }

    getcountcategoryannonceString(blogannoncelocations_count) {
        blogannoncelocations_count = blogannoncelocations_count + '';
        if (blogannoncelocations_count < 1000) {
            return blogannoncelocations_count;
        }
        if (blogannoncelocations_count < 10000) {
            return blogannoncelocations_count.charAt(0) + ',' + blogannoncelocations_count.substring(1);
        }
        return (blogannoncelocations_count / 1000).toFixed(blogannoncelocations_count % 1000 !== 0) + 'k';
    }

    render() {
        const { categoryannoncelocations } = this.state;
        const mapCategoryannoncelocations = categoryannoncelocations.length ? (
            categoryannoncelocations.map(item => {
                return (
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_locations/${item.slug}/`}>
                                <strong>{item.name}</strong>
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.blogannoncelocations_count)} {item.blogannoncelocations_count > 1 ? "articles" : "article"}</td>
                    </tr>
                )
            })
        ) : (
            <NavannoncecategorySkeleton/>
            );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingArticle">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseArticle" aria-expanded="true" aria-controls="collapseArticle">
                        <b>Rubriques connexes</b>
                    </a>
                </div>
                <div id="collapseArticle" className="collapse show" role="tabpanel" aria-labelledby="headingArticle">
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
export default withRouter(Navblogannoncelocationsbyuser);
