import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, UncontrolledTooltip, Tooltip, FormText} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import NavlinkconfigurationUser from "./inc/NavlinkconfigurationUser";
import moment from "moment";


class SubscriberuserUserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userItems:{subscriberusers:[]},
            visiable: 20,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
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
                    <title>Email Abonnement {`${$userIvemo.first_name}`} - {$name_site}</title>
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

                                        <div className="submit text-center">
                                            <a href={`${route('subscriberuser_public_mail.export')}`} className="btn btn-danger">
                                                <i className="fa fa-file-excel"/> Telecharger
                                            </a>
                                            <FormText className="text-muted" color="default" id="emailHelp">
                                                <b>Telecharger toutes emails abonner à votre newsletter nous recomandons de ne pas spamer </b>
                                            </FormText>
                                        </div>

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
                                                            <th><b>IP</b></th>
                                                            <th className="disabled-sorting text-right"><b>Date d'abonement</b></th>
                                                        </tr>
                                                        </thead>
                                                        <tfoot>
                                                        <tr>
                                                            <th>Email</th>
                                                            <th>IP</th>
                                                            <th className="disabled-sorting text-right">Date d'abonement</th>
                                                        </tr>
                                                        </tfoot>
                                                        <tbody>
                                                        {userItems.subscriberusers.length >= 0 && (
                                                            <>
                                                                {userItems.subscriberusers.slice(0,visiable).map((item) =>(
                                                                    <tr key={item.id}>
                                                                        <td>{item.user_email}</td>
                                                                        <td>{item.ip}</td>
                                                                        <td className="text-right">
                                                                            {moment(item.created_at).format('LL')}
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
