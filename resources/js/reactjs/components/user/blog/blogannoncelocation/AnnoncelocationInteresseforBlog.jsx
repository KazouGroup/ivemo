import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button } from "reactstrap";
import { Remarkable } from "remarkable";
import AnnoncelocationInteresseList from "../../annonces/annonceloaction/inc/AnnoncelocationInteresseList";
import AnnoncereservationInteresseList from "../../annonces/annoncereservation/inc/AnnoncereservationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresseforBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationsinteresses: [],
            //
        }
    }


    componentDidMount() {
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.annoncelocationinteresse_site', [ itemCategoryannoncelocation])).then(response =>
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
                        <h4 className="title">Ces annonces peuvent vous interesser </h4>
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

export default AnnoncelocationInteresseforBlog;
