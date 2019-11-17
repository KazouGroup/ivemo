import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopNavAdmin from "../../../inc/admin/TopNavAdmin";
import NavAdmin from "../../../inc/admin/NavAdmin";
import FooterAdmin from "../../../inc/admin/FooterAdmin";
import CommentCreate from "../../comment/CommentCreate";
import CommentList from "../../comment/CommentList";


export default class FaqView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            comments:[
                {id:1,body:'demmader une info',avatar:'je suis une imade'},
                {id:2,body:'comment une merde',avatar:'je suis une imade'},
                {id:3,body:'inmformaton une  ',avatar:'je suis une imade'}
            ],
            faq: {
                user:''
            },
        };



        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    // get all the tasks from backend
    loadItems() {

        let faqSlug = this.props.match.params.slug;
        axios.get(`/api/faqs/v/${faqSlug}`).then(response =>
            this.setState({
                faq: response.data
            }));
        axios.get(`/account/user`).then(response =>
            this.setState({
                user: response.data,
            }));
    }
    // Comment implementation init
    handleCommentSubmit(data){
        let faqSlug = this.props.match.params.id;
       const postData = {
           comment: data,
        };
        axios.post(`/dashboard/faqs/v/${faqSlug}/comments`,postData)
            .then((response) => {
            let comments = this.state.comments;

            comments.unshift({
                id: response.data.id,
                body: response.data.body
            });
            this.setState({comments:comments})
        });
    }
    renderComments(){
        const {comments} = this.state;
        return comments.map(comment => {
            const { id, body,avatar} = comment;
            return(
                <CommentList key={id} body={body} avatar={avatar}/>
            );
        })
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
                                                <label className="form-check-label pull-right">
                                                    By:
                                                    <Link to={'/dashboard'} className="text-danger">
                                                         {faq.user.first_name}
                                                    </Link>
                                                    <span className="form-check-sign"></span>
                                                </label>


                                                <div className="section section-comments">
                                                    <div className="row">
                                                        <div className="col-md-12 ml-auto mr-auto">
                                                            <div className="media-area">
                                                                <h3 className="title text-center">3 Comments</h3>
                                                                {this.renderComments()}
                                                            </div>
                                                            <h3 className="title text-center">Post your comment</h3>
                                                            <div className="media media-post">
                                                                <Link to={'/dashboard'} className="author float-left">
                                                                    <div className="avatar">
                                                                        <img className="media-object" alt={this.state.user.last_name}
                                                                             src={this.state.user.avatar} title={this.state.user.last_name} />
                                                                    </div>
                                                                </Link>
                                                                <CommentCreate handleCommentSubmit={this.handleCommentSubmit}/>
                                                            </div>
                                                        </div>
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
