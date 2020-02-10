import React, { Component } from "react";
import {Remarkable} from "remarkable";


class ProfileAccountTeamUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamusers:[],
        };
    }

    // lifecycle method
    componentDidMount() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.teamuserpublique',[itemuser])).then(response =>
            this.setState({
                teamusers: [...response.data],
            }));
    }
    getDescription(item) {
        const md = new Remarkable();
        return { __html: md.render(item.description) };
    }
    render() {
        const {teamusers} = this.state;
        return (
            <>
                {teamusers.length > 0 && (

                    <div className="card">
                        <div className="card-body">
                            <div className="card-header text-center">
                                <h4 className="card-title"><b>Team</b></h4>
                            </div>

                            <div className="row">

                                {teamusers.map((item) => (

                                    <div key={item.id} className="col-md-4 mx-auto">
                                        <div className="card card-profile card-plain">
                                            <div className="card-avatar">
                                                <img className="img img-raised" src={item.photo}/>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title">{item.full_name}</h4>
                                                <h6 className="category text-gray">
                                                    {item.role}
                                                </h6>
                                                <p className="card-description" dangerouslySetInnerHTML={this.getDescription(item)} />

                                            </div>
                                        </div>
                                    </div>
                                ))}


                            </div>

                        </div>
                    </div>
                )}

            </>



        )
    }

}

export default ProfileAccountTeamUser;
