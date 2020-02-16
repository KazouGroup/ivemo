import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import {Button, UncontrolledTooltip} from "reactstrap";
import Swal from "sweetalert2";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:[],
            //
        };
    }

    componentDidMount() {
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.blogannoncelocationinteresse_site',[itemCategoryannoncelocation])).then(response =>
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
                        <h4 className="title">Vos locations en toute securité et sérénité</h4>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">

                        <div className="row">

                            {blogsinteresse.map((item) => (
                            <div key={item.id} className="col-md-4 mx-auto">
                                <div className="card card-blog card-plain">
                                    <div className="card-image">
                                        <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                            <img className="img img-raised rounded" alt={item.title} src={item.photo}/>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/`} className={`btn btn-sm btn-${item.categoryannoncelocation.color_name}`}>
                                                {item.categoryannoncelocation.name}
                                            </Link>
                                            <h6 className="card-title">
                                                <NavLink to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                            </h6>
                                        </div>
                                        <p className="card-description">
                                            <b dangerouslySetInnerHTML={{__html: (item.description.length > 80 ? item.description.substring(0, 80) + "..." : item.description)}}/>
                                            <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </Link>
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

export default BlogannoncelocationIntesseAnnonseShow;
