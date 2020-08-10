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
        const {nameununfollower, nameunfollower, followeruser,classNameDanger,classNameInfo} = this.props;
        return (
            <>
                {$guest ? (
                        <>
                            <button type="button" title="Me Suivre" data-toggle="modal" data-target="#loginModal" id={'unfollowerUser'}
                                    className={classNameDanger}>
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
                                        <Button title="Vous me suivez déjà" onClick={() => this.props.unfollowerItem(this.props)}
                                                className={classNameInfo}>
                                            <b>{nameununfollower}</b>
                                        </Button>
                                    </>
                                    :
                                    <>

                                        <Button onClick={() => this.props.followerItem(this.props)}
                                                className={classNameDanger}>
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

export default ButonFollowerUser;
