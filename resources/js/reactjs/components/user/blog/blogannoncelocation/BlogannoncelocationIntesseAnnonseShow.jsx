import React, {Component,Fragment} from "react";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:[],
            isLoading: false,
            //
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.blogannoncelocationinteresse_site',[itemCategoryannoncelocation])).then(response =>
            this.setState({
                blogsinteresse: [...response.data],
                isLoading: false,
            }));
    }

    render() {
        const {blogsinteresse,isLoading} = this.state;
        const mapBlogsinteresses = isLoading ? (
            <BlogannonceinteresseSkeleton/>
        ):(
            blogsinteresse.map(item => {
                return(
                        <Fragment>
                            <div key={item.id} className="col-md-4 mx-auto">
                                <div className="card card-blog card-plain">
                                    <div className="card-image">
                                        <a target="_blank" href={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                            <img className="img img-raised rounded" alt={item.title} src={item.photo}/>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <a target="_blank" href={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/`} className={`btn btn-sm btn-${item.categoryannoncelocation.color_name}`}>
                                                {item.categoryannoncelocation.name}
                                            </a>
                                            <h6 className="card-title">
                                                <a target="_blank" href={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</a>
                                            </h6>
                                        </div>
                                        <p className="card-description">
                                            <b dangerouslySetInnerHTML={{__html: (item.description.length > 80 ? item.description.substring(0, 80) + "..." : item.description)}}/>
                                            <a target="_blank" href={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </a>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
            })
        );
        return (
            <Fragment>

                {blogsinteresse.length > 0 && (
                    <Fragment>
                        <div className="text-center">
                            <h4 className="title">Vos locations en toute securité et sérénité</h4>
                        </div>

                        <div className="card">
                            <div className="card-body">

                                <div className="row">

                                    {mapBlogsinteresses}

                                </div>



                            </div>
                        </div>
                    </Fragment>

                )}



            </Fragment>
        )
    }

}

export default BlogannoncelocationIntesseAnnonseShow;
