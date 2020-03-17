import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";


class Navblogannonceventes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannonceventes : [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannoncevente_site');
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
                <div className="card-header" role="tab" id="headingOne">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <b>Rubriques connexes</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {categoryannonceventes.length > 0 ?
                                <>
                                    {categoryannonceventes.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <NavLink to={`/blogs/annonce_ventes/${item.slug}/`}>
                                                    <strong>{item.name}</strong>
                                                </NavLink>
                                            </td>
                                            <td className="text-right"> {this.getcountcategoryannonceString(item.blogannonceventes_count)} articles</td>
                                        </tr>
                                    ))}
                                </>
                                :
                                <NavannoncecategorySkeleton/>

                            }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Navblogannonceventes);
