import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";



class Navannoncelocationsbyuser extends Component {
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

    getcountcategoryannonceString(annoncelocations_count) {
        annoncelocations_count = annoncelocations_count + '';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count / 1000).toFixed(annoncelocations_count % 1000 !== 0) + 'k';
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
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} {item.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
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
export default withRouter(Navannoncelocationsbyuser);
