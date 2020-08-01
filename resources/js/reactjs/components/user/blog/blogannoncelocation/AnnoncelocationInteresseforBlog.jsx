import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import AnnoncelocationInteresseList from "../../annonces/annonceloaction/inc/AnnoncelocationInteresseList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,
    loadAnnoncelocationsinteressesbycategories,
    unfavoriteItem
} from "../../../../redux/actions/annoncelocation/annoncelocationActions";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresseforBlog extends Component {
    constructor(props) {
        super(props);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.state = {
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
        this.props.loadAnnoncelocationsinteressesbycategories(this.props);
    }

    render() {
        const { annoncelocationsinteresses } = this.props;
        const { visiable } = this.state;
        const mapAnnoncelocationsinteresses = annoncelocationsinteresses.length >= 0 ? (
            annoncelocationsinteresses.slice(0,visiable).map(item => {
                return(
                    <AnnoncelocationInteresseList key={item.id} {...item}
                                                  unfavoriteItem={this.props.unfavoriteItem}
                                                  favoriteItem={this.props.favoriteItem}/>
                )})
        ):(
            <AnnoncesinteresseSkeleton/>
        );
        return (
            <>

                {annoncelocationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Ces annonces peuvent vous interesser </h4>
                    </div>
                )}

                <div className="row">

                    {mapAnnoncelocationsinteresses}

                </div>

                {visiable < annoncelocationsinteresses.length && (
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

AnnoncelocationInteresseforBlog.propTypes = {
    loadAnnoncelocationsinteressesbycategories: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncelocationsinteresses: store.annoncelocations.annoncelocations

});
export default connect(mapStoreToProps, {
    loadAnnoncelocationsinteressesbycategories,unfavoriteItem,favoriteItem
})(AnnoncelocationInteresseforBlog);
