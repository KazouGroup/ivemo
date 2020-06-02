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

    data_countFormatter(blogannoncelocations_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(blogannoncelocationsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncelocationsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(blogannoncelocationsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(blogannoncelocationsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (blogannoncelocationsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {blogannoncelocations_count,blogannoncelocationsactive_count,blogannoncelocationsunactive_count} = this.state;
        return (

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card card-stats">
                        <div className="card-header card-header-primary card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">view_headline</i>
                            </div>
                            <p className="card-category"><b>Articles</b></p>
                            <h3 className="card-title"><b>{this.data_countFormatter(blogannoncelocations_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">view_headline</i> Articles sur les
                                annonces locations
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
                            <h3 className="card-title"><b>{this.dataactive_countFormatter(blogannoncelocationsactive_count)}</b></h3>
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
                            <p className="card-category"><b>Déactivés</b></p>
                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(blogannoncelocationsunactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">remove</i> Articles déactivés
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default withRouter(NavPremiumUserBlogannonceLocation);
