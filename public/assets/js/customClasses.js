/**
 * @Author
 *  R.M. Kavindu Nimesh
 * @version
 *  V1.0.0
 * @Contents
 *  [1] => httpRequest
 *  [2] => Alert
 *  [3] => dataTable
 *  [4] => Pagination
**/


class httpRequest {
    static async json({ route = "", method = "post", data = {}, baseURL = "" }) {
        return new Promise(resolve => {
            $.ajax({
                url: baseURL + route,
                method: method,
                data: data,
                dataType: "json",
                contentType: "application/json",
                success: async function (data) {
                    resolve(data);
                    return;
                },
                error: function (data) {
                    resolve({ status: false, message: data.statusText });
                    return;
                }
            });
        });
    }
    
    static async form({ route = "", method = "post", data = new FormData(), baseURL = "" }) {
        return new Promise(resolve => {
            $.ajax({
                url: baseURL + route,
                method: method,
                data: data,
                processData: false,
                contentType: false,
                success: async function (data) {
                    resolve(data);
                    return;
                },
                error: function (data) {
                    resolve(data);
                    return;
                }
            });
        });
    }
}

class Alert {
    static error({ title = "error", timer = 2000, position = 'top-end' }) {
        Swal.fire({
            position: position,
            icon: 'error',
            title: title,
            showConfirmButton: false,
            timer: timer
        });
    }
    static success({ title = "success", timer = 2000, position = 'top-end' }) {
        Swal.fire({
            position: position,
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: timer
        });
    }
    static confirmBox({
        title = 'Are you sure?',
        text = 'You will not be able to undo this action!',
        confirmButtonText = 'Yes, do it!',
        cancelButtonText = 'No, cancel!',
        confirmButtonColor = '#3085d6',
        cancelButtonColor = '#d33',
        icon = 'warning'
    }) {
        return new Promise(resolve => {
            Swal.fire({
                title: title,
                text: text,
                icon: icon,
                showCancelButton: true,
                confirmButtonColor: confirmButtonColor,
                cancelButtonColor: cancelButtonColor,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}

class dataTable {

    static create({
        headers = [],
        dataTableDiv = "dataTable",
        rowsPerPage = 10
    }) {

        let ths = headers.map(key => `<th>${key}</th>`).join('');

        let dataTable = `${dataTableDiv}_table`;
        let searchInputId = `${dataTable}_searchInput`;
        let currentPageId = `${dataTable}_currentPage`;
        let prevBtnId = `${dataTable}_prevBtn`;
        let nextBtnId = `${dataTable}_nextBtn`;

        let input = document.createElement("input");
        input.type = "hidden";
        input.id = `${dataTable}_input`;
        input.value = JSON.stringify([]);
        document.body.appendChild(input)


        document.getElementById(dataTableDiv).innerHTML = `
            <div class="table-filter">
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input class="searchbox" type="text" placeholder="Search..." id="${searchInputId}">
                </div>
                <div class="">
                    <select id="${dataTable}_show_count" onchange="${dataTable}_handleSearch()" class="form-select table-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            <div class="responsive-table">
                <table class="my-2" id="${dataTable}">
                    <thead class="table-header">${ths}</thead>
                    <tbody class="table-body">
                    </tbody>
                </table>
            </div>
            <div class="table-footer d-flex justify-content-between align-items-center">
                <div class="pt-3 pb-1 px-3">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#dataTable" id="${prevBtnId}">Prev</a></li>
                            <li class="page-item"><a class="page-link" href="#dataTable" id="${currentPageId}">Page 1</a></li>
                            <li class="page-item"><a class="page-link" href="#dataTable" id="${nextBtnId}">Next</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="back-to-top">
                    <a href="#">
                        <i class="fa-solid fa-chevron-up"></i>
                    </a>
                </div>
            </div>
            `;

        let show_counts = [10, 20, 50, 100];
        if (show_counts.includes(rowsPerPage)) {
            document.getElementById(`${dataTable}_show_count`).value = rowsPerPage;
        } else {
            let option = document.createElement("option");
            option.value = rowsPerPage;
            option.innerHTML = rowsPerPage;
            option.selected = true;
            document.getElementById(`${dataTable}_show_count`).appendChild(option);
        }

        let script = `
            const ${dataTable}_tableBody = document.querySelector("#${dataTable} tbody");
            const ${dataTable}_prevBtn   = document.querySelector("#${prevBtnId}");
            const ${dataTable}_nextBtn   = document.querySelector("#${nextBtnId}");
            const ${dataTable}_currentPageSpan = document.querySelector("#${currentPageId}");
            const ${dataTable}_searchInput = document.querySelector("#${searchInputId}");
        
            let ${dataTable}_currentPage = 1;
            let ${dataTable}_pageStartIndex = 0;
            let ${dataTable}_pageEndIndex   = ${rowsPerPage};
        
            async function ${dataTable}_rendertableRowData(startIndex, endIndex, filteredtableRowData) {
        
                ${dataTable}_tableBody.innerHTML = "";
            
                if (filteredtableRowData.length < endIndex ) {
                    endIndex = filteredtableRowData.length;
                }
        
                for (let i = startIndex; i < endIndex; i++) {
            
                    const arr = filteredtableRowData[i];
                    const row = document.createElement("tr");
            
                    const includesValue = Object.values(arr).some(value => {
                    const nameCell = document.createElement("td");
                    nameCell.innerHTML = value;
                    row.appendChild(nameCell);
                    
                    });
            
                    ${dataTable}_tableBody.appendChild(row);
                }

            }
        
        
            function ${dataTable}_updatePaginationButtons() {
                ${dataTable}_prevBtn.disabled = ${dataTable}_currentPage === 1;
                ${dataTable}_nextBtn.disabled = ${dataTable}_currentPage === Math.ceil(JSON.parse(document.getElementById('${dataTable}_input').value).length / parseInt($(\`#${dataTable}_show_count\`).val()));
                ${dataTable}_currentPageSpan.textContent = \`Page \${${dataTable}_currentPage}\`;
            }

        
            function ${dataTable}_goToPreviousPage() {
                if (${dataTable}_currentPage > 1) {
                    ${dataTable}_currentPage--;
                    ${dataTable}_handleSearch((${dataTable}_currentPage - 1) * parseInt($(\`#${dataTable}_show_count\`).val()), ${dataTable}_currentPage * parseInt($(\`#${dataTable}_show_count\`).val()));
                    ${dataTable}_updatePaginationButtons();
                }
            }
        
            function ${dataTable}_goToNextPage() {
                if (${dataTable}_currentPage < Math.ceil(JSON.parse(document.getElementById('${dataTable}_input').value).length / parseInt($(\`#${dataTable}_show_count\`).val()))) {
                    ${dataTable}_currentPage++;
                    ${dataTable}_handleSearch((${dataTable}_currentPage - 1) * parseInt($(\`#${dataTable}_show_count\`).val()), ${dataTable}_currentPage * parseInt($(\`#${dataTable}_show_count\`).val()));
                    ${dataTable}_updatePaginationButtons();
                }
            }
        
            function ${dataTable}_filtertableRowData(query) {

                const filteredtableRowData = JSON.parse(document.getElementById('${dataTable}_input').value).filter(function(arr) {
                    const lowerCaseQuery = query.toLowerCase();
                    return (
                        Object.values(arr).some(value => {
                            if (typeof value === 'string') {
                                const lowerCaseValue = value.toLowerCase();
                                return lowerCaseValue.includes(lowerCaseQuery);
                            }
                            return false;
                        })
                    );
                });
            
                return filteredtableRowData;
            }
        
            function ${dataTable}_handleSearch(startIndex, endIndex) {
                if (endIndex === undefined) {
                    endIndex = ${dataTable}_pageStartIndex + parseInt($(\`#${dataTable}_show_count\`).val());
                    startIndex = ${dataTable}_pageStartIndex;
                } else {
                    ${dataTable}_pageEndIndex = endIndex;
                    ${dataTable}_pageStartIndex = startIndex;
                }
                const searchQuery = ${dataTable}_searchInput.value;
                const filteredtableRowData = ${dataTable}_filtertableRowData(searchQuery);
                ${dataTable}_rendertableRowData(startIndex, endIndex, filteredtableRowData);
            }
        
            ${dataTable}_prevBtn.addEventListener("click", ${dataTable}_goToPreviousPage);
            ${dataTable}_nextBtn.addEventListener("click", ${dataTable}_goToNextPage);
        
            ${dataTable}_searchInput.addEventListener("input", ${dataTable}_handleSearch);
            ${dataTable}_handleSearch();
            ${dataTable}_updatePaginationButtons();`;
        let scriptTag = document.createElement("script");
        scriptTag.id = `${dataTable}_script`;
        scriptTag.innerHTML = script;

        document.body.appendChild(scriptTag);
    };

    static add(
        {
            data = [],
            dataTableDiv = "dataTable",
        }) {

        document.getElementById(`${dataTableDiv}_table_input`).value = JSON.stringify(data);
        let script = document.createElement("script");
        script.innerHTML = `${dataTableDiv}_table_handleSearch()`;
        script.id = `${dataTableDiv}_callback`
        document.body.appendChild(script);
        document.getElementById(`${dataTableDiv}_callback`).remove();
    }
}

class Pagination {
    static async add({
        paginationId = "pagination",
        buttonCount = 3,
        callback = "tableLoad",
        displayCount = 10
    }) {
        // Pagination buttons inner
        let buttons = '';
        let await_to_loop = new Promise(resolve => {
            for (let i = 0; i < buttonCount; i++) {
                buttons = buttons + `<li onclick="paginationActive(this,${callback}, '${paginationId}');" class="${paginationId}page-item active"><a class="page-link ${paginationId}pageValNo" href="javascript:void(0)">${i + 1}</a></li>`;
                if (i === buttonCount - 1) {
                    resolve(true);
                    return;
                }
            }
        });
        await await_to_loop;
        document.getElementById(paginationId).innerHTML = `
        <nav aria-label="...">
            <ul class="pagination justify-content-center justify-content-md-start">
                <li onclick="pagination(-1, '${paginationId}',${callback}, '${buttonCount}');" class="${paginationId}page-item"><a class="page-link prev"
                        href="javascript:void(0)">Prev</a></li>
                ${buttons}
                <li onclick="pagination(+1, '${paginationId}',${callback}, '${buttonCount}');" class="${paginationId}page-item"><a class="page-link next"
                        href="javascript:void(0)">Next</a></li>
            </ul>
        </nav>`;
        let countInput = document.createElement(`input`);
        countInput.type = `hidden`;
        countInput.id = `${paginationId}_count`;
        countInput.value = displayCount;
        document.body.appendChild(countInput);

        let pageFirstNoInput = document.createElement(`input`);
        pageFirstNoInput.type = `hidden`;
        pageFirstNoInput.id = `${paginationId}_pageFirstNo`;
        pageFirstNoInput.value = 1;
        document.body.appendChild(pageFirstNoInput);

        let pageNoInput = document.createElement(`input`);
        pageNoInput.type = `hidden`;
        pageNoInput.id = `${paginationId}_pageNo`;
        pageNoInput.value = 1;
        document.body.appendChild(pageNoInput);

        let totalCountInput = document.createElement(`input`);
        totalCountInput.type = `hidden`;
        totalCountInput.id = `${paginationId}_totalCount`;
        totalCountInput.value = 200;
        document.body.appendChild(totalCountInput);

        let script = document.createElement('script');
        script.innerHTML = `
        function paginationActive(element, callback, paginationId) {
            document.getElementsByClassName(\`\${paginationId}page-item page-link-active\`)[0].classList.remove("page-link-active");
            document.getElementById(\`\${paginationId}_pageNo\`).value = element.querySelector("a").innerHTML;
            element.classList.add("page-link-active");
            callback();
        }

        function pagination(type, paginationId, callback, buttonCount) {

            if ((parseInt(document.getElementById(\`\${paginationId}_totalCount\`).value) / parseInt(document.getElementById(\`\${paginationId}_count\`).value) <= parseInt(document.getElementById(\`\${paginationId}_pageFirstNo\`).value)) && type == 1) {
                return;
            }
            let a = parseInt(document.getElementById(\`\${paginationId}_pageFirstNo\`).value);
            if (a + type != 0) {
                for (let i = 0; i < parseInt(buttonCount); i++) {
                    document.getElementsByClassName(\`\${paginationId}pageValNo\`)[i].innerHTML = a + type + i;
                }
                document.getElementById(\`\${paginationId}_pageFirstNo\`).value = a + type;
                document.getElementById(\`\${paginationId}_pageNo\`).value = parseInt(document.getElementById(\`\${paginationId}_pageNo\`).value) + type;
                callback()
            }
        }
        `;
        document.body.appendChild(script);

    }
}

async function deleteData(tableId = "", resultId = "", callback) {
    
    iziToast.show({
        theme: 'dark',
        icon: 'fa-solid fa-trash-can',
        title: 'Are you sure?',
        message: 'Do you want to delete this customer?',
        position: 'center',
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button>Yes</button>', function (instance, toast) {

                $.ajax({
                    url: "/api/delete",
                    method: "delete",
                    data: JSON.stringify({
                        tableId: tableId,
                        resultId: resultId
                    }),
                    dataType: "json",
                    contentType: "application/json",
                    success: async function (data) {
                        if ( data.status ) {

                            iziToast.success({
                                timeout: 5000,
                                icon: 'fa fa-check',
                                title: 'Done',
                                message: data.message,
                            });
                            
                            callback()
                        } else {

                            iziToast.error({
                                timeout: 5000,
                                icon: 'fa fa-ban',
                                title: 'Error',
                                message: data.message,
                            });

                        }
                    },
                    error: function (data) {

                        iziToast.error({
                            timeout: 5000,
                            icon: 'fa fa-ban',
                            title: 'Error',
                            message: data.statusText,
                        });

                    }
                });

                iziToast.hide({
                    transitionOut: 'fadeOutUp'
                }, toast);
            }, true],
            ['<button>No</button>', function (instance, toast) {
                iziToast.hide({
                    transitionOut: 'fadeOutUp'
                }, toast);
            }]
        ],
    });
}

async function statusChange(tableId = "", resultId = "", status, callback) {
    $.ajax({
        url: "/api/status",
        method: "post",
        data: JSON.stringify({
            resultId: resultId,
            tableId: tableId,
            status: status
        }),
        dataType: "json",
        contentType: "application/json",
        success: async function (data) {
            if ( data.status ) {

                iziToast.success({
                    timeout: 5000,
                    icon: 'fa fa-check',
                    title: 'Done',
                    message: data.message,
                });

                callback()
            } else {

                iziToast.error({
                    timeout: 5000,
                    icon: 'fa fa-ban',
                    title: 'Error',
                    message: data.message,
                });
            }
        },
        error: function (data) {

            iziToast.error({
                timeout: 5000,
                icon: 'fa fa-ban',
                title: 'Error',
                message: data.statusText,
            });
        }
    });
}

class Form {

    static inputFocus(
        {
            form,
            fields = {},
            callback = "console.log"
        }
    ) {
        let script = document.createElement("script");
        script.innerHTML = `$("${form} input").keypress(e => {
            if (e.which === 13) {
                e.preventDefault();
                let fields = ${JSON.stringify(fields)};
                const target = fields[e.currentTarget.id];
                if (target != undefined) {
                    if (target) typeof target === "string" ? $(target).focus() : target(); else ${callback}();
                }
                
            }
        });`;
        document.body.appendChild(script);
    }

    static lock(
        {
            button = "submit",
            waiting = "wait..."
        }
    ) {
        $(button).prop("disabled", true);
        $(button).attr("data-text", $(button).text());
        $(button).text(waiting);

    }

    static unlock(
        {
            button = "submit"
        }
    ) {
        $(button).prop("disabled", false);
        $(button).text($(button).attr("data-text"));
        $(button).removeAttr("data-text");
    }

}