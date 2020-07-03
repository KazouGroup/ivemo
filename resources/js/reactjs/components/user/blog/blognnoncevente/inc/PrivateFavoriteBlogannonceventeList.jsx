import React, { PureComponent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button,UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import LazyLoad from "react-lazyload";


class PrivateFavoriteBlogannonceventeList extends PureComponent {


    getDescription() {
        return { __html: (this.props.blogannoncevente.description.length > 80 ? this.props.blogannoncevente.description.substring(0, 80) + "..." : this.props.blogannoncevente.description) };
    }
    render() {
        return (

            <div className="card">
                <div className="card-body">

                    <div className="card card-plain card-blog">
                        <div className="row">

                            <div className="col-md-8">

                                     <span className="title">
                                         <a target="_blank" href={`/blogs/annonce_ventes/${this.props.blogannoncevente.categoryannoncevente.slug}/${moment(this.props.blogannoncevente.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncevente.slug}/`} className="card-link"> {this.props.blogannoncevente.title.length > 80 ? this.props.blogannoncevente.title.substring(0, 80) + "..." : this.props.blogannoncevente.title} | </a>
                                         <Link to={`/blogs/annonce_ventes/${this.props.blogannoncevente.categoryannoncevente.slug}/`}
                                               className={`btn btn-sm btn-${this.props.blogannoncevente.categoryannoncevente.color_name}`}>
                                             {this.props.blogannoncevente.categoryannoncevente.name}
                                         </Link>
                                     </span>
                                <a target="_blank" href={`/blogs/annonce_ventes/${this.props.blogannoncevente.categoryannoncevente.slug}/${moment(this.props.blogannoncevente.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncevente.slug}/`}>
                                    <span dangerouslySetInnerHTML={this.getDescription()}/>
                                </a>

                                <div className="card-footer">
                                    <div className="author">
                                        <Link to={`/pro/${this.props.blogannoncevente.user.slug}/blogs/annonce_ventes/`}>
                                            {this.props.blogannoncevente.user.avatar === null ?
                                                <img className="avatar img-raised" alt={this.props.blogannoncevente.user.first_name}
                                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                                :
                                                <img className="avatar img-raised" alt={this.props.blogannoncevente.user.first_name}
                                                     src={this.props.blogannoncevente.user.avatar}/>
                                            }
                                            <b>{this.props.blogannoncevente.user.first_name}</b>
                                        </Link>
                                    </div>

                                    <div className="stats stats-right">
                                        <i className="now-ui-icons tech_watch-time"/> {moment(this.props.blogannoncevente.created_at).format('ll')} - {this.props.blogannoncevente.red_time}  min de lecture
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="card-image">
                                    <a target="_blank" href={`/blogs/annonce_ventes/${this.props.blogannoncevente.categoryannoncevente.slug}/${moment(this.props.blogannoncevente.created_at).format('YYYY-MM-DD')}/${this.props.blogannoncevente.slug}/`}>
                                        <LazyLoad>
                                            <img className="img rounded"
                                                 src={this.props.blogannoncevente.photo} alt={this.props.blogannoncevente.title}/>
                                        </LazyLoad>
                                    </a>
                                </div>
                                <div className="text-center">

                                    <Button onClick={() => this.props.unfavoriteItem(this.props.blogannoncevente.id)}
                                            className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                        <i className="fas fa-bookmark"></i>
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

export default PrivateFavoriteBlogannonceventeList;
