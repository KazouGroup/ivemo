import React, { PureComponent } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { FaUserFriends, FaUsers } from "react-icons/fa";

class ButonFollowerUser extends PureComponent {

    data_countFormatter(visits_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {nameununfollower, nameunfollower, countfollowerusers, followeruser} = this.props;
        return (
            <>
                {$guest ? (
                        <>
                            <UncontrolledTooltip placement="bottom" target="unfollowerUser">
                                Me Suivre
                            </UncontrolledTooltip>
                            <button type="button" data-toggle="modal" data-target="#loginModal" id={'unfollowerUser'}
                                    className="btn btn-danger btn-sm">
                                <FaUsers/>
                            </button>
                        </>
                    )
                    :
                    <>
                        {this.props.id !== $userIvemo.id && (
                            <>
                                {followeruser ?
                                    <>
                                        <UncontrolledTooltip placement="bottom" target="followerUser">
                                            Vous me suivez déjà
                                        </UncontrolledTooltip>
                                        <Button onClick={() => this.props.unfollowerItem(this.props)}
                                                id={'followerUser'}
                                                className="btn btn-info btn-sm">
                                            <FaUserFriends/>
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <UncontrolledTooltip placement="bottom" target="unfollowerUser">
                                            Me Suivre
                                        </UncontrolledTooltip>
                                        <Button onClick={() => this.props.followerItem(this.props)}
                                                id={'unfollowerUser'}
                                                className="btn btn-danger btn-sm">
                                            <FaUsers/>
                                        </Button>
                                    </>
                                }
                            </>
                        )}
                    </>
                }
            </>
        );
    }
}

export default ButonFollowerUser;
