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
            //
        }
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
        const { annoncelocationsinteresses } = this.state;
        return (
            <>

                {annoncelocationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {annoncelocationsinteresses.map((item) => (

                        <AnnoncelocationInteresseList key={item.id} {...item}/>

                    ))}

                </div>

            </>
        )
    }

}

export default AnnoncelocationInteresse;
