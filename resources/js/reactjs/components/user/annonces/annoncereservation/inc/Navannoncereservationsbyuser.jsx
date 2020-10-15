import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryannoncesbyuser} from "../../../../../redux/actions/annoncereservation/annoncereservationActions";



class Navannoncereservationsbyuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidMount() {
        this.props.loadCategoryannoncesbyuser(this.props);
    }

    getcountcategoryannonceString(annoncereservations_count) {
        annoncereservations_count = annoncereservations_count + '';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count / 1000).toFixed(annoncereservations_count % 1000 !== 0) + 'k';
    }

    render() {
        const { categoryannoncereservations } = this.props;
        const mapCategoryannoncereservations = categoryannoncereservations.length ? (
            categoryannoncereservations.map(item => {
                return (
                    <tr key={item.id}>
                        <td>
                            <strong>{item.name}</strong>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} {item.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
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

                                {mapCategoryannoncereservations}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
Navannoncereservationsbyuser.propTypes = {
    loadCategoryannoncesbyuser: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    categoryannoncereservations: store.annoncereservations.catgoryannoncereservations

});
export default connect(mapStoreToProps, {loadCategoryannoncesbyuser})(Navannoncereservationsbyuser);
