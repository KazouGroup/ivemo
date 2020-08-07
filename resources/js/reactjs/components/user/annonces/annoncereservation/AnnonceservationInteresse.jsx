import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button, Row} from "reactstrap";
import {Remarkable} from "remarkable";
import AnnoncereservationInteresseList from "./inc/AnnoncereservationInteresseList";
import AnnoncesinteresseSkeleton from "../../../inc/user/annonce/AnnoncesinteresseSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,
    loadAnnoncereservationsinteressesbyuser,
    unactiveItem, unfavoriteItem
} from "../../../../redux/actions/annoncereservation/annoncereservationActions";

require("moment/min/locales.min");
moment.locale('fr');

class AnnonceservationInteresse extends Component {
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


    componentDidMount() {
       this.props.loadAnnoncereservationsinteressesbyuser(this.props);
    }

    render() {
        const {annoncereservationsinteresse} = this.props;
        const {visiable} = this.state;
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

                                <AnnoncereservationInteresseList  key={item.id} {...item}
                                                                  unactiveItem={this.props.unactiveItem}
                                                                  unfavoriteItem={this.props.unfavoriteItem}
                                                                  favoriteItem={this.props.favoriteItem}/>
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
AnnonceservationInteresse.propTypes = {
    loadAnnoncereservationsinteressesbyuser: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncereservationsinteresse: store.annoncereservations.annoncereservations

});
export default connect(mapStoreToProps, {
    loadAnnoncereservationsinteressesbyuser,unactiveItem,unfavoriteItem,favoriteItem
})(AnnonceservationInteresse);
