import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUploadimageAnnoncelocations} from "../../../redux/actions/uploadimagesActions";
import UploadimageList from "./inc/UploadimageList";


class AnnoncelocactionuploadimageIndex extends PureComponent {

    componentDidMount() {
        this.props.loadUploadimageAnnoncelocations(this.props);
    }

    render() {
        const {uploadimages} = this.props;
        return (

            <UploadimageList {...this.props} {...uploadimages} />

        )
    }
}

AnnoncelocactionuploadimageIndex.propTypes = {
    loadUploadimageAnnoncelocations: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    uploadimages: store.uploadimagesites.uploadimages

});
export default connect(mapStoreToProps, {
    loadUploadimageAnnoncelocations
})(AnnoncelocactionuploadimageIndex);
