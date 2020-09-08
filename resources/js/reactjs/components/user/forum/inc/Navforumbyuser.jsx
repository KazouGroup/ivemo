import React, { Component,Fragment } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryforumsbyuser} from "../../../../redux/actions/forum/forumActions";


class Navforumbyuser extends Component {

    loadItems(){
       this.props.loadCategoryforumsbyuser();
    }

    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryString (forums_count) {
        forums_count = forums_count +'';
        if (forums_count < 1000) {
            return forums_count;
        }
        if (forums_count < 10000) {
            return forums_count.charAt(0) + ',' + forums_count.substring(1);
        }
        return (forums_count/1000).toFixed(forums_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryforums} = this.props;
        return (


            <div className="card card-plain">
                <b>Rubriques Connexes</b>

                <div className="card-body">
                    <table>
                        <tbody>

                        {categoryforums.length >= 0 ?

                            <Fragment>
                                {categoryforums.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <NavLink to={`/forums/${item.slug}/`}>
                                                <strong>{item.name || <Skeleton width={80} />}</strong>
                                            </NavLink>
                                        </td>
                                        <td className="text-right"> {this.getcountcategoryString(item.forums_count)} {item.forums_count > 1 ? "posts" : "post"}</td>
                                    </tr>
                                ))}
                            </Fragment>
                            :

                            <NavannoncecategorySkeleton/>
                        }


                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

}
Navforumbyuser.propTypes = {
    loadCategoryforumsbyuser: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    categoryforums: store.forums.categoryforums
});

export default connect(mapStoreToProps, {
    loadCategoryforumsbyuser,
})(Navforumbyuser);
