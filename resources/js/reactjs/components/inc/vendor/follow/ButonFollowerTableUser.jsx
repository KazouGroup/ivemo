import React, { PureComponent } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { FaUserFriends, FaUsers } from "react-icons/fa";

class ButonFollowerTableUser extends PureComponent {

    data_countFormatter(visits_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {nameununfollower, nameunfollower, followeruser} = this.props;
        return (
            <>
                {$guest ? (
                        <>
                            <button type="button" title="Me Suivre" data-toggle="modal" data-target="#loginModal" id={'unfollowerUser'}
                                    className="btn btn-danger btn-sm">
                                 <b>{nameunfollower}</b>
                            </button>
                        </>
                    )
                    :
                    <>
                        {this.props.id !== $userIvemo.id && (
                            <>
                                {followeruser ?
                                    <>
                                        <Button title="Vous me suivez déjà" onClick={() => this.props.unfollowerForTableItem(this.props)}

                                                className="btn btn-info btn-sm">
                                            <b>{nameununfollower}</b>
                                        </Button>
                                    </>
                                    :
                                    <>

                                        <Button onClick={() => this.props.followerForTableItem(this.props)}

                                                className="btn btn-danger btn-sm">
                                            <b>{nameunfollower}</b>
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

export default ButonFollowerTableUser;
