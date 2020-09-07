import React, {PureComponent, Fragment} from "react";
import {Button, CardBody, Form, Input, Row, UncontrolledTooltip} from "reactstrap";
import {NavLink} from "react-router-dom";
import moment from "moment";


class FormModalUploadimageUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }


    render() {
        return (

            <div className="modal fade" id="uploadimgNew" tabIndex="-1" role="dialog" aria-labelledby="uploadimgNewLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center"><b>Sauvegarder une image</b></h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Form role="form"   acceptCharset="UTF-8">

                            <div className="modal-body">

                                <div className="card-body">


                                    <Row>
                                        <div className="col-md-6 mx-auto">
                                            <div className="text-center">
                                                <img src={this.state.showDefaultPhotoImage ? `${$url_site}/assets/vendor/assets/img/blurredimage1.jpg` : this.state.photo} alt={'name'} />
                                                <input id="photo" type="file" onChange={this.props.uploadPhotoImage} className={`form-control ${this.props.hasErrorFor('photo') ? 'is-invalid' : ''} IvemoImageCarouses-file-upload`} name="photo" accept="image/*" />
                                                {this.props.renderErrorFor('photo')}
                                                <div className="text-center">
                                                    <label htmlFor="photo" className="btn btn-primary">
                                                        <span className="btn-inner--text">Selectioner / Changer</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="submit text-center">
                                        <button type="button" className="btn btn-secondary btn-raised" data-dismiss="modal">
                                            Annuler
                                        </button>
                                        <button className="btn btn-primary" type="submit">
                                            Sauvegarder
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </Form>


                    </div>
                </div>
            </div>

        )
    }
}

export default FormModalUploadimageUser;
