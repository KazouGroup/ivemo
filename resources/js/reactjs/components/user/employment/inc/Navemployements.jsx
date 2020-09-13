import React, { PureComponent,Fragment } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryemployments} from "../../../../redux/actions/employment/employmentActions";


class Navemployements extends PureComponent {

    componentDidMount() {
        this.props.loadCategoryemployments();
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
        const {categoryemployments} = this.props;
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingOne">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <b>Rubriques Connexes</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {categoryemployments.length ?

                                    <Fragment>
                                        {categoryemployments.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <NavLink to={`/employments/${item.slug}/`}>
                                                        <strong>{item.name || <Skeleton width={80} />}</strong>
                                                    </NavLink>
                                                </td>
                                                <td className="text-right"> <span>{this.getcountcategoryannonceString(item.employments_count)}</span> <span className="ivemoItemsTitle">{item.employments_count > 1 ? "annonces" : "annonce"}</span></td>
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

Navemployements.propTypes = {
    loadCategoryemployments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    categoryemployments: state.employments.catgoryitems

});
export default connect(mapStateToProps, {loadCategoryemployments})(Navemployements);

