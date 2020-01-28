import React, {Component} from "react";
import NavAdmin from "../../inc/admin/NavAdmin";
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import StatusAdmin from "../../inc/admin/StatusAdmin";
import {Link} from "react-router-dom";
import FooterAdmin from "../../inc/admin/FooterAdmin";


class ContactShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: [],
            contact: {},
        }
    }

    // get all the tasks from backend
    loadItems() {
        let itemSlug = this.props.match.params.slug;
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        let url = route('contacts.show',itemSlug);
        axios.get(url).then(response => this.setState({contact: response.data,}));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {user,contact} = this.state;
        const composantTitle = `${contact.subject}`;
        document.title = `${composantTitle}`;
        return(
            <>
                <NavAdmin/>
                <div className={'main-panel'}>
                    <TopNavAdmin/>
                    <div className={'content'}>
                        <div className="container-fluid">
                            <b/>
                            <StatusAdmin key={user.id} {...user}/>
                            <b/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12 expo">
                                                <div className="card">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterAdmin/>
                </div>
            </>
        )
    }

}
export default ContactShow;
