import React, { Component } from "react";


class FaqByStatus extends Component {
    constructor () {
        super();
        this.state = {
            faqs: []
        };
    }

    loadItems() {
        axios.get(`/api/faqs/v1`).then(response =>
            this.setState({
                faqs: [...response.data],
            }),
        );
    }
    reload(){
        this.loadItems()
    }
    componentDidMount () {
        this.loadItems();
    }

    render() {
        let { faqs } = this.state;
        return (
            <div className="row">
                <div className="col-md-11 ml-auto mr-auto">
                    <div id="accordion" role="tablist">

                        {faqs.map((item) => (
                        <div className="card card-collapse">
                            <div className="card-header" role="tab" id="headingOne">
                                <h5 className="mb-0">
                                    <a className="collapsed" data-toggle="collapse" href="#collapseOne"
                                       aria-expanded="false" aria-controls="collapseOne">
                                        Collapsible Group Item #1
                                        <i className="material-icons">keyboard_arrow_down</i>
                                    </a>
                                </h5>
                            </div>
                            <div id="collapseOne" className="collapse"
                                 role="tabpanel" aria-labelledby="headingOne"
                                 data-parent="#accordion">
                                <div className="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod
                                </div>
                            </div>
                        </div>
                        ))}


                    </div>
                </div>
            </div>
        );
    }
}
export default FaqByStatus;
