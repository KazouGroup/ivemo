import React, { Component } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";


class Navblogannoncelocations extends Component {
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

    getcountcategoryannonceString (blogannoncelocations_count) {
        blogannoncelocations_count = blogannoncelocations_count +'';
        if (blogannoncelocations_count < 1000) {
            return blogannoncelocations_count;
        }
        if (blogannoncelocations_count < 10000) {
            return blogannoncelocations_count.charAt(0) + ',' + blogannoncelocations_count.substring(1);
        }
        return (blogannoncelocations_count/1000).toFixed(blogannoncelocations_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannoncelocations} = this.state;
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

                            {categoryannoncelocations.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <NavLink to={`/blogs/annonce_locations/${item.slug}/`}>
                                             <strong>{item.name}</strong>
                                        </NavLink>
                                    </td>
                                    <td className="text-right"> {this.getcountcategoryannonceString(item.blogannoncelocations_count)} articles</td>
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
export default withRouter(Navblogannoncelocations);
