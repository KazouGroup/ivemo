import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import {Button} from "reactstrap";
import ButonFavorisLikedForInteressBlog from "../../../inc/vendor/ButonFavorisLikedForInteressBlog";
import ButonFavoris from "../../../inc/vendor/ButonFavoris";
import ButonLiked from "../../../inc/vendor/ButonLiked";
require("moment/min/locales.min");
moment.locale('fr');

class BlogannonceventeIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:{categoryannoncevente:[],user:[]},
        };


        this.likeItem = this.likeItem.bind(this);
        this.unlikeItem = this.unlikeItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
    }

    likeItem(id) {
        const url = route('likeblogannonceventes_likedata.likedata', [id]);
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
        const url = route('likeblogannonceventes_unlikedata.unlikedata', [id]);
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
        const url = route('favoriteblogannonceventes_favorite.favorite', [id]);
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
        const url = route('favoriteblogannonceventes_unfavorite.unfavorite', [id]);
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
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        dyaxios.get(route('api.blogannonceventeinteresse_site',[itemCategoryannoncevente])).then(response =>
            this.setState({
                blogsinteresse: [...response.data],
            }));
    }

    componentDidMount() {
       this.loadItems();
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

                            {blogsinteresse.length ?
                                <>
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
                                                <span dangerouslySetInnerHTML={{ __html: (item.description.length > 96 ? item.description.substring(0, 96) + "<a class='text-dark' target=\"_blank\" href=\"/blogs/annonce_ventes/"+item.categoryannoncevente.slug+"/"+moment(item.created_at).format('YYYY-MM-DD')+"/"+item.slug+"/\">...<b>lire plus</b></a>" : item.description) }}/>

                                                <ButonFavorisLikedForInteressBlog {...item} favoriteItem={this.favoriteItem}
                                                                                  unfavoriteItem={this.unfavoriteItem}
                                                                                  likeItem={this.likeItem}
                                                                                  unlikeItem={this.unlikeItem} />

                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </>:<BlogannonceinteresseSkeleton/>}


                        </div>

                    </div>
                </div>

            </>
        )
    }

}

export default BlogannonceventeIntesseAnnonseShow;
