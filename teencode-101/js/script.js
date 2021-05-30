/*
YOU'RE GONNA NEED BOOTSTRAP, FONTAWESOME TO GET THE BEST DISPLAY OF THIS PAGE
Author: Bui Minh Phuc
Demo: http://buiminhphuc.tk/teencode
*/
/*      ******       **        **   ******
        **    **     ****    ****   **    **
        **    **     ** **  ** **   **    **
        ********     **  ****  **   ******
        **      **   **        **   **
        **      **   **        **   **
        ********     **  2016  **   **         feel free to copy*/

var noti=0;
function play_now(){
    //lấy chuỗi
    var val_ea = code.ea.value;
    var val_sky = code.sky.value;
    var val_tr = code.trau.value;
    var val_s = code.stime.value;

    //gan so chu s va thay vao chuoi goc
    var s='';
    for(var i=0;i<val_s;i++){s+='s';}
    s = "\'"+s+" ";
    var str_e = val_ea.replace(/ /g,s);
    var eaLang =['ch','ck','nh','nk','b','p',
        'a','4','á','A\'','à','a`','ã','a~','ả','A~','ạ','Ạ',
        'â','a^','ầ','a^`','ấ','A^\'','ẩ','a^~','ậ','Ạ^',
        'ắ','Ă\'','ằ','Ă`','ẵ','Ă~','ẳ','Ă~','ặ','Ặ','ă','Ă',
        'o','0','ó','0\'','ò','0`','õ','0~','ọ','0','ỏ','O~',
        'ỗ','0^~','ố','0^\'','ô','0^','ồ','0^`','ổ','0^~','ộ','Ọ^',
        'ơ','Ơ','ớ','Ơ\'','ờ','Ơ`','ở','ơ~','ỡ','Ơ~','ợ','Ợ',
        'ủ','u~','ụ','Ụ','ù','U`','ú','U\'','ũ','U~','u','U',
        'ư','Ư','ứ','Ư\'','ừ','Ư`','ữ','Ư~','ử','Ư?','ự','Ự',
        'i','1','í','1\'','ì','I`','ĩ','I~','ị','!',
        'ê','e^','ề','3^`','ể','Ê~','ệ','Ệ','ễ','e^~','ế','3^\'',
        'e','3','é','3\'','è','3`','ẻ','E~','ẽ','3~','ẹ','Ẹ',
        'gi','z','gì','j`','y','i',
        'yêu','iêu','thích','thík','không','k0','được','dk','vậy','vaj'];

    var str_tr = val_ea.toLowerCase();
    for(var i=0;i<eaLang.length;i+=2){
        var re = new RegExp(eaLang[i], "g");
        str_tr = str_tr.replace(re,eaLang[i+1]);
    }

    //gan
    code.sky.value = str_e;
    code.trau.value = str_tr;

    //set length
    val_sky = code.sky.value;
    val_tr = code.trau.value;
    switch(val_ea.length){
        case 0: code.elen.value ='';break;
        default: code.elen.value = val_ea.length + ' kí tự';
    }
    switch(val_sky.length){
        case 0: code.slen.value ='';break;
        default: code.slen.value = val_sky.length + ' kí tự';
    }
    switch(val_tr.length){
        case 0: code.tlen.value ='';break;
        default: code.tlen.value = val_tr.length + ' kí tự';
    }
}
function xoa(){
    code.ea.value='';code.sky.value='';code.trau.value='';
}
$(document).keyup(function(){ play_now();});