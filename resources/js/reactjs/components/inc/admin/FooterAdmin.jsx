import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class  FooterAdmin extends  Component {
    render() {
        return (
            <footer className={"footer" + (this.props.default ? " footer-default" : "")}>
                <Container fluid={this.props.fluid}>
                    <nav>
                        <ul>
                            <li>
                                <a href="/"
                                    className="mr-4-px"
                                    target="_blank">
                                    Ivemo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://presentation.creative-tim.com?ref=nudr-footer"
                                    className="mr-4-px"
                                    target="_blank"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://blog.creative-tim.com?ref=nudr-footer"
                                    target="_blank"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright">
                        &copy; {1900 + new Date().getYear()}, Designed by{" "}
                        <a href="/" target="_blank">
                            Ivemo
                        </a>
                        . Coded by{" "}
                        <a
                            href="/"
                            target="_blank"
                        >
                            KazouGroup
                        </a>
                        .
                    </div>
                </Container>
            </footer>
        );
    }
}
FooterAdmin.defaultProps = {
    default: false,
    fluid: false
};
FooterAdmin.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
};
export default FooterAdmin;
