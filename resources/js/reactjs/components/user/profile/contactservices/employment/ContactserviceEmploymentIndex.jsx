import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import HelmetSite from "../../../../inc/user/HelmetSite";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import EmploymentListSkeleton from "../../../../inc/user/employment/EmploymentListSkeleton";
import PrivateUserEmployementList from "../../../employment/inc/PrivateUserEmployementList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadContactserviceemployments,
    activeItem,unactiveprivateItem,
    deleteItem
} from "../../../../../redux/actions/employment/employmentActions";


class ContactserviceEmploymentIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
        })
    }

    loadItems(){
        this.props.loadContactserviceemployments(this.props);
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {
        const {employments} = this.props;
        const {visiable} = this.state;
        const mapEmployments = employments.length >= 0 ? (
            employments.slice(0, visiable).map(item => {
                return(

                    <PrivateUserEmployementList key={item.id} {...item} deleteItem={this.props.deleteItem} unactiveprivateItem={this.props.unactiveprivateItem} activeItem={this.props.activeItem} />
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Contacts of ${$userIvemo.first_name} on employments & services - ${$name_site}`}/>

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

                                        <div className="submit text-left">
                                            <Link to={`/profile/${$userIvemo.slug}/statistics/employments/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos annonces</b>
                                            </Link>
                                        </div>



                                        {mapEmployments}


                                        <div className="text-center">
                                            {visiable < employments.length && (
                                                <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                    <b>Voir plus </b>
                                                </button>
                                            )}
                                        </div>

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
ContactserviceEmploymentIndex.propTypes = {
    loadContactserviceemployments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    employments: state.employments.items

});

export default connect(mapStateToProps, {
    loadContactserviceemployments,
    activeItem,unactiveprivateItem,
    deleteItem,
})(ContactserviceEmploymentIndex);
