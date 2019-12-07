$('#addToCard').click(function () {
    $('#addToCard span').text('Thêm thành công!');
    setTimeout(() => {
        $('#addToCard span').text('Thêm vào giỏ hàng');
    }, 1500);
});
