import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';
import NavannoncecategorySkeleton from "../NavannoncecategorySkeleton";


class SectionReservationbyCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncesbycities: {user:[]},
        }
    }

    loadItems(){
        let url = route('api.citiesannoncereservations_site');
        fetch(url).then(res => res.json()).then((result) => {
            this.setState({
                annoncesbycities: [...result]
            });
        });
    }

    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryannonceString (annoncereservations_count) {
        annoncereservations_count = annoncereservations_count +'';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count/1000).toFixed(annoncereservations_count % 1000 !== 0)+'k';
    }
    render() {
        const {annoncesbycities} = this.state;
        const mapAnnoncesbycities = annoncesbycities.length >= 0 ? (
            annoncesbycities.map(item => {
                return(
                    <tr key={item.id}>
                        <td> <NavLink to={`/annonce_reservations/reservations/${item.slug}/`}><b style={{ textTransform: "capitalize" }}>{item.name}</b></NavLink></td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} {item.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
                    </tr>             )
            })
        ):(
            <NavannoncecategorySkeleton/>
        );
        return (

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingOne">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <b>Reservation</b>
                                        </a>
                                    </div>
                                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                        <div className="card-body">
                                            <table>
                                                <tbody>

                                                {mapAnnoncesbycities}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default SectionReservationbyCity;
