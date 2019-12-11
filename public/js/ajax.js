$(document).ready(() => {
    $.ajax({
        url: 'api/products/page',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            for (var i = 0; i < data.length - 1; i++) {
                $('#products').append(
                    '<div class="col-lg-4 col-md-6 mb-4 product-col">' + 
                        '<div class="card product-card">' + 
                            '<a class="img-link", href="/products/' + data[i]._id + '">' + '<img class="card-img" src="' + data[i].image_brand + '" alt="Card image">' + '</a>' + 
                            '<div class="card-body">' + 
                                '<a href="/products/' + data[i]._id + '">' + '<h4 class="card-title">' + data[i].name + '</h4>' + '</a>' +
                                '<h5 class="price">' + data[i].price + '<span>.000₫</span></h5>' + 
                            '<div/>' + 
                        '</div>' + 
                    '</div>'
                );
            }
            if (data[data.length - 1] != 1) {
                $('#load-more-div').append(
                    '<div class="col-12 col load-more">' +
                        '<button class="btn btn-outline-secondary shadow-none" id="a">Xem thêm</button>' + 
                    '</div>' +
                    '<script type="text/javascript" src="/js/ajax-load-more.js"></script>'
                );
            }
        }
    });
});
