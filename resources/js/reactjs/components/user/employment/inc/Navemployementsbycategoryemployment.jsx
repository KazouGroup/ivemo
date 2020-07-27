import React, { PureComponent,Fragment } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryemploymentsbycity} from "../../../../redux/actions/employment/employmentActions";


class Navemployementsbycategoryemployment extends PureComponent {

    componentDidMount() {
        this.props.loadCategoryemploymentsbycity(this.props);
    }

    getdataString(employments_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {categoryemployments} = this.props;
        return (


            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingOne">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <b>Rubriques connexes à {this.props.name || $name_site}</b>
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
                                                                    <NavLink to={`/employments/${item.slug}/${this.props.slug}/`}>
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


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

Navemployementsbycategoryemployment.propTypes = {
    loadCategoryemploymentsbycity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    categoryemployments: state.employments.catgoryitems

});
export default connect(mapStateToProps, {loadCategoryemploymentsbycity})(Navemployementsbycategoryemployment);
