import React, {PureComponent,Fragment} from "react";
import moment from 'moment'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,unfavoriteItem,
    loadActivitycitiesinteresses,
    likeItem,unlikeItem,
} from "../../../../redux/actions/activitycity/ActivitycityActions";
import ActivitycityInteresseList from "../inc/ActivitycityInteresseList";
import ActivitycityinteresseSkeleton from "../../../inc/user/blog/ActivitycityinteresseSkeleton";

require("moment/min/locales.min");
moment.locale('fr');

class ActivitycityInteresse extends PureComponent {

    componentDidMount() {
        this.props.loadActivitycitiesinteresses(this.props);
    }

    render() {
        const {activitycities} = this.props;
        const mapActivitycityInteresses = activitycities.length >= 0 ? (
            activitycities.map(item => {
                return (
                    <ActivitycityInteresseList key={item.id} {...item}
                                                      likeItem={this.props.likeItem}
                                                      unlikeItem={this.props.unlikeItem}
                                                      deleteItem={this.props.deleteItem}
                                                      unfavoriteItem={this.props.unfavoriteItem}
                                                      unactiveItem={this.props.unactiveItem}
                                                      favoriteItem={this.props.favoriteItem}/>

                )
            })
        ) : (
            <ActivitycityinteresseSkeleton/>
        );
        return (
            <Fragment>


                <div className="card">
                    <div className="card-body">
                        {this.props.name && (

                            <h5><b>{this.props.name} – Quelques endroits populaires à visiter</b></h5>
                        )}

                        <div className="row">
                            {mapActivitycityInteresses}
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }

}
ActivitycityInteresse.propTypes = {
    loadActivitycitiesinteresses: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    activitycities: store.pages.activitycities

});
export default connect(mapStoreToProps, {
    favoriteItem,unfavoriteItem,
    loadActivitycitiesinteresses,
    likeItem,unlikeItem,
})(ActivitycityInteresse);
