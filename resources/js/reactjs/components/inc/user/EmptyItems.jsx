import React from 'react';
import { Link } from "react-router-dom";
import { FaRegFrown } from "react-icons/fa";

const EmptyItems = ({title, syntaxe}) => {
    return (
        <div className="container my-5">
            <div className="row text-center">
                <div className="col">
                    <FaRegFrown className="emptyItemsIcon text-primary my-5"/>
                    <h2 className="display-5">Pas {syntaxe} <b className="text-primary">{title}</b> disponible pour le moment.
                    </h2>
                    <Link className="btn btn-neutral btn-sm" to="/"><i
                        className="now-ui-icons arrows-1_minimal-left"></i> <b>Retour à l'Accueil</b></Link>
                </div>
            </div>
        </div>
    );
}

export default EmptyItems;
