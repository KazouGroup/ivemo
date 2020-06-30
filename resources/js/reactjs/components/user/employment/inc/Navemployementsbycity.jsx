import React, { Component,Fragment } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";


class Navemployementsbycity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityemployments : {user:[]},
        }
    }

    componentDidMount() {
        let url = route('api.cityemployment_site');
        fetch(url).then(res => res.json()).then((result) => {this.setState({
            cityemployments: [...result]});
        });
    }

    getdataString (employments_count) {
        employments_count = employments_count +'';
        if (employments_count < 1000) {
            return employments_count;
        }
        if (employments_count < 10000) {
            return employments_count.charAt(0) + ',' + employments_count.substring(1);
        }
        return (employments_count/1000).toFixed(employments_count % 1000 !== 0)+'k';
    }

    render() {
        const {cityemployments} = this.state;
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingTwo">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <b>Villes</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseTwo" className="collapse show" role="tabpanel" aria-labelledby="headingTwo">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {cityemployments.length >= 0 ?

                                    <Fragment>
                                        {cityemployments.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <NavLink to={`/employment/${item.slug}/`}>
                                                        <strong>{item.name || <Skeleton width={80} />}</strong>
                                                    </NavLink>
                                                </td>
                                                <td className="text-right"> {this.getdataString(item.employments_count)} {item.employments_count > 1 ? "annonces" : "annonce"}</td>
                                            </tr>
                                        ))}
                                    </Fragment>
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
export default Navemployementsbycity;
