import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, UncontrolledTooltip,Tooltip} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "./inc/NavlinkconfigurationUser";
import moment from "moment";


class SubscriberuserUserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userItems:{subscriberusers:[]},
            visiable: 10,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 10}
        })
    }

    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.subscriberusers', [itemuser])).then(response => this.setState({ userItems: response.data, }));
    }
    reload(){
        this.loadItems()
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }
    render() {
        const {userItems,visiable} = this.state;
        return (

            <>
                <Helmet>
                    <title>Email Abonnement {`${$userIvemo.first_name}`} - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <NavlinkconfigurationUser {...this.props} {...userItems} />

                                    </div>



                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="card">
                                            <div className="card-body">


                                                <div className="table-responsive">
                                                    <table id="datatable" className="table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th><b>Email</b></th>
                                                            <th><b>Date d'abonement</b></th>
                                                            <th className="disabled-sorting text-right"><b>Actions</b></th>
                                                        </tr>
                                                        </thead>
                                                        <tfoot>
                                                        <tr>
                                                            <th>Email</th>
                                                            <th>Date d'abonement</th>
                                                            <th className="disabled-sorting text-right">Actions</th>
                                                        </tr>
                                                        </tfoot>
                                                        <tbody>
                                                        {userItems.subscriberusers.length >= 0 && (
                                                            <>
                                                                {userItems.subscriberusers.slice(0,visiable).map((item) =>(
                                                                    <tr key={item.id}>
                                                                        <td>{item.user_email}</td>
                                                                        <td>{moment(item.created_at).format('LL')}</td>
                                                                        <td className="text-right">

                                                                            <button type="button" id={'TooltipDelete'}
                                                                                    className="btn btn-danger btn-icon btn-sm btn-neutral">
                                                                                <i className="now-ui-icons ui-1_simple-remove"/>
                                                                            </button>
                                                                            <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                                                Supprimer
                                                                            </UncontrolledTooltip>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        )}

                                                        </tbody>
                                                    </table>

                                                </div>

                                                {visiable < userItems.subscriberusers.length && (
                                                    <div className="row">
                                                        <div className="col-md-4 ml-auto mr-auto text-center">
                                                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                                <b>Voir plus </b>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>



                                    </div>


                                </div>


                            </div>



                        </div>


                        <FooterBigUserSite />
                    </div>
                </div>

            </>

        )
    }
}
export default SubscriberuserUserIndex;
