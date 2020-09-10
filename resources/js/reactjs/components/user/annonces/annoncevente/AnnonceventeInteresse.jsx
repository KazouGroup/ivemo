import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button,Row } from "reactstrap";
import AnnonceventeInteresseList from "./inc/AnnonceventeInteresseList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,
    loadAnnonceventesinteressesbycity,
    unactiveItem, unfavoriteItem
} from "../../../../redux/actions/annoncevente/annonceventeActions";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceventeInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 4,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 4}
        })
    }

    loadItems(){
        this.props.loadAnnonceventesinteressesbycity(this.props);
    }
    componentDidMount() {
       this.loadItems();
    }

    render() {
        const { annonceventesinteresses } = this.props;
        const { visiable } = this.state;
        const mapAnnonceventesinteresses = annonceventesinteresses.length >= 0 ? (
            annonceventesinteresses.slice(0,visiable).map(item => {
                return(
                    <AnnonceventeInteresseList key={item.id} {...item}
                                               unactiveItem={this.props.unactiveItem}
                                               unfavoriteItem={this.props.unfavoriteItem}
                                               favoriteItem={this.props.favoriteItem}/>
                )
            })
        ) : (
            <AnnoncesinteresseSkeleton />
        );
        return (
            <>

                {annonceventesinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires en vente à {this.props.city.name}</h4>
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

AnnonceventeInteresse.propTypes = {
    loadAnnonceventesinteressesbycity: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annonceventesinteresses: store.annonceventes.annonceventes

});
export default connect(mapStoreToProps, {
    loadAnnonceventesinteressesbycity,unactiveItem,unfavoriteItem,favoriteItem
})(AnnonceventeInteresse);
