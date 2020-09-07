import React, { Component } from "react";
import moment from 'moment'
import AnnoncelocationInteresseList from "./inc/AnnoncelocationInteresseList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadAnnoncelocationsinteressesbyuser,unactiveItem,unfavoriteItem,favoriteItem,deleteItem} from "../../../../redux/actions/annoncelocation/annoncelocationActions";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresse extends Component {
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
        this.props.loadAnnoncelocationsinteressesbyuser(this.props);
    }

    componentDidMount() {
       this.loadItems();
    }

    render() {
        const { annoncelocationsinteresses } = this.props;
        const { visiable } = this.state;
        const mapAnnoncelocationsinteresses = annoncelocationsinteresses.length >= 0 ? (
            annoncelocationsinteresses.slice(0,visiable).map(item => {
                return(
                    <AnnoncelocationInteresseList key={item.id} {...item}
                                                  unactiveItem={this.props.unactiveItem}
                                                  unfavoriteItem={this.props.unfavoriteItem}
                                                  favoriteItem={this.props.favoriteItem}
                                                  deleteItem={this.props.deleteItem}/>
                                                  )})
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
AnnoncelocationInteresse.propTypes = {
    loadAnnoncelocationsinteressesbyuser: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncelocationsinteresses: store.annoncelocations.annoncelocations

});
export default connect(mapStoreToProps, {
    loadAnnoncelocationsinteressesbyuser,unactiveItem,unfavoriteItem,favoriteItem,deleteItem
})(AnnoncelocationInteresse);
