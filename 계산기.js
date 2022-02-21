class LSWCal {
    constructor(id) {
        this.id = id;
        // local 저장해야할 전역변수들
        this.flag = 0; 
        this.calflag = 0;
        this.last_n = 0;
        this.last_s = '';
        this.num = '0';
        this.pmflag=0;
        this.numbers = new Array();
        this.input = '';
        // 여기에 screen.innerText / full.innerText / div3의 child들
        // 버튼들...??
    }

    init(){ // 객체 생성시 main에 계산기 추가
        var but = document.createElement('button');
        but.innerText = 'RaonWizCal'+this.id;
        but.addEventListener('click', function(){
            window.open('계산기.html', but.innerText, 
            "width=393,height=620,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
        });
        var cal_list = document.getElementById('cal_list');
        cal_list.appendChild(but);
        console.log(this);
    }
}