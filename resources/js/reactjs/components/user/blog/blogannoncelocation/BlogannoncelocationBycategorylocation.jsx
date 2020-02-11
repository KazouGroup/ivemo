import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import moment from "moment";
import PropTypes from "prop-types";


class BlogannoncelocationBycategorylocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocation: {blogannoncelocations:[]},
            categoryannoncelocations:[],
        }
    }

    loadItems(){
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let url = route('api.blogannoncecategoryreservations_site', [itemCategoryannoncelocation]);
        dyaxios.get(url).then(response => this.setState({ blogannoncelocation: response.data, }));
        dyaxios.get(route('api.categoryannoncereservation_site')).then(response => this.setState({categoryannoncelocations: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {blogannoncelocation,categoryannoncelocations} = this.state;
        const blogannoncelocationsbycategorylocations = blogannoncelocation.blogannoncelocations;
        return (
            <>
                <Helmet>
                    <title>Guides et conseils reservation {`${blogannoncelocation.name || 'Annonce'}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="500">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + blogannoncelocation.photo + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">{blogannoncelocation.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">


                                </div>
                            </div>

                            <div className="container">
                                <br />

                                <ul className="nav nav-tabs nav-tabs-neutral justify-content-center"
                                    role="tablist" data-background-color={this.props.backgroundColor}>

                                    {categoryannoncelocations.map((item) =>(
                                        <li key={item.id} className="nav-item">
                                            <NavLink to={`/blogs/annonce_reservations/${item.slug}/`} className="nav-link">
                                                <b>{item.name}</b>
                                            </NavLink>
                                        </li>
                                    ))}

                                </ul>
                                <br/>

                                <div className="row">


                                    {blogannoncelocationsbycategorylocations.map((item) => (
                                        <div key={item.id} className="col-md-4 mx-auto">
                                            <div className="card card-blog">
                                                <div className="card-image">
                                                    <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                                        <img className="img rounded" alt={item.title} src={item.photo}/>
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <h6 className="card-title text-center">
                                                        <NavLink to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                                    </h6>
                                                    <p className="card-description">
                                                        <b dangerouslySetInnerHTML={{__html: (item.description.length > 48 ? item.description.substring(0, 48) + "..." : item.description)}}/>
                                                        <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </Link>
                                                    </p>
                                                    <div className="card-footer">
                                                        <div className="author">
                                                           <Link to={`/@${item.user.slug}/`}>
                                                               <img src={item.user.avatar} alt={item.user.first_name}
                                                                    className="avatar img-raised"/>
                                                               <span>{item.user.first_name}</span>
                                                           </Link>
                                                        </div>
                                                        <div className="stats stats-right">
                                                            <i className="now-ui-icons tech_watch-time"/> {item.red_time} min lecture
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>



                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>

        )
    }
}
BlogannoncelocationBycategorylocation.defaultProps = {
    backgroundColor: "orange",
};

BlogannoncelocationBycategorylocation.propTypes = {
    // background color for the component
    backgroundColor: PropTypes.oneOf([
        "black",
        "orange",
    ]),
};

export default BlogannoncelocationBycategorylocation;
