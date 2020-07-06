import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import LazyLoad from 'react-lazyload';
import moment from "moment";
import BlogannoncePublicuserSkeleton from "../blog/BlogannoncePublicuserSkeleton";

class SectionBlogannonce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocations:{categoryannoncelocation:[],user:[]},
            blogannoncereservations:{categoryannoncereservation:[],user:[]},
            blogannonceventes:{categoryannoncevente:[],user:[]},
        };

    }


    componentDidMount() {
        fetch(route('api.blogs_annonces_one_locations')).then(res => res.json()).then((result) => {
            this.setState({
                blogannoncelocations: [...result]
            });
        });
        fetch(route('api.blogs_annonces_one_reservations')).then(res => res.json()).then((result) => {
            this.setState({
                blogannoncereservations: [...result]
            });
        });
        fetch(route('api.blogs_annonces_one_ventes')).then(res => res.json()).then((result) => {
            this.setState({
                blogannonceventes: [...result]
            });
        });
    }

    render() {
        const {blogannoncelocations,blogannoncereservations,blogannonceventes} = this.state;
        const mapBlogannoncelocations = blogannoncelocations.length >= 0 ? (
            blogannoncelocations.map(item => {
                return(

                    <div key={item.id} className="col-md-4">
                        <div className="card card-plain card-blog">
                            <div className="card-image">
                                <a target="_blank" href={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                    <LazyLoad>
                                        <img className="img rounded img-raised"
                                             src={item.photo} alt={item.title}/>
                                    </LazyLoad>
                                </a>
                            </div>
                            <div className="card-body">
                                <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/`}>
                                    <h6 className={`category text-${item.categoryannoncelocation.color_name}`}>
                                        <b>{item.categoryannoncelocation.name}</b>
                                    </h6>
                                </Link>

                                <h5 className="card-title">
                                    <a target="_blank" href={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                        <b>{item.title.length > 70 ? item.title.substring(0, 70) + "..." : item.title}</b>
                                    </a>
                                </h5>
                                <span dangerouslySetInnerHTML={{ __html: (item.description.length > 146 ? item.description.substring(0, 146) + "<a class='text-dark' target=\"_blank\" href=\"/blogs/annonce_locations/"+item.categoryannoncelocation.slug+"/"+moment(item.created_at).format('YYYY-MM-DD')+"/"+item.slug+"/\">...<b>lire plus</b></a>" : item.description) }}/>
                                <p></p>
                            </div>
                        </div>
                    </div>
                )
            })
        ):(
            <BlogannoncePublicuserSkeleton/>
        );

        const mapBlogannoncereservations = blogannoncereservations.length >= 0 ? (
            blogannoncereservations.map(item => {
                return(

                    <div key={item.id} className="col-md-4">
                        <div className="card card-plain card-blog">
                            <div className="card-image">
                                <a target="_blank" href={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                    <LazyLoad>
                                        <img className="img rounded img-raised"
                                             src={item.photo} alt={item.title}/>
                                    </LazyLoad>
                                </a>
                            </div>
                            <div className="card-body">
                                <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/`}>
                                    <h6 className={`category text-${item.categoryannoncereservation.color_name}`}>
                                        <b>{item.categoryannoncereservation.name}</b>
                                    </h6>
                                </Link>

                                <h5 className="card-title">
                                    <a target="_blank" href={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                        <b>{item.title.length > 70 ? item.title.substring(0, 70) + "..." : item.title}</b>
                                    </a>
                                </h5>
                                <span dangerouslySetInnerHTML={{ __html: (item.description.length > 146 ? item.description.substring(0, 146) + "<a class='text-dark' target=\"_blank\" href=\"/blogs/annonce_reservations/"+item.categoryannoncereservation.slug+"/"+moment(item.created_at).format('YYYY-MM-DD')+"/"+item.slug+"/\">...<b>lire plus</b></a>" : item.description) }}/>
                                <p></p>
                            </div>
                        </div>
                    </div>
                )
            })
        ):(
            <BlogannoncePublicuserSkeleton/>
        );

        const mapBlogannonceventes = blogannonceventes.length >= 0 ? (
            blogannonceventes.map(item => {
                return(

                    <div key={item.id} className="col-md-4">
                        <div className="card card-plain card-blog">
                            <div className="card-image">
                                <a target="_blank" href={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                    <LazyLoad>
                                        <img className="img rounded img-raised"
                                             src={item.photo} alt={item.title}/>
                                    </LazyLoad>
                                </a>
                            </div>
                            <div className="card-body">
                                <Link to={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/`}>
                                    <h6 className={`category text-${item.categoryannoncevente.color_name}`}>
                                       <b> {item.categoryannoncevente.name}</b>
                                    </h6>
                                </Link>
                                <h5 className="card-title">
                                    <a target="_blank" href={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                        <b>{item.title.length > 70 ? item.title.substring(0, 70) + "..." : item.title}</b>
                                    </a>
                                </h5>
                                <span dangerouslySetInnerHTML={{ __html: (item.description.length > 146 ? item.description.substring(0, 146) + "<a class='text-dark' target=\"_blank\" href=\"/blogs/annonce_ventes/"+item.categoryannoncevente.slug+"/"+moment(item.created_at).format('YYYY-MM-DD')+"/"+item.slug+"/\">...<b>lire plus</b></a>" : item.description) }}/>
                                <p></p>
                            </div>
                        </div>
                    </div>
                )
            })
        ):(
            <BlogannoncePublicuserSkeleton/>
        );

        return (

            <>
                <div className="row d-flex align-items-end">
                    <div className="col-md-12 mx-auto">
                        <h5 className="title">Nos dernières nouveautés</h5>
                    </div>
                </div>
                <div className="row">

                    {mapBlogannoncelocations}

                    {mapBlogannoncereservations}

                    {mapBlogannonceventes}


                </div>

                <div className="text-center">
                    <Link to={`/blogs/`} className="btn btn-danger btn-lg">
                        <b>Voir plus d'articles</b>
                    </Link>
                </div>
            </>

        )
    }
}



const mapStateToProps = state => {
    return {
        blogannoncereservations: state.blogannoncereservations
    };
};
export default connect(mapStateToProps)(SectionBlogannonce);
