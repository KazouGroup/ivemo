import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import NavlinkmailmessageUser from "./NavlinkmailmessageUser";


class NavlinkmailmessageUserShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersprofile:[],
        };

    }

    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api_user_profile_account.site', [itemuser])).then(response => this.setState({ usersprofile: response.data, }));
    }
   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();

    }

    render() {
        const {usersprofile} = this.state;
        return (

            <NavlinkmailmessageUser {...this.props} {...usersprofile}/>


        )
    }
}
export default withRouter(NavlinkmailmessageUserShow);
