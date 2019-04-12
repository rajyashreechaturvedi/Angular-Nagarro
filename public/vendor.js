$(() => {
    function refreshList() {
      $.get('/vendor', (data) => {
        $('#vendorlist').empty()
        for (let ven of data) {
          $('#vendorlist').append(
            `<li>${ven.vendor_name}</li>`
          )
        }
      })
    }
  
    refreshList()
  
    $('#add_vendor').click(() => {
      $.post(
        '/vendor',
        {
          vendor_name: $('#vendor_name').val()
        },
        (data) => {
          if (data.success) {
            refreshList()
          } else {
            alert('Some error occurred')
          }
        }
      )
    })
  })