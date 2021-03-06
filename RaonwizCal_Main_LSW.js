var n = 0; // 생성된 계산기의 갯수

if(localStorage.getItem('n')){ // 창 열면 이전에 저장된 계산기 갯수 불러옴
    n = parseInt(localStorage.getItem('n'));
}

//console.log(document.body.childNodes);
var div1 = document.createElement('div'); // 메인의 기능 버튼 구역
document.body.appendChild(div1);

var cal_list = document.createElement('div'); // 생성된 계산기 구역
cal_list.id = 'cal_list';
cal_list.className = 'div2'
document.body.appendChild(cal_list);

var but = document.createElement('button'); // 계산기 생성버튼
but.innerText = 'Create RaonWizCal';
but.addEventListener('click', function(){
    var lsw = new LSWCal(n);
    lsw.init();
    n += 1;
});

var remove = document.createElement('button'); // 계산기 숨기기 버튼
remove.innerText = 'Remove RaonWizCal';
remove.addEventListener('click', function(){
    if(cal_list.hasChildNodes){
        cal_list.removeChild(cal_list.lastChild);
        if(n>0){
            n -= 1;
        }
    } 
});

var reset = document.createElement('button'); // 모든 계산기 저장 초기화 버튼
reset.innerText = 'Reset All';
reset.addEventListener('click', function(){
    localStorage.clear();
    alert('모든 계산기가 초기화 되었습니다.');
});

var clear = document.createElement('button'); // 모든 계산기 숨기기 버튼
clear.innerText = 'Clear All';
clear.addEventListener('click', function(){
    while(cal_list.hasChildNodes()){
        cal_list.removeChild(cal_list.firstChild);
    }
    alert('생성한 모든 계산기를 숨겼습니다.');
    n = 0;
});

div1.appendChild(but);
div1.appendChild(remove);
div1.appendChild(clear);
div1.appendChild(reset);

for(var i=0;i<n;i++){ // 이전에 저장된 n값만큼 계산기 불러오기
    var lsw = new LSWCal(i);
    lsw.init(); 
}

window.addEventListener('unload', function(){ // 창 닫으면 생성된 계산기 수 저장
    localStorage.setItem('n', n);
})
