/*      ******       **        **   ******
        **    **     ****    ****   **    **
        **    **     ** **  ** **   **    **
        ********     **  ****  **   ******
        **      **   **        **   **
        **      **   **        **   **
        ********     **  2016  **   **    17 Oct 2016     feel free to refer */

$(document).ready(function(){
    $("a#playBtn").attr("onClick","showKana('play')");
    $("a#scoreBtn").attr("onClick","done()");
});
function random_num(from,to){
    return Math.floor((Math.random() * to) + from);
}

var ar_getIndHir;
//mang english
var ar_getIndRom = [
    '!','"','#','$','%',
    '&','\'','(',')','*',
    '+',',','-','.','&#047;',
    ':',';','<','=','>',
    '?','@','[','\\',']',
    '^','_','`','{','|',
    '}','~','©','®','TM'
];
var indRom;//index number of true roma
var turn = 0;//so luot da choi
var hirTruPlace;//where true hira character is in 6 options

//mang english
var ar_romLef = [
    '!','"','#','$','%',
    '&','\'','(',')','*',
    '+',',','-','.','&#047;',
    ':',';','<','=','>',
    '?','@','[','\\',']',
    '^','_','`','{','|',
    '}','~','©','®','TM'
];
var ar_hirLef;

var ar_falCar =[];falAsc=0;
var ar_trueCar =[];trueAsc=0;
//mang english
var ar_romFal = [
    '!','"','#','$','%',
    '&','\'','(',')','*',
    '+',',','-','.','&#047;',
    ':',';','<','=','>',
    '?','@','[','\\',']',
    '^','_','`','{','|',
    '}','~','©','®','TM'
];
var ar_hirFal;

