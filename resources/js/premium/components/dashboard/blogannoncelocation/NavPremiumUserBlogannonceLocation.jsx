import React, { Component,Fragment } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
const abbrev = ['', 'k', 'M', 'B', 'T'];



class NavPremiumUserBlogannonceLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations_count: [],
            blogannoncelocationsactive_count: [],
            blogannoncelocationsunactive_count: [],

        };
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.blogannoncelocations_premium_count',[itemuser])).then(response =>
            this.setState({blogannoncelocations_count: response.data}));

        dyaxios.get(route('api.blogannoncelocations_premiumactive_count',[itemuser])).then(response => {
            this.setState({blogannoncelocationsactive_count: response.data})});

        dyaxios.get(route('api.blogannoncelocations_premiumunactive_count',[itemuser])).then(response =>
            this.setState({blogannoncelocationsunactive_count: response.data}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    blogannonceventes_countFormatter(blogannoncelocations_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannonceventesactive_countFormatter(blogannoncelocationsactive_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannoncelocationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    blogannonceventesunactive_countFormatter(blogannoncelocationsunactive_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannoncelocationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {blogannoncelocations_count,blogannoncelocationsactive_count,blogannoncelocationsunactive_count} = this.state;
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
                                            <h3 className="info-title">{this.blogannonceventes_countFormatter(blogannoncelocations_count)}</h3>
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
                                            <h3 className="info-title">{this.blogannonceventesactive_countFormatter(blogannoncelocationsactive_count)}</h3>
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
                                            <h3 className="info-title">{this.blogannonceventesunactive_countFormatter(blogannoncelocationsunactive_count)}</h3>
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

export default withRouter(NavPremiumUserBlogannonceLocation);
