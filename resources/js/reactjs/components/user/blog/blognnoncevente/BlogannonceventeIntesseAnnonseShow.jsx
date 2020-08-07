import React, {Component} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import {Button} from "reactstrap";
import BlogannonceventeInteresseList from "./inc/BlogannonceventeInteresseList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem, likeItem,
    loadBlogannonceinteresses,
    unactiveItem,unfavoriteItem, unlikeItem
} from "../../../../redux/actions/blogannoncevente/blogannonceventeActions";
require("moment/min/locales.min");
moment.locale('fr');

class BlogannonceventeIntesseAnnonseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    loadItems(){
      this.props.loadBlogannonceinteresses(this.props);
    }

    componentDidMount() {
       this.loadItems();
    }

    render() {
        const {blogannonceventes} = this.props;
        const mapBlogsinteresses = blogannonceventes.length >= 0 ? (
            blogannonceventes.map(item => {
                return (
                    <BlogannonceventeInteresseList key={item.id} {...item}
                                                      likeItem={this.props.likeItem}
                                                      unlikeItem={this.props.unlikeItem}
                                                      deleteItem={this.props.deleteItem}
                                                      unfavoriteItem={this.props.unfavoriteItem}
                                                      unactiveItem={this.props.unactiveItem}
                                                      favoriteItem={this.props.favoriteItem}/>

                )
            })
        ) : (
            <BlogannonceinteresseSkeleton/>
        );
        return (
            <>

                {blogannonceventes.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Votre reservation en toute securité et sérénité</h4>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">

                        <div className="row">

                            {mapBlogsinteresses}

                        </div>

                    </div>
                </div>

            </>
        )
    }

}

BlogannonceventeIntesseAnnonseShow.propTypes = {
    loadBlogannonceinteresses: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    blogannonceventes: store.blogannonceventes.blogannonceventes

});
export default connect(mapStoreToProps, {
    favoriteItem,unfavoriteItem,
    loadBlogannonceinteresses,
    likeItem,unlikeItem,
    unactiveItem,
    deleteItem
})(BlogannonceventeIntesseAnnonseShow);
