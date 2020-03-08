import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'

require("moment/min/locales.min");
moment.locale('fr');

class BlogannonceventeIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:[],
            //
        }
    }


    componentDidMount() {
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        dyaxios.get(route('api.blogannonceventeinteresse_site',[itemCategoryannoncevente])).then(response =>
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
                            <div key={item.id} className="col-md-4 mx-auto">
                                <div className="card card-blog card-plain">
                                    <div className="card-image">
                                        <a target="_blank" href={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                            <img className="img img-raised rounded" alt={item.title} src={item.photo}/>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <a target="_blank" href={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/`} className={`btn btn-sm btn-${item.categoryannoncevente.color_name}`}>
                                                {item.categoryannoncevente.name}
                                            </a>
                                            <h6 className="card-title">
                                                <a target="_blank" href={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</a>
                                            </h6>
                                        </div>
                                        <p className="card-description">
                                            <b dangerouslySetInnerHTML={{__html: (item.description.length > 80 ? item.description.substring(0, 80) + "..." : item.description)}}/>
                                            <a target="_blank" href={`/blogs/annonce_ventes/${item.categoryannoncevente.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </a>
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

export default BlogannonceventeIntesseAnnonseShow;
