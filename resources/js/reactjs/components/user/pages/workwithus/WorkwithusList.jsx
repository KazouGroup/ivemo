import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Remarkable } from 'remarkable';
import {Alert, Button, UncontrolledTooltip} from "reactstrap";
import LazyLoad from 'react-lazyload';
import moment from "moment";


class WorkwithusList extends Component {

    render() {
        return (

            <tr key={this.props.id} >
                <td className="text-left">
                    <Link to={`/work_with_us/${this.props.categoryworkwithus.slug}/${this.props.slug}/`}>{this.props.title}</Link>
                </td>
                <td className="text-right">
                    <Link to={`/work_with_us/${this.props.categoryworkwithus.slug}/`}> <b>{this.props.categoryworkwithus.name}</b></Link>
                </td>
                <td className="text-right">
                    <b>{this.props.city.name}</b>
                </td>
            </tr>

        )
    }

}

export default WorkwithusList;
