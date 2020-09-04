import React, { PureComponent } from "react";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import NavannoncecategorySkeleton from "../../../../inc/user/NavannoncecategorySkeleton";
import {connect} from "react-redux";
import {loadCategoryannonces} from "../../../../../redux/actions/annoncelocation/annoncelocationActions";


class Categoriesannoncereselocation extends PureComponent {

    componentDidMount() {
        this.props.loadCategoryannonces();
    }

    getcountcategoryannonceString (annoncelocations_count) {
        annoncelocations_count = annoncelocations_count +'';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count/1000).toFixed(annoncelocations_count % 1000 !== 0)+'k';
    }

    render() {
        const {categoryannoncelocations} = this.props;
        const mapCategoryannoncelocations = categoryannoncelocations.length >= 0 ? (
            categoryannoncelocations.map(item => {
                return(
                    <tr key={item.id}>
                        <td>
                            <NavLink to={`/als/locations/${item.slug}/`}>
                                Trouver un(e) <strong>{item.name}</strong> à louer
                            </NavLink>
                        </td>
                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} {item.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                    </tr>                )
            })
        ):(
            <NavannoncecategorySkeleton/>
        );
        return (


            <div className="card card-plain">
                <div className="card-header" role="tab" id="headingIni">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseIni" aria-expanded="true" aria-controls="collapseIni">
                        <b>De quoi avez vous bésoin?</b>
                        <i className="now-ui-icons arrows-1_minimal-down"/>
                    </a>
                </div>
                <div id="collapseIni" className="collapse show" role="tabpanel" aria-labelledby="headingIni">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {mapCategoryannoncelocations}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }

}

Categoriesannoncereselocation.propTypes = {
    loadCategoryannonces: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    categoryannoncelocations: store.annoncelocations.catgoryannoncelocations

});
export default connect(mapStoreToProps, {loadCategoryannonces})(Categoriesannoncereselocation);
