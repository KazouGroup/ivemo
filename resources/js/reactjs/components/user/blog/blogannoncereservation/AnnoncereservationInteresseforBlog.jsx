import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button } from "reactstrap";
import { Remarkable } from "remarkable";
import AnnoncereservationInteresseList from "../../annonces/annoncereservation/inc/AnnoncereservationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncereservationInteresseforBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservationsinteresses: [],
            //
        }
    }


    componentDidMount() {
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        dyaxios.get(route('api.annoncereservationinteresse_site', [ itemCategoryannoncereservation])).then(response =>
            this.setState({
                annoncereservationsinteresses: [...response.data],
            }));
    }

    render() {
        const { annoncereservationsinteresses } = this.state;
        return (
            <>

                {annoncereservationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Ces annonces peuvent vous interesser</h4>
                    </div>
                )}

                <div className="row">

                    {annoncereservationsinteresses.map((item) => (

                        <AnnoncereservationInteresseList key={item.id} {...item}/>

                    ))}

                </div>

            </>
        )
    }

}

export default AnnoncereservationInteresseforBlog;
