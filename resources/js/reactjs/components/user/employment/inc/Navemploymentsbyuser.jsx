import React, { PureComponent } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryemploymentsbyuser} from "../../../../redux/actions/employment/employmentActions";



class Navemploymentsbyuser extends PureComponent {


    componentDidMount() {
        this.props.loadCategoryemploymentsbyuser();
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
        const { categoryemployments } = this.props;
        const mapCategoryemployments = categoryemployments.length ? (
            categoryemployments.map(item => {
                return (
                    <tr key={item.id}>
                        <td>
                            <strong>{item.name}</strong>
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
                        <b>Rubriques connexes personnel</b>
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


Navemploymentsbyuser.propTypes = {
    loadCategoryemploymentsbyuser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    categoryemployments: state.employments.catgoryitems

});

export default connect(mapStateToProps, {loadCategoryemploymentsbyuser})(withRouter(Navemploymentsbyuser));
