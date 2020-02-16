import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";


class Categoriesannoncereselocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryannoncelocations : [],
        }
    }

    componentDidMount() {
        let url = route('api.categoryannoncelocation_site');
        dyaxios.get(url).then(response => this.setState({categoryannoncelocations: response.data,}));
    }

    getcountcategoryannonceString (annoncelocations_count) {
        annoncelocations_count = annoncelocations_count +'';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count/1000).toFixed(annoncelocations_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannoncelocations} = this.state;
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

                            {categoryannoncelocations.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <NavLink to={`/annonces_locations/locations/${item.slug}/`}>
                                            Trouver un(e) <strong>{item.name}</strong> à louer
                                        </NavLink>
                                    </td>
                                    <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} annonces</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}
Categoriesannoncereselocation.defaultProps = {
    backgroundColor: "black",
};

Categoriesannoncereselocation.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};
export default withRouter(Categoriesannoncereselocation);
