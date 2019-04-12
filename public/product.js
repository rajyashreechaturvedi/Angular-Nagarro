$(() => {
    function refreshList(){
        $.get('/product', (data) => {
            $('#productlist').empty()
            $('#productlist').append(
                `<tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Vendor</th>
                </tr>`
            )
            for(let prod of data){
                $('#productlist').append(
                    `<tr>
                    <td align=center>${prod.product_name}</td>
                    <td align=center>${prod.product_price}</td>
                    <td align=center>${prod.product_qty}</td>
                    <td align=center>${prod.vendor_id}</td>
                    </tr>`
                )
            }
        })
    }

    function refreshVendor(){
        $.get('/vendor', (data) => {
            $('#select_vendor').empty()
            for(let ven of data){
                $('#select_vendor').append(
                    `<option value = ${ven.vendor_id}>${ven.vendor_name}</option>`
                )
            }
        })
    }

    refreshList()
    refreshVendor()

    $('#add_product').click(() => {
        $.post(
            '/product',
            {
                product_name: $('#pname').val(),
                product_price: $('#pprice').val(),
                product_qty: $('#pqty').val(),
                vendor_id: $('#select_vendor').val()
            },
            (data) => {
                if(data.success){
                    refreshList()
                }
                else{
                    alert("Some error occurred!")
                }
            }
        )
    })
})