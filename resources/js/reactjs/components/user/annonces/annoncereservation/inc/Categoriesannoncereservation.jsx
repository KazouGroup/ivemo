import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryannonces} from "../../../../../redux/actions/annoncereservation/annoncereservationActions";


class Categoriesannoncereservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
           //
        }
    }

    componentDidMount() {
        this.props.loadCategoryannonces(this.props);
    }

    getcountcategoryannonceString (annoncereservations_count) {
        annoncereservations_count = annoncereservations_count +'';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count/1000).toFixed(annoncereservations_count % 1000 !== 0)+'k';
    }

    render() {
        const {catgoryannoncereservations} = this.props;
        const mapCategoryannoncereservations = catgoryannoncereservations.length ? (
            catgoryannoncereservations.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/ars/reservations/${item.slug}/`}>
                                <b style={{ textTransform: "lowercase" }}>{item.name}</b>
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} annonces</td>
                    </tr>               )
            })
        ):(
            <NavannoncecategorySkeleton/>
        );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingOne">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <b>Quesque vous aviez besoin ?</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
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
Categoriesannoncereservation.propTypes = {
    loadCategoryannonces: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    catgoryannoncereservations: store.annoncereservations.catgoryannoncereservations

});
export default connect(mapStoreToProps, {loadCategoryannonces})(Categoriesannoncereservation);
