const express = require("express");
const router = express.Router();
const { render_data, render_data_post } = require("./../services/render");
const { render_post_data } = require("./../services/render_post");
const dateTime=require('../services/dateTime');

/*******************
* Global variables 
********************/
var admin = __dirname + "/../views/admin/"; // admin folder path
var global = __dirname + "/../views/global/"; // global folder path

//Admin Panel variables
const { header_tags } = require("./../views/components/header_tags");
const { script_tags } = require("./../views/components/script_tags");
const { sidebarMain } = require("../views/components/sidebar");
const { top_header } = require("../views/components/top_header");

const dotenv = require('dotenv');
const { authorize2 } = require("./../services/authorize");
dotenv.config({ path: '.env/config.env' });

/**
 * @Details
 * Admin Routes 
 */

router.get("/", async (req, res) => {

    try {

        res.render(
            admin + "login.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});



router.get("/sub-category-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-sub-category-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/sub-category-list", authorize2, async (req, res) => {

    try {

        let productSubCategory = await render_post_data('/api/v1/product_sub_category/list', req.authToken);
        if (!productSubCategory.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "product-sub-category-list.html",
            {
                product_sub_category: productSubCategory.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/sub-category-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-sub-category-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/appointment", authorize2, async (req, res) => {

    try {

        let appointments = await render_data('/api/v1/appointment_booking/list', req.authToken);
        if (!appointments.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "appointment.html",
            {
                appointments: appointments.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/user-list", authorize2, async (req, res) => {

    try {

        let users = await render_data('/api/v1/user/customer/list', req.authToken);
        if (!users.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "user-list.html",
            {
                users: users.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/appointment-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "appointment-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Product Pages
router.get("/loading-page", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "loading-page.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/sliders", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "content/sliders.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/setting", authorize2, async (req, res) => {

    try {

        let dollarRate = await render_data('/api/v1/setting/dollar-rate/view', req.authToken);
        if (!dollarRate.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "setting.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
                dollarRate: dollarRate.data.dollar_rate
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/slider-list", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "content/slider-list.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/home-content", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "content/home.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/Slider-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "content/slider-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                top_header: top_header,
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-category-manage", authorize2, async (req, res) => {

    try {

        let productCategory = await render_post_data('/api/v1/product_Category/list', req.authToken);
        if (!productCategory.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "product-category-manage.html",
            {
                product_category: productCategory.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-color", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-color.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});


router.get("/holidays", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "holidays.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Ticket Pages
router.get("/ticket-category", authorize2, async (req, res) => {

    try {

        let ticketCategory = await render_post_data('/api/v1/tickets_category/list', req.authToken);
        if (!ticketCategory.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "ticket-category.html",
            {
                ticket_category: ticketCategory.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/ticket-category-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "ticket-category-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/ticket-category-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "ticket-category-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});


// Event Pages
router.get("/event-management", authorize2, async (req, res) => {

    try {

        let eventList = await render_post_data('/api/v1/event/list', req.authToken);
        if (!eventList.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "event-list.html",
            {
                event_list: eventList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Event Pages
router.get("/home", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "dashboard.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/event-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "event-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/event-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "event-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/event-seat-add/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "event-seat-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Table & Seat Pages
router.get("/table-and-seat", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "table-and-seat.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Table & Seat Pages
router.get("/ticket-request", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "ticket-request.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-bookings", authorize2, async (req, res) => {

    try {

        let giftVoucherBookingList = await render_post_data('/api/v1/booking/voucher/request/list', req.authToken);
        if (!giftVoucherBookingList.status) {
            res.redirect("/");
            return;
        }


        res.render(
            admin + "gift-voucher-bookings.html",
            {
                gift_voucher_booking_list: giftVoucherBookingList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-booking-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "gift-voucher-booking-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-booking-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "gift-voucher-booking-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/seats-bookings", authorize2, async (req, res) => {

    try {

        let seatsBookings = await render_post_data('/api/v1/booking/request/list', req.authToken);
        if (!seatsBookings.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "seats-bookings.html",
            {
                seats_bookings: seatsBookings.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/seat-attendance", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "seat-attendance.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/seats-booking-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "seats-booking-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/seats-booking-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "seats-booking-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher", authorize2, async (req, res) => {

    try {

        let giftVoucherList = await render_post_data('/api/v1/voucher/list', req.authToken);
        if (!giftVoucherList.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "gift-voucher-list.html",
            {
                gift_voucher_list: giftVoucherList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "gift-voucher-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "gift-voucher-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});


// Event Pages
router.get("/product-management", authorize2, async (req, res) => {

    try {
        
        let siteDomain = process.env.SITE_DOMAIN;

        let productList = await render_post_data('/api/v1/product/list', req.authToken);
        if (!productList.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "product-list.html",
            {
                product_list: productList.data,
                product_list_json: JSON.stringify(productList.data),
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                siteDomain: siteDomain
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-color-manage", authorize2, async (req, res) => {

    try {

        let productColor = await render_post_data('/api/v1/product_color/list', req.authToken);
        if (!productColor.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "Product-color-manage.html",
            {
                product_color: productColor.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/order-pending-list", authorize2, async (req, res) => {

    try {
        
        let siteDomain = process.env.SITE_DOMAIN;

        let orderBill = await render_data('/api/v1/order_bill/list', req.authToken);
        if (!orderBill.status) {
            res.redirect("/");
            return;
        }
        
        res.render(
            admin + "order-pending-list.html",
            {
                order_bill: orderBill.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                siteDomain: siteDomain
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/order-paid-list", authorize2, async (req, res) => {

    try {
        
        let siteDomain = process.env.SITE_DOMAIN;

        let orderPaid = await render_data('/api/v1/order_bill/list', req.authToken);
        if (!orderPaid.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "order-paid-list.html",
            {
                order_paid: orderPaid.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                siteDomain: siteDomain
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/order-processing-list", authorize2, async (req, res) => {

    try {
        
        let siteDomain = process.env.SITE_DOMAIN;

        let orderProcessing = await render_data('/api/v1/order_bill/list', req.authToken);
        if (!orderProcessing.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "order-processing-list.html",
            {
                order_processing: orderProcessing.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                siteDomain: siteDomain
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/order-delivered-list", authorize2, async (req, res) => {

    try {

        let siteDomain = process.env.SITE_DOMAIN;

        let orderDelivered = await render_data('/api/v1/order_bill/list', req.authToken);
        if (!orderDelivered.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "order-delivered-list.html",
            {
                order_delivered: orderDelivered.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                siteDomain: siteDomain
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/order-canceled-list", authorize2, async (req, res) => {

    try {

        let siteDomain = process.env.SITE_DOMAIN;

        let orderCanceled = await render_data('/api/v1/order_bill/list', req.authToken);
        if (!orderCanceled.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "order-canceled-list.html",
            {
                order_canceled: orderCanceled.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                siteDomain: siteDomain
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/order-invoice/:id", authorize2, async (req, res) => {

    try {

        let orderView = await render_data_post('/api/v1/order_bill/view', req.authToken, {
            id: req.params.id
        });
        
        if (!orderView.status) {
            res.redirect("/");
            return;
        }

        res.render(
            global + "invoice.html",
            {
                orderView: orderView.data
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/newsletters", authorize2, async (req, res) => {
       

    try {

        let newsLetter = await render_post_data('/api/v1/newsletter/list', req.authToken);
        if (!newsLetter.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "newsletters.html",
            {
                news_letter: newsLetter.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/contact-messages", authorize2, async (req, res) => {

    try {

        let contactUs = await render_post_data('/api/v1/contact/list', req.authToken);
        if (!contactUs.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "contact-messages.html",
            {
                contact_us: contactUs.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// 3D Configurations 
router.get("/fabric-list-suit", authorize2, async (req, res) => {

    try {

        let fabricList = [];

        let fabrics = await render_data('/api/v1/fabric/list', req.authToken);
        if (!fabrics.status) {
            res.redirect("/");
            return;
        } else {
            fabricList = fabrics.data.filter(item => item.type === 1);
        }


        res.render(
            admin + "fabric-list-suit.html",
            {
                fabric_list: fabricList,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-add-suit", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-add-suit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-edit-suit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-edit-suit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-list-national", authorize2, async (req, res) => {

    try {

        let fabricList = [];

        let fabrics = await render_data('/api/v1/fabric/list', req.authToken);
        if (!fabrics.status) {
            res.redirect("/");
            return;
        } else {
            fabricList = fabrics.data.filter(item => item.type === 2);
        }

        res.render(
            admin + "fabric-list-national.html",
            {
                fabric_list: fabricList,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-add-national", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-add-national.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-edit-national/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-edit-national.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-list-trouser", authorize2, async (req, res) => {

    try {

        let fabricList = [];

        let fabrics = await render_data('/api/v1/fabric/list', req.authToken);
        if (!fabrics.status) {
            res.redirect("/");
            return;
        } else {
            fabricList = fabrics.data.filter(item => item.type === 3);
        }

        res.render(
            admin + "fabric-list-trouser.html",
            {
                fabric_list: fabricList,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-add-trouser", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-add-trouser.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-edit-trouser/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-edit-trouser.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-list-waistcoat", authorize2, async (req, res) => {

    try {

        let fabricList = [];

        let fabrics = await render_data('/api/v1/fabric/list', req.authToken);
        if (!fabrics.status) {
            res.redirect("/");
            return;
        } else {
            fabricList = fabrics.data.filter(item => item.type === 4);
        }

        res.render(
            admin + "fabric-list-waistcoat.html",
            {
                fabric_list: fabricList,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-add-waistcoat", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-add-waistcoat.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/fabric-edit-waistcoat/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "fabric-edit-waistcoat.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Notification Center
router.get("/notification-center", authorize2, async (req, res) => {

    try {

        let notifications = await render_data('/api/v1/notification/list', req.authToken);
        if (!notifications.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "notification-center.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                notifications: notifications.data
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// Moderator management
router.get("/moderator-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "moderator-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/moderator-edit/:id", authorize2, async (req, res) => {

    try {

        let moderatorView = await render_data_post('/api/v1/user/moderator/view', req.authToken, {
            id: req.params.id
        });

        if (!moderatorView.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "moderator-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                moderatorView: moderatorView.data
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/moderator-list", authorize2, async (req, res) => {

    try {

        let moderatorList = await render_data('/api/v1/user/moderator/list', req.authToken);
        if (!moderatorList.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "moderator-list.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                moderatorList: moderatorList.data
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

// gift voucher manage Pages
router.get("/gift-voucher-manage-category", authorize2, async (req, res) => {

    try {

        let voucherCategories = await render_data('/api/v1/voucher_category/list', req.authToken);
        if (!voucherCategories.status) {
            res.redirect("/");
            return;
        }

        res.render(
            admin + "gift-voucher-manage-category.html",
            {
                voucher_categories: voucherCategories.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-manage-list", authorize2, async (req, res) => {

    try {

        let gift_voucher_list = await render_data('/api/v1/gift_voucher/list', req.authToken);
        if (!gift_voucher_list.status) {
            res.redirect("/");
            return;
        }
        res.render(
            admin + "gift-voucher-manage-list.html",
            {
                gift_voucher_list: gift_voucher_list.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-manage-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "gift-voucher-manage-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-manage-edit/:id", authorize2, async (req, res) => {

    try {

        // let moderatorView = await render_data_post('/api/v1/user/moderator/view', req.authToken, {
        //     id: req.params.id
        // });

        // if (!moderatorView.status) {
        //     res.redirect("/");
        //     return;
        // }

        res.render(
            admin + "gift-voucher-manage-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
                moderatorView: {}
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

//voucher booking pages
router.get("/gift-voucher-pending-list", authorize2, async (req, res) => {

    try {

        let coucherBookingList = await render_data('/api/v1/gift_voucher/booking/list', req.authToken);
        if (!coucherBookingList.status) {
            res.redirect("/");
            return;
        }else{
            coucherBookingList.data=coucherBookingList.data.filter((elem)=>{
                elem.paid_time=dateTime.formatDateTime(elem.paid_time);
                return elem.status==1||elem.status=='1'
            });
        } 

        res.render(
            admin + "gift-voucher-pending-list.html",
            {
                voucher_booking_list: coucherBookingList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-paid-list", authorize2, async (req, res) => {

    try {

        let coucherBookingList = await render_data('/api/v1/gift_voucher/booking/list', req.authToken);
        if (!coucherBookingList.status) {
            res.redirect("/");
            return;
        }else{
            coucherBookingList.data=coucherBookingList.data.filter((elem)=>{
                elem.paid_time=dateTime.formatDateTime(elem.paid_time);
                return elem.status==5||elem.status=='5'
            });
        } 

        res.render(
            admin + "gift-voucher-paid-list.html",
            {
                voucher_booking_list: coucherBookingList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-processing-list", authorize2, async (req, res) => {

    try {

        let coucherBookingList = await render_data('/api/v1/gift_voucher/booking/list', req.authToken);
        if (!coucherBookingList.status) {
            res.redirect("/");
            return;
        }else{
            coucherBookingList.data=coucherBookingList.data.filter((elem)=>{
                elem.paid_time=dateTime.formatDateTime(elem.paid_time);
                return elem.status==2||elem.status=='2'
            });
        } 

        res.render(
            admin + "gift-voucher-processing-list.html",
            {
                voucher_booking_list: coucherBookingList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-dispatch-list", authorize2, async (req, res) => {

    try {

        let coucherBookingList = await render_data('/api/v1/gift_voucher/booking/list', req.authToken);
        if (!coucherBookingList.status) {
            res.redirect("/");
            return;
        }else{
            coucherBookingList.data=coucherBookingList.data.filter((elem)=>{
                elem.paid_time=dateTime.formatDateTime(elem.paid_time);
                return elem.status==3||elem.status=='3'
            });
        } 

        res.render(
            admin + "gift-voucher-dispatch-list.html",
            {
                voucher_booking_list: coucherBookingList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/gift-voucher-canceled-list", authorize2, async (req, res) => {

    try {

        let coucherBookingList = await render_data('/api/v1/gift_voucher/booking/list', req.authToken);
        if (!coucherBookingList.status) {
            res.redirect("/");
            return;
        }else{
            coucherBookingList.data=coucherBookingList.data.filter((elem)=>{
                elem.paid_time=dateTime.formatDateTime(elem.paid_time);
                return elem.status==4||elem.status=='4'
            });
        } 

        res.render(
            admin + "gift-voucher-canceled-list.html",
            {
                voucher_booking_list: coucherBookingList.data,
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar:await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/bank-management", authorize2, async (req, res) => {

    try {

        let bank_list = await render_data("/api/v1/bank/list", req.authToken);

        if(!bank_list.status){
            res.redirect("/");
            return;
        }

        res.render(
            admin + "bank-management.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
                bank_list: bank_list.data
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/product-price", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "product-price.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/card-discount-add", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "card-discount-add.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/card-discount-list", authorize2, async (req, res) => {

    try {

        let card_discount_list = await render_data("/api/v1/card_discount/list", req.authToken);

        if(!card_discount_list.status){
            res.redirect("/");
            return;
        }

        res.render(
            admin + "card-discount-list.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                card_discount_list: card_discount_list.data,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/card-discount-edit/:id", authorize2, async (req, res) => {

    try {

        res.render(
            admin + "card-discount-edit.html",
            {
                header_tags: header_tags,
                script_tags: script_tags,
                top_header: top_header,
                sidebar: await sidebarMain(req.data.role, req.data.permissionList),
            }
        );

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

module.exports = router;