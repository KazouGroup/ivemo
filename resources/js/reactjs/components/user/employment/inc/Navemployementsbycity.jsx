import React, { PureComponent,Fragment } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCityemployments} from "../../../../redux/actions/employment/employmentActions";


class Navemployementsbycity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
           //
        }
    }

    componentDidMount() {
        this.props.loadCityemployments(this.props);
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
        const {cityemployments} = this.props;
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
                                                <td className="text-right"> <span className="ivemoItemsCount">{this.getdataString(item.employments_count)}</span> <span className="ivemoItemsTitle">{item.employments_count > 1 ? "annonces" : "annonce"}</span></td>
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


Navemployementsbycity.propTypes = {
    loadCityemployments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    cityemployments: state.employments.cityemployments

});
export default connect(mapStateToProps, {loadCityemployments})(Navemployementsbycity);
