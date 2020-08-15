import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormText, Input, UncontrolledTooltip} from "reactstrap";
import moment from "moment";
import Swal from "sweetalert2";



class PrivateUserForumList extends Component {


    getDescription() {
        return { __html: (this.props.favoriteable.description.length > 150 ? this.props.favoriteable.description.substring(0, 150) + "..." : this.props.favoriteable.description) };
    }
    render() {
        return (

            <>
                <div className="card">
                    <div className="card-body">

                        <div className="card-header d-flex align-items-center">
                            <div className="d-flex align-items-center">

                                {this.props.favoriteable.user.avatar === null ?
                                    <img className="avatar" alt={this.props.favoriteable.user.first_name}
                                         style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                         src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                    :
                                    <img className="avatar"
                                         style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                         alt={this.props.favoriteable.user.first_name}
                                         src={this.props.favoriteable.user.avatar}/>
                                }
                                <div className="mx-3">
                                    <NavLink to={this.props.favoriteable.user.status_profile ? `/pro/${this.props.favoriteable.user.slug}/` : `/user/${this.props.favoriteable.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{this.props.favoriteable.user.first_name}</b>
                                        <small className="d-block text-muted"> <i className="now-ui-icons tech_watch-time"/> {moment(this.props.favoriteable.created_at).format('LL')}</small>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="text-right ml-auto">
                            <span className="card-title">
                                <Link to={`/forums/${this.props.favoriteable.categoryforum.slug}/`}><b>{this.props.favoriteable.categoryforum.name}</b></Link> - <Link to={`/employments/`}> </Link> <i className="now-ui-icons tech_watch-time"/> {moment(this.props.favoriteable.created_at).fromNow()}
                            </span>
                            </div>
                        </div>

                        <>
                            <h5 className="card-title">
                               <a target="_blank" href={`/forums/${this.props.favoriteable.categoryforum.slug}/${this.props.favoriteable.user.slug}/${this.props.favoriteable.slugin}/`} >
                                   <b>{this.props.title}</b>
                               </a>
                            </h5>

                        </>


                        <a target="_blank" href={`/forums/${this.props.favoriteable.categoryforum.slug}/${this.props.favoriteable.user.slug}/${this.props.favoriteable.slugin}/`}>
                         <span className="text-justify" dangerouslySetInnerHTML={this.getDescription()}/>
                        </a>

                        <div className="card-header d-flex align-items-center">
                            <div className="d-flex align-items-center">

                                <>
                                    <Button onClick={() => this.props.unfavoriteforumItem(this.props)}
                                            className="btn btn-info btn-icon btn-sm btn-neutral" title="Suprimer la Sauvegarde">
                                        <i className="fas fa-bookmark"></i>
                                    </Button>
                                </>

                            </div>

                        </div>



                    </div>
                </div>
            </>



        )
    }
}

export default PrivateUserForumList;
