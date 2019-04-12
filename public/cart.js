$(() => {

    $("#back").click(function(){
        document.location.href="Shopping.html"
    })

    function refreshList(){
        $.get('/cart', (data) => {
            $('#cartlist').empty()
            $('#cartlist').append(
                `<tr>
                <th>Product Name</th>
                <th>Quantity</th>
                </tr>`
            )
            for(let prod of data){
                $('#cartlist').append(
                    `<tr>
                    <td align=center>${prod.product_id}</td>
                    <td align=center>${prod.cart_qty}</td>
                    </tr>`
                )
            }
        })
    }
    refreshList()
})