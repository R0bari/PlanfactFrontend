$(document).ready(function(){

    let currentRow;
    var id_count = 0;
    var table;
    var last_id;
    var out ='<thead> <tr> <th>Order ID</th> <th>Customer</th> <th>Date</th> <th>Status</th> <th>Email</th> <th>Actions</th> </tr> </thead>';
    
    $(".new-element-blackout").hide();
    
    $.getJSON('https://raw.githubusercontent.com/planfact/frontend/master/MOCK_DATA.json', function(data){        
        $.each(data, function(key, val){
            id_count++;

            out += '<tr>';
            out += '<td width="150">'+ val.id + '</td>'+ '<td width="200">'+ val.first_name + ' ' + val.last_name + '</td>' + '<td width="200">'+ val.data + '</td>';
            out += '<td width="150">';
            switch(val.status){
                case 'active':{
                    out += '<img src="img/green.png"/>';
                    break;
                }
                case 'pending':{
                    out += '<img src="img/yellow.png"/>';
                    break;
                }
                case 'archive':{
                    out += '<img src="img/red.png"/>';
                    break;
                }
            }
            
            out += ' ' + val.status + '</td>' + '<td>' + val.email + "</td>";
            out += '<td>' + '<img src="img/dot.png"/>';
            if (val.status != "archive"){
                // out += '<a href="javascript:popUpShow():">';
                out += '<a href="javascript:popUpShow(' + id_count + ');">';
            }
            out += '<img src="img/pen.png" alt="edit"/></a>' + '</td>';
            out += '</tr>';
            last_id = val.id;
        });
        
        drawCount();
        newTable();
    });

    function drawCount(){
        $('.orders-count').html('<p class="orders-count-label">' + id_count + " total</p>");
    }
    function hideLoader(){
        $('#loader-wrapper').hide();
    }
    function showLoader(){
        $('#loader-wrapper').show();
    }
    function newTable(){
        $('#table').html(out);
        table=$('#table').DataTable( {
            columnDefs: [
                {
                    targets: [ 0, 1, 2, 3 ],
                    className: 'mdl-data-table__cell--non-numeric'
                }
            ]
        } );
        hideLoader();
    }
    $("#create-button").click(function(){
        $(".new-element-blackout").show();
    })
    $(".form-button").click(function(){
        $(".new-element-blackout").hide();
        $(".edit-element-blackout").hide();
    })
    $("#new-element-save").click(function(){
        $(".new-element-blackout").hide();

        hideLoader();

        ++id_count;
        table.destroy();
        
        var first_name = document.getElementsByClassName('new-element-firstname')[0].value;
        var last_name = document.getElementsByClassName('new-element-lastname')[0].value;
        var date = document.getElementsByClassName('new-element-date')[0].value;
        var status = document.getElementsByClassName('new-element-status')[0].value;
        var email = document.getElementsByClassName('new-element-email')[0].value;
        var name_and_lastname = first_name + ' ' + last_name;

        out +='<tr><td width="150">'+ id_count + '</td>'+ '<td width="200">'+ name_and_lastname + '</td>' + '<td width="200">'+ date + '</td>';
        out += '<td width="150">';

        switch(status){
            case 'active':{
                out += '<img src="img/green.png"/>';
                break;
            }
            case 'pending':{
                out += '<img src="img/yellow.png"/>';
                break;
            }
            case 'archive':{
                out += '<img src="img/red.png"/>';
                break;
            }
        }
        out += ' ' + status + '</td>' + '<td>' + email + "</td>";
        out += '<td>' + '<img src="img/dot.png"/>';
        if (status != "archive"){
            out += '<a href="javascript:PopUpShow()">';
        }
        out += '<img src="img/pen.png" alt="edit"/></a>' + '</td>';

        drawCount();
        newTable();
    })
    $("#edit-element-save").click(function(){
        var rows = document.querySelectorAll('tr>td');
        for (var i = 0; i < rows.length; ++i){
            
        }
        
    })
});

function popUpShow(rowId){
    $(".edit-element-blackout").show();
    
    currentRow = rowId;
    console.log(currentRow);

    $.getJSON('https://raw.githubusercontent.com/planfact/frontend/master/MOCK_DATA.json', function(data){
        $.each(data, function(key, val){
            if (val.id == rowId){
                $('.edit-element-firstname').attr('value', val.first_name);
                $('.edit-element-lastname').attr('value', val.last_name);
                $('.edit-element-date').attr('value', Date(val.data));
                $('.edit-element-status').attr('value', val.status);
                $('.edit-element-email').attr('value', val.email);
            }
        })
    })

}
