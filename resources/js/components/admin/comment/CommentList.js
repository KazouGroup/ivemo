import React,{Component} from "react";



class CommentList extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const avatar_style = {
            width: "60px",
            height: "60px",
            top: "15px",
            left: "15px",
            borderRadius: "50%"
        };
        const {avatar,body} = this.props;
        return(
            <div className="media">
                <a className="float-left" href="#pablo">
                    <div className="avatar">
                        <img className="media-object"
                             src={avatar}
                             alt="..." style={avatar_style}/>
                    </div>
                </a>
                <div className="media-body">
                    <h4 className="media-heading">Tina Andrew
                        <small>· 7 minutes ago</small>
                    </h4>
                    <h6 className="text-muted"></h6>
                    <p>{body}</p>
                    <div className="media-footer">
                        <a href="#pablo"
                           className="btn btn-primary btn-link float-right"
                           rel="tooltip" title=""
                           data-original-title="Reply to Comment">
                            <i className="material-icons">reply</i> Reply
                        </a>
                        <a href="#pablo"
                           className="btn btn-danger btn-link float-right">
                            <i className="material-icons">favorite</i> 243
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default CommentList;
