import React, { Component } from "react";
import moment from 'moment'
import AnnoncelocationInteresseList from "./inc/AnnoncelocationInteresseList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";
import AnnonceventeInteresseList from "../annoncevente/inc/AnnonceventeInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationsinteresses: {annoncetype: [], categoryannoncelocation: [], city: [], user: []},
            visiable: 2,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 4}
        })
    }

    favoriteItem(item) {
        const url = route('favoriteannoncelocations_favorite.favorite', [item.id]);
        dyaxios.get(url).then(() => {

            if(item.bookmarked){
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
            }else {
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
            }
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annoncelocationinteresse_by_city_site', [itemannoncetype, itemCategoryannoncelocation, itemCityannonce])).then(response =>
            this.setState({
                annoncelocationsinteresses: [...response.data],
            }));
    }

    componentDidMount() {
       this.loadItems();
    }

    render() {
        const { annoncelocationsinteresses,visiable } = this.state;
        const mapAnnoncelocationsinteresses = annoncelocationsinteresses.length >= 0 ? (
            annoncelocationsinteresses.slice(0,visiable).map(item => {
                return(
                    <AnnoncelocationInteresseList key={item.id} {...item} favoriteItem={this.favoriteItem}/>                )
            })
        ):(
            <AnnoncesinteresseSkeleton/>
        );
        return (
            <>

                {annoncelocationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {mapAnnoncelocationsinteresses}

                </div>

                {visiable < annoncelocationsinteresses.length && (
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
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
