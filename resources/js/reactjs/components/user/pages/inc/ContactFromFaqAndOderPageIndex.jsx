import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import { Row, Form, Input,InputGroup,FormGroup } from 'reactstrap';
import FieldInput from "../../../inc/vendor/FieldInput";


class ContactFromFaqAndOderPageIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            phone: '',
            categoryuser_id: '',
            categoryobjet_id: '',
            message: '',
            categoryobjets: [],
            categoryusers: [],
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
            categoryuser_id: this.state.categoryuser_id,
            categoryobjet_id: this.state.categoryobjet_id,
            message: this.state.message,
        };
        let url = route('contactusersfaq_site');
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a été bien envoyé chez ${$name_site}`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInDown",
                            exit: "animate__animated animate__fadeOutUp"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    phone: "",
                    categoryuser_id: "",
                    categoryobjet_id: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    loadItems(){
        fetch(route('api.categoryusers')).then(res => res.json()).then((result) => {
            this.setState({
                categoryusers: [...result]
            });
        });

        fetch(route('api.categoryobjets')).then(res => res.json()).then((result) => {
            this.setState({
                categoryobjets: [...result]
            });
        });
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems()
    }

    render() {
        const {categoryobjets,categoryusers} = this.state;
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                        <h3 className="text-center title">Vous n'avez trouvé ce que vous cherchez?</h3>
                        <h6 className="text-center description">Laissez nous un message pour avoir une reponse dans les brefs delais</h6>
                        <form className="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="now-ui-icons users_circle-08"/></span>
                                        </div>
                                        <FieldInput name="full_name" minLength="3" maxLength="200" type='text' placeholder="Nom complet" value={this.state.full_name}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor} required='required'/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="now-ui-icons ui-1_email-85"/></span>
                                        </div>
                                        <FieldInput name="email" minLength="3" maxLength="200" type='email' placeholder="Email..." value={this.state.email}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor} required='required'/>
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="now-ui-icons tech_mobile"/></span>
                                        </div>
                                        <FieldInput name="phone" minLength="6" maxLength="50" type='number' placeholder="Téléphone" value={this.state.phone}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup>
                                        <select id="categoryuser_id" value={this.state.categoryuser_id || ''} className={`form-control ${this.hasErrorFor('categoryuser_id') ? 'is-invalid' : ''}`}
                                                onChange={this.handleFieldChange} name="categoryuser_id" required="required">
                                            <option value="" disabled="">Vous etes un ...</option>
                                            {categoryusers.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                        {this.renderErrorFor('categoryuser_id')}
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup>
                                        <select id="categoryobjet_id"  value={this.state.categoryobjet_id || ''} className={`form-control ${this.hasErrorFor('categoryobjet_id') ? 'is-invalid' : ''}`}
                                                onChange={this.handleFieldChange} name="categoryobjet_id" required="required">
                                            <option value="" disabled="">Sélèctionnez un sujet</option>
                                            {categoryobjets.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                        {this.renderErrorFor('categoryobjet_id')}
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <InputGroup>
                                        <FieldInput name="message" type='textarea' minLength="5" maxLength="5000" placeholder="Posez ici toutes vos questions !" value={this.state.message}
                                                    handleFieldChange={this.handleFieldChange}
                                                    hasErrorFor={this.hasErrorFor}
                                                    renderErrorFor={this.renderErrorFor} rows="17" required='required'/>
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 ml-auto mr-auto text-center">
                                    <button type="submit" className="btn btn-primary mt-4 btn-lg">
                                        Contacter
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ContactFromFaqAndOderPageIndex;
