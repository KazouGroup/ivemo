import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button } from "reactstrap";
import { Remarkable } from "remarkable";

require("moment/min/locales.min");
moment.locale('fr');

class AnnoncelocationInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationsinteresses: [],
            //
        }
    }


    componentDidMount() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCityannonce = this.props.match.params.city;
        dyaxios.get(route('api.annoncelocationinteresse_site', [itemannoncetype, itemCategoryannoncelocation, itemCityannonce])).then(response =>
            this.setState({
                annoncelocationsinteresses: [...response.data],
            }));
    }

    getDescription(item) {
        const md = new Remarkable();
        return { __html: md.render(item.description.length > 40 ? item.description.substring(0, 40) + "..." : item.description) };
    }
    numberWithCommas(item) {
        return item.price.toLocaleString();
    }

    render() {
        const { annoncelocationsinteresses } = this.state;
        return (
            <>

                {annoncelocationsinteresses.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {annoncelocationsinteresses.map((item) => (
                        <div key={item.id} className="col-md-6 mx-auto">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card card-plain card-blog">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="card-image">
                                                    <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                        <ol className="carousel-indicators">
                                                            <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                            <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                            <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                        </ol>
                                                        <div className="carousel-inner" role="listbox">
                                                            <div className="carousel-item">
                                                                <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                            </div>
                                                            <div className="carousel-item">
                                                                <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                            </div>
                                                            <div className="carousel-item active">
                                                                <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                            </div>
                                                        </div>
                                                        <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                            <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                        </a>
                                                        <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                            <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <Button className="btn btn-sm btn-icon btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                        <i className="now-ui-icons tech_mobile" />
                                                    </Button>
                                                    <NavLink to={`/annonces/`} className="btn btn-sm btn-icon btn-primary">
                                                        <i className="now-ui-icons location_pin" />
                                                    </NavLink>

                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="text-left pull-left">
                                                        <NavLink to={`/annonces_reservations/${item.annoncetype.slug}/${item.categoryannoncelocation.slug}/`}>
                                                            <h6 className="text-info ml-auto mr-auto">
                                                                {item.categoryannoncelocation.name}
                                                            </h6>
                                                        </NavLink>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        <div className="col-md-12 col-12">
                                                            <h5 className="text-success"><b>{this.numberWithCommas(item)} <small>FCFA</small></b></h5>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-6">
                                                        <h6 className="category text-dark">{annoncelocationsinteresses.pieces} p . {annoncelocationsinteresses.rooms && (<>{annoncelocationsinteresses.rooms} ch</>)}. {annoncelocationsinteresses.surface && (<>{annoncelocationsinteresses.surface} m<sup>2</sup></>)}</h6>
                                                    </div>
                                                    <div className="col-md-6 col-6">
                                                        <NavLink to={`/annonces_locations/locations/${item.categoryannoncelocation.slug}/${item.city.slug}/`}>
                                                            <span className="ml-auto mr-auto">
                                                                <strong>{item.city.name} </strong>
                                                            </span>
                                                        </NavLink>
                                                        - {item.district}
                                                    </div>
                                                </div>
                                                <h6 className="card-title">
                                                    <NavLink to={`/annonces_locations/${item.annoncetype.slug}/${item.categoryannoncelocation.slug}/${item.city.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                                        {item.title}
                                                    </NavLink>
                                                </h6>
                                                <span dangerouslySetInnerHTML={this.getDescription(item)} />
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`/@${item.user.slug}/`}>
                                                            <img src={item.user.avatar} style={{ height: "20px", width: "50px" }} alt="" className="avatar" />
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/@${item.user.slug}/`} className="text-dark font-weight-600 text-sm">{item.user.first_name}
                                                                <small className="d-block text-muted">{moment(item.created_at).format('LL')}</small>
                                                            </NavLink>
                                                        </div>

                                                    </div>
                                                
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </>
        )
    }

}

export default AnnoncelocationInteresse;
