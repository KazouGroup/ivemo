import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default class TopNavAdmin extends Component {
    render() {
        return (
            <div className="horizontal-menu-wrapper">
                <div
                    className="header-navbar navbar-expand-sm navbar navbar-horizontal floating-nav navbar-light navbar-without-dd-arrow navbar-shadow menu-border"
                    role="navigation" data-menu="menu-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item mr-auto">
                                <a className="navbar-brand" href="#">
                                <div className="brand-logo"></div>
                                <h2 className="brand-text mb-0">Vuexy</h2>
                            </a></li>
                            <li className="nav-item nav-toggle">
                                <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                                    <i className="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i>
                                    <i className="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" data-ticon="icon-disc"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-container main-menu-header" data-menu="menu-container">
                        <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="index.html" data-toggle="dropdown"><i
                                className="feather icon-home"></i><span data-i18n="Dashboard">Dashboard</span></a>
                                <ul className="dropdown-menu">
                                    <li className="active" data-menu=""><a className="dropdown-item"
                                                                           href="dashboard-analytics.html"
                                                                           data-toggle="dropdown" data-i18n="Analytics"><i
                                        className="feather icon-activity"></i>Analytics</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="dashboard-ecommerce.html"
                                                        data-toggle="dropdown" data-i18n="eCommerce"><i
                                        className="feather icon-shopping-cart"></i>eCommerce</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="#" data-toggle="dropdown"><i
                                className="feather icon-package"></i><span data-i18n="Apps">Apps</span></a>
                                <ul className="dropdown-menu">
                                    <li data-menu=""><a className="dropdown-item" href="app-email.html"
                                                        data-toggle="dropdown" data-i18n="Email"><i
                                        className="feather icon-mail"></i>Email</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="app-chat.html"
                                                        data-toggle="dropdown" data-i18n="Chat"><i
                                        className="feather icon-message-square"></i>Chat</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="app-todo.html"
                                                        data-toggle="dropdown" data-i18n="Todo"><i
                                        className="feather icon-check-square"></i>Todo</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="app-calender.html"
                                                        data-toggle="dropdown" data-i18n="Calender"><i
                                        className="feather icon-calendar"></i>Calender</a>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Ecommerce"><i
                                        className="feather icon-shopping-cart"></i>Ecommerce</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="app-ecommerce-shop.html"
                                                                data-toggle="dropdown" data-i18n="Shop"><i
                                                className="feather icon-circle"></i>Shop</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="app-ecommerce-details.html" data-toggle="dropdown"
                                                                data-i18n="Details"><i
                                                className="feather icon-circle"></i>Details</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="app-ecommerce-wishlist.html"
                                                                data-toggle="dropdown" data-i18n="Wish List"><i
                                                className="feather icon-circle"></i>Wish List</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="app-ecommerce-checkout.html"
                                                                data-toggle="dropdown" data-i18n="Checkout"><i
                                                className="feather icon-circle"></i>Checkout</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="User"><i className="feather icon-user"></i>User</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="app-user-list.html"
                                                                data-toggle="dropdown" data-i18n="List"><i
                                                className="feather icon-circle"></i>List</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="app-user-view.html"
                                                                data-toggle="dropdown" data-i18n="View"><i
                                                className="feather icon-circle"></i>View</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="app-user-edit.html"
                                                                data-toggle="dropdown" data-i18n="Edit"><i
                                                className="feather icon-circle"></i>Edit</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="#" data-toggle="dropdown"><i
                                className="feather icon-layers"></i><span data-i18n="UI Elements">UI Elements</span></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Data List"><i className="feather icon-list"></i>Data List</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="data-list-view.html"
                                                                data-toggle="dropdown" data-i18n="List View"><i
                                                className="feather icon-circle"></i>List View</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="data-thumb-view.html"
                                                                data-toggle="dropdown" data-i18n="Thumb View"><i
                                                className="feather icon-circle"></i>Thumb View</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Content"><i className="feather icon-layout"></i>Content</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="content-grid.html"
                                                                data-toggle="dropdown" data-i18n="Grid"><i
                                                className="feather icon-circle"></i>Grid</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="content-typography.html"
                                                                data-toggle="dropdown" data-i18n="Typography"><i
                                                className="feather icon-circle"></i>Typography</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="content-text-utilities.html"
                                                                data-toggle="dropdown" data-i18n="Text Utilities"><i
                                                className="feather icon-circle"></i>Text Utilities</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="content-syntax-highlighter.html"
                                                                data-toggle="dropdown" data-i18n="Syntax Highlighter"><i
                                                className="feather icon-circle"></i>Syntax Highlighter</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="content-helper-classes.html"
                                                                data-toggle="dropdown" data-i18n="Helper Classes"><i
                                                className="feather icon-circle"></i>Helper Classes</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="colors.html"
                                                        data-toggle="dropdown" data-i18n="Colors"><i
                                        className="feather icon-droplet"></i>Colors</a>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Cards"><i className="feather icon-credit-card"></i>Cards</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="card-basic.html"
                                                                data-toggle="dropdown" data-i18n="Basic"><i
                                                className="feather icon-circle"></i>Basic</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="card-advance.html"
                                                                data-toggle="dropdown" data-i18n="Advance"><i
                                                className="feather icon-circle"></i>Advance</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="card-statistics.html"
                                                                data-toggle="dropdown" data-i18n="Statistics"><i
                                                className="feather icon-circle"></i>Statistics</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="card-analytics.html"
                                                                data-toggle="dropdown" data-i18n="Analytics"><i
                                                className="feather icon-circle"></i>Analytics</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="card-actions.html"
                                                                data-toggle="dropdown" data-i18n="Card Actions"><i
                                                className="feather icon-circle"></i>Card Actions</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Icons"><i className="feather icon-eye"></i>Icons</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="icons-feather.html"
                                                                data-toggle="dropdown" data-i18n="Feather"><i
                                                className="feather icon-circle"></i>Feather</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="icons-font-awesome.html"
                                                                data-toggle="dropdown" data-i18n="Font Awesome"><i
                                                className="feather icon-circle"></i>Font Awesome</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Components"><i className="feather icon-briefcase"></i>Components</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="component-alerts.html"
                                                                data-toggle="dropdown" data-i18n="Alerts"><i
                                                className="feather icon-circle"></i>Alerts</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-buttons-basic.html"
                                                                data-toggle="dropdown" data-i18n="Buttons"><i
                                                className="feather icon-circle"></i>Buttons</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-breadcrumbs.html" data-toggle="dropdown"
                                                                data-i18n="Breadcrumbs"><i
                                                className="feather icon-circle"></i>Breadcrumbs</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-carousel.html"
                                                                data-toggle="dropdown" data-i18n="Carousel"><i
                                                className="feather icon-circle"></i>Carousel</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-collapse.html"
                                                                data-toggle="dropdown" data-i18n="Collapse"><i
                                                className="feather icon-circle"></i>Collapse</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-dropdowns.html" data-toggle="dropdown"
                                                                data-i18n="Dropdowns"><i
                                                className="feather icon-circle"></i>Dropdowns</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-list-group.html" data-toggle="dropdown"
                                                                data-i18n="List Group"><i
                                                className="feather icon-circle"></i>List Group</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-modals.html"
                                                                data-toggle="dropdown" data-i18n="Modals"><i
                                                className="feather icon-circle"></i>Modals</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-pagination.html" data-toggle="dropdown"
                                                                data-i18n="Pagination"><i
                                                className="feather icon-circle"></i>Pagination</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-navs-component.html"
                                                                data-toggle="dropdown" data-i18n="Navs Component"><i
                                                className="feather icon-circle"></i>Navs Component</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-navbar.html"
                                                                data-toggle="dropdown" data-i18n="Navbar"><i
                                                className="feather icon-circle"></i>Navbar</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-tabs-component.html"
                                                                data-toggle="dropdown" data-i18n="Tabs Component"><i
                                                className="feather icon-circle"></i>Tabs Component</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-pills-component.html"
                                                                data-toggle="dropdown" data-i18n="Pills Component"><i
                                                className="feather icon-circle"></i>Pills Component</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-tooltips.html"
                                                                data-toggle="dropdown" data-i18n="Tooltips"><i
                                                className="feather icon-circle"></i>Tooltips</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-popovers.html"
                                                                data-toggle="dropdown" data-i18n="Popovers"><i
                                                className="feather icon-circle"></i>Popovers</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-badges.html"
                                                                data-toggle="dropdown" data-i18n="Badges"><i
                                                className="feather icon-circle"></i>Badges</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-pill-badges.html" data-toggle="dropdown"
                                                                data-i18n="Pill Badges"><i
                                                className="feather icon-circle"></i>Pill Badges</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-progress.html"
                                                                data-toggle="dropdown" data-i18n="Progress"><i
                                                className="feather icon-circle"></i>Progress</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="component-media-objects.html"
                                                                data-toggle="dropdown" data-i18n=""><i
                                                className="feather icon-circle"></i>Media Objects</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-spinner.html"
                                                                data-toggle="dropdown" data-i18n="Spinner"><i
                                                className="feather icon-circle"></i>Spinner</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="component-bs-toast.html"
                                                                data-toggle="dropdown" data-i18n="Toasts"><i
                                                className="feather icon-circle"></i>Toasts</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Extra Components"><i className="feather icon-box"></i>Extra
                                        Components</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ex-component-avatar.html" data-toggle="dropdown"
                                                                data-i18n="Avatar"><i
                                                className="feather icon-circle"></i>Avatar</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="ex-component-chips.html"
                                                                data-toggle="dropdown" data-i18n="Chips"><i
                                                className="feather icon-circle"></i>Chips</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ex-component-divider.html" data-toggle="dropdown"
                                                                data-i18n="Divider"><i
                                                className="feather icon-circle"></i>Divider</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Extensions"><i className="feather icon-box"></i>Extensions</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-sweet-alerts.html"
                                                                data-toggle="dropdown" data-i18n="Sweet Alert"><i
                                                className="feather icon-circle"></i>Sweet Alert</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-toastr.html" data-toggle="dropdown"
                                                                data-i18n="Toastr"><i
                                                className="feather icon-circle"></i>Toastr</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-noui-slider.html"
                                                                data-toggle="dropdown" data-i18n="NoUi Slider"><i
                                                className="feather icon-circle"></i>NoUi Slider</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-file-uploader.html"
                                                                data-toggle="dropdown" data-i18n="File Uploader"><i
                                                className="feather icon-circle"></i>File Uploader</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-quill-editor.html"
                                                                data-toggle="dropdown" data-i18n="Quill Editor"><i
                                                className="feather icon-circle"></i>Quill Editor</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-drag-drop.html"
                                                                data-toggle="dropdown" data-i18n="Drag &amp; Drop"><i
                                                className="feather icon-circle"></i>Drag &amp; Drop</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="ext-component-tour.html"
                                                                data-toggle="dropdown" data-i18n="Tour"><i
                                                className="feather icon-circle"></i>Tour</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-clipboard.html"
                                                                data-toggle="dropdown" data-i18n="Clipboard"><i
                                                className="feather icon-circle"></i>Clipboard</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="ext-component-plyr.html"
                                                                data-toggle="dropdown" data-i18n="Media Player"><i
                                                className="feather icon-circle"></i>Media Player</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-context-menu.html"
                                                                data-toggle="dropdown" data-i18n="Context Menu"><i
                                                className="feather icon-circle"></i>Context Menu</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="ext-component-swiper.html" data-toggle="dropdown"
                                                                data-i18n="swiper"><i
                                                className="feather icon-smartphone"></i>swiper</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="ext-component-i18n.html"
                                                                data-toggle="dropdown" data-i18n="l18n"><i
                                                className="feather icon-circle"></i>l18n</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="#" data-toggle="dropdown"><i
                                className="feather icon-edit-2"></i><span
                                data-i18n="Forms &amp; Tables">Forms &amp; Tables</span></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Form Elements"><i className="feather icon-copy"></i>Form Elements</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="form-select.html"
                                                                data-toggle="dropdown" data-i18n="Select"><i
                                                className="feather icon-circle"></i>Select</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-switch.html"
                                                                data-toggle="dropdown" data-i18n="Switch"><i
                                                className="feather icon-circle"></i>Switch</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-checkbox.html"
                                                                data-toggle="dropdown" data-i18n="Checkbox"><i
                                                className="feather icon-circle"></i>Checkbox</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-radio.html"
                                                                data-toggle="dropdown" data-i18n="Radio"><i
                                                className="feather icon-circle"></i>Radio</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-inputs.html"
                                                                data-toggle="dropdown" data-i18n="Input"><i
                                                className="feather icon-circle"></i>Input</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-input-groups.html"
                                                                data-toggle="dropdown" data-i18n="Input Groups"><i
                                                className="feather icon-circle"></i>Input Groups</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-number-input.html"
                                                                data-toggle="dropdown" data-i18n="Number Input"><i
                                                className="feather icon-circle"></i>Number Input</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="form-textarea.html"
                                                                data-toggle="dropdown" data-i18n="Textarea"><i
                                                className="feather icon-circle"></i>Textarea</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="form-date-time-picker.html" data-toggle="dropdown"
                                                                data-i18n="Date &amp; Time Picker"><i
                                                className="feather icon-circle"></i>Date &amp; Time Picker</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="form-layout.html"
                                                        data-toggle="dropdown" data-i18n="Form Layout"><i
                                        className="feather icon-box"></i>Form Layout</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="form-wizard.html"
                                                        data-toggle="dropdown" data-i18n="Form Wizard"><i
                                        className="feather icon-package"></i>Form Wizard</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="form-validation.html"
                                                        data-toggle="dropdown" data-i18n="Form Validation"><i
                                        className="feather icon-check-circle"></i>Form Validation</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="table.html"
                                                        data-toggle="dropdown" data-i18n="Table"><i
                                        className="feather icon-server"></i>Table</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="table-datatable.html"
                                                        data-toggle="dropdown" data-i18n="Datatable"><i
                                        className="feather icon-grid"></i>Datatable</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="table-ag-grid.html"
                                                        data-toggle="dropdown" data-i18n="agGrid Table"><i
                                        className="feather icon-grid"></i>agGrid Table</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="#" data-toggle="dropdown"><i
                                className="feather icon-file"></i><span data-i18n="Pages">Pages</span></a>
                                <ul className="dropdown-menu">
                                    <li data-menu=""><a className="dropdown-item" href="page-user-profile.html"
                                                        data-toggle="dropdown" data-i18n="Profile"><i
                                        className="feather icon-user"></i>Profile</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="page-account-settings.html"
                                                        data-toggle="dropdown" data-i18n="Account Settings"><i
                                        className="feather icon-settings"></i>Account Settings</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="page-faq.html"
                                                        data-toggle="dropdown" data-i18n="FAQ"><i
                                        className="feather icon-help-circle"></i>FAQ</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="page-knowledge-base.html"
                                                        data-toggle="dropdown" data-i18n="Knowledge Base"><i
                                        className="feather icon-info"></i>Knowledge Base</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="page-search.html"
                                                        data-toggle="dropdown" data-i18n="Search"><i
                                        className="feather icon-search"></i>Search</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="page-invoice.html"
                                                        data-toggle="dropdown" data-i18n="Invoice"><i
                                        className="feather icon-file"></i>Invoice</a>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Authentication"><i className="feather icon-unlock"></i>Authentication</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="auth-login.html"
                                                                data-toggle="dropdown" data-i18n="Login"><i
                                                className="feather icon-circle"></i>Login</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="auth-register.html"
                                                                data-toggle="dropdown" data-i18n="Register"><i
                                                className="feather icon-circle"></i>Register</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="auth-forgot-password.html" data-toggle="dropdown"
                                                                data-i18n="Forgot Password"><i
                                                className="feather icon-circle"></i>Forgot Password</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="auth-reset-password.html" data-toggle="dropdown"
                                                                data-i18n="Reset Password"><i
                                                className="feather icon-circle"></i>Reset Password</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="auth-lock-screen.html"
                                                                data-toggle="dropdown" data-i18n="Lock Screen"><i
                                                className="feather icon-circle"></i>Lock Screen</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Miscellaneous"><i className="feather icon-file-text"></i>Miscellaneous</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="page-coming-soon.html"
                                                                data-toggle="dropdown" data-i18n="Coming Soon"><i
                                                className="feather icon-circle"></i>Coming Soon</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="error-404.html"
                                                                data-toggle="dropdown" data-i18n="404"><i
                                                className="feather icon-circle"></i>Error 404</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="error-500.html"
                                                                data-toggle="dropdown" data-i18n="500"><i
                                                className="feather icon-circle"></i>Error 500</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item"
                                                                href="page-not-authorized.html" data-toggle="dropdown"
                                                                data-i18n="Not Authorized"><i
                                                className="feather icon-circle"></i>Not Authorized</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="page-maintenance.html"
                                                                data-toggle="dropdown" data-i18n="Maintenance"><i
                                                className="feather icon-circle"></i>Maintenance</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="#" data-toggle="dropdown"><i
                                className="feather icon-bar-chart-2"></i><span
                                data-i18n="Charts &amp; Maps">Charts &amp; Maps</span></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Charts"><i className="feather icon-pie-chart"></i>Charts</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="chart-apex.html"
                                                                data-toggle="dropdown" data-i18n="Apex"><i
                                                className="feather icon-circle"></i>Apex</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="chart-chartjs.html"
                                                                data-toggle="dropdown" data-i18n="Chartjs"><i
                                                className="feather icon-circle"></i>Chartjs</a>
                                            </li>
                                            <li data-menu=""><a className="dropdown-item" href="chart-echarts.html"
                                                                data-toggle="dropdown" data-i18n="Echarts"><i
                                                className="feather icon-circle"></i>Echarts</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="maps-google.html"
                                                        data-toggle="dropdown" data-i18n="Google Maps"><i
                                        className="feather icon-map"></i>Google Maps</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown nav-item" data-menu="dropdown"><a
                                className="dropdown-toggle nav-link" href="#" data-toggle="dropdown"><i
                                className="feather icon-more-horizontal"></i><span data-i18n="Others">Others</span></a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                        className="dropdown-item dropdown-toggle" href="#" data-toggle="dropdown"
                                        data-i18n="Menu Levels"><i className="feather icon-menu"></i>Menu Levels</a>
                                        <ul className="dropdown-menu">
                                            <li data-menu=""><a className="dropdown-item" href="#"
                                                                data-toggle="dropdown" data-i18n="Second Level"><i
                                                className="feather icon-circle"></i>Second Level</a>
                                            </li>
                                            <li className="dropdown dropdown-submenu" data-menu="dropdown-submenu"><a
                                                className="dropdown-item dropdown-toggle" href="#"
                                                data-toggle="dropdown" data-i18n="Second Level"><i
                                                className="feather icon-circle"></i>Second Level</a>
                                                <ul className="dropdown-menu">
                                                    <li data-menu=""><a className="dropdown-item" href="#"
                                                                        data-toggle="dropdown"
                                                                        data-i18n="Third Level"><i
                                                        className="feather icon-circle"></i>Third Level</a>
                                                    </li>
                                                    <li data-menu=""><a className="dropdown-item" href="#"
                                                                        data-toggle="dropdown"
                                                                        data-i18n="Third Level"><i
                                                        className="feather icon-circle"></i>Third Level</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="disabled" data-menu=""><a className="dropdown-item" href=""
                                                                             data-toggle="dropdown"
                                                                             data-i18n="Disabled Menu"><i
                                        className="feather icon-eye-off"></i>Disabled Menu</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item"
                                                        href="https://pixinvent.com/demo/vuexy-html-bootstrap-admin-template/documentation"
                                                        data-toggle="dropdown" data-i18n="Documentation"><i
                                        className="feather icon-folder"></i>Documentation</a>
                                    </li>
                                    <li data-menu=""><a className="dropdown-item" href="https://pixinvent.ticksy.com/"
                                                        data-toggle="dropdown" data-i18n="Raise Support"><i
                                        className="feather icon-life-buoy"></i>Raise Support</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
