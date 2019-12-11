var ids = [];

$(document).ready(function () {
    if (localStorage.getItem("ids") == null) {
        ids = [];
    }
    else {
        ids = JSON.parse(localStorage.getItem("ids"));
    }
});

$('#addToCard').click(function () {
    var id = $("#id").text();
    ids.push(id);
    localStorage.setItem("ids", JSON.stringify(ids));
    $('#addToCard span').text('Thêm thành công!');
    $('#addToCard i').text('done');
    setTimeout(() => {
        $('#addToCard span').text('Thêm vào giỏ hàng');
        $('#addToCard i').text('add_shopping_cart');
    }, 1300);
});