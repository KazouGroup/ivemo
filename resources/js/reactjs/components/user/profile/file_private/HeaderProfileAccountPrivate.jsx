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

                    <a className="pull-left" href={$userIvemo.status_profile ?

                        `${route('public_profile.site',[$userIvemo.slug])}`
                        :
                        `${route('userpublic_profile.site',[$userIvemo.slug])}`}
                    >
                        {$userIvemo.avatar === null ?
                            <img className="ivemoAvatar avatar" alt={$userIvemo.first_name}
                                 src={`${$url_site}/assets/vendor/assets/img/blurredimage1.jpg`}/>
                            :
                            <img className="ivemoAvatar avatar" alt={$userIvemo.first_name}
                                 src={$userIvemo.avatar}/>
                        }
                    </a>
                    <div className="mx-3">
                        <a className="text-dark font-weight-600 text-sm" href={$userIvemo.status_profile ?

                            `${route('public_profile.site',[$userIvemo.slug])}`
                            :
                            `${route('userpublic_profile.site',[$userIvemo.slug])}`}
                        ><b>{$userIvemo.first_name} {$userIvemo.last_name}</b>
                            <small
                                className="d-block text-muted mt-1">Membre
                                depuis {moment($userIvemo.created_at).format('LL')}</small>
                        </a>

                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderProfileAccountPrivate;
