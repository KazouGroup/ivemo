import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";
import AnnonceslocationList from "./inc/AnnonceslocationList";


class AnnoncelocationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationbytype: {annoncelocations:[]},
        }
    }

    loadItems(){
        let itemAnnoncelocation = this.props.match.params.annoncetype;
        let url = route('api.annoncelocationbyannoncetype_site', itemAnnoncelocation);
        dyaxios.get(url).then(response => this.setState({annoncelocationbytype: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {annoncelocationbytype} = this.state;
        const allannoncelocations = annoncelocationbytype.annoncelocations;
        return (
            <>
                <Helmet>
                    <title>Bon plan de location de chambre, studio un appartement, maison ou une villa - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">Touver une maison ou chambre a louer </h3>
                                    </div>
                                </div>
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

                                        {allannoncelocations.map((item) => (
                                        <AnnonceslocationList key={item.id} {...item} />
                                        ))}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Categoriesannoncereselocation/>

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

export default AnnoncelocationIndex;
