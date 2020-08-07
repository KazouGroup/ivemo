import React, {PureComponent,Fragment} from "react";
import {Link,NavLink } from "react-router-dom";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem, likeItem,
    loadBlogannonceinteresses, unactiveItem,
    unfavoriteItem, unlikeItem
} from "../../../../redux/actions/blogannoncereservation/blogannoncereservationActions";
import BlogannoncereservationInteresseList from "./inc/BlogannoncereservationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncereservationIntesseAnnonseShow extends PureComponent {
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
        const {blogannoncereservations} = this.props;
        const mapBlogsinteresse = blogannoncereservations.length >= 0 ? (
            blogannoncereservations.map(item => {
                return(
                    <BlogannoncereservationInteresseList key={item.id} {...item}
                                                      likeItem={this.props.likeItem}
                                                      unlikeItem={this.props.unlikeItem}
                                                      deleteItem={this.props.deleteItem}
                                                      unfavoriteItem={this.props.unfavoriteItem}
                                                      unactiveItem={this.props.unactiveItem}
                                                      favoriteItem={this.props.favoriteItem}/>
                )
            })
        ):(
            <BlogannonceinteresseSkeleton/>
        );
        return (
            <>

                {blogannoncereservations.length >= 0 && (

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
BlogannoncereservationIntesseAnnonseShow.propTypes = {
    loadBlogannonceinteresses: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    blogannoncereservations: store.blogannoncereservations.blogannoncereservations

});
export default connect(mapStoreToProps, {
    favoriteItem,unfavoriteItem,
    loadBlogannonceinteresses,
    likeItem,unlikeItem,
    unactiveItem,
    deleteItem
})(BlogannoncereservationIntesseAnnonseShow);