//check mode, hira by default, function whatMode run everytime select was changed, function keydown use to get event whenever F7 was press
var mode="hira";setArrMode(mode);
function setArrMode(mode){
    if(mode=='hira'){
        ar_getIndHir = [
            'Exclamation mark','Quotation mark','Hashtag','	Dollar sign','Percent sign',
            'Ampersand','Single quote, Apostrophe','Opening/Left parenthesis','Closing/Right parenthesis','Asterisk',
            'Plus sign','Comma','Hyphen, Minus','Full stop, Dot','Slash, Solidus',
            'Colon','Semicolon','Less-than sign','Equal sign','Greater-than sign',
            'Question mark','At sign','Opening/left Square Bracket','Backslash','Closing/right Square Bracket',
            'Circumflex, Caret','Underscore','Back quote','Opening/Left Curly Bracket','Pipe, Vertical bar',
            'Closing/Right Curly Bracket','Tilde','Copyright sign','Registered sign','Trademark sign'
        ];
        ar_hirLef = [
            'Exclamation mark','Quotation mark','Hashtag','	Dollar sign','Percent sign',
            'Ampersand','Single quote, Apostrophe','Opening/Left parenthesis','Closing/Right parenthesis','Asterisk',
            'Plus sign','Comma','Hyphen, Minus','Full stop, Dot','Slash, Solidus',
            'Colon','Semicolon','Less-than sign','Equal sign','Greater-than sign',
            'Question mark','At sign','Opening/left Square Bracket','Backslash','Closing/right Square Bracket',
            'Circumflex, Caret','Underscore','Back quote','Opening/Left Curly Bracket','Pipe, Vertical bar',
            'Closing/Right Curly Bracket','Tilde','Copyright sign','Registered sign','Trademark sign'
        ];
        ar_hirFal = [
            'Exclamation mark','Quotation mark','Hashtag','	Dollar sign','Percent sign',
            'Ampersand','Single quote, Apostrophe','Opening/Left parenthesis','Closing/Right parenthesis','Asterisk',
            'Plus sign','Comma','Hyphen, Minus','Full stop, Dot','Slash, Solidus',
            'Colon','Semicolon','Less-than sign','Equal sign','Greater-than sign',
            'Question mark','At sign','Opening/left Square Bracket','Backslash','Closing/right Square Bracket',
            'Circumflex, Caret','Underscore','Back quote','Opening/Left Curly Bracket','Pipe, Vertical bar',
            'Closing/Right Curly Bracket','Tilde','Copyright sign','Registered sign','Trademark sign'
        ];
    }
    else {
        ar_getIndHir = [
            'Dấu chấm than','Dấu nháy kép','Dấu chấm than','Dấu đô la','Dấu phần trăm',
            'Dấu và','Dấu nháy đơn','Mở ngoặc tròn','Đóng ngoặc tròn','Dấu sao',
            'Dấu cộng','Dấu phẩy','Dấu nối, dấu trừ','Dấu chấm','Dấu xuyệt',
            'Dấu hai chấm','Dấu chấm phẩy','Dấu bé','Dấu bằng','Dấu lớn',
            'Dấu hỏi','A còng, a móc','Mở ngoặc vuông','Dấu  xuyệt ngược','Đóng ngoặc vuông',
            'Dấu mũ, dấu ớ','Dấu xếp gạch','Dấu nháy đơn','Mở ngoặc nhọn','Dấu  xuyệt dọc',
            'Đóng ngoặc nhọn','Dấu ngã','Dấu bản quyền','Dấu hiệu đăng kí','Dấu thương hiệu'
        ];
        ar_hirLef = [
            'Dấu chấm than','Dấu nháy kép','Dấu chấm than','Dấu đô la','Dấu phần trăm',
            'Dấu và','Dấu nháy đơn','Mở ngoặc tròn','Đóng ngoặc tròn','Dấu sao',
            'Dấu cộng','Dấu phẩy','Dấu nối, dấu trừ','Dấu chấm','Dấu xuyệt',
            'Dấu hai chấm','Dấu chấm phẩy','Dấu bé','Dấu bằng','Dấu lớn',
            'Dấu hỏi','A còng, a móc','Mở ngoặc vuông','Dấu  xuyệt ngược','Đóng ngoặc vuông',
            'Dấu mũ, dấu ớ','Dấu xếp gạch','Dấu nháy đơn','Mở ngoặc nhọn','Dấu  xuyệt dọc',
            'Đóng ngoặc nhọn','Dấu ngã','Dấu bản quyền','Dấu hiệu đăng kí','Dấu thương hiệu'
        ];
        ar_hirFal = [
            'Dấu chấm than','Dấu nháy kép','Dấu chấm than','Dấu đô la','Dấu phần trăm',
            'Dấu và','Dấu nháy đơn','Mở ngoặc tròn','Đóng ngoặc tròn','Dấu sao',
            'Dấu cộng','Dấu phẩy','Dấu nối, dấu trừ','Dấu chấm','Dấu xuyệt',
            'Dấu hai chấm','Dấu chấm phẩy','Dấu bé','Dấu bằng','Dấu lớn',
            'Dấu hỏi','A còng, a móc','Mở ngoặc vuông','Dấu  xuyệt ngược','Đóng ngoặc vuông',
            'Dấu mũ, dấu ớ','Dấu xếp gạch','Dấu nháy đơn','Mở ngoặc nhọn','Dấu  xuyệt dọc',
            'Đóng ngoặc nhọn','Dấu ngã','Dấu bản quyền','Dấu hiệu đăng kí','Dấu thương hiệu'
        ];
    }
}
function whatMode(){
    if($("#modeSelect").find(":selected").text()=="Vietnamese"){mode = "kata";setArrMode(mode);}
    else {mode = "hira";setArrMode(mode);}
}
$(document).keydown(function(){
    if(event.which==118){
        if(stat=='off'){
            if(mode=="hira"){
                mode = "kata";
                setArrMode(mode);
                document.getElementById("katamode").selected = true;
            }
            else{
                mode = "hira";
                setArrMode(mode);
                document.getElementById("hiramode").selected = true;}
        } else {
            alert('You can change mode only before the game start.');
        }
    }
});

var score=0;

//de o ngoai (global) de ham load nhanh hon vi duoc load truoc
var wrongBeep = new Audio('../sounds/wrong-beep.mp3');
var correctBeep = new Audio("../sounds/correct-beep.mp3");
var kidCheering = new Audio("../sounds/kids-cheering.mp3");

