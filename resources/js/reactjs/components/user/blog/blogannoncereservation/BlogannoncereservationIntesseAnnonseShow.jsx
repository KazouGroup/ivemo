import React, {PureComponent,Fragment} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import ButonFavorisLikedForInteressBlog from "../../../inc/vendor/ButonFavorisLikedForInteressBlog";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncereservationIntesseAnnonseShow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:{categoryannoncereservation:[],user:[]},
            //
        };

        this.likeItem = this.likeItem.bind(this);
        this.unlikeItem = this.unlikeItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
    }

    likeItem(id) {
        const url = route('likeblogannoncereservations_likedata.likedata', [id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unlikeItem(id) {
        const url = route('likeblogannoncereservations_unlikedata.unlikedata', [id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    favoriteItem(id) {
        const url = route('favoriteblogannoncereservations_favorite.favorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Article ajoutée à vos favoris",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unfavoriteItem(id) {
        const url = route('favoriteblogannoncereservations_unfavorite.unfavorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Article retirée de vos favoris",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }


    loadItems(){
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        dyaxios.get(route('api.blogannoncereservationinteresse_site',[itemCategoryannoncereservation])).then(response =>
            this.setState({
                blogsinteresse: [...response.data],
            }));
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {blogsinteresse} = this.state;
        const mapBlogsinteresse = blogsinteresse.length >= 0 ? (
            blogsinteresse.map(item => {
                return(
                    <Fragment key={item.id}>

                        <div className="col-md-4 mx-auto">
                            <div className="card card-blog card-plain">
                                <div className="card-image">
                                    <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                        <img className="img img-raised rounded" alt={item.title} src={item.photo}/>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                        <Link to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/`} className={`btn btn-sm btn-${item.categoryannoncereservation.color_name}`}>
                                            {item.categoryannoncereservation.name}
                                        </Link>
                                        <h6 className="card-title">
                                            <NavLink to={`/blogs/annonce_reservations/${item.categoryannoncereservation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                        </h6>
                                    </div>

                                    <span dangerouslySetInnerHTML={{ __html: (item.description.length > 96 ? item.description.substring(0, 96) + "<a class='text-dark' target=\"_blank\" href=\"/blogs/annonce_reservations/"+item.categoryannoncereservation.slug+"/"+moment(item.created_at).format('YYYY-MM-DD')+"/"+item.slug+"/\">...<b>lire plus</b></a>" : item.description) }}/>
                                </div>


                                <ButonFavorisLikedForInteressBlog {...item} favoriteItem={this.favoriteItem}
                                                                  unfavoriteItem={this.unfavoriteItem}
                                                                  likeItem={this.likeItem}
                                                                  unlikeItem={this.unlikeItem} />

                            </div>
                        </div>

                    </Fragment>
                )
            })
        ):(
            <BlogannonceinteresseSkeleton/>
        );
        return (
            <>

                {blogsinteresse.length >= 0 && (

                    <div className="text-center">
                        <h4 className="title">Votre reservation en toute securité et sérénité</h4>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">

                        <div className="row">

                            {mapBlogsinteresse}

                        </div>

                    </div>
                </div>

            </>
        )
    }

}

export default BlogannoncereservationIntesseAnnonseShow;
