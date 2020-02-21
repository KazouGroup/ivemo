import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import NavNavigatePivateUser from "../../NavNavigatePivateUser";


class NavlinkmailmessageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuserslocations: [],
            contactusersprofile: [],
        };

    }

    loadItem() {
        fetch(route('api.personal_mails_annonces_locations.site')).then(res => res.json()).then((result) => {
            this.setState({
                contactuserslocations: [...result]
            });
        });
        fetch(route('api.personal_mails_contacts.site')).then(res => res.json()).then((result) => {
            this.setState({
                contactusersprofile: [...result]
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();

    }

    render() {
        const { contactuserslocations, contactusersprofile } = this.state;
        return (
            <div className="col-lg-4 col-md-12 mx-auto">

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                    <div className="card-body">
                                        <table>
                                            <tbody>

                                                <tr>
                                                    <td> <NavLink to={`/profile/personal_mails/contacts/`}>Mail contacts</NavLink></td>
                                                    {contactusersprofile.length > 0 && (
                                                        <td className="text-right"> {contactusersprofile.length || " "} messages</td>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td> <NavLink to={`/profile/personal_mails/annonces_locations/`}>Mail annonces locations</NavLink></td>
                                                    {contactuserslocations.length > 0 && (
                                                        <td className="text-right">{contactuserslocations.length} messages</td>
                                                    )}
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Ici c'est la navigation dans toutes les pages dans le profile*/}
                <NavNavigatePivateUser/>

            </div>

        )
    }
}
export default withRouter(NavlinkmailmessageUser);
