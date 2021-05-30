/*
YOU'RE GONNA NEED BOOTSTRAP, FONTAWESOME TO GET THE BEST DISPLAY OF THIS PAGE
Author: Bui Minh Phuc
Demo: http://buiminhphuc.tk/ma-hoa-vigenere
*/
/*      ******       **        **   ******
        **    **     ****    ****   **    **
        **    **     ** **  ** **   **    **
        ********     **  ****  **   ******
        **      **   **        **   **
        **      **   **        **   **
        ********     **  2016  **   **         */
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
    if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
        document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
    else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
var advice = 0;
var key= new Array(12);//tu khoa
var incoming=new Array(500);//nhap vao
var outgoing=new Array(500);//xuat ra
var modval = parseInt(94);//ep kieu int modval = 94
var trans=parseInt(32);
var mykey=9;
var maxshift=24;
var j=1;
var ict=0;
var shift=1;
var temp=0;
var vigtable = new Array(26);//tao mang vigitable 26 phan tu
//moi mang vigitable thu i chua 1 mang 26 phan tu => table 26x26
for (var i=0; i<26; i++){
    vigtable[i] = new Array(26);
}
//tao ma tran vigitable [i][j]
function settext() {
    for (var i=0; i<26; i++){
        for (var j=0; j<26; j++){
            (vigtable[i])[j] = (j+i)%26;
        }
    }
}
//Encrypt a message with the Caesar cypher.
function encrypt(){
    fw=caesar.key.value;//lay gia tri value cua input name key trong form name ceasar
    ict=0;
    caesar.key.value = fw.toUpperCase();//doi thanh chu hoa
    fw = caesar.key.value;
    mykey=fw.length;


    //Parse encryption key.
    mess='';
    for(var i=0; i < fw.length; i++) {
        //vòng lặp với điều kiện dừng bé hơn độ dài kí tự của khóa key
        temp = fw.slice(i,i+1);
        //cắt lấy kí tự đầu tiên của từ khóa
        key[i]=temp.charCodeAt(0)-65;
        //gán vào biến key mã unicode của từ vừa lấy trừ đi 65, vì chữ latin in hoa bắt đầu từ A:dec=65, nên nếu 65-65=0 => A
        if(key[i]<0 || key[i]>26){alert('Từ khóa không được chứa số và kí tự đặc biệt nha! \nNhập từ khóa khác đê bạn êi.'); return;}
    }

    //nếu mã dec unicode nằm ngoài [65;90] nghĩa là ko phải chữ in hoa thì báo lỗi
    fw =  caesar.normal.value;//lấy chuỗi từ ô plaintext
    caesar.normal.value = fw.toUpperCase();
    fw = caesar.normal.value;
    caesar.shift.value=fw.length;//gán giá trị cho ô độ dài chuỗi (name="shift") bằng độ dài của plaintext
    if(fw.length > 500) {//báo lỗi nếu quá 500 kí tự
        alert('Nhập cái gì mà nhiều vậy? \nNgắn dưới 500 kí tự thôi!');
        return;
    }

    //tạo mảng incoming với mỗi phần tử là một kí tự từ chuỗi plaintext
    for (var k = 0; k < fw.length ; k++) {	incoming[k] =  fw.slice(k,k+1) ;	}

    //gán độ dài plaintext cho biến j
    var j=fw.length

    //kiểm tra nếu ô checkbox đc chọn thì xuất thông báo, chỉ xuất 1 lần
    if(caesar.checkbox.checked){
        if(advice == 0) {
            alert('Đặc biệt chú ý! \nChuỗi được mã hóa dưới dạng nhóm 5 kí tự khi giải mã sẽ không còn như chuỗi gốc!');
            advice = 1;
        }
        j=0;
        //gán kí tự vào mảng incoming[j] nếu kí tự đó nằm trong A-Z
        for (i = 0; i < fw.length; i++){
            //lấy mã unicode của kí tự có trong mảng incoming
            temp = parseInt((incoming[i]).charCodeAt(0));
            //nếu kí tự đó nằm trong A-Z thì gán kí tự đó vào mảng incoming[j]
            if(temp > 64 && temp <92 >= 0) {
                incoming[j]=incoming[i];
                j=j+1;}
        };
    }

    //
    for(var i=0; i < j;  i++) {
        temp = parseInt((incoming[i]).charCodeAt(0))-65;//temp=[0;26]
        if(temp < 0 || temp >25){}
        else {temp = vigtable[temp][key[ict]];//mảng key có 12 phần tử, lấy phần tử thứ ict=0;
            ict=(ict+1)%mykey;//mykey = độ dài từ khóa
        }
        //gán vào mảng incoming kí tự dịch từ mảng vigitable
        incoming[i] = String.fromCharCode(temp+65);
    }

    mess='';
    for(  i = 0; i < j;  i++) {
        if ( caesar.checkbox.checked && i>0 && (i)%5 == 0){mess=mess+' '}
        mess=mess + incoming[i]}
    caesar.crypt.value=mess;
}
//Decrypt a message with the Caesar cypher.
function decrypt(){
    fw=caesar.key.value;
    ict=0;
    caesar.key.value = fw.toUpperCase();
    fw = caesar.key.value;
    mykey=fw.length;
    caesar.shift.value=mykey;

    //Parse encryption key.
    mess='';
    for(var i=0; i < fw.length; i++) {
        temp = fw.slice(i,i+1);
        key[i]=temp.charCodeAt(0)-65;
    }
    fw =  caesar.normal.value;
    caesar.normal.value = fw.toUpperCase();
    fw = caesar.normal.value;
    ict =0;
    temp=0;
    fw = caesar.crypt.value;
    caesar.crypt.value = fw.toUpperCase();//--------------------------------fixed
    for (var k = 0; k < fw.length ; k++) {outgoing[k] =  fw.slice(k,k+1) ;}
    for(var i=0; i < fw.length;  i++) {
        temp = parseInt((outgoing[i]).charCodeAt(0))-65;
        if(temp < 0 || temp >25){ ttemp=temp }
        else {
            ttemp = getval() ;
            ict=(ict+1)%mykey;
            caesar.shift.value = fw.length;
        }
        outgoing[i] = String.fromCharCode(parseInt(ttemp)+65);
    }
    mess='';
    for(  i = 0; i < fw.length;  i++) {mess = mess + outgoing[i]}
    caesar.normal.value=mess;
}

function getval( ){
    for (var k=0 ; k<26 ; k++){
        var kk=key[ict];
        if(vigtable[k][kk] == temp){
            return k;
        }
    }
    alert('error');
    return;
}
//xóa message
function clear_it() {
    caesar.normal.value=""; caesar.crypt.value="";
}