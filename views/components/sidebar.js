const { render_data } = require("../../services/render");

const sidebarMain = async (role, authParts=[])=> {
    console.log(role);
    let sidebarCounts = await render_data("/api/v1/sidebar/counts", "");
    let sidebarCountsArr = {
        order_pending_count: 0,
        order_processing_count: 0,
        order_delivered_count: 0,
        order_canceled_count: 0,
        order_paid_count: 0,
        notification_count: 0
    }
    if(sidebarCounts){
        sidebarCountsArr.order_pending_count = sidebarCounts.data.order_pending_count;
        sidebarCountsArr.order_processing_count = sidebarCounts.data.order_processing_count;
        sidebarCountsArr.order_delivered_count = sidebarCounts.data.order_delivered_count;
        sidebarCountsArr.order_canceled_count = sidebarCounts.data.order_canceled_count;
        sidebarCountsArr.order_paid_count = sidebarCounts.data.order_paid_count;
        sidebarCountsArr.notification_count = sidebarCounts.data.notification_count;
        sidebarCountsArr.gift_voucher_booking_paid_count = sidebarCounts.data.gift_voucher_booking_paid_count;
        sidebarCountsArr.gift_voucher_booking_canceled_count = sidebarCounts.data.gift_voucher_booking_canceled_count;
        sidebarCountsArr.gift_voucher_booking_delivered_count = sidebarCounts.data.gift_voucher_booking_delivered_count;
        sidebarCountsArr.gift_voucher_booking_processing_count = sidebarCounts.data.gift_voucher_booking_processing_count;
        sidebarCountsArr.gift_voucher_booking_pending_count = sidebarCounts.data.gift_voucher_booking_pending_count;
    }
    if(role === 4) {
        return sidebarModerator(authParts, sidebarCountsArr);
    } else {
        return sidebar(sidebarCountsArr);
    }
}
const sidebarModerator = (authParts, sidebarCountsArr)=> {
    let head   = `
    <div id="layoutSidenav_nav">
    <nav class="sidenav shadow-right sidenav-light">
        <div class="sidenav-menu">
            <div class="nav accordion" id="accordionSidenav">
                <!-- Sidenav Menu Heading (Core)-->`;
    let bottom = `
            </div>
        </div>
        <div class="sidenav-footer">
            <div class="sidenav-footer-content">
            </div>
        </div>
    </nav>
    </div>`;
    let full = head;
    if(authParts.includes('notification_center')) {
        full += `<div class="sidenav-menu-heading">Notifications</div>
        <!-- Sidenav Accordion (Dashboard)-->
        <a class="nav-link" href="/notification-center">
            <div>
                <div class="nav-link-icon">
                    <i class="fa-regular fa-bell"></i>
                </div>
                Notification Center
            </div>
            <span class="sidebar-count-bubble">${sidebarCountsArr.notification_count}</span>
        </a>`;
    }
    let appointment = 0;
    if(authParts.includes('appointment_management')) {
        appointment = 1;
        full += `<div class="sidenav-menu-heading">Appointment</div>
        <!-- Sidenav Accordion (Dashboard)-->
        <a class="nav-link" href="/appointment">
            <div class="nav-link-icon"><i class="fa-regular fa-calendar"></i></div>Appointment List
        </a>`;
    }
    if(authParts.includes('holiday_management')) {
        if(appointment === 0) {
            full += `<div class="sidenav-menu-heading">Appointment</div>`;
        }
        full += `<a class="nav-link" href="/holidays">
        <div class="nav-link-icon"><i class="fa-regular fa-calendar-xmark"></i></div>Holidays
    </a>`;
    }
    if(authParts.includes('user_management')) {
        full += `<div class="sidenav-menu-heading">User List</div>
        <!-- Sidenav Accordion (Dashboard)-->
        <a class="nav-link" href="/user-list">
            <div class="nav-link-icon"><i class="fa-solid fa-user"></i></i></div>User List
        </a>`;
    }
    let event = 0;
    if(authParts.includes('ticket_category_management')) {
        event = 1;
        full += `<div class="sidenav-menu-heading">Event Management</div>
        <!-- Sidenav Accordion (Dashboard)-->
        <a class="nav-link" href="/ticket-category">
            <div class="nav-link-icon"><i class="fa-solid fa-ticket"></i></i></div>Ticket Category Manage
        </a>`;
    }
    if(authParts.includes('event_management')) {
        if(event === 0) {
            full += `<div class="sidenav-menu-heading">Event Management</div>`;
        }
        event = 1;
        full += `<a class="nav-link" href="/event-management">
        <div class="nav-link-icon"><i class="fa-regular fa-calendar-check"></i></i></div>Event Manage
    </a>`;
    }
    if(authParts.includes('gift_voucher_management')) {
        if(event === 0) {
            full += `<div class="sidenav-menu-heading">Event Management</div>`;
        }
        event = 1;
        full += `<a class="nav-link" href="/gift-voucher">
        <div class="nav-link-icon"><i class="fa-solid fa-gift"></i></div>Gift Voucher Manage
    </a>`;
    }
    let booking = 0;
    if(authParts.includes('gift_voucher_booking_management')) {
        booking = 1;
        full += `<div class="sidenav-menu-heading">Booking Management</div>
        <!-- Sidenav Accordion (Dashboard)-->
        <a class="nav-link" href="/gift-voucher-bookings">
            <div class="nav-link-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>Gift Voucher Bookings
        </a>`;
    }
    if(authParts.includes('seat_booking_management')) {
        if(booking === 0) {
            full += `<div class="sidenav-menu-heading">Booking Management</div>`;
        }
        booking = 1;
        full += `<a class="nav-link" href="/seats-bookings">
        <div class="nav-link-icon"><i class="fa-solid fa-chair"></i></div>Seat Bookings
    </a>`;
    }
    if(authParts.includes('seat_attendance_management')) {
        if(booking === 0) {
            full += `<div class="sidenav-menu-heading">Booking Management</div>`;
        }
        booking = 1;
        full += `<a class="nav-link" href="/seat-attendance">
        <div class="nav-link-icon"><i class="fa-solid fa-chair"></i></div>Seat Attendance
    </a>`;
    }
    let order = 0;
    if(authParts.includes('pending_order_management')) {
        if(order === 0) {
            full += `<div class="sidenav-menu-heading">Order Management</div>`;
        }
        order = 1;
        full += `<a class="nav-link" href="/order-pending-list">
        <div>
        <div class="nav-link-icon"><i class="fa-solid fa-spinner"></i></div>Pending Orders List </div><span class="sidebar-count-bubble">${sidebarCountsArr.order_pending_count}</span>
    </a>`;
    }
    if(authParts.includes('paid_order_management')) {
        if(order === 0) {
            full += `<div class="sidenav-menu-heading">Order Management</div>`;
        }
        order = 1;
        full += `<a class="nav-link" href="/order-paid-list">
        <div>
        <div class="nav-link-icon"><i class="fa-solid fa-dollar"></i></div>Paid Orders List </div><span class="sidebar-count-bubble">${sidebarCountsArr.order_paid_count}</span>
    </a>`;
    }
    if(authParts.includes('processing_order_management')) {
        if(order === 0) {
            full += `<div class="sidenav-menu-heading">Order Management</div>`;
        }
        order = 1;
        full += `<a class="nav-link" href="/order-processing-list">
        <div>
        <div class="nav-link-icon"><i class="fa-solid fa-cart-shopping"></i></div>Processing Order List </div><span class="sidebar-count-bubble">${sidebarCountsArr.order_processing_count}</span>
    </a>`;
    }
    if(authParts.includes('delivered_order_management')) {
        if(order === 0) {
            full += `<div class="sidenav-menu-heading">Order Management</div>`;
        }
        order = 1;
        full += `<a class="nav-link" href="/order-delivered-list">
        <div>
        <div class="nav-link-icon"><i class="fa-solid fa-plane"></i></div>Dispatch Order List </div><span class="sidebar-count-bubble">${sidebarCountsArr.order_delivered_count}</span>
    </a>`;
    }
    if(authParts.includes('canceled_order_management')) {
        if(order === 0) {
            full += `<div class="sidenav-menu-heading">Order Management</div>`;
        }
        order = 1;
        full += `<a class="nav-link" href="/order-canceled-list">
        <div>
        <div class="nav-link-icon"><i class="fa-regular fa-circle-xmark"></i></div>Canceled Order List </div><span class="sidebar-count-bubble">${sidebarCountsArr.order_canceled_count}</span>
    </a>`;
    }
    let product = 0;
    if(authParts.includes('product_management')) {
        if(product === 0) {
            full += `<div class="sidenav-menu-heading">Product Management</div>`;
        }
        product = 1;
        full += `<a class="nav-link" href="/product-management">
        <div class="nav-link-icon"><i class="fa-solid fa-person-dress"></i></div>Product Manage
    </a>`;
    }
    if(authParts.includes('product_color_management')) {
        if(product === 0) {
            full += `<div class="sidenav-menu-heading">Product Management</div>`;
        }
        product = 1;
        full += `<a class="nav-link" href="/product-color-manage">
        <div class="nav-link-icon"><i class="fa-solid fa-droplet"></i></div>Product Color Manage
    </a>`;
    }
    if(authParts.includes('product_category_management')) {
        if(product === 0) {
            full += `<div class="sidenav-menu-heading">Product Management</div>`;
        }
        product = 1;
        full += `<a class="nav-link" href="/product-category-manage">
        <div class="nav-link-icon"><i class="fa-solid fa-layer-group"></i></div>Product Category Manage
    </a>`;
    }
    if(authParts.includes('sub_category_management')) {
        if(product === 0) {
            full += `<div class="sidenav-menu-heading">Product Management</div>`;
        }
        product = 1;
        full += `<a class="nav-link" href="/sub-category-list">
        <div class="nav-link-icon"><i class="fa-solid fa-gift"></i></div>Sub Category List
    </a>
    <a class="nav-link" href="/sub-category-add">
                    <div class="nav-link-icon"><i class="fa-solid fa-gift"></i></div>Sub Category Add
                </a>`;
    }
    if(authParts.includes('newsletters_list_access')) {
        full += `<div class="sidenav-menu-heading">NEWSLETTERS</div>
        <a class="nav-link" href="/newsletters">
        <div class="nav-link-icon"><i class="fa-regular fa-envelope"></i></div>Newsletters List
    </a>`;
    }
    if(authParts.includes('contact_us_list_access')) {
        full += `<div class="sidenav-menu-heading">CONTACT MESSAGES</div>
        <a class="nav-link" href="/contact-messages">
        <div class="nav-link-icon"><i class="fa-regular fa-address-book"></i></div>Contact Us
    </a>`;
    }
    if(authParts.includes('fabrics_management')) {
        full += `<div class="sidenav-menu-heading">3D ASSETS MANAGEMENT</div>
        <a class="nav-link collapsed" href="javascript:void(0);" data-toggle="collapse" data-target="#collapseFabrics" aria-expanded="false" aria-controls="collapseFabrics">
        <div class="nav-link-icon"><i data-feather="layers"></i></div>
            Fabrics
        <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
    </a>
    <div class="collapse" id="collapseFabrics" data-parent="#accordionSidenav">
        <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
            <a class="nav-link" href="/fabric-list-suit"> Jacket Fabrics</a>
        </nav>
        <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
            <a class="nav-link" href="/fabric-list-national"> National Fabrics</a>
        </nav>
        <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
            <a class="nav-link" href="/fabric-list-trouser"> Trouser Fabrics</a>
        </nav>
        <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
            <a class="nav-link" href="/fabric-list-waistcoat"> Waistcoat Fabrics</a>
        </nav>
    </div>`;
    }
    let site = 0;
    if(authParts.includes('slider_management')) {
        if(site === 0) {
            full += `<div class="sidenav-menu-heading">SITE CONTENT</div>`;
        }
        site = 1;
        full += `<a class="nav-link" href="/sliders">
        <div class="nav-link-icon"><i class="fa-solid fa-person-dress"></i></div>Slider Add
    </a><a class="nav-link" href="/slider-list">
    <div class="nav-link-icon"><i class="fa fa-list"></i></div>Slider List
</a>`;
    }
    if(authParts.includes('home_content_management')) {
        if(site === 0) {
            full += `<div class="sidenav-menu-heading">SITE CONTENT</div>`;
        }
        site = 1;
        full += `<a class="nav-link" href="/home-content">
        <div class="nav-link-icon"><i class="fa fa-home"></i></div>Home Content
    </a>`;
    }
    if(authParts.includes('site_Settings_access')) {
        if(site === 0) {
            full += `<div class="sidenav-menu-heading">SITE CONTENT</div>`;
        }
        site = 1;
        full += `<a class="nav-link" href="/setting">
        <div class="nav-link-icon"><i class="fa fa-cog"></i></div>Setting
    </a>`;
    }
    full += bottom;
    return full;
}

