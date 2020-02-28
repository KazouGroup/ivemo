import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button } from "reactstrap";
import { Remarkable } from "remarkable";
import AnnoncelocationInteresseList from "./inc/AnnoncelocationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationsinteresses: [],
            visiable: 2,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 4}
        })
    }

    componentDidMount() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annoncelocationinteresse_site', [itemannoncetype, itemCategoryannoncelocation, itemCityannonce])).then(response =>
            this.setState({
                annoncelocationsinteresses: [...response.data],
            }));
    }

    render() {
        const { annoncelocationsinteresses,visiable } = this.state;
        return (
            <>

                {annoncelocationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {annoncelocationsinteresses.slice(0,visiable).map((item) => (

                        <AnnoncelocationInteresseList key={item.id} {...item}/>

                    ))}

                </div>

                {visiable < annoncelocationsinteresses.length && (
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                <b>Voir plus d'annonces</b>
                            </button>
                        </div>
                    </div>
                )}

            </>
        )
    }

}

export default AnnoncelocationInteresse;
