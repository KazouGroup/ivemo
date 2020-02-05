import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncereservationInteresse extends Component {
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
                        <h4 className="title">Ces postes peuvent vous interesser </h4>
                    </div>
                )}

                <div className="row">

                    {blogsinteresse.map((item) => (
                        <div key={item.id} className="col-md-6 col-lg-4 col-sm-auto">
                            <div className="card card-product">
                                <div className="card-image">
                                    <Link to={`/blog/${item.categoryannoncereservation.slug}/${item.slug}/`}>
                                        <img className="img rounded" alt={item.title} src={item.photo}/>
                                    </Link>
                                </div>
                                <div className="card-body text-center">
                                    <Link to={`/blog/${item.categoryannoncereservation.slug}/`} className={`btn btn-sm btn-${item.color.name}`}>
                                        {item.occupation.name}
                                    </Link>
                                    <h6 className="card-title text-center">
                                        <NavLink to={`/blog/${item.categoryannoncereservation.slug}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                    </h6>
                                    <b/>
                                    <p className="card-description">
                                        <b dangerouslySetInnerHTML={{__html: (item.body.length > 48 ? item.body.substring(0, 48) + "..." : item.body)}}/>
                                        <NavLink to={`/blog/${item.categoryannoncereservation.slug}/${item.slug}/`}> lire la suite </NavLink>
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

export default BlogannoncereservationInteresse;
