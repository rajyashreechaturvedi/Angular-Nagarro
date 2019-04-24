$(() => {
    $("#search").click(function(){
        console.log("Searching")
        
            $.post(
                '/searching',
                {
                  searchbox: $('#searchbox').val()
                },
                (data) => {
                  if (data.success) {
                    refreshSearch()
                  } else {
                    alert('Some error occurred')
                  }
                }
              )
    })

    function refreshSearch(){
        $.get('/shopping', (data) => {
            $('#productlist').empty()
            $('#productlist').append(
                `<tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Vendor</th>
                <th>Add</th>
                </tr>`
            )
            for(let prod of data){
                $('#productlist').append(
                    `<tr>
                    <td align=center>${prod.id}</td>
                    <td align=center>${prod.product_name}</td>
                    <td align=center>${prod.product_price}</td>
                    <td align=center>${prod.vendor_id}</td>
                    <td align=center><button type='button' class='btn_add' id='${prod.id} onclick='$.post('/cart',{
                        quantity:${1},
                        productId:${prod.id}
                        })'>Add</button></td>
                    </tr>`
                )
            }
        })
    }

    $("#goto_cart").click(function(){
        document.location.href="Cart.html"
    })
    
    $("#logout").click(function(){
        document.location.href="index.html"
    })

    function refreshList(){
        $.get('/product', (data) => {
            $('#productlist').empty()
            $('#productlist').append(
                `<tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Vendor</th>
                <th>Add</th>
                </tr>`
            )
            for(let prod of data){
                $('#productlist').append(
                    `<tr>
                    <td align=center>${prod.id}</td>
                    <td align=center>${prod.product_name}</td>
                    <td align=center>${prod.product_price}</td>
                    <td align=center>${prod.vendor_id}</td>
                    <td align=center><button type='button' class='btn_add' id='${prod.id} onclick='$.post('/cart',{
                        quantity:${1},
                        productId:${prod.id}
                        })'>Add</button></td>
                    </tr>`
                )
            }
        })
    }

    refreshList()
});
