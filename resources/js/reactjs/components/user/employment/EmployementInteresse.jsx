import React, { Component } from "react";
import moment from 'moment'
import EmployementInteresseList from "./inc/EmployementInteresseList";

require("moment/min/locales.min");
moment.locale('fr');

class EmployementInteresse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employmentsinteresses: [],
            isLoading: false,
            visiable: 4,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 4}
        })
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let itemCategoryemployment = this.props.match.params.categoryemployment;
        dyaxios.get(route('api.employmentsinteresse_site', [itemCategoryemployment])).then(response =>
            this.setState({
                employmentsinteresses: [...response.data],
                isLoading: false,
            }));
    }

    render() {
        const { employmentsinteresses,visiable,isLoading } = this.state;
        const mapEmploymentsinteresses = isLoading ? (
            <></>
        ):(
            employmentsinteresses.slice(0,visiable).map(item => {
                return(
                    <EmployementInteresseList key={item.id} {...item}/>                )
            })
        );
        return (
            <>

                {employmentsinteresses.length >= 0 && (

                    <div className="text-center">
                        <h4 className="title">Annonces similaires</h4>
                    </div>
                )}

                <div className="row">

                    {mapEmploymentsinteresses}

                </div>

                {visiable < employmentsinteresses.length && (
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <button type="button" onClick={this.loadmoresItem} className="btn btn-primary">
                                <b>Voir plus d'annonces</b>
                            </button>
                        </div>
                    </div>
                )}

            </>
        )
    }

}

export default EmployementInteresse;
