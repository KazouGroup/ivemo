import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncereservationIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:[],
            //
        }
    }


    componentDidMount() {
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        dyaxios.get(route('api.blogannoncereservationinteresse_site',[itemCategoryannoncereservation])).then(response =>
            this.setState({
                blogsinteresse: [...response.data],
            }));
    }

    render() {
        const {blogsinteresse} = this.state;
        return (
            <>

                {blogsinteresse.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Votre reservation en toute securité et sérénité</h4>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">

                        <div className="row">

                            {blogsinteresse.map((item) => (
                            <div key={item.id} className="col-md-4 col-4">
                                <div className="card card-blog card-plain">
                                    <div className="card-image">
                                        <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                            <img className="img img-raised rounded" alt={item.title} src={item.photo}/>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <Link className="nav-link" to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/`} >
                                                <span className={`badge badge-${item.categoryannoncereservation.color_name}`}>{item.categoryannoncereservation.name}</span>
                                            </Link>
                                            <h6 className="card-title">
                                                <NavLink to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                            </h6>
                                        </div>
                                        <p className="card-description">
                                            <b dangerouslySetInnerHTML={{__html: (item.description.length > 80 ? item.description.substring(0, 80) + "..." : item.description)}}/>
                                            <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </Link>
                                        </p>

                                    </div>
                                </div>
                            </div>
                            ))}

                        </div>

                    </div>
                </div>

            </>
        )
    }

}

export default BlogannoncereservationIntesseAnnonseShow;
