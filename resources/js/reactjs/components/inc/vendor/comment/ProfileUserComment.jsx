import React,{Component} from "react";

class ProfileUserComment extends Component {
    render() {
        return (
            <a className="pull-left" href={this.props.user.status_profile ?

                   `${route('public_profile.site',[this.props.user.slug])}`
                   :
                   `${route('userpublic_profile.site',[this.props.user.slug])}`}
            >
                <div className="author">
                    {this.props.user.avatar === null ?
                        <img className="avatar" alt={this.props.user.first_name}
                             src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                        :
                        <img className="avatar" alt={this.props.user.first_name}
                             src={this.props.user.avatar}/>
                    }
                </div>
            </a>
        );
    }
}

export default ProfileUserComment;
