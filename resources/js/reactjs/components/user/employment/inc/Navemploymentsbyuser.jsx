import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";



class Navemploymentsbyuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryemployments: {user:[]},
        }
    }

    componentDidMount() {
        let url = route('api.categoryemployments_by_user_site');
        dyaxios.get(url).then(response => this.setState({ categoryemployments: response.data, }));
    }

    getcountcategoryannonceString(employments_count) {
        employments_count = employments_count + '';
        if (employments_count < 1000) {
            return employments_count;
        }
        if (employments_count < 10000) {
            return employments_count.charAt(0) + ',' + employments_count.substring(1);
        }
        return (employments_count / 1000).toFixed(employments_count % 1000 !== 0) + 'k';
    }

    render() {
        const { categoryemployments } = this.state;
        const mapCategoryemployments = categoryemployments.length >= 0 ? (
            categoryemployments.map(item => {
                return (
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/employments/${item.slug}/`}>
                                <strong>{item.name}</strong>
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.employments_count)} {item.employments_count > 1 ? "annonces" : "annonce"}</td>
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

                                {mapCategoryemployments}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
export default withRouter(Navemploymentsbyuser);
