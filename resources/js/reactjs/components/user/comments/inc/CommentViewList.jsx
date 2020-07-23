import React, { PureComponent,Fragment } from "react";
import {Button, Form} from "reactstrap";
import ReadMoreAndLess from "react-read-more-less";
import moment from "moment";


class CommentViewList extends PureComponent {

    getcountlikeString (likeked_count) {
        likeked_count = likeked_count +'';
        if (likeked_count < 1000) {
            return likeked_count;
        }
        if (likeked_count < 10000) {
            return likeked_count.charAt(0) + ',' + likeked_count.substring(1);
        }
        return (likeked_count/1000).toFixed(likeked_count % 1000 !== 0)+'k';
    }
    render() {
        return (
            <>
                <h6 className="media-heading">{this.props.user.first_name}
                    <small className="text-muted">· {moment(this.props.created_at).fromNow()}</small>
                </h6>
                <ReadMoreAndLess
                    className="read-more-content"
                    charLimit={250}
                    readMoreText="lire plus"
                    readLessText=""
                >
                    {this.props.body || ""}
                </ReadMoreAndLess>

                <div className="media-footer">

                    {$guest ?

                        <Button data-toggle="modal" data-target="#loginModal"
                                className="btn btn-default btn-neutral pull-right" title="J'aime ce commentaire">
                            <i className="now-ui-icons ui-2_favourite-28"></i> {this.getcountlikeString(this.props.likeked_count)}
                        </Button>
                        :

                        <>
                            <button type="button" onClick={() => this.props.responsecommentFromItem(this.props)}
                                    className="btn btn-default btn-neutral pull-right" title="Repondre a ce commentaire">
                                <i className="now-ui-icons files_single-copy-04"></i> Repondre
                            </button>

                            {this.props.likeked ?

                                <>
                                    <Button onClick={() => this.props.unlikeItem(this.props)}
                                            className="btn btn-danger btn-neutral pull-right" title="J'aime plus ce commentaire">
                                        <i className="now-ui-icons ui-2_favourite-28"></i> {this.getcountlikeString(this.props.likeked_count)}
                                    </Button>
                                </>

                                :
                                <>
                                    <Button onClick={() => this.props.likeItem(this.props)}
                                            className="btn btn-default btn-neutral pull-right" title="J'aime ce commentaire">
                                        <i className="now-ui-icons ui-2_favourite-28"></i> {this.getcountlikeString(this.props.likeked_count)}
                                    </Button>
                                </>
                            }

                            {$userIvemo.id === this.props.user.id && (
                                <>
                                    <button onClick={() => this.props.deleteItem(this.props.id) }
                                            className="btn btn-danger btn-neutral pull-right">
                                        <i className="now-ui-icons ui-1_simple-remove"></i> Suprimer
                                    </button>

                                    <Button onClick={() => this.props.editcommentFromItem(this.props)}
                                            className="btn btn-info btn-neutral pull-right">
                                        <i className="now-ui-icons ui-2_settings-90"></i> Editer
                                    </Button>

                                </>
                            )}

                            {/* Ce button donne l'autorisation a l'utilisateur de l'annonce de la masquer */}
                            {$userIvemo.id === this.props.commentable.user_id && (
                                <button onClick={() => this.props.unactiveItem(this.props.id) }
                                        className="btn btn-success btn-neutral pull-right" title="Masquer ce commentaire">
                                    <i className="now-ui-icons ui-1_check"></i> Masquer
                                </button>
                            )}


                        </>
                    }

                </div>
            </>

        )
    }
}

export default CommentViewList;
