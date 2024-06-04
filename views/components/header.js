const { label_wise_category } = require("../../modules/category.module");

const web_header = async ()=> {

    const categories = await label_wise_category();

    let menu_items = ``;
    await new Promise(async resolve => {
        if ( categories.data.length === 0 ) {
            resolve(true);
            return;
        }

        for ( let i = 0; i < categories.data.length; i++ ) {

            menu_items = menu_items + `
            <div class="menu-block">
                <div class="menu-caption">                                                               
                    <h2 class="menu-title"> <strong>${categories.data[i].name}</strong> </h2>
                    <ul class="sub-list">
            `;

            await new Promise(resolve => {
                if ( categories.data[i].categories.length === 0 ) {
                    resolve(true);
                    return;
                }
                for ( let j = 0; j < categories.data[i].categories.length; j++ ) {
                    menu_items = menu_items + `
                        <li> <a href="/shop/${categories.data[i].categories[j].name}">${categories.data[i].categories[j].name}</a> </li>`;
                    if (  categories.data[i].categories.length === j + 1 ) {
                        resolve(true);
                    }
                }
            });

            menu_items = menu_items + `
                    </ul>
                </div>
            </div>`;

            if ( categories.data.length === i + 1 ) {
                resolve(true);
            }
        }

    });

    return `
    <!-- Main Header Start -->
        <header class="main-header">                  
            <div class="container-fluid rel-div">
                <div class="col-lg-4 col-sm-8">
                    <div class="main-logo">
                        <a href="/"> <img alt="" src="/client/assets/img/logo/main-logo.png" />  </a>
                        <span class="medium-font">Store Name</span>
                    </div>
                </div>

                <div class="col-lg-6 responsive-menu">  
                    <div class="responsive-toggle fa fa-bars"> </div>
                    <nav class="fix-navbar" id="primary-navigation">            
                        <ul class="primary-navbar">                                                
                            <li><a href="/">Home</a></li> 
                            <li><a href="/about">About</a></li>
                            <li><a href="/shop">Shop</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/login">Account</a></li>
                        </ul>                           
                    </nav>
                </div>

                <div class="col-lg-2 col-sm-4 cart-megamenu">
                    <div class="cart-hover">
                    <a href="#"> <img alt="" src="/client/assets/img/icons/cart-icon.png" /> </a>
                    <span class="cnt crl-bg" id="header_item_count">0</span> <span class="price" id="header_price">$00.00</span>
                        <ul class="pop-up-box cart-popup">

                            <!--<li class="d-none cart-list">
                                <div class="cart-img"> <img src="/client/assets/img/extra/cart-sm-3.jpg" alt=""> </div>
                                <div class="cart-title">
                                    <div class="fsz-16">
                                        <a href="#"> <span class="light-font"> organic </span>  <strong>onion</strong></a>
                                        <h6 class="sub-title-1">VAGETABLES</h6>
                                    </div>
                                    <div class="price"> 
                                        <strong class="clr-txt">$50.00 </strong> <del class="light-font">$65.00 </del>
                                    </div>
                                </div>
                                <div class="close-icon"> <i class="fa fa-close clr-txt"></i> </div>
                            </li>-->

                            <li class="cart-list sub-total">
                                <div class="pull-left"> 
                                    <strong>Subtotal</strong>
                                </div>
                                <div class="pull-right"> 
                                    <strong class="clr-txt" id="header_sub_price"> </strong>
                                </div>
                            </li>
                            <li class="cart-list buttons">
                                <div class="pull-left"> 
                                    <a href="/cart" class="theme-btn-sm-2">View Cart</a>
                                </div>
                                <div class="pull-right"> 
                                    <a href="/checkout" class="theme-btn-sm-3"> Checkout </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mega-submenu">

                        <span class="nav-trigger">
                            <a class="menu-toggle" href="#"> <img src="/client/assets/img/icons/menu.png" alt="" /> </a>
                        </span>
                        <div class="mega-dropdown-menu">
                            <a class="menu-toggle fa fa-close" href="#">  </a>
                            <div class="slider-mega-menu">

                                ${menu_items}
                                
                            </div>
                        </div>
                    </div>
                    <div class="responsive-toggle fa fa-bars"> </div>
                </div>

            </div>  
        </header>
        <!-- / Main Header Ends -->`
}

module.exports = { web_header }