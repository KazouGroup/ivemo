import React, { Component,Fragment } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";


class Navemployements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryemployments : {user:[]},
        }
    }

    loadItems(){
        let url = route('api.categoryemployment_site');
        fetch(url).then(res => res.json()).then((result) => {this.setState({
                categoryemployments: [...result]
            });
        });
    }

    componentDidMount() {
        this.loadItems();
        //setInterval(() => {
        //    this.loadItems();
        //}, 10000);
    }

    getcountcategoryannonceString (employments_count) {
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
        const {categoryemployments} = this.state;
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

                            {categoryemployments.length > 0 ?

                                    <Fragment>
                                        {categoryemployments.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <NavLink to={`/employments/${item.slug}/`}>
                                                        <strong>{item.name || <Skeleton width={80} />}</strong>
                                                    </NavLink>
                                                </td>
                                                <td className="text-right"> {this.getcountcategoryannonceString(item.employments_count)} {item.employments_count > 1 ? "annonces" : "annonce"}</td>
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
export default Navemployements;