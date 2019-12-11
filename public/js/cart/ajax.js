function deduplicate(array) {
    let isExist = (array, x) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == x)
                return true;
        }
        return false;
    }

    let answer = [];
    array.forEach(element => {
        if (!isExist(answer, element))
            answer.push(element);
    });
    return answer
}

if (localStorage.getItem("ids") == null || localStorage.getItem("ids") == "[]") {
    $('#content-cart-page').append(
        '<div class="alert alert-dark" role="alert" style="text-align: center;"> Không có sản phẩm nào trong giỏ</div>'
    );
}
else {
    var ids = JSON.parse(localStorage.getItem("ids"));
    var ids_result = deduplicate(ids);
    localStorage.setItem("ids", JSON.stringify(ids_result));
    $('#content-cart-page').append(
        '<table class="table" id="table-cart-page">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Tên</th>' +
                    '<th scope="col">Giá</th>' +
                    '<th scope="col" style="text-align: center;">Số lượng</th>' +
                    '<th scope="col" style="text-align: center;">Xóa</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="cart-body-table">' +
                
            '</tbody>' +
        '</table>' +
        '<div id="submit-cart" style="display: flex;">' +
            '<span style="font-weight: bold; flex-grow: 1;">' +
                'Tổng thanh toán: &nbsp;' +
                '<span id="total">0</span>' +
                '<span>.000₫</span>' +
            '</span>' +
            '<button class="btn btn-danger shadow-none" id="submit-button">Đặt hàng</button>' + 
        '</div>' +
        '<script>' +
            '$("#submit-button").click(() => {' +
                'var total = $("#total").text();' +
                'var ids = JSON.parse(localStorage.getItem("ids"));' +
                'var orders = [];' +
                'for (var i = 0; i < ids.length; i++) {' +
                    'var order = {};' +
                    'var id = ids[i];' +
                    'var a = "#" + id + "_amount";' +
                    'var amount = $(a).text();' +
                    'order.id = id;' +
                    'order.amount = amount;' +
                    'orders.push(order);' +
                '}' +
                'localStorage.setItem("orders", JSON.stringify(orders));' +
                'window.location.href = "/cart/submit";' +
            '});' +
        '</script>'
    );

    var count = 0;
    var alert_cart = '<div class="alert alert-dark" role="alert" style="text-align: center;"> Không có sản phẩm nào trong giỏ</div>'

    for (var i = 0; i < ids_result.length; i++) {
        $.ajax({
            url: 'api/products/id/' + ids_result[i],
            type: 'GET',
            datatype: 'json',
            success: (data) => {
                $('#cart-body-table').append(
                    '<tr id=' + JSON.stringify(data._id) + '>' +
                        '<th scope="col">' +
                            '<a style="color: black;" href="/products/' + data._id + '" target="blank">' +
                                '<span>' + data.name + '</span>' +
                            '</a>' +
                        '</th>' +
                        '<th scope="col">' + data.price + '.000₫</th>' +
                        '<th scope="col" style="text-align: center;">' +
                            '<div id="input-amount" style="width: 118px; margin: auto;">' +
                                '<table>' +
                                    '<tr>' +
                                    '<td>' +
                                        '<button id="'+ data._id +'_reduction" class="btn btn-sm shadow-none reduction" style="padding-right: 0; padding-left: 0; width: 15px; padding-top: 0px; text-align: center; font-weight: bold;">' +
                                            '-' +
                                        '</button>' +
                                    '</td>'+
                                    '<td style="width: 15px; text-align: center;"><span id="'+ data._id +'_amount">1</span></td>' +
                                    '<td>' +
                                        '<button id="'+ data._id +'_increase" class="btn btn-sm shadow-none increase" style="padding-right: 0; padding-left: 0; width: 15px; padding-top: 0px; text-align: center; font-weight: bold;">' +
                                            '+' +
                                        '</button>' +
                                    '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>' +
                        '</th>' +
                        '<th scope="col" style="text-align: center;">' +
                            '<button class="btn btn-outline-secondary shadow-none" id="' + data._id + '_button' + '">Xóa</button>' +
                        '</th>' +
                    '</tr>' +
                    '<script type="text/javascript">' +
                        'var total' + data._id + ' = parseInt($("#total").text());' +
                        'var price' + data._id + ' = parseInt(' + data.price + ');' +
                        'total' + data._id + ' += price' + data._id + ';' +
                        '$("#total").text(total' + data._id + ');' +
                        
                        '$("#' + data._id + '_button").click(() => {' +
                            'var value = JSON.parse(localStorage.getItem("ids"));' +
                            'var index = value.indexOf("' + data._id + '");' +
                            'value.splice(index, 1);' +
                            'localStorage.setItem("ids", JSON.stringify(value));' +                            
                            'count++;' +
                            'if (count == ids_result.length) {' +
                                '$("#table-cart-page").remove();' +
                                '$("#submit-cart").remove();' +
                                "$('#content-cart-page').append('" +
                                    '<div class="alert alert-dark" role="alert" style="text-align: center;"> Không có sản phẩm nào trong giỏ</div>' +
                                "');" +
                            '}' +
                            'total' + data._id + ' = parseInt($("#total").text());' +
                            'total' + data._id + ' -= ' + parseInt(data.price) + ' * parseInt($("#' + data._id + '_amount").text());' +
                            '$("#total").text(total' + data._id + ');' +
                            '$("#' + data._id + '").remove();' +
                        '});' +
                        
                        '$("#' + data._id + '_reduction").click(() => {' +
                            'var newValue' + data._id + ';' +
                            'total' + data._id + ' = parseInt($("#total").text());' +
                            'var value' + data._id + ' = parseInt($("#'+ data._id +'_amount").text());' +
                            'if (value' + data._id + ' > 1) {' +
                                'newValue' + data._id + ' = value' + data._id + ' - 1;' +
                                'total' + data._id + ' -= price' + data._id + ';' +
                            '}' +
                            'else {' +
                                'newValue' + data._id + ' = value' + data._id + ';' +
                                'total' + data._id + ' = total' + data._id +
                            '}' +
                            '$("#'+ data._id +'_amount").text(newValue' + data._id + ');' +
                            '$("#total").text(total' + data._id + ');' +
                        '});' +
                        
                        '$("#' + data._id + '_increase").click(() => {' +
                            'var value' + data._id + ' = parseInt($("#'+ data._id +'_amount").text());' +
                            'var newValue' + data._id + ' = value' + data._id + ' + 1;' +
                            '$("#'+ data._id +'_amount").text(newValue' + data._id + ');' +
                            'total' + data._id + ' = parseInt($("#total").text());' +
                            'total' + data._id + ' += price' + data._id + ';' +
                            '$("#total").text(total' + data._id + ');' +
                        '});' +
                    '</script>'
                );
            }
        });
    }
}