import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import { connect } from "react-redux";
import { loadCategoryforums, } from "../../../../redux/actions/forum/forumActions";


class Navforums extends Component {

    loadItems() {
        this.props.loadCategoryforums();
    }

    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryString(forums_count) {
        forums_count = forums_count + '';
        if (forums_count < 1000) {
            return forums_count;
        }
        if (forums_count < 10000) {
            return forums_count.charAt(0) + ',' + forums_count.substring(1);
        }
        return (forums_count / 1000).toFixed(forums_count % 1000 !== 0) + 'k';
    }

    render() {
        const {categoryforums} = this.props;
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingOne">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
                       aria-controls="collapseOne">
                        <b>Rubriques Connexes</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {categoryforums.length >= 0 ?

                                <Fragment>
                                    {categoryforums.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <NavLink to={`/forums/${item.slug}/`}>
                                                    <strong>{item.name || <Skeleton width={80}/>}</strong>
                                                </NavLink>
                                            </td>
                                            <td className="text-right"><span
                                                className="ivemoItemsCount">{this.getcountcategoryString(item.forums_count)}</span>
                                                <span className="ivemoItemsTitle">{item.forums_count > 1 ? "posts" : "post"}</span></td>
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
            </div>

        )
    }

}

Navforums.propTypes = {
    loadCategoryforums: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    categoryforums: store.forums.categoryforums
});

export default connect(mapStoreToProps, {
    loadCategoryforums,
})(Navforums);
