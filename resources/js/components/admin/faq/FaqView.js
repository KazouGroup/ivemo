import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopNavAdmin from "../../inc/admin/TopNavAdmin";
import NavAdmin from "../../inc/admin/NavAdmin";
import FooterAdmin from "../../inc/admin/FooterAdmin";


export default class FaqView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faq: [],
        };
    }
    // get all the tasks from backend
    loadItems() {
        let faqSlug = this.props.match.params.slug;
        axios.get(`/api/faqs/v/${faqSlug}`).then(response =>
            this.setState({
                faq: response.data
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {faq} = this.state;
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
                                            <div className="submit">
                                                <div className="text-right">
                                                    <Link to={'/dashboard/faqs'} className="btn btn-primary btn-sm" id="button_hover">
                                                        <i className="material-icons">chevron_left</i>
                                                        <b className="title_hover">Back</b>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div id="accordion" role="tablist">
                                                <div className="card card-collapse">
                                                    <div className="card-header" role="tab" id="headingOne">
                                                        <h5 className="mb-0">
                                                            <a data-toggle="collapse" href="#collapseOne"
                                                               aria-expanded="true" aria-controls="collapseOne">
                                                                {faq.title}
                                                                <i className="material-icons">keyboard_arrow_down</i>
                                                            </a>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseOne" className="collapse show" role="tabpanel"
                                                         aria-labelledby="headingOne" data-parent="#accordion">
                                                        <div className="card-body text-justify" dangerouslySetInnerHTML={{__html: faq.body}}/>
                                                    </div>
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
            </div>
        );
    }
}
