import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUploadimageActivitycities} from "../../../redux/actions/uploadimagesActions";
import UploadimageList from "./inc/UploadimageList";


class ActivitycityuploadimageIndex extends PureComponent {

    componentDidMount() {
        this.props.loadUploadimageActivitycities(this.props);
    }

    render() {
        const {uploadimages} = this.props;
        return (

            <UploadimageList {...this.props} {...uploadimages} />

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
