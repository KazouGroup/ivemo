import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavLinkPublicAnnonceUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservations: [],
            annoncelocations: [],
        };

    }

    loadItem() {
        let itemuser = this.props.match.params.user;
        fetch(route('api.profilpublique_annoncereservations',[itemuser])).then(res => res.json()).then((result) => {
            this.setState({
                annoncereservations: [...result]
            });
        });
        fetch(route('api.profilpublique_annoncelocations',[itemuser])).then(res => res.json()).then((result) => {
            this.setState({
                annoncelocations: [...result]
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const { annoncelocations, annoncereservations } = this.state;
        let itemuser = this.props.match.params.user;
        return (

            <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                <div className="card-body">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <NavLink to={`/@${itemuser}/annonces_locations/`}>
                                    Annones <b>locations</b>
                                </NavLink>
                            </td>
                            {annoncelocations.length > 0 && (
                                <td className="text-right"> {annoncelocations.length} annonces</td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <NavLink to={`/@${itemuser}/annonces_reservations/`}>
                                    Annonces <b>reservations</b>
                                </NavLink>
                            </td>
                            {annoncereservations.length > 0 && (
                                <td className="text-right"> {annoncereservations.length} annonces</td>
                            )}
                        </tr>
                        <tr>
                            <td>
                                <NavLink to={`/`}>
                                    Annonces vente
                                </NavLink>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        )
    }
}
export default withRouter(NavLinkPublicAnnonceUser);
