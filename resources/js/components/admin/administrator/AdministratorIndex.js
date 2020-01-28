import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import UserLists from "../user/UserLists";

class AdministratorIndex extends Component {
    constructor () {
        super();
        this.state = {
            users: [],
        };
    }

    componentDidMount () {
        this.loadItems();
    }
    loadItems() {
        let url = `/api/administrators`;
        fetch(url).then(res => res.json())
            .then((result) => {
                this.setState({
                    users: result
                });
            }, (error) => {
                this.setState({
                    error
                });
            })
    }
    render() {
        const {users} = this.state;
        return (
            <div className="wrapper">

                <NavAdmin/>

                <div className="main-panel">

                    <TopNavAdmin/>

                    <div className="content">
                        <div className="container-fluid">


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="toolbar">
                                                <div className="submit text-center">
                                                    <Link to={'/dashboard/administrators/p/datatables/'}  className={'btn btn-primary btn-raised'}>
                                                        <i className="material-icons">info</i>
                                                        <b className="title_hover">Administrators Datatables</b>
                                                    </Link>
                                                </div>

                                            </div>
                                            <br/>
                                            <br/>
                                            <div className={'row'}>
                                                {users.map((item) => (
                                                    <UserLists key={item.id} {...item}/>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </div>
        );
    }
}
export default AdministratorIndex;
