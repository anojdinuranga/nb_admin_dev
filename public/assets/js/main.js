/**
 * @Pagination
 * [1]: Login Page
 
 * [2]:Product Category
 * [2.1]: Product Category Add
 * [2.2]: Product Category Edit
 * [2.3]: Product Category List
 * [2.4]: Product Category View
   
 * [3]:Color Category
 * [3.1]: Color Category Add
 * [3.2]: Color Category Edit
 * [3.3]: Color Category List
 * [3.4]: Color Category View
 * [3.5]: Color Category active-list 

 * [3]:Ticket Category
 * [3.1]: Ticket Category Add
 * [3.2]: Ticket Category Edit
 * [3.3]: Ticket Category List
 * [3.4]: Ticket Category View
 * 
 * [4]:Event
 * [4.1]: Event Add
 * [4.2]: Event Edit
 * [4.3]: Event View
 * [4.4]: Event List

**/

// Data Table Function Start
$(document).ready(function () {
    $('#product_category_list_table , product_color_list_table , ticket_category_list_table').DataTable();
});
// Data Table Function End



// [1]: Login Page
// --------------------------------------------------------------------------------------------------- [1]:Login Page ---------------------------------------------------------------------------------------------------//
var loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', handleLoginButtonClick);
}
function handleLoginButtonClick() {
    $.ajax({
        url: '/api/v1/user/login',
        method: 'POST',
        dataType: 'json',
        data: {
            email: $('#login_email').val(),
            password: $('#login_password').val()
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                setTimeout(() => { location.href = '/home'; }, 1000);
            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
// --------------------------------------------------------------------------------------------------- [1]:Login Page ---------------------------------------------------------------------------------------------------//


// [2]:Product Category
// --------------------------------------------------------------------------------------------------- [2]:Product Category ---------------------------------------------------------------------------------------------------//
//* [2.1]: Product Category Add Start
var productCategoryAddButton = document.getElementById('productCategoryAddButton');
if (productCategoryAddButton) {
    productCategoryAddButton.addEventListener('click', productCategoryAdd);
}
function productCategoryAdd() {
    $.ajax({
        url: '/api/v1/product_category/add',
        method: 'POST',
        dataType: 'json',
        data: {
            name: $('#productCategoryAddName').val(),
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                productCategoryList();
            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [2.1]: Product Category Add End

//* [2.2]: Product Category Edit Start
var productCategoryEditButton = document.getElementById('productCategoryEditButton');
if (productCategoryEditButton) {
    productCategoryEditButton.addEventListener('click', productCategoryEdit);
}
function productCategoryEdit(id) {
    $.ajax({
        url: '/api/v1/product_category/edit',
        method: 'POST',
        dataType: 'json',
        data: {
            id: $('#productCategoryViewId').val(),
            name: $('#productCategoryViewName').val()
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {

                console.log(data);

                productCategoryList();

            } else {
                console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [2.2]: Product Category Edit End
// --------------------------------------------------------------------------------------------------- [2]:Product Category ---------------------------------------------------------------------------------------------------//


// [3]:Product Color
// --------------------------------------------------------------------------------------------------- [3]:Product Color ---------------------------------------------------------------------------------------------------//
//* [3.1]: Product Color Add Start
var productColorAddButton = document.getElementById('productColorAddButton');
if (productColorAddButton) {
    productColorAddButton.addEventListener('click', productColorAdd);
}
function productColorAdd() {
    $.ajax({
        url: '/api/v1/product_color/add',
        method: 'POST',
        dataType: 'json',
        data: {
            name: $('#productColorAddName').val(),
            code: $('#productColorAddCode').val(),
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                productColorList();
            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [3.1]: Product Color Add End

//* [3.2]: Product Color Edit Start
var productColorEditButton = document.getElementById('productColorEditButton');
if (productColorEditButton) {
    productColorEditButton.addEventListener('click', productColorEdit);
}
function productColorEdit(id) {
    $.ajax({
        url: '/api/v1/product_color/edit',
        method: 'POST',
        dataType: 'json',
        data: {
            id: $('#productColorViewId').val(),
            name: $('#productColorViewName').val(),
            code: $('#productColorViewCode').val()

        },
        success: function (data) {
            if (data.status === true || data.status === "true") {

                console.log(data);

                productColorList();

            } else {
                console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [3.2]: Product Color Edit End

//* [3.5]: Product Color List Start
// productColorActiveList();
function productColorActiveList() {
    $.ajax({
        url: '/api/v1/product_color/active-list',
        method: 'POST',
        dataType: 'json',
        data: {
            status: 1,
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                var selectElement = document.getElementById("ticketCategoryColorSelector");

                selectElement.innerHTML = "";

                data.data.forEach(function (details) {
                    var option = document.createElement("option");

                    option.value = details.id;
                    option.textContent = details.name;

                    selectElement.appendChild(option);
                });

            }
            else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [3.5]: Product Color List End
// --------------------------------------------------------------------------------------------------- [3]:Product Color ---------------------------------------------------------------------------------------------------//


// [4]:Product Category
// --------------------------------------------------------------------------------------------------- [4]:Ticket Category ---------------------------------------------------------------------------------------------------//
//* [4.1]: Product Category Add Start
var ticketCategoryAddButton = document.getElementById('ticketCategoryAddButton');
if (ticketCategoryAddButton) {
    ticketCategoryAddButton.addEventListener('click', ticketCategoryAdd);
}
function ticketCategoryAdd() {
    $.ajax({
        url: '/api/v1/tickets_category/add',
        method: 'POST',
        dataType: 'json',
        data: {
            name: $('#ticketCategoryAddName').val(),
            color: $('#ticketCategoryColorSelector').val(),
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {

                ticketCategoryList();
            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [4.1]: Product Category Add End

//* [4.2]: Product Category Edit Start
var ticketCategoryEditButton = document.getElementById('ticketCategoryEditButton');
if (ticketCategoryEditButton) {
    ticketCategoryEditButton.addEventListener('click', ticketCategoryEdit);
}
function ticketCategoryEdit(id) {
    $.ajax({
        url: '/api/v1/tickets_category/edit',
        method: 'POST',
        dataType: 'json',
        data: {
            id: $('#ticketCategoryViewId').val(),
            name: $('#ticketCategoryViewName').val(),
            color: $('#ticketCategoryViewColorCode').val()
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {

                console.log(data);

                productCategoryList();

            } else {
                console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [4.2]: Product Category Edit End
// --------------------------------------------------------------------------------------------------- [4]:Ticket Category ---------------------------------------------------------------------------------------------------//




// [2]:Product Category
// --------------------------------------------------------------------------------------------------- [2]:Product Category ---------------------------------------------------------------------------------------------------//
//* [2.3]: Product Category List Start
function productCategoryList() {
    $.ajax({
        url: '/api/v1/product_category/list',
        method: 'POST',
        dataType: 'json',
        data: {},
        success: function (data) {
            if (data.status == "true" || data.status === true) {
                let data_array = [];

                for (var i = 0; i < data.data.length; i++) {
                    let details = data.data[i];

                    var status;
                    if (details.status == 1) {
                        status = '<span class="badge text-bg-primary p-2">Active</span>';
                    } else if (details.status == 2) {
                        status = '<span class="badge text-bg-warning p-2">Pending</span>';
                    } else {
                        status = '<span class="badge text-bg-secondary p-2">Unknown</span>';
                    }

                    var action = `
                        <div class="d-flex align-items-center">
                            <a class="btn btn-icon product_category_view_button" data-id="${details.id}" data-bs-toggle="modal" href="#Category_view_model" role="button"><i class="fa-solid fa-eye"></i></a>
                            <button class="btn btn-icon "><i class="fa-solid fa-toggle-off text-warning"></i></button>
                            <a class="btn btn-icon product_category_edit_button" data-id="${details.id}" data-bs-toggle="modal" href="#Category_view_model" role="button"><i class="fa-solid fa-pencil"></i></a>
                            <button class="btn btn-icon"><i class="fa-solid fa-trash-can text-danger"></i></button>
                        </div>
                    `;

                    let array = [
                        i + 1,
                        details.name,
                        status,
                        action
                    ];

                    data_array.push(array);
                }

                // Push Data Into Table
                $('#product_category_list_table').DataTable({
                    data: data_array,
                    destroy: true,
                    paging: true,
                    searching: true
                });

                // Call View Function
                $('.product_category_view_button').on('click', function () {
                    var id = $(this).data('id');
                    productCategoryView(id);
                    document.getElementById('productCategoryEditButton').classList.add("d-none");
                    document.getElementById('productCategoryViewName').disabled = true;
                    document.getElementById('Category_view_edit_model_title').innerHTML = "Category View";
                });

                // Call Edit Function
                $('.product_category_edit_button').on('click', function () {
                    var id = $(this).data('id');
                    productCategoryView(id);
                    document.getElementById('productCategoryEditButton').classList.remove("d-none");
                    document.getElementById('productCategoryViewName').disabled = false;
                    document.getElementById('Category_view_edit_model_title').innerHTML = "Category Edit";
                });


            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [2.3]: Product Category List End

//* [2.4]: Product Category View Start
function productCategoryView(id) {
    $.ajax({
        url: '/api/v1/product_category/view',
        method: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                console.log(data);

                let details = data.data;
                $('#productCategoryViewId').val(details.id);
                $('#productCategoryViewName').val(details.name);

            } else {
                console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [2.4]: Product Category View End
// --------------------------------------------------------------------------------------------------- [2]:Product Category ---------------------------------------------------------------------------------------------------//
// [2]:Product Category


// [3]:Product Color
// --------------------------------------------------------------------------------------------------- [3]:Product Color ---------------------------------------------------------------------------------------------------//
//* [3.3]: Product Color List Start
function productColorList() {
    $.ajax({
        url: '/api/v1/product_color/list',
        method: 'POST',
        dataType: 'json',
        data: {},
        success: function (data) {
            if (data.status == "true" || data.status === true) {
                let data_array = [];

                for (var i = 0; i < data.data.length; i++) {
                    let details = data.data[i];

                    var status;
                    if (details.status == 1) {
                        status = '<span class="badge text-bg-primary p-2">Active</span>';
                    } else if (details.status == 2) {
                        status = '<span class="badge text-bg-warning p-2">Pending</span>';
                    } else {
                        status = '<span class="badge text-bg-secondary p-2">Unknown</span>';
                    }

                    var action = `
                        <div class="d-flex align-items-center">
                            <a class="btn btn-icon product_color_view_button" data-id="${details.id}" data-bs-toggle="modal" href="#Color_view_model" role="button"><i class="fa-solid fa-eye"></i></a>
                            <button class="btn btn-icon "><i class="fa-solid fa-toggle-off text-warning"></i></button>
                            <a class="btn btn-icon product_color_edit_button" data-id="${details.id}" data-bs-toggle="modal" href="#Color_view_model" role="button"><i class="fa-solid fa-pencil"></i></a>
                            <button class="btn btn-icon"><i class="fa-solid fa-trash-can text-danger"></i></button>
                        </div>
                    `;

                    var color_code =
                        `
                    <input type="color" value="${details.code}" disabled style="width:150px"/>
                        `

                    let array = [
                        i + 1,
                        details.name,
                        color_code,
                        status,
                        action
                    ];

                    data_array.push(array);
                }

                // Push Data Into Table
                $('#product_color_list_table').DataTable({
                    data: data_array,
                    destroy: true,
                    paging: true,
                    searching: true
                });

                // Call View Function
                $('.product_color_view_button').on('click', function () {
                    var id = $(this).data('id');
                    productColorView(id);
                    document.getElementById('productColorEditButton').classList.add("d-none");
                    document.getElementById('productColorViewName').disabled = true;
                    document.getElementById('productColorViewCode').disabled = true;
                    document.getElementById('Color_view_edit_model_title').innerHTML = "Color View";
                });

                // Call Edit Function
                $('.product_color_edit_button').on('click', function () {
                    var id = $(this).data('id');
                    productColorView(id);
                    document.getElementById('productColorEditButton').classList.remove("d-none");
                    document.getElementById('productColorViewName').disabled = false;
                    document.getElementById('productColorViewCode').disabled = false;
                    document.getElementById('Color_view_edit_model_title').innerHTML = "Color Edit";
                });


            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [3.3]: Product Color List End

//* [3.4]: Product Color View Start
function productColorView(id) {
    $.ajax({
        url: '/api/v1/product_color/view',
        method: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                console.log(data);

                let details = data.data;
                $('#productColorViewId').val(details.id);
                $('#productColorViewName').val(details.name);
                $('#productColorViewCode').val(details.code);

            } else {
                console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [3.4]: Product Color View End
// --------------------------------------------------------------------------------------------------- [3]:Product Color ---------------------------------------------------------------------------------------------------//
// [3]:Product Color


// [4]:Ticket Category
// --------------------------------------------------------------------------------------------------- [4]:Ticket Category ---------------------------------------------------------------------------------------------------//
//* [4.3]: Ticket Category List Start
function ticketCategoryList() {
    $.ajax({
        url: 'api/v1/tickets_category/list',
        method: 'POST',
        dataType: 'json',
        data: {},
        success: function (data) {
            if (data.status == "true" || data.status === true) {
                let data_array = [];

                for (var i = 0; i < data.data.length; i++) {
                    let details = data.data[i];

                    var status;
                    if (details.status == 1) {
                        status = '<span class="badge text-bg-primary p-2">Active</span>';
                    } else if (details.status == 2) {
                        status = '<span class="badge text-bg-warning p-2">Pending</span>';
                    } else {
                        status = '<span class="badge text-bg-secondary p-2">Unknown</span>';
                    }

                    var action = `
                        <div class="d-flex align-items-center">
                            <a class="btn btn-icon ticket_category_view_button" data-id="${details.id}" data-bs-toggle="modal" href="#ticket_view_model" role="button"><i class="fa-solid fa-eye"></i></a>
                            <button class="btn btn-icon "><i class="fa-solid fa-toggle-off text-warning"></i></button>
                            <a class="btn btn-icon ticket_category_edit_button" data-id="${details.id}" data-bs-toggle="modal" href="#ticket_view_model" role="button"><i class="fa-solid fa-pencil"></i></a>
                            <button class="btn btn-icon"><i class="fa-solid fa-trash-can text-danger"></i></button>
                        </div>
                    `;

                    var color_code =
                        `
                        <div class="d-flex align-items-center gap-2">
                            <input type="color" value="${details.color_code}" disabled style="width:100px" />
                            <label>${details.color_code}</label>
                        </div>
                        `

                    let array = [
                        i + 1,
                        details.name,
                        details.color_name,
                        color_code,
                        status,
                        action
                    ];

                    data_array.push(array);
                }

                // Push Data Into Table
                $('#ticket_category_list_table').DataTable({
                    data: data_array,
                    destroy: true,
                    paging: true,
                    searching: true
                });

                // Call View Function
                $('.ticket_category_view_button').on('click', function () {
                    var id = $(this).data('id');
                    ticketCategoryView(id);
                    document.getElementById('productCategoryEditButton').classList.add("d-none");
                    document.getElementById('ticketCategoryViewName').disabled = true;
                    document.getElementById('ticketCategoryViewColorName').disabled = true;
                    document.getElementById('ticketCategoryViewColorCode').disabled = true;
                    document.getElementById('ticket_view_edit_model_title').innerHTML = "Ticket Category View";
                });

                // Call Edit Function
                $('.ticket_category_edit_button').on('click', function () {
                    var id = $(this).data('id');
                    ticketCategoryView(id);
                    document.getElementById('productCategoryEditButton').classList.remove("d-none");
                    document.getElementById('ticketCategoryViewName').disabled = false;
                    document.getElementById('ticketCategoryViewColorName').disabled = false;
                    document.getElementById('ticketCategoryViewColorCode').disabled = false;
                    document.getElementById('ticket_view_edit_model_title').innerHTML = "Ticket Category Edit";
                });


            } else {
                alert(data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [4.3]: Ticket Category List End
function ticketCategoryView(id) {
    $.ajax({
        url: '/api/v1/tickets_category/view',
        method: 'POST',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function (data) {
            if (data.status === true || data.status === "true") {
                console.log(data);

                let details = data.data;
                $('#ticketCategoryViewId').val(details.id);
                $('#ticketCategoryViewName').val(details.name);
                $('#ticketCategoryViewColorName').val(details.color_name);
                $('#ticketCategoryViewColorCode').val(details.color_code);

            } else {
                console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error making the request:', textStatus, errorThrown);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while processing your request.',
            });
        }
    });
}
//* [4.4]: Ticket Category View Start
// --------------------------------------------------------------------------------------------------- [4]:Ticket Category ---------------------------------------------------------------------------------------------------//
// [4]:Ticket Category





