import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavblogannonceSkeleton from "../../../../inc/user/NavblogannonceSkeleton";


class Navblogannoncereservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncereservations : [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannoncereservation_site');
        dyaxios.get(url).then(response => this.setState({categoryannoncereservations: response.data,}));
    }

    getcountcategoryannonceString (blogannoncereservations_count) {
        blogannoncereservations_count = blogannoncereservations_count +'';
        if (blogannoncereservations_count < 1000) {
            return blogannoncereservations_count;
        }
        if (blogannoncereservations_count < 10000) {
            return blogannoncereservations_count.charAt(0) + ',' + blogannoncereservations_count.substring(1);
        }
        return (blogannoncereservations_count/1000).toFixed(blogannoncereservations_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannoncereservations} = this.state;
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

                            {categoryannoncereservations.length > 0 ?
                                <>
                                    {categoryannoncereservations.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <NavLink to={`/blogs/annonce_reservations/${item.slug}/`}>
                                                    <strong>{item.name}</strong>
                                                </NavLink>
                                            </td>
                                            <td className="text-right"> {this.getcountcategoryannonceString(item.blogannoncereservations_count)} articles</td>
                                        </tr>
                                    ))}
                                </>
                                :
                                <NavblogannonceSkeleton/>
                            }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Navblogannoncereservations);
