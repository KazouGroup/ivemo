import React, { Component,Fragment } from "react";
import { Button, Form } from "reactstrap";
import Skeleton from "react-loading-skeleton";

class AddAvisUser extends Component {

    render() {

        return(
            <>

                <Form role="form" onSubmit={this.props.sendavisItem} acceptCharset="UTF-8">

                    <div className="media media-post">
                        <div className="avatar">
                            {$userIvemo.avatar ?
                                <img src={$userIvemo.avatar}
                                     style={{ height: "40px", width: "80px" }}
                                     alt={$userIvemo.first_name}
                                     className="media-object img-raised rounded" />
                                : <Skeleton circle={false} height={40} width={80} />}
                        </div>

                        <div className="media-body">
                          <textarea name="description" value={this.props.state.description || ""}
                            onChange={this.props.handleFieldChange}
                            maxLength="10000"
                            placeholder={' Laiser votre avis... !'}
                            className={`form-control ${this.props.hasErrorFor('description') ? 'is-invalid' : ''} form-control-alternative"`}
                            id="description"
                            rows="15" />

                            {this.props.renderErrorFor('description')}
                            <div className="media-footer">

                                <Button type="submit"
                                        className="btn btn-primary pull-right">
                                    <i className="now-ui-icons ui-1_send" /> Poster
                                </Button>

                                <Button
                                        className="btn btn-secondary pull-right">
                                    <i className="now-ui-icons ui-1_simple-remove" /> Annuller
                                </Button>

                            </div>
                        </div>
                    </div>

                </Form>

            </>
        )
    }
}

export default AddAvisUser;
