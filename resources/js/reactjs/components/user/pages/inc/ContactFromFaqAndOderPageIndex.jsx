import React, { Component,Fragment } from "react";
import { Link } from 'react-router-dom';
import { Row, Form, Input,InputGroup,FormGroup } from 'reactstrap';


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
                        message: `Votre message a été bien envoyé chez Ivemo`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animated fadeInDown",
                            exit: "animated fadeOutUp"
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

    // lifecycle method
    componentDidMount() {
        this.loadItems()
    }

    render() {
        const {categoryobjets,categoryusers} = this.state;
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-8 mr-auto ml-auto">
                        <h3 className="text-center title">Vous n'avez trouvé ce que vous cherchier?</h3>
                        <h6 className="text-center description">Laissez nous un message pour avoir une reponse dans les brefs delais</h6>
                        <form className="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons users_circle-08"/></span>
                                        </div>
                                        <Input id='full_name'
                                               type='text'
                                               required="required"
                                               className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                               name='full_name'
                                               minLength="3"
                                               maxLength="200"
                                               placeholder="Nom complet"
                                               aria-label="Nom complet"
                                               autoComplete="full_name"
                                               value={this.state.full_name}
                                               onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('full_name')}
                                    </InputGroup>
                                </div>
                                <div className="col-md-6">
                                    <InputGroup>
                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="now-ui-icons ui-1_email-85"/></span>
                                        </div>
                                        <Input id='email'
                                               type='email'
                                               required="required"
                                               className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                               name='email'
                                               minLength="7"
                                               maxLength="200"
                                               placeholder="Email..."
                                               aria-label="Email"
                                               autoComplete="email"
                                               value={this.state.email}
                                               onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('email')}
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
                                        <Input id='phone'
                                               type='number'
                                               className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                               name='phone'
                                               placeholder="Téléphone"
                                               aria-label="Téléphone"
                                               value={this.state.phone}
                                               onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('phone')}
                                    </InputGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup>
                                        <select id="categoryuser_id" value={this.state.categoryuser_id || ''} className={`form-control ${this.hasErrorFor('categoryuser_id') ? 'is-invalid' : ''}`}
                                                onChange={this.handleFieldChange} name="categoryuser_id" required="required">
                                            <option value="" disabled="">Tu es un ...</option>
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
                                            <option value="" disabled="">Sélectionnez un sujet</option>
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
                                        <textarea name="message" value={this.state.message}
                                                  onChange={this.handleFieldChange}
                                                  required="required"
                                                  placeholder={'Posez ici toutes vos questions !'}
                                                  minLength="5"
                                                  maxLength="5000"
                                                  className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                  id="message"
                                                  rows="17" />
                                        {this.renderErrorFor('message')}
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
