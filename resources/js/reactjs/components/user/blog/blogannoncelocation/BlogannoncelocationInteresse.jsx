import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment'
import { Button, UncontrolledTooltip } from "reactstrap";
import Swal from "sweetalert2";

require("moment/min/locales.min");
moment.locale('fr');

class BlogannoncelocationInteresse extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            blogsinteresse: [],
            //
        }
    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                const url = route('blogannoncecategorylocationdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.blogsinteresse.filter(isNotId);
                    this.setState({blogsinteresse: updatedItems});
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blogs suprimée avec success'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    loadItems(){
         let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.blogannoncelocationinteresse_site', [itemCategoryannoncelocation])).then(response =>
            this.setState({
                blogsinteresse: [...response.data],
            }));
    }
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const { blogsinteresse } = this.state;
        const mapBloginteresse = blogsinteresse.length ? (
            blogsinteresse.map(item => {
                return (
                    <div key={item.id} className="col-md-4 mx-auto">
                        <div className="card card-product">
                            <div className="card-image">
                                <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}>
                                    <img className="img rounded" alt={item.title} src={item.photo} />
                                </Link>
                            </div>
                            {!$guest && (
                                <>
                                    {($userIvemo.id === item.user_id && $userIvemo.id === item.user.id) && (
                                        <div className="row">
                                            <div className="mx-auto">
                                                <UncontrolledTooltip placement="bottom" target="TooltipEdit">
                                                    Editer cet article
                                                </UncontrolledTooltip>
                                                <NavLink to={`/blogs/annonce_locations/${item.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" id="TooltipEdit">
                                                    <i className="now-ui-icons ui-2_settings-90" />
                                                </NavLink>
                                                <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                    Supprimer cette annonce
                                                </UncontrolledTooltip>
                                                <Button
                                                    className="btn btn-sm btn-icon btn-danger" onClick={() => this.deleteItem(item.id)} color="secondary" id="TooltipDelete">
                                                    <i className="now-ui-icons ui-1_simple-remove" />
                                                </Button>{" "}
                                            </div>
                                        </div>

                                    )}

                                </>
                            )}

                            <div className="card-body text-center">
                                <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/`} className={`btn btn-sm btn-${item.categoryannoncelocation.color_name}`}>
                                    {item.categoryannoncelocation.name}
                                </Link>
                                <h6 className="card-title text-center">
                                    <NavLink to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`} className="card-link"> {item.title}</NavLink>
                                </h6>
                                <b />
                                <p className="card-description">
                                    <b dangerouslySetInnerHTML={{ __html: (item.description.length > 48 ? item.description.substring(0, 48) + "..." : item.description) }} />
                                    <Link to={`/blogs/annonce_locations/${item.categoryannoncelocation.slug}/${moment(item.created_at).format('YYYY-MM-DD')}/${item.slug}/`}> lire la suite </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
                <></>
            );

        return (
            <>

                {blogsinteresse.length > 0 && (

                    <div className="text-center">
                        <h4 className="title">Ces postes peuvent vous interesser </h4>
                    </div>
                )}

                <div className="row">

                    {mapBloginteresse}

                </div>

            </>
        )
    }

}

export default BlogannoncelocationInteresse;
