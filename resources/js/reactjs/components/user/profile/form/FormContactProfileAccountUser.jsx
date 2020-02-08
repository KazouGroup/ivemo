import React, { Component } from "react";


class FormContactProfileAccountUser extends Component {
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
        let url = route('public_profile_send_message.site',[itemuser]);
        dyaxios.post(url, item)
            .then(() => {
              console.log("okkk coul");

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

    // lifecycle method
    componentDidMount() {
        //
    }

    render() {
        return (


            <form role="form" id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">

                <div className="card-body">

                    <div className="row">
                        <label>Nom complet</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                            </div>
                            <input id='full_name'
                                   type='text'
                                   className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                   name='full_name'
                                   placeholder="Nom complet"
                                   aria-label="Nom complet"
                                   autoComplete="full_name"
                                   value={this.state.full_name}
                                   onChange={this.handleFieldChange}
                            />
                            {this.renderErrorFor('full_name')}
                        </div>
                    </div>

                    <div className="row">

                        <label>Email</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
                            </div>
                            <input id='email'
                                   type='email'
                                   className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                   name='email'
                                   placeholder="Email"
                                   aria-label="Email"
                                   autoComplete="email"
                                   value={this.state.email}
                                   onChange={this.handleFieldChange}
                            />
                            {this.renderErrorFor('email')}
                        </div>
                    </div>
                    <div className="row">
                        <label>Numero de téléphone</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons tech_mobile"/></span>
                            </div>
                            <input id='phone'
                                   type='text'
                                   className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                                   name='phone'
                                   placeholder="Téléphone"
                                   aria-label="Téléphone"
                                   value={this.state.phone}
                                   onChange={this.handleFieldChange}
                            />
                            {this.renderErrorFor('phone')}
                        </div>


                    </div>
                    <div className="row">
                        <label>Suject</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"/></span>
                            </div>
                            <input id='subject'
                                   type='text'
                                   className={`form-control ${this.hasErrorFor('subject') ? 'is-invalid' : ''}`}
                                   name='subject'
                                   placeholder="Object..."
                                   aria-label="Object"
                                   autoComplete="subject"
                                   value={this.state.subject}
                                   onChange={this.handleFieldChange}
                            />
                            {this.renderErrorFor('subject')}
                        </div>
                    </div>
                    <div className="row">
                        <label>Votre message</label>
                        <div className="input-group">
                                                       <textarea name="message" value={this.state.message}
                                                                 onChange={this.handleFieldChange}
                                                                 placeholder={'Posez ici toutes vos questions !'}
                                                                 className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                 id="message"
                                                                 rows="10" />
                            {this.renderErrorFor('message')}
                        </div>
                    </div>
                    <div className="submit text-center">
                        <button className="btn btn-primary btn-lg" type="submit">
                            <i className="now-ui-icons ui-1_email-85"/> Contacter l'agence
                        </button>
                    </div>
                </div>


            </form>


        )
    }

}

export default FormContactProfileAccountUser;
