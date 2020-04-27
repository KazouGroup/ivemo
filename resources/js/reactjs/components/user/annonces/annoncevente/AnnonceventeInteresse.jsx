import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button,Row } from "reactstrap";
import AnnonceventeInteresseList from "./inc/AnnonceventeInteresseList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceventeInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonceventesinteresses: [],
            isLoading: false,
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
        this.setState({ isLoading: true });
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annonceventeinteresse_site', [itemannoncetype, itemCategoryannoncevente, itemCityannonce])).then(response =>
            this.setState({
                annonceventesinteresses: [...response.data],
                isLoading: false,
            }));
    }

    render() {
        const { annonceventesinteresses,visiable,isLoading } = this.state;
        const mapAnnonceventesinteresses = isLoading ? (
            <AnnoncesinteresseSkeleton/>
        ):(
            annonceventesinteresses.slice(0,visiable).map(item => {
                return(
                    <AnnonceventeInteresseList key={item.id} {...item}/>
                )
            })
        );
        return (
            <>

                {annonceventesinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <Row>

                    {mapAnnonceventesinteresses}

                </Row>

                {visiable < annonceventesinteresses.length && (
                    <Row>
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                <b>Voir plus d'annonces</b>
                            </button>
                        </div>
                    </Row>
                )}

            </>
        )
    }

}

export default AnnonceventeInteresse;