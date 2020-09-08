import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUploadimageAnnonceventes} from "../../../redux/actions/uploadimagesActions";
import UploadimageList from "./inc/UploadimageList";


class AnnonceventeuploadimageIndex extends PureComponent {

    componentDidMount() {
        this.props.loadUploadimageAnnonceventes(this.props);
    }

    render() {
        const {uploadimages} = this.props;
        return (

            <UploadimageList {...this.props} {...uploadimages} />

        )
    }
}

AnnonceventeuploadimageIndex.propTypes = {
    loadUploadimageAnnonceventes: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    uploadimages: store.uploadimagesites.uploadimages

});
export default connect(mapStoreToProps, {
    loadUploadimageAnnonceventes
})(AnnonceventeuploadimageIndex);
