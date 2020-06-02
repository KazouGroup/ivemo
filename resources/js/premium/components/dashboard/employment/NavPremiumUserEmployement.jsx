import React, { Component,Fragment } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
const abbrev = ['', 'k', 'M', 'B', 'T'];



class NavPremiumUserEmployement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employments_count: [],
            employmentsactive_count: [],
            employmentsunactive_count: [],

        };
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.employments_premium_count',[itemuser])).then(response =>
            this.setState({employments_count: response.data}));

        dyaxios.get(route('api.employments_premiumactive_count',[itemuser])).then(response => {
            this.setState({employmentsactive_count: response.data})});

        dyaxios.get(route('api.employments_premiumunactive_count',[itemuser])).then(response =>
            this.setState({employmentsunactive_count: response.data}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }


    data_countFormatter(employments_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(employmentsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employmentsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(employmentsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(employmentsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (employmentsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {employments_count,employmentsactive_count,employmentsunactive_count} = this.state;
        return (

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card card-stats">
                        <div className="card-header card-header-primary card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">dialpad</i>
                            </div>
                            <p className="card-category"><b>Annonces</b></p>
                            <h3 className="card-title"><b>{this.data_countFormatter(employments_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">dialpad</i> Offres d'emploi, services et formations
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
                            <p className="card-category"><b>Activées</b></p>
                            <h3 className="card-title"><b>{this.dataactive_countFormatter(employmentsactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">done</i> Annonces activées
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
                            <p className="card-category"><b>Déactivées</b></p>
                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(employmentsunactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">remove</i> Annonces déactivées
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default withRouter(NavPremiumUserEmployement);
