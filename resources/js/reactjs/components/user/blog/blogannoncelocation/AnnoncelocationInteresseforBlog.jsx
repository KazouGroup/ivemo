import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button } from "reactstrap";
import { Remarkable } from "remarkable";
import AnnoncelocationInteresseList from "../../annonces/annonceloaction/inc/AnnoncelocationInteresseList";
import AnnoncereservationInteresseList from "../../annonces/annoncereservation/inc/AnnoncereservationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresseforBlog extends Component {
    constructor(props) {
        super(props);
        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.state = {
            annoncelocationsinteresses: [],
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
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.annoncelocationinteresse_by_categoryannoncelocation_site', [ itemCategoryannoncelocation])).then(response =>
            this.setState({
                annoncelocationsinteresses: [...response.data],
            }));
    }

    render() {
        const { annoncelocationsinteresses,visiable } = this.state;
        return (
            <>

                {annoncelocationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Ces annonces peuvent vous interesser </h4>
                    </div>
                )}

                <div className="row">

                    {annoncelocationsinteresses.slice(0,visiable).map((item) => (
                       <AnnoncelocationInteresseList key={item.id} {...item}/>
                    ))}

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

export default AnnoncelocationInteresseforBlog;