//timing
var tim_sta;
var stat = 'off';
runCheck='avai';
function checkAns(optNum){
    if(stat=='on'){
        //lay cau tra loi
        ans = $("#op"+optNum).html();

        //get score
        score = $("span#score").html();

        //lay index va so sanh
        indHir = ar_getIndHir.indexOf(ans);
        if(indHir==indRom) {
            //tang diem va chuyen
            score++;
            ar_trueCar[trueAsc] = $('#op'+hirTruPlace).html();trueAsc++;
            if(score<1){score=0;}
            $("span#score").html(score);
            correctBeep.play();
            $('#op'+hirTruPlace).removeClass("boxShadow");
            $('#op'+hirTruPlace).addClass("flashGreen");
            $('#op'+hirTruPlace).fadeIn(200).fadeOut(100).fadeIn(200);
            setTimeout(function(){
                $('#op'+hirTruPlace).removeClass("flashGreen");
                $('#op'+hirTruPlace).addClass("boxShadow");
                showKana('play'); }, 700);
        }
        else {
            //gan wrong vao mang
            ar_falCar[falAsc] = $('#op'+hirTruPlace).html();falAsc++;

            //nhap nhay chu dung va chuyen
            $('#op'+hirTruPlace).removeClass("boxShadow");
            $('#op'+hirTruPlace).addClass("flashRed");
            $('#op'+hirTruPlace).fadeIn(130).fadeOut(130).fadeIn(130).fadeOut(130).fadeIn(130);
            wrongBeep.play();
            setTimeout(function(){
                $('#op'+hirTruPlace).removeClass("flashRed");
                $('#op'+hirTruPlace).addClass("boxShadow");
                showKana('play'); }, 1000);
        }
    }
}

function showKana(playOrStop){
    if(playOrStop=='play'){
        //dung cuoc choi khi da het tat ca ki tu
        if(ar_romLef.length==0){ showKana('stop'); }
        else {
            //force remove color noti label when new character are shown
            $('#op'+hirTruPlace).removeClass("flashRed");
            $('#op'+hirTruPlace).removeClass("flashGreen");
            stat = 'on'; turn++;
            if(turn==1){var tim = new Date();tim_sta = tim.getTime();}
            $("#turn").html(turn);

            //mang ko co ki tu dang chon, khoi tao moi khi ham chay
            var ar_tmp;
            if(mode=='hira'){ar_tmp = [
                'Exclamation mark','Quotation mark','Hashtag','	Dollar sign','Percent sign',
                'Ampersand','Single quote, Apostrophe','Opening/Left parenthesis','Closing/Right parenthesis','Asterisk',
                'Plus sign','Comma','Hyphen, Minus','Full stop, Dot','Slash, Solidus',
                'Colon','Semicolon','Less-than sign','Equal sign','Greater-than sign',
                'Question mark','At sign','Opening/left Square Bracket','Backslash','Closing/right Square Bracket',
                'Circumflex, Caret','Underscore','Back quote','Opening/Left Curly Bracket','Pipe, Vertical bar',
                'Closing/Right Curly Bracket','Tilde','Copyright sign','Registered sign','Trademark sign'
            ];}
            else {ar_tmp = [
                'Dấu chấm than','Dấu nháy kép','Dấu chấm than','Dấu đô la','Dấu phần trăm',
                'Dấu và','Dấu nháy đơn','Mở ngoặc tròn','Đóng ngoặc tròn','Dấu sao',
                'Dấu cộng','Dấu phẩy','Dấu nối, dấu trừ','Dấu chấm','Dấu xuyệt',
                'Dấu hai chấm','Dấu chấm phẩy','Dấu bé','Dấu bằng','Dấu lớn',
                'Dấu hỏi','A còng, a móc','Mở ngoặc vuông','Dấu  xuyệt ngược','Đóng ngoặc vuông',
                'Dấu mũ, dấu ớ','Dấu xếp gạch','Dấu nháy đơn','Mở ngoặc nhọn','Dấu  xuyệt dọc',
                'Đóng ngoặc nhọn','Dấu ngã','Dấu bản quyền','Dấu hiệu đăng kí','Dấu thương hiệu'
            ];}

            //chon random 1 so bat ki tu 0 den chieu dai cua mang roma con lai
            var ran = random_num(0,ar_romLef.length);

            //gan gia tri da match
            roma = ar_romLef[ran];
            indRom = ar_getIndRom.indexOf(roma);
            hira = ar_hirLef[ran];

            //luu ki tu da xuat hien vao mang
            //dahien[i] = roma;i+=1;

            //xoa ki tu da xuat hien
            ar_tmp.splice(indRom,1);
            ar_hirLef.splice(ran,1);
            ar_romLef.splice(ran,1);

            //gan gia tri vao random option 1 den 6

            $("#roma").html(roma);
            hirTruPlace = random_num(1,6);
            $("#op"+hirTruPlace).html(hira);

            //ham nhan mang va gan random ki tu vao tung option trong mang, tru ki tu dang xuat hien
            function chia5(arr){
                for(var c =0;c<5;c++){
                    var opt = random_num(0,ar_tmp.length);
                    $("#op"+arr[c]).html(ar_tmp[opt]);
                    ar_tmp.splice(opt,1);
                }
            }

            //lay random ki tu hira gan vao 5 option con lai
            switch(hirTruPlace){
                case 1:var arr = [2,3,4,5,6];chia5(arr);break;
                case 2:var arr = [1,3,4,5,6];chia5(arr);break;
                case 3:var arr = [1,2,4,5,6];chia5(arr);break;
                case 4:var arr = [1,2,3,5,6];chia5(arr);break;
                case 5:var arr = [1,2,3,4,6];chia5(arr);break;
                case 6:var arr = [1,2,3,4,5];chia5(arr);break;
                default:alert('wrong place');
            }
        }
    }
    else if(playOrStop=='stop') {	stat='stop'; done(); }
    else {	location.reload();	}
}

