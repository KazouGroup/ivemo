import React, { Component,Fragment } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
const abbrev = ['', 'k', 'M', 'B', 'T'];



class NavPremiumUserTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams_count: [],
            teamsactive_count: [],
            teamsunactive_count: [],

        };
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.teams_premium_count',[itemuser])).then(response =>
            this.setState({teams_count: response.data}));

        dyaxios.get(route('api.teams_premiumactive_count',[itemuser])).then(response => {
            this.setState({teamsactive_count: response.data})});

        dyaxios.get(route('api.teams_premiumunactive_count',[itemuser])).then(response =>
            this.setState({teamsunactive_count: response.data}));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    data_countFormatter(teams_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teams_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teams_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataactive_countFormatter(teamsactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teamsactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teamsactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    dataunactive_countFormatter(teamsunactive_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(teamsunactive_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (teamsunactive_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {teams_count,teamsactive_count,teamsunactive_count} = this.state;
        return (

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card card-stats">
                        <div className="card-header card-header-primary card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">people_alt</i>
                            </div>
                            <p className="card-category"><b>Membres</b></p>
                            <h3 className="card-title"><b>{this.data_countFormatter(teams_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">people_alt</i>
                                Membres de votre équipe
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
                            <p className="card-category"><b>Actives</b></p>
                            <h3 className="card-title"><b>{this.dataactive_countFormatter(teamsactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">done</i>  Actives
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
                            <p className="card-category"><b>Desactivés</b></p>
                            <h3 className="card-title"><b>{this.dataunactive_countFormatter(teamsunactive_count)}</b></h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">remove</i> Désactivés
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default withRouter(NavPremiumUserTeams);
