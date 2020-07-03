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
            annonceventesinteresses: { annoncetype: [], categoryannoncevente: [], city: [], user: [] },
            visiable: 2,
        };
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
    }

    favoriteItem(item) {
        const url = route('favoriteannonceventes_favorite.favorite', [item.id]);
        dyaxios.get(url).then(() => {

            if(item.bookmarked){
                $.notify({
                        message: "Annonce retirée de vos favoris",
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });
            }else {
                $.notify({
                        message: "Annonce ajoutée à vos favoris",
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });
            }
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 4}
        })
    }

    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annonceventeinteresse_site', [itemannoncetype, itemCategoryannoncevente, itemCityannonce])).then(response =>
            this.setState({
                annonceventesinteresses: [...response.data],
            }));
    }
    componentDidMount() {
       this.loadItems();
    }

    render() {
        const { annonceventesinteresses,visiable } = this.state;
        const mapAnnonceventesinteresses = annonceventesinteresses.length >= 0 ? (
            annonceventesinteresses.slice(0,visiable).map(item => {
                return(
                    <AnnonceventeInteresseList key={item.id} {...item} favoriteItem={this.favoriteItem}/>
                )
            })
        ) : (
            <AnnoncesinteresseSkeleton />
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
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
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
