import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";


class NavlinkmailmessagesendUser extends Component {
    render() {
        return (

            <Fragment>
                <div className="card card-plain">
                    <div id="accordion" role="tablist" aria-multiselectable="true"
                         className="card-collapse">
                    <div className="card-header" role="tab" id="headingOne">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <b>Mes messages envoyés</b>
                            <i className="now-ui-icons arrows-1_minimal-down"/>
                        </a>
                    </div>

                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingTwo">
                        <div className="card-body">
                    <table>
                        <tbody>

                        <>
                            {/*
                            <tr>
                                <td className="pb-2 pt-2">
                                    <NavLink to={`/messages/employments/send/`}>
                                        <b>Emplois & services</b>
                                    </NavLink>
                                </td>
                                <td>{this.props.contactservicesemploymentsfrom_count >= 0 ? <span
                                    className="text-right ivemoItemsCount">{this.props.contactservicesemploymentsfrom_count} </span> : <Skeleton height={25} width={25} />}
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pt-2">
                                    <NavLink to={`/messages/als/send/`}>
                                        <b>Locations</b>
                                    </NavLink>
                                </td>
                                <td>{this.props.contactservicesannoncelocationsfrom_count >= 0 ? <span
                                    className="text-right ivemoItemsCount">{this.props.contactservicesannoncelocationsfrom_count} </span> : <Skeleton height={25} width={25} />}
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-2 pt-2">
                                    <NavLink to={`/messages/avs/send/`}>
                                        <b>Ventes</b>
                                    </NavLink>
                                </td>
                                <td>{this.props.contactservicesannonceventesfrom_count >= 0 ? <span
                                    className="text-right ivemoItemsCount">{this.props.contactservicesannonceventesfrom_count} </span> : <Skeleton height={25} width={25} />}
                                </td>
                            </tr>
                            */}

                            <tr>
                                <td className="pb-2 pt-2">
                                    <NavLink to={`/messages/ars/send/`}>
                                        <b>Reservations</b>
                                    </NavLink>
                                </td>
                                <td>{this.props.contactservicesannoncereservationsfrom_count >= 0 ? <span
                                    className="text-right ivemoItemsCount">{this.props.contactservicesannoncereservationsfrom_count} </span> : <Skeleton height={25} width={25} />}
                                </td>
                            </tr>
                        </>


                        </tbody>
                    </table>
                        </div>
                        </div>
                    </div>
                </div>

                {/*ö*/}


            </Fragment>


        )
    }
}

export default withRouter(NavlinkmailmessagesendUser);
