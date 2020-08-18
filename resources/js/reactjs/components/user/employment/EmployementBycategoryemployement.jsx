import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import {Button, Form,Alert,Input} from "reactstrap";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import Navemployements from "./inc/Navemployements";
import NavannoncecategorySkeleton from "../../inc/user/NavannoncecategorySkeleton";
import EmploymentListSkeleton from "../../inc/user/employment/EmploymentListSkeleton";
import Navlinknewemployment from "./treatement/Navlinknewemployment";
import EmployementList from "./inc/EmployementList";
import HelmetSite from "../../inc/user/HelmetSite";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem,
    loademploymentsbycategory,
    loademploymentscategorycount,
    loademploymentbycategorybycount,
    unactiveItem,
    unfavoriteItem
} from "../../../redux/actions/employment/employmentActions";
require("moment/min/locales.min");
moment.locale('fr');

class EmployementBycategoryemployement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities:{user:[]},
            visiable: 20,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
        })
    }

    componentDidMount() {

        this.props.loademploymentsbycategory(this.props);
        this.props.loademploymentscategorycount(this.props);
        this.props.loademploymentbycategorybycount(this.props);
    }

    getdataString(employments_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {employments,categoryemployment,cities} = this.props;
        const {visiable} = this.state;
        const mapEmployments = employments.length >= 0 ? (
            employments.slice(0, visiable).map(item => {
                return(

                    <EmployementList key={item.id} {...item}
                                     favoriteItem={this.props.favoriteItem}
                                     unfavoriteItem={this.props.unfavoriteItem}
                                     deleteItem={this.props.deleteItem}
                                     unactiveItem={this.props.unactiveItem} />
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`${categoryemployment.name || 'Annonce'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400" >
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url("  + categoryemployment.photo + ")" }}>
                            </div>
                            <div className="content-center">
                                {categoryemployment.name && (
                                    <>
                                        <h2 className="title">{categoryemployment.name || ""}</h2>

                                        <Link to={`/employments/`} className="text-white">
                                            <i className="fa fa-chevron-circle-left" /> <b>Retour aux annonces</b>
                                        </Link>

                                        <h5><b>{categoryemployment.employments_count}</b> {categoryemployment.employments_count > 1 ? "annonces" : "annonce"} posté</h5>

                                    </>
                                )}
                            </div>
                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">

                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">


                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <Link to={`/employments/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour aux annonces</b>
                                            </Link>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapEmployments}

                                        <div className="text-center">
                                            {visiable < employments.length ?
                                                <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-lg btn-block">
                                                    <b>Voir plus d'annonce</b>
                                                </button>
                                                : null}
                                        </div>

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewemployment/>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingTwo">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                        <b>{categoryemployment.name || "Villes"} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseTwo" className="collapse show" role="tabpanel" aria-labelledby="headingTwo">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cities.length >= 0 ?
                                                                                <>
                                                                                    {cities.map((item) => (
                                                                                        <tr key={item.id}>
                                                                                            <td>
                                                                                                <NavLink to={`/employments/${categoryemployment.slug}/${item.slug}/`}>
                                                                                                    <b style={{ textTransform: "lowercase" }}>{categoryemployment.name}</b> à <b>{item.name}</b>
                                                                                                </NavLink>
                                                                                            </td>
                                                                                            <td className="text-right"> {this.getdataString(item.employments_count)}  {item.employments_count > 1 ? "annonces" : "annonce"}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </>
                                                                                :
                                                                                <NavannoncecategorySkeleton/>}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navemployements/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

EmployementBycategoryemployement.propTypes = {
    loademploymentsbycategory: PropTypes.func.isRequired,
    loademploymentscategorycount: PropTypes.func.isRequired,
    loademploymentbycategorybycount: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    employments: store.employments.items,
    categoryemployment: store.employments.catgoryitem,
    cities: store.employments.cityemployments,

});

export default connect(mapStoreToProps,
    {
        loademploymentsbycategory,
        loademploymentscategorycount,
        loademploymentbycategorybycount,
        favoriteItem,unfavoriteItem,
        deleteItem,unactiveItem,
    }
)(EmployementBycategoryemployement);
