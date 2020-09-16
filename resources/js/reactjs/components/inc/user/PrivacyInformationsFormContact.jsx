import React, { Component } from 'react';

class PrivacyInformationsFormContact extends Component {
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
                        »,
                        <span className="ivemoClickToShowPrivacyInformations"
                            onClick={() => this.showPrivacyInformationsText()}>{this.state.showInformationText ? 'masquez.' : 'cliquez ici.'}
                        </span>
                    </small>
                {this.state.showInformationText &&
                <small className="text-muted form-text text-default mt-4">
                        <div className="text-area">
                        <h5><b>Bon à savoir</b></h5>
                        <ul>
                            <li>Vérifiez si l'agent a une compte sur {$name_site} . Si c'est le cas, nous avons déjà échangé avec ce professionnel.</li>
                            <li>N'envoyez jamais d'argent pour "réserver" un bien, demandez combien payer pour une visite</li>
                                <li>Evitez de transférer de l’argent via des services comme Mobile Money, Western Union …</li>
                                <li>Vérifiez la qualité du logement: attention aux traces d'humidité, électricité, etc. Faites vous accompagner par un expert si besoin.</li>
                                <li>Assurez - vous que votre interlocuteur est un représentant officiel du propriétaire &amp; qu'il dispose des documents nécessaires.</li>
                                <li>Méfiez vous des pseudo-propriétaires qui sont absents ou trop occupés pour vous rencontrer: si vous avez affaire à un professionnel, il se déplacera.</li>
                                <li>Vérifiez que tous les papiers du bien immobilier sont légitimes. De même pour le contrat de bail. Faites vous accompagner par un expert si besoin.</li>
                                <li>Ne donnez pas d’informations personnelles avant la visite.</li>
                                <li>Méfiez-vous des offres trop interessantes.</li>
                        </ul>
                        </div>

                    <span className="ivemoClickToShowPrivacyInformations"
                          onClick={() => this.showPrivacyInformationsText()}>{this.state.showInformationText ? 'masquez.' : 'cliquez ici.'}
                    </span><br/>
                    Vous pouvez accéder aux données
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

export default PrivacyInformationsFormContact;
