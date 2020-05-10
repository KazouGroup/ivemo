import React, { Component } from "react";
import moment from 'moment'
import AnnonceventeInteresse from "../../annonces/annoncevente/AnnonceventeInteresse";
import AnnonceventeInteresseList from "../../annonces/annoncevente/inc/AnnonceventeInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationVenteforBlog extends Component {
    constructor(props) {
        super(props);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.state = {
            annonceventesinteresses: [],
            visiable: 4,
            //
        }
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 6}
        })
    }

    componentDidMount() {
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        dyaxios.get(route('api.annonceventeinteressebycategory_site', [ itemCategoryannoncevente])).then(response =>
            this.setState({
                annonceventesinteresses: [...response.data],
            }));
    }

    render() {
        const { annonceventesinteresses,visiable } = this.state;
        return (
            <>

                {annonceventesinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Ces annonces peuvent vous interesser </h4>
                    </div>
                )}

                <div className="row">

                    {annonceventesinteresses.slice(0,visiable).map((item) => (
                       <AnnonceventeInteresseList key={item.id} {...item}/>
                    ))}

                </div>

                {visiable < annonceventesinteresses.length && (
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
                                <b>Voir plus d'annonces </b>
                            </button>
                        </div>
                    </div>
                )}

            </>
        )
    }

}

export default AnnoncelocationVenteforBlog;
