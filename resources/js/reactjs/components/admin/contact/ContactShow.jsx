import React, {Component} from "react";


class ContactShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: [],
            contact: {},
        }
    }

    // get all the tasks from backend
    loadItems() {
        let faqId = this.props.match.params.faq;
        axios.get(`/account/user`).then(response => this.setState({user: response.data}));
        let url = route('')
        axios.get(`/dashboard/faqs/${faqId}`).then(response => this.setState({contact: response.data,}));
        axios.get('/api/categories_faqs').then(response =>
            this.setState({
                categories_faqs: [...response.data],
            }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        return(
            <>

            </>
        )
    }

}
export default ContactShow;
