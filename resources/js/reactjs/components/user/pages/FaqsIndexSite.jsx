import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import {Helmet} from "react-helmet";
import ContactFromFaqAndOderPageIndex from "./inc/ContactFromFaqAndOderPageIndex";
import FaqUserList from "./inc/FaqUserList";


class FaqsIndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqs:[],
        };
    }

    // lifecycle method
    componentDidMount() {
        fetch(route('api.sites_faqs')).then(res => res.json()).then((result) => {
            this.setState({
                faqs: [...result]
            });
        });
    }

    render() {
        const {faqs} = this.state;
        return (
            <Fragment>

                <Helmet title={`Questions fréquentes posées aux particuliers (FAQ) - Ivemo`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg40.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h2 className="title">Assistence</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main main-raised">

                            <div className="container">

                                <div className="row">
                                    <div className="col-md-10 mx-auto">
                                        <h3 className="text-center title">Questions fréquentes posées aux particuliers</h3>
                                        <h5 className="text-center description">Dans cette rubrique, vous trouverez une réponse aux doutes les plus fréquents de nos utilisateurs.</h5>

                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                            {faqs.map((item) => (
                                                <FaqUserList key={item.id} {...item} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <ContactFromFaqAndOderPageIndex/>

                        </div>



                        <FooterBigUserSite />
                    </div>
                </div>

            </Fragment>

        )
    }
}

export default FaqsIndexSite;
