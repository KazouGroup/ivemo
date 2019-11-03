import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";
import FaqLists from "./FaqLists";

class FaqAdminSite extends Component {
    constructor () {
        super();
        this.state = {
            faqs: [],
        };
    }

    componentDidMount () {
        this.loadItems();
    }

    loadItems() {
        let url = `/api/faqs/v1`;
        axios.get(url).then(response =>
            this.setState({
                faqs: [...response.data],
            }),
        );
    }



    render() {
        const { faqs } = this.state;
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
                                                    <Link to={'/dashboard/faqs/'}  className={'btn btn-success btn-raised'}>
                                                        <i className="material-icons">forum</i>
                                                        <b className="title_hover">FAQS</b>
                                                    </Link>
                                                </div>
                                            </div>

                                                {faqs.map((item) => (
                                                    <FaqLists key={item.id} {...item}/>
                                                ))}

                                            <div className="submit text-center">

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
export default FaqAdminSite;
