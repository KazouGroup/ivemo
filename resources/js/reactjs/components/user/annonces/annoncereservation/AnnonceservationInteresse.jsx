import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button, Row} from "reactstrap";
import {Remarkable} from "remarkable";
import AnnoncereservationInteresseList from "./inc/AnnoncereservationInteresseList";
import AnnoncereservationList from "./inc/AnnoncereservationList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceservationInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationsinteresse:[],
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
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annoncereservationintersse_site',[itemannoncetype,itemCategoryannoncereservation,itemCityannonce])).then(response =>
            this.setState({
                annoncereservationsinteresse: [...response.data],
            }));
    }

    render() {
        const {annoncereservationsinteresse,visiable} = this.state;
        return (
            <>

                {annoncereservationsinteresse.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <Row>

                    {annoncereservationsinteresse.length ?
                        <>
                            {annoncereservationsinteresse.slice(0,visiable).map((item) => (

                                <AnnoncereservationInteresseList key={item.id} {...item}/>
                            ))}
                        </>:  <AnnoncesinteresseSkeleton/>}


                </Row>

                {visiable < annoncereservationsinteresse.length && (
                    <Row>
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
                                <b>Afficher plus d'annonces</b>
                            </button>
                        </div>
                    </Row>
                )}

            </>
        )
    }

}

export default AnnonceservationInteresse;
