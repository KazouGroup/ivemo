import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";


class Navblogannonceventesbyuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannonceventes : [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannonceventes_by_user_site');
        dyaxios.get(url).then(response => this.setState({categoryannonceventes: response.data,}));
    }

    getcountcategoryannonceString (blogannonceventes_count) {
        blogannonceventes_count = blogannonceventes_count +'';
        if (blogannonceventes_count < 1000) {
            return blogannonceventes_count;
        }
        if (blogannonceventes_count < 10000) {
            return blogannonceventes_count.charAt(0) + ',' + blogannonceventes_count.substring(1);
        }
        return (blogannonceventes_count/1000).toFixed(blogannonceventes_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannonceventes} = this.state;
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingArticle">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseArticle" aria-expanded="true" aria-controls="collapseArticle">
                        <b>Rubriques vente</b>
                    </a>
                </div>
                <div id="collapseArticle" className="collapse show" role="tabpanel" aria-labelledby="headingArticle">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {categoryannonceventes.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_ventes/${item.slug}/`}>
                                             <strong>{item.name}</strong>
                                        </NavLink>
                                    </td>
                                    <td className="text-right"> {this.getcountcategoryannonceString(item.blogannonceventes_count)} {item.blogannonceventes_count < 1 ? "article" : "articles"}</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Navblogannonceventesbyuser);
