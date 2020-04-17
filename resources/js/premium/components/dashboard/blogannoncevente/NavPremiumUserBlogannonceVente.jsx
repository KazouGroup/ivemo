import React, { Component,Fragment } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
const abbrev = ['', 'k', 'M', 'B', 'T'];



class NavPremiumUserBlogannonceVente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannonceventes_count: [],
            blogannonceventesactive_count: [],
            blogannonceventesunactive_count: [],

        };
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.blogannonceventes_premium_count',[itemuser])).then(response =>
            this.setState({blogannonceventes_count: response.data}));

        dyaxios.get(route('api.blogannonceventes_premiumactive_count',[itemuser])).then(response => {
            this.setState({blogannonceventesactive_count: response.data})});

        dyaxios.get(route('api.blogannonceventes_premiumunactive_count',[itemuser])).then(response =>
            this.setState({blogannonceventesunactive_count: response.data}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    blogannonces_countFormatter(blogannonceventes_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannoncesactive_countFormatter(blogannonceventesactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannoncesunactive_countFormatter(blogannonceventesunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {blogannonceventes_count,blogannonceventesactive_count,blogannonceventesunactive_count} = this.state;
        return (

            <div className="row">
                <div className="col-lg-4 mx-auto">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="statistics statistics-horizontal">
                                <div className="info info-horizontal">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="icon icon-primary icon-circle">
                                                <i className="now-ui-icons text_align-center"></i>
                                            </div>
                                        </div>
                                        <div className="col-7 text-right">
                                            <h3 className="info-title">{this.blogannonces_countFormatter(blogannonceventes_count)}</h3>
                                            <h6 className="stats-title">Articles</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats">
                                <i className="now-ui-icons text_align-center"></i> Articles sur les annonces locations
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 mx-auto">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="statistics statistics-horizontal">
                                <div className="info info-horizontal">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="icon icon-success icon-circle">
                                                <i className="now-ui-icons ui-1_check"></i>
                                            </div>
                                        </div>
                                        <div className="col-7 text-right">
                                            <h3 className="info-title">{this.blogannoncesactive_countFormatter(blogannonceventesactive_count)}</h3>
                                            <h6 className="stats-title">Actives</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats">
                                <i className="now-ui-icons ui-1_check"/> Articles actives
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 mx-auto">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="statistics statistics-horizontal">
                                <div className="info info-horizontal">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="icon icon-danger icon-circle">
                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                            </div>
                                        </div>
                                        <div className="col-7 text-right">
                                            <h3 className="info-title">{this.blogannoncesunactive_countFormatter(blogannonceventesunactive_count)}</h3>
                                            <h6 className="stats-title">Desactivés</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats">
                                <i className="now-ui-icons ui-1_simple-delete"/> Articles désactivés
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(NavPremiumUserBlogannonceVente);
