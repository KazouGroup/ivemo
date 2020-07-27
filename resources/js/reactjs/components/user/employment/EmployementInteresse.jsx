import React, {PureComponent} from "react";
import moment from 'moment'
import EmployementInteresseList from "./inc/EmployementInteresseList";
import Swal from "sweetalert2";
import EmploymentInteressListSkeleton from "../../inc/user/employment/EmploymentInteressListSkeleton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loademploymentinteresse,
    favoriteItem,unfavoriteItem,
    deleteItem,unactiveItem,
} from "../../../redux/actions/employment/employmentActions";

require("moment/min/locales.min");
moment.locale('fr');

class EmployementInteresse extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 4,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 4}
        })
    }

    loadItems(){
        this.props.loademploymentinteresse(this.props)
    }

    componentDidMount() {
       this.loadItems();
    }

    render() {
        const { employmentsinteresses } = this.props;
        const { visiable } = this.state;
        const mapEmploymentsinteresses = employmentsinteresses.length >= 0 ? (

            employmentsinteresses.slice(0,visiable).map(item => {
                return(
                    <EmployementInteresseList key={item.id} {...item}
                                              favoriteItem={this.props.favoriteItem}
                                              unfavoriteItem={this.props.unfavoriteItem}
                                              deleteItem={this.props.deleteItem}
                                              unactiveItem={this.props.unactiveItem}/>                )
            })
        ):(
            <EmploymentInteressListSkeleton/>
        );
        return (
            <>

                {employmentsinteresses.length >= 0 && (

                    <div className="text-center">
                        <h4 className="title">Offres similaires</h4>
                    </div>
                )}

                <div className="row">

                    {mapEmploymentsinteresses}

                </div>

                {visiable < employmentsinteresses.length && (
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
                                <b>Voir plus d'offres</b>
                            </button>
                        </div>
                    </div>
                )}

            </>
        )
    }

}

EmployementInteresse.propTypes = {
    loademploymentinteresse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    employmentsinteresses: state.employments.items

});

export default connect(mapStateToProps,
    {
        loademploymentinteresse,
        favoriteItem,unfavoriteItem,
        deleteItem,unactiveItem,
    }
    )(EmployementInteresse);
