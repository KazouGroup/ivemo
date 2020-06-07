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

    data_countFormatter(blogannonceventes_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventes_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventes_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(blogannonceventesactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(blogannonceventesunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannonceventesunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (blogannonceventesunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {blogannonceventes_count,blogannonceventesactive_count,blogannonceventesunactive_count} = this.state;
        return (

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card card-stats">
                        <div className="card-header card-header-primary card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">view_headline</i>
                            </div>
                            <p className="card-category"><b>Articles</b></p>
                            <h3 className="card-title"><b>{this.data_countFormatter(blogannonceventes_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">view_headline</i> Articles sur les
                                annonces ventes
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card card-stats">
                        <div className="card-header card-header-success card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">done</i>
                            </div>
                            <p className="card-category"><b>Activés</b></p>
                            <h3 className="card-title"><b>{this.dataactive_countFormatter(blogannonceventesactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">done</i> Articles activés
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card card-stats">
                        <div className="card-header card-header-danger card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">remove</i>
                            </div>
                            <p className="card-category"><b>Désactivés</b></p>
                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(blogannonceventesunactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">remove</i> Articles désactivés
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default withRouter(NavPremiumUserBlogannonceVente);
