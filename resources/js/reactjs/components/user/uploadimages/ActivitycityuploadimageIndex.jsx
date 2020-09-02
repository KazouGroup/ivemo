import React, {PureComponent, Fragment, Suspense} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUploadimageActivitycities} from "../../../redux/actions/uploadimagesActions";
import UploadimageListSkeleton from "../../inc/user/comment/UploadimageListSkeleton";


class ActivitycityuploadimageIndex extends PureComponent {

    componentDidMount() {
        this.props.loadUploadimageActivitycities(this.props);
    }

    render() {
        const {uploadimages} = this.props;
        return (
            <div className="card-image">

                {uploadimages.length >= 0 ?
                    <div id="carouselHomeIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {uploadimages.map((value,index) => {
                                return <li key={value.id} data-target="#carouselHomeIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}/>
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {uploadimages.map((item,index) => (
                                <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <img className="d-block"
                                         src={item.name}
                                         alt={item.id}/>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#carouselHomeIndicators" role="button"
                           data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselHomeIndicators" role="button"
                           data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    :
                    <UploadimageListSkeleton />
                }

            </div>

        )
    }
}

ActivitycityuploadimageIndex.propTypes = {
    loadUploadimageActivitycities: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    uploadimages: store.uploadimagesites.uploadimages

});
export default connect(mapStoreToProps, {
    loadUploadimageActivitycities
})(ActivitycityuploadimageIndex);
