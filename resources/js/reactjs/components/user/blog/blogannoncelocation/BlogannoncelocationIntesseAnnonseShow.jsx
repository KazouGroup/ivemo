import React, {Component,Fragment} from "react";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import ButonFavorisLikedForInteressBlog from "../../../inc/vendor/ButonFavorisLikedForInteressBlog";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsinteresse:{categoryannoncelocation:[],user:[]},
            //
        };

        this.likeItem = this.likeItem.bind(this);
        this.unlikeItem = this.unlikeItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
    }

    likeItem(id) {
        const url = route('likeblogannoncelocations_likedata.likedata', [id]);
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
        const url = route('likeblogannoncelocations_unlikedata.unlikedata', [id]);
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
        const url = route('favoriteblogannoncelocations_favorite.favorite', [id]);
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
        const url = route('favoriteblogannoncelocations_unfavorite.unfavorite', [id]);
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
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.blogannoncelocationinteresse_site',[itemCategoryannoncelocation])).then(response =>
            this.setState({
                blogsinteresse: [...response.data],
            }));
    }
    componentDidMount() {
       this.loadItems();
    }

    render() {
        const {blogsinteresse} = this.state;
        const mapBlogsinteresses = blogsinteresse.length >= 0 ? (
            blogsinteresse.map(item => {
                return(
                    <Fragment key={item.id}>
                        <div className="col-md-4 mx-auto">
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

                                    <div className="card-footer">
                                        <div className="author">
                                            <img src={item.user.avatar} alt={item.user.first_name}
                                                 className="avatar img-raised"/>
                                            <b>{(item.user.first_name.length > 15 ? item.user.first_name.substring(0, 15) + "..." : item.user.first_name)}</b>
                                        </div>
                                        <div className="stats stats-right">

                                            <ButonFavorisLikedForInteressBlog {...item} favoriteItem={this.favoriteItem}
                                                                              unfavoriteItem={this.unfavoriteItem}
                                                                              likeItem={this.likeItem}
                                                                              unlikeItem={this.unlikeItem} />

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            })
        ):(
            <BlogannonceinteresseSkeleton/>
        );
        return (
            <Fragment>

                {blogsinteresse.length > 0 && (
                    <div className="text-center">
                        <h4 className="title">Vos locations en toute securité et sérénité</h4>
                    </div>
                )}


                <div className="card">
                    <div className="card-body">

                        <div className="row">

                            {mapBlogsinteresses}

                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }

}

export default BlogannoncelocationIntesseAnnonseShow;
