import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../configurations/inc/NavlinkconfigurationUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import PrivateUserEmployementList from "../../../employment/inc/PrivateUserEmployementList";
import EmploymentListSkeleton from "../../../../inc/user/employment/EmploymentListSkeleton";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem, followerItem,
    loademploymentbyuserprivate,
    loadProfileusersforprivate,
    subscribeItem,unsubscribeItem,
    activeItem,unactiveprivateItem,
    unfavoriteItem, unfollowerItem,

} from "../../../../../redux/actions/employment/employmentActions";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class PrivateUserEmployments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,

        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
        })
    }

    loadItems(){
        this.props.loademploymentbyuserprivate(this.props);
        this.props.loadProfileusersforprivate(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {employments,userPrivate} = this.props;
        const {visiable} = this.state;
        const mapEmployments = employments.length >= 0 ? (
            employments.slice(0,visiable).map(item => {
                return(
                    <PrivateUserEmployementList key={item.id} {...item}
                                                deleteItem={this.props.deleteItem}
                                                unactiveprivateItem={this.props.unactiveprivateItem}
                                                activeItem={this.props.activeItem}/>
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <Helmet>
                    <title>Emplois, Formation & Services {`${$userIvemo.first_name || 'Profile'}`} - {$name_site}</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewemployment/>

                                        <NavlinkconfigurationUser {...this.props} {...userPrivate} />

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navemploymentsbyuser/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}


                                        {/*
                                          <div className="row">
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-warning icon-circle">
                                                        <i className="now-ui-icons business_briefcase-24"></i>                                                    </div>
                                                    <h4 className="info-title"><b>{this.data_countFormatter(employments_count)}</b></h4>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-success icon-circle">
                                                        <i className="now-ui-icons ui-1_check"></i>
                                                    </div>
                                                    <h4 className="info-title"><b>{this.dataactive_countFormatter(employmentsactive_count)}</b></h4>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="info info-hover">
                                                    <div className="icon icon-primary icon-circle">
                                                        <i className="now-ui-icons ui-1_simple-delete"></i>
                                                    </div>
                                                    <h4 className="info-title"><b>{this.dataunactive_countFormatter(employmentsunactive_count)}</b></h4>
                                                </div>
                                            </div>
                                        </div>
                                        */}

                                        {mapEmployments}

                                        {visiable < employments.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </div>


                                </div>


                            </div>

                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>

        )
    }
}

PrivateUserEmployments.propTypes = {
    loademploymentbyuserprivate: PropTypes.func.isRequired,
    loadProfileusersforprivate: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    employments: store.employments.items,
    userPrivate: store.profile.profiluser,

});

export default connect(mapStoreToProps,
    {
        loademploymentbyuserprivate,
        loadProfileusersforprivate,
        favoriteItem,unfavoriteItem,
        unsubscribeItem,subscribeItem,
        unfollowerItem,followerItem,
        unactiveprivateItem,activeItem,
        deleteItem,
    }
)(PrivateUserEmployments);
