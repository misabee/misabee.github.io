
function creatOrder(callback1, callback2, callback3, callback4) {
    var infor = {};
    var orders = JSON.parse(localStorage.getItem("orders"));
    infor.name = $("#name").val();
    infor.address = $("#address").val();
    infor.phone = $("#phone").val();
    if (infor.name == '' || infor.address == '' || infor.phone == '') {
        $(document).ready(function () { alert("Vui lòng điền thông tin hợp lệ!"); })
    }
    else {
        orders.push(infor);
        callback1(orders);
        callback2();
        callback3();
        callback4();
    }
}

function save(orders) {
    localStorage.setItem("order", JSON.stringify(orders));
}

function post() {
    $.ajax({
        url: "/cart/submit/order",
        type: "post",
        dataType: "json",
        data: {
            data: localStorage.getItem("order")
        }
    });
}

function remove() {
    localStorage.removeItem("ids");
    localStorage.removeItem("order");
    localStorage.removeItem("orders");
}

function changeContent() {
    $("#order").remove();
    $("#order-add").append(
        '<div style="height: 30px;">' +
            '<div class="jumbotron">' +
                '<div class="p404"> <img class="p404-i" src="https://res.cloudinary.com/dumfvnj9f/image/upload/v1575992818/misa-bee/checked_jyalkq.png" alt="checked.png" style="height: 220px;" /></div>' +
                '<h1 class="p404">Đặt hàng thành công!</h1>' +
                '<h5 class="p404">Sẽ có nhân viên liên hệ với bạn để xác nhận.</h5>' +
                '<div style="text-align: center; padding-top: 20px;"><a class="btn btn-outline-secondary" href="/" role="button">Tiếp tục mua sắm</a></div>' +
            '</div>' +
            '<div style="height: 30px;"></div>' +
        '</div>'
    );
    $("main").css("min-height", "32.1rem")
}

$(document).ready(() => {
    
    if (localStorage.getItem("ids") == null || localStorage.getItem("ids") == "[]") {
        $("#order-form").remove();
        $("#order-content").append(
            '<div class="alert alert-secondary" role="alert" style="text-align: center; margin-top:30px;">' +
                'Giỏ hàng trống !' +
            '</div>'
        );
    }
});

$("#send").click(() => {
    creatOrder(save, post, changeContent, remove);
});