const sidebar = (sidebarCountsArr) => {
    return `
    <div id="layoutSidenav_nav">
    <nav class="sidenav shadow-right sidenav-light">
        <div class="sidenav-menu">
            <div class="nav accordion" id="accordionSidenav">
                <!-- Sidenav Menu Heading (Core)-->

                <div class="sidenav-menu-heading">Notifications</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link justify-content-between" href="/notification-center">
                    <div>
                        <div class="nav-link-icon"><i class="fa-regular fa-bell"></i></div>
                        Notification Center
                    </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.notification_count}</span>
                </a>

                <div class="sidenav-menu-heading">Appointment</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/appointment">
                    <div class="nav-link-icon"><i class="fa-regular fa-calendar"></i></div>Appointment List
                </a>
                <a class="nav-link" href="/holidays">
                    <div class="nav-link-icon"><i class="fa-regular fa-calendar-xmark"></i></div>Holidays
                </a>

                <div class="sidenav-menu-heading">Moderator Management</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/moderator-list">
                    <div class="nav-link-icon"><i class="fa-solid fa-user-gear"></i></div>Moderator List
                </a>

                <div class="sidenav-menu-heading">User List</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/user-list">
                    <div class="nav-link-icon"><i class="fa-solid fa-user"></i></i></div>User List
                </a>

                <div class="sidenav-menu-heading">Price Management</div>

                <a class="nav-link" href="/product-price">
                    <div class="nav-link-icon"><i class="fa-solid fa-layer-group"></i></div>Price Adjustment
                </a>

                <div class="sidenav-menu-heading">Discount Management</div>

                <a class="nav-link" href="/bank-management">
                    <div class="nav-link-icon"><i class="fa-solid fa-layer-group"></i></div>Bank Management
                </a>

                <a class="nav-link" href="/card-discount-add">
                    <div class="nav-link-icon"><i class="fa-solid fa-layer-group"></i></div>Card Discounts Add
                </a>

                <a class="nav-link" href="/card-discount-list">
                    <div class="nav-link-icon"><i class="fa-solid fa-layer-group"></i></div>Card Discounts List
                </a>

                <div class="sidenav-menu-heading">Event Management</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/ticket-category">
                    <div class="nav-link-icon"><i class="fa-solid fa-ticket"></i></i></div>Ticket Category Manage
                </a>
                <a class="nav-link" href="/event-management">
                    <div class="nav-link-icon"><i class="fa-regular fa-calendar-check"></i></i></div>Event Manage
                </a>
          
                <div class="sidenav-menu-heading">Gift Voucher Management</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/gift-voucher-manage-category">
                    <div class="nav-link-icon"><i class="fa-solid fa-ticket"></i></i></div>Gift Voucher Category 
                </a>
                <a class="nav-link" href="/gift-voucher-manage-list">
                    <div class="nav-link-icon"><i class="fa-regular fa-calendar-check"></i></i></div>Gift Voucher Manage
                </a>
               
                <div class="sidenav-menu-heading">Gift Voucher Booking</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link justify-content-between" href="/gift-voucher-pending-list">
                    <div>
                        <div class="nav-link-icon"><i class="fa-solid fa-spinner"></i></i></div>
                        Pending Vouchers List 
                    </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.gift_voucher_booking_pending_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/gift-voucher-paid-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-dollar"></i></i></div>Paid Vouchers List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.gift_voucher_booking_paid_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/gift-voucher-processing-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-cart-shopping"></i></i></div>Processing Vouchers List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.gift_voucher_booking_processing_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/gift-voucher-dispatch-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-plane"></i></i></div>Dispatch Vouchers List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.gift_voucher_booking_delivered_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/gift-voucher-canceled-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-circle-xmark"></i></i></div>Canceled Vouchers List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.gift_voucher_booking_canceled_count}</span>
                </a>

                <div class="sidenav-menu-heading">Booking Management</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/gift-voucher-bookings">
                    <div class="nav-link-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>Gift Voucher Bookings
                </a>
                <a class="nav-link" href="/seats-bookings">
                    <div class="nav-link-icon"><i class="fa-solid fa-chair"></i></div>Seat Bookings
                </a>
                <a class="nav-link" href="/seat-attendance">
                    <div class="nav-link-icon"><i class="fa-solid fa-chair"></i></div>Seat Attendance
                </a>

                <div class="sidenav-menu-heading">Order Management</div>
                <a class="nav-link justify-content-between" href="/order-pending-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-spinner"></i></div>Pending Orders List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.order_pending_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/order-paid-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-dollar"></i></div>Paid Orders List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.order_paid_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/order-processing-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-cart-shopping"></i></div>Processing Order List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.order_processing_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/order-delivered-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-solid fa-plane"></i></div>Dispatch Order List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.order_delivered_count}</span>
                </a>
                <a class="nav-link justify-content-between" href="/order-canceled-list">
                    <div>
                    <div class="nav-link-icon"><i class="fa-regular fa-circle-xmark"></i></div>Canceled Order List </div>
                    <span class="sidebar-count-bubble">${sidebarCountsArr.order_canceled_count}</span>
                </a>

                <div class="sidenav-menu-heading">Product Management</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/product-management">
                    <div class="nav-link-icon"><i class="fa-solid fa-person-dress"></i></div>Product Manage
                </a>
                <a class="nav-link" href="/product-color-manage">
                    <div class="nav-link-icon"><i class="fa-solid fa-droplet"></i></div>Color Manage
                </a>
                <a class="nav-link" href="/product-category-manage">
                    <div class="nav-link-icon"><i class="fa-solid fa-layer-group"></i></div>Category Manage
                </a>
                <a class="nav-link" href="/sub-category-list">
                    <div class="nav-link-icon"><i class="fa-solid fa-gift"></i></div>Sub Category List
                </a>

                <a class="nav-link" href="/sub-category-add">
                    <div class="nav-link-icon"><i class="fa-solid fa-gift"></i></div>Sub Category Add
                </a>

                <div class="sidenav-menu-heading">Newsletters</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/newsletters">
                    <div class="nav-link-icon"><i class="fa-regular fa-envelope"></i></div>Newsletters List
                </a>

                <div class="sidenav-menu-heading">Contact Messages</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/contact-messages">
                    <div class="nav-link-icon"><i class="fa-regular fa-address-book"></i></div>Contact Us
                </a>

                <div class="sidenav-menu-heading">3D Assets Management</div>

                <a class="nav-link collapsed" href="javascript:void(0);" data-toggle="collapse" data-target="#collapseFabrics" aria-expanded="false" aria-controls="collapseFabrics">
                    <div class="nav-link-icon"><i data-feather="layers"></i></div>
                        Fabrics
                    <div class="sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                </a>
                <div class="collapse" id="collapseFabrics" data-parent="#accordionSidenav">
                    <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                        <a class="nav-link" href="/fabric-list-suit"> Jacket Fabrics</a>
                    </nav>
                    <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                        <a class="nav-link" href="/fabric-list-national"> National Fabrics</a>
                    </nav>
                    <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                        <a class="nav-link" href="/fabric-list-trouser"> Trouser Fabrics</a>
                    </nav>
                    <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                        <a class="nav-link" href="/fabric-list-waistcoat"> Waistcoat Fabrics</a>
                    </nav>
                </div>

                <div class="sidenav-menu-heading">Site Content</div>
                <!-- Sidenav Accordion (Dashboard)-->
                <a class="nav-link" href="/sliders">
                    <div class="nav-link-icon"><i class="fa-solid fa-person-dress"></i></div>Slider Add
                </a>
                <a class="nav-link" href="/slider-list">
                    <div class="nav-link-icon"><i class="fa fa-list"></i></div>Slider List
                </a>
                <a class="nav-link" href="/home-content">
                    <div class="nav-link-icon"><i class="fa fa-home"></i></div>Home Content
                </a>
                <a class="nav-link" href="/setting">
                    <div class="nav-link-icon"><i class="fa fa-cog"></i></div>Setting
                </a>
            </div>


        </div>
        <!-- Sidenav Footer-->
        <div class="sidenav-footer">
            <div class="sidenav-footer-content">
                <div class="sidenav-footer-subtitle">Logged in as:</div>
                <div class="sidenav-footer-title">Supper Admin</div>
            </div>
        </div>
    </nav>
</div>`;
}
    


module.exports = { sidebar, sidebarMain };