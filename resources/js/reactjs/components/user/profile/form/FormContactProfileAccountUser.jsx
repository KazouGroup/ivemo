import React, {PureComponent} from "react";
import {Button, Form, Input, InputGroup, Row, UncontrolledTooltip} from 'reactstrap';
import FieldInput from "../../../inc/vendor/FieldInput";
import {Link, NavLink} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ButonFollowerUser from "../../../inc/vendor/follow/ButonFollowerUser";
import moment from "moment";

const abbrev = ['', 'k', 'M', 'B', 'T'];

class FormContactProfileAccountUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            phone: '',
            subject: '',
            message: '',
            errors: [],
        };
        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    // Handle Errors
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    sendmessageItem(e) {
        e.preventDefault();
        let item = {
            email: this.state.email,
            full_name: this.state.full_name,
            phone: this.state.phone,
            subject: this.state.subject,
            message: this.state.message,
        };
        let itemuser = this.props.match.params.user;
        let url = route('public_profile_send_message.site', [itemuser]);
        dyaxios.post(url, item)
            .then(() => {
                $.notify({
                        message: `Votre message a été bien envoyé à cet utilisateur.`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    // Lifecycle Component Method
    componentDidMount() {
        //
    }

    data_countfollowFormatter(countfollowerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countfollowingFormatter(countfollowingusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowingusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowingusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        return (
            <Form role="form" id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex align-items-center">
                            {this.props.avatar ?
                                <NavLink to={`/pro/${this.props.slug}/`}>
                                    <img src={this.props.avatar}
                                         style={{height: "40px", width: "80px"}}
                                         alt={this.props.first_name}
                                         className="avatar"/>
                                </NavLink>
                                : <Skeleton circle={false} height={40} width={80}/>}
                            <div className="mx-3">
                                <span
                                   className="text-dark font-weight-600 text-sm"><b>{this.props.first_name}</b>
                                    <small
                                        className="d-block text-muted">Membre
                                        depuis {moment(this.props.created_at).format('LL')}</small>
                                    <Link to={this.props.status_profile ? `/pro/${this.props.slug}/followers/`:`/user/${this.props.slug}/followers/`}><b>{this.data_countfollowFormatter(this.props.countfollowerusers || "")} {this.props.countfollowerusers > 1 ? "abonnés" : "abonné"}</b></Link> | <Link to={this.props.status_profile ? `/pro/${this.props.slug}/following/`:`/user/${this.props.slug}/following/`} ><b>{this.data_countfollowingFormatter(this.props.countfollowingusers || "")} {this.props.countfollowingusers > 1 ? "abonnements" : "abonnement"}</b></Link>
                                </span>
                            </div>
                        </div>
                        <div className="text-right ml-auto">
                            {this.props.phone && (
                                <>
                                    <UncontrolledTooltip placement="bottom" target="TooltipPhone">
                                        {this.props.phone}
                                    </UncontrolledTooltip>
                                    <Button className="btn btn-icon btn-sm btn-info" id="TooltipPhone">
                                        <i className="now-ui-icons tech_mobile"/>
                                    </Button>
                                </>
                            )}

                            <ButonFollowerUser {...this.props}
                                               unfollowerItem={this.props.unfollowerItem}
                                               followerItem={this.props.followerItem}
                                               classNameDanger="btn btn-sm btn-danger"
                                               classNameInfo="btn btn-sm btn-info"
                                               nameunfollower={`Suivre`}
                                               nameununfollower={`Abonné`}/>

                        </div>
                    </div>
                    <br/>
                    <Row>
                        <InputGroup>
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons users_circle-08"/></span>
                            </div>
                            <FieldInput name="full_name" type='text' minLength="4" maxLength="50"
                                        placeholder="Nom complet" value={this.state.full_name}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons ui-1_email-85"/></span>
                            </div>
                            <FieldInput name="email" type='email' minLength="3" maxLength="50" placeholder="Email"
                                        value={this.state.email}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons tech_mobile"/></span>
                            </div>

                            <FieldInput name="phone" type='number' minLength="3" maxLength="15" placeholder="Téléphone"
                                        value={this.state.phone}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="now-ui-icons text_caps-small"/></span>
                            </div>
                            <FieldInput name="subject" type='text' minLength="3" maxLength="200" placeholder="Object"
                                        value={this.state.subject}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        renderErrorFor={this.renderErrorFor}/>

                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <Input type="textarea" name="message" value={this.state.message}
                                   onChange={this.handleFieldChange}
                                   placeholder={'Posez ici toutes vos questions !'}
                                   className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                   id="message"
                                   rows="15"/>
                            {this.renderErrorFor('message')}
                        </InputGroup>
                    </Row>
                    <div className="submit text-center">
                        <button className="btn btn-primary btn-lg" type="submit">
                            <i className="now-ui-icons ui-1_email-85"/> Envoyez
                        </button>
                    </div>
                </div>
            </Form>
        )
    }
}

export default FormContactProfileAccountUser;