//time counting start when play button was pressed
function milisecToMinSec(time){
    var t = new Date(time);
    var m = t.getMinutes();
    var s = t.getSeconds();
    return t = m+':'+s;
}
var t_tmp;
function getTimEnd(st){
    var en = new Date();
    var tim_end = en.getTime();
    if(st=='on') {t = tim_end-tim_sta;t_tmp=t;}
    else if(st=='stop') {t = t_tmp;}
    return milisecToMinSec(t);
}

//control state and function on play button
window.setInterval(function(){
    $("#test").html(stat);
    if(stat=='off'){
        $("#playBtn").html('Play');
        $("span#time").html('00:00');
    }
    if(stat=='on'){
        document.getElementById("modeSelect").disabled = true;
        $("#playBtn").html('Stop');
        $("#playBtn").attr("onClick","showKana('stop')");
        $("span#time").html(getTimEnd('on'));
    }
    if(stat=='stop'){
        //alert(stat);
        document.getElementById("modeSelect").disabled = true;
        $("#playBtn").html('Play Again');
        $("#playBtn").attr("onClick","showKana('playAgain')");
    }
}, 10);

function done(){

    if(stat=='stop'){$("span#time").html(getTimEnd('stop'));}
    turn = parseInt(score) + parseInt(ar_falCar.length);

    $("span#turn").html(turn);

    //list of wrong characters if any
    var str_falLis = '';
    var str_trueLis = '';
    if(stat=='off'){$("h1#say").html("<h4>What are you waiting for? Let's press the play button &#128533;</h4>")}
    if(ar_trueCar.length==46){
        kidCheering.play();
        $("h1#say").html("<h4>Congrat! Kana charts now are too easy to you &#128530;<i class='fa fa-thumbs-o-up' aria-hidden='true'></i></h4>");
    }
    for(var z=0;z<ar_falCar.length;z++){
        indHirFal = ar_hirFal.indexOf(ar_falCar[z]);
        str_falLis +="<a class='btn btn-warning ar_falCar' data-container='.modal-body' data-toggle='popover' data-placement='bottom' data-html='true' data-trigger='hover' data-content="+ar_romFal[indHirFal]+">"+ ar_falCar[z] +"</a>"
    }
    for(var z=0;z<ar_trueCar.length;z++){
        indHirFal = ar_hirFal.indexOf(ar_trueCar[z]);
        str_trueLis +="<a class='btn btn-info ar_trueCar' data-container='.modal-body' data-toggle='popover' data-placement='bottom' data-html='true' data-trigger='hover' data-content="+ar_romFal[indHirFal]+">"+ ar_trueCar[z] +"</a>"
    }

    $("span#falLen").html(ar_falCar.length);
    $("span#trueLen").html(ar_trueCar.length);
    $("div#list-ar_trueCar").html(str_trueLis);
    $("div#list-ar_falCar").html(str_falLis);
    if(ar_falCar.length>0 || ar_trueCar.length>0){
        $("div#answer").css("display","block");
        $("h1#say").html('Your answers');
        $("h4#tip").html('');
    }

    $('[data-toggle="popover"]').popover();
    $('#kq').modal();
}
