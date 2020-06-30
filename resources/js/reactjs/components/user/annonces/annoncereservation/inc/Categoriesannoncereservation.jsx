import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";


class Categoriesannoncereservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncereservations : {user:[]},
        }
    }

    componentDidMount() {
        let url = route('api.categoryannoncereservation_site');
        dyaxios.get(url).then(response => this.setState({categoryannoncereservations: response.data,}));
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
        const {categoryannoncereservations} = this.state;
        const mapCategoryannoncereservations = categoryannoncereservations.length ? (
            categoryannoncereservations.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/annonces_reservations/reservations/${item.slug}/`}>
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
Categoriesannoncereservation.defaultProps = {
    backgroundColor: "black",
};

Categoriesannoncereservation.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default Categoriesannoncereservation;
