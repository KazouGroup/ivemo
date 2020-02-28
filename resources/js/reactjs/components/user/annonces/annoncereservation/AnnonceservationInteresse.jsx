import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button} from "reactstrap";
import {Remarkable} from "remarkable";
import AnnoncereservationInteresseList from "./inc/AnnoncereservationInteresseList";
import AnnoncereservationList from "./inc/AnnoncereservationList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceservationInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationsinteresse:[],
            //
        }
    }


    componentDidMount() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annoncereservationintersse_site',[itemannoncetype,itemCategoryannoncereservation,itemCityannonce])).then(response =>
            this.setState({
                annoncereservationsinteresse: [...response.data],
            }));
    }

    render() {
        const {annoncereservationsinteresse} = this.state;
        return (
            <>

                {annoncereservationsinteresse.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {annoncereservationsinteresse.map((item) => (

                        <AnnoncereservationInteresseList key={item.id} {...item}/>
                    ))}

                </div>

            </>
        )
    }

}

export default AnnonceservationInteresse;
