import React, { PureComponent } from "react";


class StatusComment extends PureComponent {

    render() {
        return (
            <>
                <div className="alert alert-danger" role="alert">
                    <div className="container">
                        <div className="text-center">
                            <b>Vous avez désactivé les commentaires pour cette annonce. Vous êtes à présent la seule
                                personne à voir et à commenter.</b>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default StatusComment;
