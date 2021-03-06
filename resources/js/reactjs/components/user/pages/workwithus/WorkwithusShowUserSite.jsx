import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, FormText} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import NavUserSite from "../../../inc/user/NavUserSite";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import FooterUserSite from "../../../inc/user/FooterUserSite";
import ContactFromWorkwithusIndex from "../inc/ContactFromWorkwithusIndex";
import moment from "moment";
import HelmetSite from "../../../inc/user/HelmetSite";
import {loadItemshow} from "../../../../redux/actions/workwithuseActions";


class WorkwithusShowUserSite extends Component {

   // Lifecycle Component Method
    componentDidMount() {
        this.props.loadItemshow(this.props);
    }

    getDescription(workwithuse) {
        return { __html: workwithuse.description};
    }
    render() {
        const {workwithuse} = this.props;
        return (
            <>
                <HelmetSite title={`${workwithuse.title || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour</b>
                                            </button>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="card">
                                            <div className="card-body">

                                                {workwithuse.title && (
                                                    <>
                                                        <h5 className="card-title">
                                                            <b>{workwithuse.title}</b>
                                                        </h5>
                                                        <span className="card-title">
                                                            {workwithuse.categoryworkwithus.name} - <b>{workwithuse.city.name}</b> - <i className="now-ui-icons tech_watch-time"/> {moment(workwithuse.created_at).format('ll')} {!$guest &&(<>{$userIvemoIsadmin.status_user &&(<>- <i className="far fa-eye"></i> {workwithuse.visits_count}</>)}</>)}
                                                        </span>
                                                    </>
                                                )}

                                                {workwithuse.description ? <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(workwithuse)} />: <Skeleton count={5}/>}
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envoyez vos contacts et CV</b>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                            <ContactFromWorkwithusIndex {...this.props} />

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

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <b>Envoyez vos contacts et CV</b>
                                                                </div>
                                                            </div>

                                                            <ContactFromWorkwithusIndex {...this.props} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>



                        </div>




                        <FooterUserSite />
                    </div>
                </div>
            </>



        )
    }
}

WorkwithusShowUserSite.propTypes = {
    loadItemshow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    workwithuse: state.workwithuses.item

});

export default connect(mapStateToProps, {loadItemshow})(WorkwithusShowUserSite);
