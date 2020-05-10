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

    // lifecycle method
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
                                            <h3 className="info-title">{this.data_countFormatter(teams_count)}</h3>
                                            <h6 className="stats-title">Membres</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats">
                                <i className="now-ui-icons text_align-center"></i> Membres créer
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
                                            <h3 className="info-title">{this.dataactive_countFormatter(teamsactive_count)}</h3>
                                            <h6 className="stats-title">Actives</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats">
                                <i className="now-ui-icons ui-1_check"/> Membres actives
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
                                            <h3 className="info-title">{this.dataunactive_countFormatter(teamsunactive_count)}</h3>
                                            <h6 className="stats-title">Desactivés</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-footer ">
                            <div className="stats">
                                <i className="now-ui-icons ui-1_simple-delete"/> Membres désactivés
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(NavPremiumUserTeams);
