import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button } from "reactstrap";
import { Remarkable } from "remarkable";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceventeInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonceventesinteresses: [],
            //
        }
    }


    componentDidMount() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncevente;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annonceventeinteresse_site', [itemannoncetype, itemCategoryannoncelocation, itemCityannonce])).then(response =>
            this.setState({
                annonceventesinteresses: [...response.data],
            }));
    }

    render() {
        const { annonceventesinteresses } = this.state;
        return (
            <>

                {annonceventesinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {annonceventesinteresses.map((item) => (

                        <AnnonceventeInteresseList key={item.id} {...item}/>

                    ))}

                </div>

            </>
        )
    }

}

export default AnnonceventeInteresse;
