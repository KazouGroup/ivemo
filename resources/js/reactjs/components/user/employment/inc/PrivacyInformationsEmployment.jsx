import React, { Component } from 'react';

class PrivacyInformationsEmployment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInformationText: false
        };

        this.showPrivacyInformationsText = this.showPrivacyInformationsText.bind(this);
    }

    showPrivacyInformationsText() {
        this.setState({showInformationText: !this.state.showInformationText});
    }

    render() {
        return (
            <div
                className="ivemoPrivacyInformations">
                <small
                    className="text-muted form-text text-default">Vos
                    informations
                    sont
                    traitées
                    avec
                    sécurité et
                    transmises
                    au
                    professionnel
                    de l’annonce
                    que vous
                    souhaitez
                    contacter
                    afin de
                    gérer votre
                    demande. Pour exercer vos
                    droits conformément à la loi
                    « Informatique et Libertés
                    », <span
                        className="ivemoClickToShowPrivacyInformations"
                        onClick={() => this.showPrivacyInformationsText()}>{this.state.showInformationText ? 'masquez.' : 'cliquez ici.'}</span>
                </small>
                {this.state.showInformationText &&
                <small
                    className="text-muted form-text text-default mt-4">Vous
                    pouvez accéder aux données
                    vous concernant, les faire
                    rectifier ou demander leur
                    effacement. Vous disposez
                    également d'un droit
                    d’opposition, d’un droit à
                    la portabilité et d’un droit
                    à la limitation du
                    traitement des données qui
                    vous concernent que vous
                    pouvez exercer en vous
                    adressant à : Ivemo.cm. Pour plus
                    d’informations, vous pouvez
                    également consulter nos
                    <a href={'/policy_privacy/'} target={'_blank'}
                       className={'ivemoClickToShowPrivacyInformations'}> CGU-Politique de
                        confidentialité.</a></small>}
            </div>
        );
    }
}

export default PrivacyInformationsEmployment;
