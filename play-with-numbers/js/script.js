/*
        YOU'RE GONNA NEED BOOTSTRAP, FONTAWESOME TO GET THE BEST DISPLAY OF THIS PAGE

        Author: Bui Minh Phuc

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
    noti +=1;
    switch(noti){
        case 20: alert('Cũng chịu chơi quá ha :))');break;
        case 30: alert('Có vẻ nghiêm túc! Có gì mà gõ nhiều vậy?');break;
        case 50: alert('Định hack đúng không? Chết mày rồi con ạ.');break;
    }
    var num_arr = new Array(); //tạo mảng chứa số
    num_val = chuoi.num.value; //lấy chuỗi

    flag=0;
    var z = 0;

    //tách số và gán vào mảng
    for(var i = 0;i < num_val.length;i++){
        if(flag==1){break;} //gặp flag thì break
        if(z-1==num_val.length){break;}

        num_arr[i] = '';

        for(var j=z;j < num_val.length;j++,z++){ //sau break j = 0
            temp = num_val.substr(j,1);
            if(temp.charCodeAt(0)==32){z++;break;} //gặp khoảng trắng thì break
            if(temp.charCodeAt(0)>=48 && temp.charCodeAt(0)<=57 || temp.charCodeAt(0)>=45){
                num_arr[i] += temp;
                if((num_arr[i]).length==num_val.length){flag=1;break;} //chiều dài phần tử bằng đúng chiều dài chuỗi thì break
            }
        }
    }

    //lọc xóa num_arr chứa dấu cách
    for(var i=0; i < num_arr.length; i++){
        if(isNaN((num_arr[i]).charCodeAt(0))){
            num_arr.splice(i,1);i--;
        }
        else {num_arr[i] = parseFloat((num_arr[i]));}
    }

    //tổng
    for(var i=0,tong='',result=0; i < num_arr.length; i++){
        if(i==0) {p=""} else {p=" + "}
        if(num_arr[i]>0){ tong += p + num_arr[i];}
        else { tong += p + '(' + num_arr[i] + ')';}
        result += num_arr[i];
        chuoi.tong.value = tong + ' = ' + result;
    }

    //tích
    for(var i=0,tich='',result=1; i < num_arr.length; i++){
        if(i==0) {p=""} else {p=" x "}
        if(num_arr[i]>0){ tich += p + num_arr[i];}
        else { tich += p + '(' + num_arr[i] + ')';}
        result *= num_arr[i];
        chuoi.tich.value = tich + ' = ' + result;
    }


    //sắp xếp tăng dần 1 3 2 4
    if(num_arr.length==1){
        chuoi.tang.value = "Ê các Hạ! Nó cho tao có một số à không sắp xếp được :(";
        chuoi.giam.value = "Hãm thật tao cũng không hơn gì mày đường Tăng ạ!";
    }
    else {
        for(var i=0; i < num_arr.length-1; i++){
            for(var j=i+1; j < num_arr.length; j++){
                if(num_arr[i] > num_arr[j]){
                    temp = num_arr[i];
                    num_arr[i] = num_arr[j];
                    num_arr[j] = temp;
                }
            }
            chuoi.tang.value = num_arr.join(' < ');
        }
        chuoi.giam.value = num_arr.sort(function(a, b){return b - a}).join(' > ');
    }

    chuoi.dai.value = num_arr.length + ' số và ' + num_val.length + ' kí tự.'; //lấy độ dài chuỗi sau khi lọc space


}

function xoa_chuoi(){
    chuoi.num.value = "";
    chuoi.tong.value="";
    chuoi.dai.value="";
    chuoi.tich.value="";
    chuoi.tang.value="";
    chuoi.giam.value="";
}

$(document).keyup(function(){ play_now();});