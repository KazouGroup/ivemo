import React, {Component, PureComponent} from "react";
import {Link, NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,
    likeItem,
    unfavoriteItem, unlikeItem,
    loadforuminteresse,
    deleteItem,
} from "../../../redux/actions/forum/forumActions";
import ForuminteresseList from "./inc/ForuminteresseList";
import ForumInteresseListSkeleton from "../../inc/user/forum/ForumInteresseListSkeleton";


class ForumInteresse extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 6,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return {visiable: old.visiable + 6}
        })
    }

    loadItems() {
        this.props.loadforuminteresse(this.props)
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {forums} = this.props;
        const {visiable} = this.state;
        const mapForumsinteresses = forums.length >= 0 ? (

            forums.slice(0, visiable).map(item => {
                return (
                    <ForuminteresseList key={item.id} {...item}
                                        unlikeItem={this.props.unlikeItem}
                                        likeItem={this.props.likeItem}
                                        favoriteItem={this.props.favoriteItem}
                                        unfavoriteItem={this.props.unfavoriteItem}
                                        deleteItem={this.props.deleteItem}
                                        unactiveItem={this.props.unactiveItem}/>)
            })
        ) : (
            <ForumInteresseListSkeleton/>
        );
        return (
            <>

                {forums.length >= 0 && (

                    <div className="text-center">
                        <h4 className="title">Post similaires</h4>
                    </div>
                )}

                <div className="row">

                    {mapForumsinteresses}

                </div>

                {visiable < forums.length && (
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
                                <b>Voir plus d'offres</b>
                            </button>
                        </div>
                    </div>
                )}

            </>
        )
    }

}

ForumInteresse.propTypes = {
    loadforuminteresse: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    forums: store.forums.forums

});

export default connect(mapStoreToProps,
    {
        favoriteItem,
        likeItem,
        unfavoriteItem, unlikeItem,
        loadforuminteresse,
        deleteItem,
    }
)(ForumInteresse);
