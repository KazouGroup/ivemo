import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";


class Navtabscategoryreservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncereservations : [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannoncereservation_site');
        dyaxios.get(url).then(response => this.setState({categoryannoncereservations: response.data,}));
    }


    render() {
        const {categoryannoncereservations} = this.state;
        return (


            <ul className="nav nav-tabs nav-tabs-neutral justify-content-center"
                role="tablist" data-background-color={this.props.backgroundColor}>

                {categoryannoncereservations.map((item) => (
                    <li key={item.id} className="nav-item">
                        <NavLink to={`/annonces_reservations/reservations/${item.slug}/`} className="nav-link">
                            <b>{item.name}</b>
                        </NavLink>
                    </li>
                ))}

            </ul>
        )
    }

}
Navtabscategoryreservation.defaultProps = {
    backgroundColor: "black",
};

Navtabscategoryreservation.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default Navtabscategoryreservation;
