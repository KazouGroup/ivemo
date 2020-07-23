import React, { PureComponent } from "react";
import { Row, Form, Input,InputGroup,FormText} from 'reactstrap';


class FormNewletterSubcribeProfileAccountUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
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
            user_email: this.state.user_email,
        };
        let itemuser = this.props.match.params.user;
        let url = route('subscriberuser_public_mail.site',[itemuser]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Merci de vous être abonné à ma newsletter`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'bottom',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInUp",
                            exit: "animate__animated animate__fadeOutDown"
                        },
                    });

                this.setState({
                    user_email: "",
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

    render() {
        return (


            <Form role="form" id="contact-form" onSubmit={this.sendmessageItem} acceptCharset="UTF-8">

                <Row>
                    <div className="col-sm-8">
                        <InputGroup>
                            <div className="input-group-prepend">
                             <span className="input-group-text">
                              <i className="now-ui-icons ui-1_email-85"/>
                             </span>
                            </div>
                            <Input id='user_email'
                                   type='email'
                                   className={`form-control ${this.hasErrorFor('user_email') ? 'is-invalid' : ''}`}
                                   name='user_email'
                                   placeholder="Entrez votre adresse email"
                                   aria-label="Entrez votre adresse email"
                                   autoComplete="user_email"
                                   required={'required'}
                                   maxLength="200"
                                   minLength="2"
                                   value={this.state.user_email}
                                   onChange={this.handleFieldChange}>
                            </Input>
                            {this.renderErrorFor('user_email')}
                        </InputGroup>
                        <FormText className="text-muted" color="default" id="emailHelp">
                            <b>Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.</b>
                        </FormText>
                    </div>
                    <div className="col-sm-4">
                        <button type="submit"
                                className="btn btn-primary btn-block">S'abonnez
                        </button>
                    </div>
                </Row>
            </Form>

        )
    }

}

export default FormNewletterSubcribeProfileAccountUser;
