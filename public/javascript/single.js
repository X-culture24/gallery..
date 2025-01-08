

$(document).ready(function(){
    $('.modal').modal();
    
    $("form").submit(function(e){
        // e.preventDefault()
        var  name = $('input').val();
        var id = $('form').attr('data-id');

        fetch('/image/'+id, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
            })
            })
            .then(response => {
                console.log(response)
            if (response.ok) return response.json()
            })
            .then(data => {
            console.log(data)
        })
    })

        $.ajax({
            type: 'put',
            url: '/image/'+id,
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                'name': name
            }), 
            error: function(err){
                console.log(err)
            }
        })
    })
   


    $('#delete').on("click", function(){
        var id = $('#delete').attr('data-id');
        console.log(id)
        fetch('/image/'+id, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                _id: id 
            })
        })
        .then(function(response){
            window.location.href='/'
        })
    })
    
});






