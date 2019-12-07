var page = 2;
    $('#a').click(() => {
        $.ajax({
            url: 'api/products/page?page=' + page,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (var i = 0; i < data.length - 1; i++) {
                    product = data[i];
                    $('#products').append(
                        '<div class="col-lg-4 col-md-6 mb-4 product-col">' + 
                            '<div class="card product-card">' + 
                                '<a class="img-link", href="/products/' + data[i]._id + '">' + '<img class="card-img" src="' + data[i].image_brand + '" alt="Card image">' + '</a>' + 
                                '<div class="card-body">' + 
                                    '<a href="/products/' + data[i]._id + '">' + '<h4 class="card-title">' + data[i].name + '</h4>' + '</a>' +
                                    '<h5 class="price">' + data[i].price + '<span>&nbsp;₫</span></h5>' + 
                                '<div/>' + 
                            '</div>' + 
                        '</div>'
                    );
                }
                if (parseInt(data[data.length - 1]) == page)
                    $('.load-more').remove();
                page++;
            }
        });
    });