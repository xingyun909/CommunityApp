$(document).ready (function(){
    $(".add").click(function(){
        var t=$(this).parent().find('label[class*=num]');
        t.html(parseInt(t.html())+1);
        setTotal(); 
    });
    $(".min").click(function(){
        var t=$(this).parent().find('label[class*=num]');
        t.html(parseInt(t.html())-1); 
        if(parseInt(t.html())<0){
            t.html(0);
        }
        setTotal(); 
    });
    function setTotal(){
        var s=0;
        $('#list .goods').each(function(){
            s+=parseInt($(this).find('label[class*=num]')
                .html())*parseFloat($(this)
                .find('span[class*=price]').text()); 

            f=s-parseFloat($('.dis_p').text());
        });
        $("#total_pri").html(s.toFixed(2)); 
        $(".total_fin").html(f.toFixed(2)); 
    }
    setTotal(); 
})

