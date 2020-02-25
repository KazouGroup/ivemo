import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'

require("moment/min/locales.min");
moment.locale('fr');

class BlogannonceventeInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:[],
            //
        }
    }


    componentDidMount() {
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncevente;
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
                        <h4 className="title">Ces postes peuvent vous interesser </h4>
                    </div>
                )}

                <div className="row">

                    {blogsinteresse.map((item) => (
                        <div key={item.id} className="col-md-4 mx-auto">
                            <div className="card card-product">
                                <div className="card-image">
                                    <Link to={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                        <img className="img rounded" alt={item.title} src={item.photo}/>
                                    </Link>
                                </div>
                                <div className="card-body text-center">
                                    <Link to={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/`} className={`btn btn-sm btn-${item.categoryannoncevente.color_name}`}>
                                        {item.categoryannoncevente.name}
                                    </Link>
                                    <h6 className="card-title text-center">
                                        <NavLink to={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                    </h6>
                                    <b/>
                                    <p className="card-description">
                                        <b dangerouslySetInnerHTML={{__html: (item.description.length > 48 ? item.description.substring(0, 48) + "..." : item.description)}}/>
                                        <Link to={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </>
        )
    }

}

export default BlogannonceventeInteresse;
