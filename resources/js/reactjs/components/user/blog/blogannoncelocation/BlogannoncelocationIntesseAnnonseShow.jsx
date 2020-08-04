import React, {PureComponent,Fragment} from "react";
import moment from 'moment'
import BlogannonceinteresseSkeleton from "../../../inc/user/blog/BlogannonceinteresseSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,unfavoriteItem,
    loadBlogannoncelocationsinteresses,
    likeItem,unlikeItem,
    unactiveItem,
    deleteItem
} from "../../../../redux/actions/blogannoncelocation/blogannoncelocationActions";
import BlogannoncelocationInteresseList from "./inc/BlogannoncelocationInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationIntesseAnnonseShow extends PureComponent {

    componentDidMount() {
        this.props.loadBlogannoncelocationsinteresses(this.props);
    }

    render() {
        const {blogannoncelocations} = this.props;
        const mapBlogsinteresses = blogannoncelocations.length >= 0 ? (
            blogannoncelocations.map(item => {
                return (
                    <BlogannoncelocationInteresseList key={item.id} {...item}
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
            <Fragment>

                {blogannoncelocations.length > 0 && (
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
BlogannoncelocationIntesseAnnonseShow.propTypes = {
    loadBlogannoncelocationsinteresses: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    blogannoncelocations: store.blogannoncelocations.blogannoncelocations

});
export default connect(mapStoreToProps, {
    favoriteItem,unfavoriteItem,
    loadBlogannoncelocationsinteresses,
    likeItem,unlikeItem,
    unactiveItem,
    deleteItem
})(BlogannoncelocationIntesseAnnonseShow);
