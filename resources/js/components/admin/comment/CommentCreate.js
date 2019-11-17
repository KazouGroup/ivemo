import React,{useState} from "react";



const CommentCreate = (props)=> {
    const {handleCommentSubmit} = props;

    const [comment , setComment] = useState('');

    return(
        <div className="media-body">
            <div className="form-group label-floating bmd-form-group">
                <label
                    className="form-control-label bmd-label-floating"
                    htmlFor="exampleBlogPost"> Write some nice
                    stuff or nothing...</label>
                <textarea className="form-control" rows="2" name="comment"
                          id="exampleBlogPost" onChange={event => setComment(event.target.value)} value={comment}></textarea>
            </div>
            <div className="media-footer">
                <button type={'button'} onClick={event =>
                {handleCommentSubmit(comment);setComment('')}}
                   className="btn btn-primary btn-sm btn-wd float-right">Post
                    Comment</button>
            </div>
        </div>
    );

};
export default CommentCreate;
