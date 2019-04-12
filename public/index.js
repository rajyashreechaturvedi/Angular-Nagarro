$(document).ready(function(){
    
    $("#goto_vendor").click(function(){
        document.location.href="Vendor.html"
    })
    $("#goto_product").click(function(){
        document.location.href="Product.html"
    })
    $('#login').click(() => {
      $.post(
        '/shopping',
        {
          username: $('#username').val()
        },
        (data) => {
          if (data.success) {
            refreshList()
          } else {
            alert(data.err)
          }
        }
        )
        
      document.location.href="Shopping.html"
      }
      )
});