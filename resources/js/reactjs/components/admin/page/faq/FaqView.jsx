import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import StatusAdmin from "../../../inc/admin/StatusAdmin";


export default class FaqView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            faq: {
                user:''
            },
        };
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    // get all the tasks from backend
    loadItems() {
        axios.get(`/account/user`).then(response => this.setState({user: response.data,}));
        let faqSlug = this.props.match.params.slug;
        axios.get(`/api/faqs/v/${faqSlug}`).then(response =>
            this.setState({
                faq: response.data
            }));

    }
    render() {
        const {faq,user} = this.state;
        return (
           <>

               <NavAdmin/>

               <div className="main-panel">

                   <TopNavAdmin/>

                   <div className="content">
                       <div className="container-fluid">
                           <b/>
                           <StatusAdmin key={user.id} {...user}/>
                           <b/>

                           <div className="row">
                               <div className="col-md-12">
                                   <div className="card">

                                       <div className="card-body">
                                           <div className="submit">
                                               <div className="text-right">
                                                   <Link to={'/dashboard/faqs/'} className="btn btn-primary btn-sm" id="button_hover">
                                                       <i className="material-icons">chevron_left</i>
                                                       <b className="title_hover">Back</b>
                                                   </Link>
                                                   <Link to={'/dashboard/faqs/create/'} className="btn btn-info btn-sm" id="button_hover">
                                                       <i className="material-icons">forum</i>
                                                       <b className="title_hover">New FAQS</b>
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
                                               <label className="form-check-label pull-right">
                                                   By:
                                                   <Link to={'/dashboard'} className="text-danger">
                                                       {faq.user.first_name}
                                                   </Link>
                                                   <span className="form-check-sign"/>
                                               </label>

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
        );
    }
}
