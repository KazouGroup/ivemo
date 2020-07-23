import React, { PureComponent } from "react";
import { NavLink } from 'react-router-dom';
import moment from "moment";

class HeaderProfileAccountPrivate extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="card-header d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <NavLink to={`/pro/${$userIvemo.slug}/`}>
                        <img src={$userIvemo.avatar}
                             alt={`${$userIvemo.first_name} ${$userIvemo.last_name}`}
                             className="ivemoAvatar avatar"/>
                    </NavLink>
                    <div className="mx-3">
                        <NavLink to={`/pro/${$userIvemo.slug}/`}
                                 className="text-dark font-weight-600 text-sm"><b>{$userIvemo.first_name} {$userIvemo.last_name}</b>
                            <small
                                className="d-block text-muted mt-1">Membre
                                depuis {moment($userIvemo.created_at).format('LL')}</small>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderProfileAccountPrivate;
