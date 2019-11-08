import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import UserLists from "./UserLists";
import FaqLists from "../faq/FaqLists";

class UserIndex extends Component {
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
        let url = `/api/users`;
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
        const { users } = this.state;
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
                                                    <Link to={'/dashboard/users/create/'}  className={'btn btn-success btn-raised'}>
                                                        <i className="material-icons">forum</i>
                                                        <b className="title_hover">User</b>
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
export default UserIndex;
