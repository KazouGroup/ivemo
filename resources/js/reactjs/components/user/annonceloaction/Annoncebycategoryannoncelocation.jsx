import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";


class Annoncebycategoryannoncelocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationbycategory: {annoncelocations:[]},
            cityannoncelocations:[],

        }
    }

    loadItem(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let url = route('api.annoncelocationbycategoryannoncelocations_site',[itemannoncetype,itemCategoryannoncelocation]);
        dyaxios.get(url).then(response => this.setState({annoncelocationbycategory: response.data,}));
        let url1 = route('api.annoncelocationbycategorycitycount_site',[itemCategoryannoncelocation]);
        dyaxios.get(url1).then(response => this.setState({cityannoncelocations: response.data,}));

    }

    // lifecycle method
    componentDidMount() {
        this.loadItem();
    }

    getcountcategoryannonceString (annoncelocations_count) {
        annoncelocations_count = annoncelocations_count +'';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count/1000).toFixed(annoncelocations_count % 1000 !== 0)+'k';
    }
    render() {
        const {annoncelocationbycategory,cityannoncelocations} = this.state;
        const allannoncelocationsbycategory = annoncelocationbycategory.annoncelocations;
        return (
            <>
                <Helmet>
                    <title>{`${annoncelocationbycategory.name || 'Ivemo'} - `} Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <br/>

                                        {allannoncelocationsbycategory.map((item) => (
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

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        <b>Locations {annoncelocationbycategory.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cityannoncelocations.map((item) => (
                                                                                <tr key={item.id}>
                                                                                    <td>
                                                                                        <NavLink to={`/annonces_locations/locations/${annoncelocationbycategory.slug}/${item.slug}/`}>
                                                                                            locations <b>{annoncelocationbycategory.name}</b> à <b>{item.name}</b>
                                                                                        </NavLink>
                                                                                    </td>
                                                                                    <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} annonces</td>
                                                                                </tr>
                                                                            ))}

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

export default Annoncebycategoryannoncelocation;
