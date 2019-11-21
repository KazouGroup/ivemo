import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import UserLists from "./UserLists";
import moment from 'moment'
require("moment/min/locales.min");
moment.locale('fr');

class UserIndex extends Component {
    constructor () {
        super();
        this.state = {
            users: [],
            per: 12,
            page: 1,
            totalPages: null,
        };

        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount () {
        this.loadItems();
    }

    loadItems() {
        const {per, page, users} = this.state;
        let url = `/api/users?per=${per}&page=${page}`;
       fetch(url).then(res => res.json())
           .then((result) => {this.setState({
                   users: [...users, ...result]
               })
           }, (error) => {
               this.setState({
                   error
               });
           })
    }

    loadMore(){
        this.setState(prevState =>({
            page: prevState.page + 1,
        }),this.loadItems)
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
                                                    <Link to={'/dashboard/users/p/datatables/'}  className={'btn btn-primary btn-raised'}>
                                                        <i className="material-icons">info</i>
                                                        <b className="title_hover">Users Datatables</b>
                                                    </Link>
                                                    <Link to={'/dashboard/users/create/'}  className={'btn btn-success btn-raised'}>
                                                        <i className="material-icons">forum</i>
                                                        <b className="title_hover">New User</b>
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

                                            <div className="submit text-center">
                                                <button type={'button'}  onClick={this.loadMore}  className={'btn btn-success btn-warning'}>
                                                    <i className="material-icons">forum</i>
                                                    <b className="title_hover">Load More</b>
                                                </button>

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
