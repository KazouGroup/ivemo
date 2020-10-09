import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUploadimageAnnoncereservations} from "../../../redux/actions/uploadimagesActions";
import UploadimageList from "./inc/UploadimageList";


class AnnoncereservationuploadimageIndex extends PureComponent {

    componentDidMount() {
        this.props.loadUploadimageAnnoncereservations(this.props);
    }

    render() {
        const {uploadimages} = this.props;
        return (

            <UploadimageList {...this.props} {...uploadimages} />

        )
    }
}

AnnoncereservationuploadimageIndex.propTypes = {
    loadUploadimageAnnoncereservations: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    uploadimages: store.uploadimagesites.uploadimages

});
export default connect(mapStoreToProps, {
    loadUploadimageAnnoncereservations
})(AnnoncereservationuploadimageIndex);
