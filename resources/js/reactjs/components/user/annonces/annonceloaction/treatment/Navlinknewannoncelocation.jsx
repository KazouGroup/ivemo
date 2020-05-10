import React, { PureComponent } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class Navlinknewannoncelocation extends PureComponent {

    render() {
        return (
            <>
                {!$guest ?
                    <NavLink className="btn btn-danger" to={`/annonce_location/${this.props.match.params.annoncetype}/new/`}>
                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en location</b>
                    </NavLink>
                    :
                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en location</b>
                    </a>
                }

            </>




        )
    }
}
export default withRouter(Navlinknewannoncelocation);
