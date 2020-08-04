import React, {Component, Fragment} from "react";
import {Link, NavLink} from "react-router-dom";
import moment from 'moment'
import {Button} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,unfavoriteItem,
    loadBlogannoncelocationsinteresses,
    unlikeItem,likeItem,
    unactiveItem,deleteItem
} from "../../../../redux/actions/blogannoncelocation/blogannoncelocationActions";
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import BlogannoncelocationInteresseList from "./inc/BlogannoncelocationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationInteresse extends Component {

    loadItems() {
        this.props.loadBlogannoncelocationsinteresses(this.props);
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {blogsinteresse} = this.props;
        const mapBloginteresse = blogsinteresse.length ? (
            blogsinteresse.map(item => {
                return (

                    <BlogannoncelocationInteresseList key={item.id} {...item}
                                                      likeItem={this.props.likeItem}
                                                      unlikeItem={this.props.unlikeItem}
                                                      unactiveItem={this.props.unactiveItem}
                                                      deleteItem={this.props.deleteItem}
                                                      unfavoriteItem={this.props.unfavoriteItem}
                                                      favoriteItem={this.props.favoriteItem}/>

                )
            })
        ) : (
            <BlogannonceinteresseSkeleton/>
        );

        return (
            <>

                {blogsinteresse.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Ces postes peuvent vous interesser </h4>
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <div className="row">

                            {mapBloginteresse}

                        </div>
                    </div>
                </div>

            </>
        )
    }

}

BlogannoncelocationInteresse.propTypes = {
    loadBlogannoncelocationsinteresses: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    blogsinteresse: store.blogannoncelocations.blogannoncelocations

});
export default connect(mapStoreToProps, {
    loadBlogannoncelocationsinteresses, unfavoriteItem, favoriteItem, unlikeItem,likeItem,unactiveItem, deleteItem
})(BlogannoncelocationInteresse);
