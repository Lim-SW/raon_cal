class LSWCal {
    constructor(id) {
        this.id = id;
        this.flag = 0;
        this.calflag = 0;
        this.last_n = 0;
        this.last_s = '';
        this.num = '0';
        this.pmflag = 0;
        this.numbers = new Array();
        this.input = '';
    }

    // getter setter
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getFlag(){
        return this.flag;
    }
    setFlag(flag){
        this.flag = flag;
    }
    getCalflag(){
        return this.calflag;
    }
    setCalflag(calflag){
        this.calflag = calflag;
    }
    getLast_n(){
        return this.last_n;
    }
    setLast_n(last_n){
        this.last_n = last_n;
    }
    getLast_s(){
        return this.last_s;
    }
    setLast_s(last_s){
        this.last_s = last_s;
    } 
    getNum(){
        return this.num;
    }
    setNum(num){
        this.num = num;
    }
    getPmflag(){
        return this.pmflag;
    }
    setPmflag(pmflag){
        this.pmflag = pmflag;
    }
    getNumbers(){
        return this.numbers;
    }
    setNumbers(numbers){
        this.numbers = numbers;
    }
    getInput(){
        return this.input;
    }
    setInput(input){
        this.input = input;
    }


    init(){ // 객체 생성시 main에 계산기 추가
        console.log(this)
        var lsw = this // 함수용으로 선언
        var cal_list = document.getElementById('cal_list'); // 계산기 붙힐곳

        var container = document.createElement('div'); // 계산기 컨테이너
        container.id = 'container'+this.id;
        container.className = 'container'
        cal_list.appendChild(container);

        var div0 = document.createElement('div'); // 맨위의 화면 div
        div0.id = 'div0';
        div0.className = 'div0';
        container.appendChild(div0);

        var full = document.createElement('h3'); // 계산상황 식 부분
        full.innerText = '☞ ';
        full.id = 'full'+this.id;
        div0.appendChild(full);

        var dp = document.createElement('h1'); // 입력값 및 결과값 받는부분
        dp.id = 'dp'+this.id;
        dp.innerText = '0';
        div0.appendChild(dp);

        var div = document.createElement('div'); // 사칙연산 틀
        var div2 = document.createElement('div'); // 기능버튼 틀
        div.id = 'div';
        div2.id = 'div2';
        div.className = 'div1';
        div2.className = 'div1';
        container.appendChild(div);
        container.appendChild(div2);

        var div5 = document.createElement('div'); // 숫자버튼 틀
        div5.id = 'div5';
        div5.className = 'div1';
        container.appendChild(div5);

        var div3 =  document.createElement('div'); // 저장버튼 틀
        var div4 =  document.createElement('div'); // 계산로그 틀
        div3.id = 'div3';
        div3.className = 'div1';
        div4.id = 'div4'+this.id;
        div4.className = 'log';
        container.appendChild(div4);
        container.appendChild(div3);

        // 사칙연산 버튼
        var plus = document.createElement('button');
        plus.innerText = '+';
        div.appendChild(plus);
        plus.addEventListener('click', function(){ lsw.SACHIC(plus.textContent) });

        var minus = document.createElement('button');
        minus.innerText = '-';
        div.appendChild(minus);
        minus.addEventListener('click', function(){ lsw.SACHIC(minus.textContent) });

        var divide = document.createElement('button');
        divide.innerText = '/';
        div.appendChild(divide);
        divide.addEventListener('click', function(){ lsw.SACHIC(divide.textContent) });

        var multiply = document.createElement('button');
        multiply.innerText = '*';
        div.appendChild(multiply);
        multiply.addEventListener('click', function(){ lsw.SACHIC(multiply.textContent) });

        var equal = document.createElement('button');
        equal.innerText = '=';
        div.appendChild(equal);
        equal.addEventListener('click', function(){lsw.cal()})

        // C 버튼
        var button_C = document.createElement('button');
        button_C.innerText = 'C';
        div2.appendChild(button_C);
        button_C.addEventListener('click', function(){lsw.C()})

        // CE 버튼
        var button_CE = document.createElement('button');
        button_CE.innerText = 'CE';
        div2.appendChild(button_CE);
        button_CE.addEventListener('click', function(){lsw.CE()})

        // AC 버튼
        var button_AC = document.createElement('button');
        button_AC.innerText = 'AC';
        div2.appendChild(button_AC);
        button_AC.addEventListener('click', function(){lsw.AC()})

        // 음수 버튼
        var button_pm = document.createElement('button');
        button_pm.innerText = '±';
        div2.appendChild(button_pm);
        button_pm.addEventListener('click', function(){lsw.PM()})

        //점 버튼
        var button_jum = document.createElement('button');
        button_jum.innerText = '.';
        div2.appendChild(button_jum);
        button_jum.addEventListener('click', function(){lsw.JUM()})        

        // 저장 버튼
        var button_save = document.createElement('button');
        button_save.innerText = '저장하기';
        div3.appendChild(button_save);
        button_save.addEventListener('click', function(){lsw.SAVE()})

        // 저장 삭제 버튼
        var button_unsave = document.createElement('button');
        button_unsave.innerText = '저장삭제';
        div3.appendChild(button_unsave);
        button_unsave.addEventListener('click', function(){lsw.UNSAVE()})

        // 숫자 버튼
        for(var b=0;b<10;b++){
          var button_num = document.createElement('button');
          button_num.innerText = b;
          div5.appendChild(button_num);
          (function(m){ button_num.addEventListener('click', function(){ lsw.BC(m) }) })(b);
        }

        // 저장되어있으면 불러오기 // 중복로직 줄이기
        var item = [' flag',' calflag',' last_n',' last_s',' num',' pmflag',' input'];

        for(var i in item){
          if(localStorage.getItem(String(this.getId())+item[i])){
            this.setFlag(localStorage.getItem(String(this.getId())+item[i]));
          }
        }
        if(localStorage.getItem(String(this.getId())+' numbers')){
            this.setNumbers(JSON.parse(localStorage.getItem(String(this.getId())+' numbers')));
        }
        if(localStorage.getItem(String(this.getId())+' dp')){
            document.getElementById('dp'+this.id).innerText = localStorage.getItem(String(this.getId())+' dp');
        }
        if(localStorage.getItem(String(this.getId())+' full')){
            document.getElementById('full'+this.id).innerText = localStorage.getItem(String(this.getId())+' full');
        }
        if(localStorage.getItem(String(this.getId())+' dap') || localStorage.getItem(String(this.getId())+' sik')){
            var dap = JSON.parse(localStorage.getItem(String(this.getId())+' dap'));
            var sik = JSON.parse(localStorage.getItem(String(this.getId())+' sik'));
            for(var i=dap.length-1;i>=0;i--){
            var log1 = document.createElement('h2');
            log1.innerText = dap[i];
            document.getElementById('div4'+this.id).prepend(log1);
            var log2 = document.createElement('h4');
            log2.innerText = sik[i];
            document.getElementById('div4'+this.id).prepend(log2);
            }
        }
        else{
            var log = document.createElement('p');
            log.innerText = '';
            document.getElementById('div4'+this.id).appendChild(log);
        }
    }

    JUM(){ // 소숫점
        if(document.getElementById('dp'+this.id).innerText.split('.').length-1 == 0){
          if(document.getElementById('dp'+this.id).innerText=='0'){
            this.setInput(0);
          }
          else if(document.getElementById('dp'+this.id).innerText.length != 0){
            this.setInput(document.getElementById('dp'+this.id).innerText);
          }
          
          this.setInput(this.getInput() + '.');
          document.getElementById('dp'+this.id).innerText = this.getInput();
        }
    }

    BC(BN){ // 버튼 이벤트
        if(this.getFlag() == 1){
          document.getElementById('dp'+this.id).innerText = '';
          this.setFlag(0);
        }
        if(this.getCalflag() == 1){
          document.getElementById('full'+this.id).innerText = '☞';
          document.getElementById('dp'+this.id).innerText = '';
          this.setNumbers(new Array());
          this.setFlag(0);
          this.setCalflag(0);
        }
        this.setInput(this.getInput()+BN);
        document.getElementById('dp'+this.id).innerText = this.getInput();
        this.setLast_n(document.getElementById('dp'+this.id).innerText);

    }

    cal() { // = 입력시 계산
        if(this.getNumbers().length == 0){
          // 아무것도 안함
        }
        else if(this.getFlag(1)){ // 같은수 같은부호 반복 계산
          var cal_result;
          switch(this.getLast_s()){
            case '+':
              cal_result = +(parseFloat(this.getNumbers()[0]) + parseFloat(this.getLast_n())).toFixed(12);
              break;
            case '-':
              cal_result = +(parseFloat(this.getNumbers()[0]) - parseFloat(this.getLast_n())).toFixed(12);
              break;
            case '*':
              cal_result = +(parseFloat(this.getNumbers()[0]) * parseFloat(this.getLast_n())).toFixed(12);
              break;
            case '/':
              cal_result = +(parseFloat(this.getNumbers()[0]) / parseFloat(this.getLast_n())).toFixed(12);
              break;
            default:
              alert('switch error1');
          }

          // 계산기록
          if(this.getCalflag() == 0){ // 처음 반복계산
            var line1 = document.createElement('h4');
            line1.innerText = document.getElementById('full'+this.id).innerText + this.getLast_n();
            var line2 = document.createElement('h2');
            line2.innerText = cal_result;
            line1.className = 'sik';
            line2.className = 'dap';
            document.getElementById('div4'+this.id).prepend(line2);
            document.getElementById('div4'+this.id).prepend(line1);
          }
          else{ // 두번째 이후
            var line1 = document.createElement('h4');
            line1.innerText = '☞'+this.getNumbers()[0] + this.getLast_s() + this.getLast_n();
            var line2 = document.createElement('h2');
            line2.innerText = cal_result;
            line1.className = 'sik';
            line2.className = 'dap';
            document.getElementById('div4'+this.id).prepend(line2);
            document.getElementById('div4'+this.id).prepend(line1);
          }

          document.getElementById('dp'+this.id).innerText = cal_result;
          document.getElementById('full'+this.id).innerText = '☞'+this.getNumbers()[0] + this.getLast_s() + this.getLast_n();
          var tempArr = new Array();
          tempArr.push(cal_result);
          this.setNumbers(tempArr);
          this.setInput('');
          this.setNum('');
          this.setFlag(1);
          this.setCalflag(1);
        }
        else{ // 정상계산
          var cal_result;
          switch(this.getLast_s()){
            case '+':
              cal_result = +(parseFloat(this.getNumbers()[0]) + parseFloat(this.getLast_n())).toFixed(12);
              break;
            case '-':
              cal_result = +(parseFloat(this.getNumbers()[0]) - parseFloat(this.getLast_n())).toFixed(12);
              break;
            case '*':
              cal_result = +(parseFloat(this.getNumbers()[0]) * parseFloat(this.getLast_n())).toFixed(12);
              break;
            case '/':
              cal_result = +(parseFloat(this.getNumbers()[0]) / parseFloat(this.getLast_n())).toFixed(12);
              break;
            default:
              alert('switch error2');
          }

          // 계산기록
          var line1 = document.createElement('h4');
          line1.innerText = document.getElementById('full'+this.id).innerText + document.getElementById('dp'+this.id).innerText;
          var line2 = document.createElement('h2');
          line2.innerText = cal_result;

          document.getElementById('dp'+this.id).innerText = cal_result;
          if(this.getCalflag() == 1){
            document.getElementById('full'+this.id).innerText = '☞'+this.getNumbers()[0] + this.getLast_s() + this.getLast_n();
            line1.innerText = document.getElementById('full'+this.id).innerText;
          }
          else{
            document.getElementById('full'+this.id).innerText = '☞';
          }
          line1.className = 'sik';
          line2.className = 'dap';
          document.getElementById('div4'+this.id).prepend(line2);
          document.getElementById('div4'+this.id).prepend(line1);

          var tempArr = new Array();
          tempArr.push(cal_result);
          this.setNumbers(tempArr);
          this.setInput('');
          this.setNum('');
          this.setFlag(0);
          this.setCalflag(1);
        }
      }

    SACHIC(thing) { // 나머지 사칙연산
        if((document.getElementById('dp'+this.id).innerText == '0' && thing == '-') || document.getElementById('dp'+this.id).innerText == '-'){ // 맨 처음 음수
          document.getElementById('dp'+this.id).innerText = '-';
          this.setInput('-');
          this.setFlag(1);
          return 0;
        }

        if(this.getFlag() == 1 && document.getElementById('dp'+this.id).innerText != 0 && this.getCalflag() != 1){ // 부호만 바꿀 때
          //alert(1);
          document.getElementById('full'+this.id).innerText = document.getElementById('full'+this.id).innerText.substring(0, document.getElementById('full'+this.id).innerText.length-1);
          document.getElementById('full'+this.id).innerText += thing;
          this.setInput('');
        }

        else if(this.getCalflag() == 1){ // cal 돌고 왔을때
          //alert(2);
          if(this.getNumbers().length == 0){
            // 아무것도 안함
          }
          else{
            if(this.getPmflag() == 1){
                var tempArr = this.getNumbers();
                tempArr[0] = document.getElementById('dp'+this.id).innerText;
                this.setNumbers(tempArr);
                this.setPmflag(0);
            }
            if(this.getNumbers()[0]!=document.getElementById('dp'+this.id).innerText){
                var tempArr = this.getNumbers();
                tempArr[0] = document.getElementById('dp'+this.id).innerText;
                this.setNumbers(tempArr);
            }
            document.getElementById('full'+this.id).innerText = '☞'+this.getNumbers()[0];
            document.getElementById('full'+this.id).innerText += thing;
            this.setInput('');
            this.setCalflag(0);
            this.setFlag(1);
          }

        }

        else if(this.getFlag() == 1 && this.getNumbers().length != 0){ // 계산하다가 = 입력 후
          //alert(3);
          document.getElementById('full'+this.id).innerText += document.getElementById('dp'+this.id).innerText+thing;
          this.setInput('');
          this.setFlag(1);
        }

        else{ // 부호가 아니고 넣을 때
          //alert(4); 
          if(document.getElementById('dp'+this.id).innerText[document.getElementById('dp'+this.id).innerText.length-1]=='.'){
            document.getElementById('dp'+this.id).innerText = document.getElementById('dp'+this.id).innerText.replace('.','');
          }
          if(this.getPmflag()==1 && this.getNumbers().length != 0){
            if(this.getNumbers().length == 0) {
              var tempArr = this.getNumbers();
              tempArr[tempArr.length-1] = document.getElementById('dp'+this.id).innerText;
              this.setNumbers(tempArr);
              document.getElementById('full'+this.id).innerText += document.getElementById('dp'+this.id).innerText+thing;
              this.setInput('');
              this.setFlag(1);
            }
            else{
              var tempArr = this.getNumbers();
              tempArr.push(document.getElementById('dp'+this.id).innerText);
              this.setNumbers(tempArr);
              document.getElementById('full'+this.id).innerText += document.getElementById('dp'+this.id).innerText+thing;
              this.setInput('');
              this.setFlag(1);
            }
          }
          else{
            var tempArr = this.getNumbers();
            tempArr.push(document.getElementById('dp'+this.id).innerText);
            this.setNumbers(tempArr);
            document.getElementById('full'+this.id).innerText += document.getElementById('dp'+this.id).innerText+thing;
            this.setInput('');
            this.setFlag(1);
          }
        }

        if(this.getNumbers().length>=2){ // 집어넣었는데 넘버가 두개 이상일 때 = 계산
          var sachic_result;
          var first = this.getNumbers()[0];
          var second = this.getNumbers()[1];
          this.setNumbers(new Array());
          switch(this.getLast_s()){
            case '+':
              sachic_result = +(parseFloat(first) + parseFloat(second)).toFixed(12);
              break;
            case '-':
              sachic_result = +(parseFloat(first) - parseFloat(second)).toFixed(12);
              break;
            case '*':
              sachic_result = +(parseFloat(first) * parseFloat(second)).toFixed(12);
              break;
            case '/':
              sachic_result = +(parseFloat(first) / parseFloat(second)).toFixed(12);
              break;
            default:
              alert('switch error3');
          }
          document.getElementById('dp'+this.id).innerText = sachic_result;
          var tempArr = this.getNumbers();
          tempArr.push(sachic_result);
          this.setNumbers(tempArr);
          this.setFlag(1);
          this.setNum('');
        }

        if(this.getPmflag(1) && this.getNumbers().length == 0){ // 음수 누르고 바로계산 할 때
          //alert(6);
          var sachic_result;
          var first = this.getNumbers()[0];
          var second = document.getElementById('dp'+this.id).innerText;
          this.setNumbers(new Array());
          var first_s = this.getLast_s();
          switch(first_s){
            case '+':
              sachic_result = +(parseFloat(first) + parseFloat(second)).toFixed(12);
              break;
            case '-':
              sachic_result = +(parseFloat(first) - parseFloat(second)).toFixed(12);
              break;
            case '*':
              sachic_result = +(parseFloat(first) * parseFloat(second)).toFixed(12);
              break;
            case '/':
              sachic_result = +(parseFloat(first) / parseFloat(second)).toFixed(12);
              break;
            default:
              alert('switch error4');
          }
          document.getElementById('dp'+this.id).innerText = sachic_result;
          var tempArr = this.getNumbers();
          tempArr.push(sachic_result);
          this.setNumbers(tempArr);
          this.setFlag(1);
          this.setNum('');
          this.setPmflag(0);
        }

        this.setLast_s(thing);
      }

    CE() { // 현재 숫자 0으로
        this.setNumbers(new Array());
        document.getElementById('dp'+this.id).innerText = '0';
        this.setInput('');
        this.setNum(0);
        document.getElementById('full'+this.id).innerText = '☞ ';
        this.setCalflag(0);
        this.setFlag(0);
        this.setPmflag(0);
      }

    C() { // 가장 마지막 숫자 지우기
        if(document.getElementById('dp'+this.id).innerText.length <= 1){
          document.getElementById('dp'+this.id).innerText = '0';
          this.setInput('');
        }
        else{
          this.setNum(document.getElementById('dp'+this.id).innerText);
          this.setNum(this.getNum().substring(0, this.getNum().length-1));
          document.getElementById('dp'+this.id).innerText = this.getNum();
          this.setInput(this.getNum());
          this.setFlag(0);
        }
      }

    AC(){ // 현재 숫자 0으로 + 저장결과 초기화
        this.setNumbers(new Array());
        document.getElementById('dp'+this.id).innerText = '0';
        this.setInput('');
        document.getElementById('full'+this.id).innerText = '☞ ';
        this.setCalflag(0);
        this.setFlag(0);
        this.setPmflag(0);

        while(document.getElementById('div4'+this.id).hasChildNodes()){
          document.getElementById('div4'+this.id).removeChild(document.getElementById('div4'+this.id).firstChild);
        }
      }

    PM(){ // 현재 숫자 음수로
        if(document.getElementById('dp'+this.id).innerText != 0 && document.getElementById('dp'+this.id).innerText != '-'){
          document.getElementById('dp'+this.id).innerText *= -1
          this.setInput(document.getElementById('dp'+this.id).innerText);
          this.setFlag(0);
          this.setLast_n(document.getElementById('dp'+this.id).innerText);
          this.setPmflag(1);
        }
        else if(this.getInput('-')){
          document.getElementById('dp'+this.id).innerText = 0;
          this.setInput('');
          this.setFlag(0);
          this.setLast_n(document.getElementById('dp'+this.id).innerText);
          this.setPmflag(0);
        }
        else{
          document.getElementById('dp'+this.id).innerText = '-';
          this.setInput('-');
          this.setFlag(0);
          return 0;
        }
      }
    
    SAVE(){ // 진행상황 저장
        localStorage.setItem(String(this.getId())+' flag', this.getFlag());
        localStorage.setItem(String(this.getId())+' calflag', this.getCalflag());
        localStorage.setItem(String(this.getId())+' last_n', this.getLast_n());
        localStorage.setItem(String(this.getId())+' last_s', this.getLast_s());
        localStorage.setItem(String(this.getId())+' num', this.getNum());
        localStorage.setItem(String(this.getId())+' pmflag', this.getPmflag());
        localStorage.setItem(String(this.getId())+' input', this.getInput());
        localStorage.setItem(String(this.getId())+' numbers', JSON.stringify(this.getNumbers()));

        localStorage.setItem(String(this.getId())+' dp', document.getElementById('dp'+this.id).innerText);
        localStorage.setItem(String(this.getId())+' full', document.getElementById('full'+this.id).innerText);
        var dap = document.getElementById('container'+this.getId()).getElementsByTagName('h2');
        var sik = document.getElementById('container'+this.getId()).getElementsByTagName('h4');
        var dap_arr = new Array();
        var sik_arr = new Array();

        for(var i=0;i<dap.length;i++){
          dap_arr.push(dap[i].innerText);
          sik_arr.push(sik[i].innerText);
        }
        localStorage.setItem(String(this.getId())+' dap', JSON.stringify(dap_arr));
        localStorage.setItem(String(this.getId())+' sik', JSON.stringify(sik_arr))
        console.log(localStorage)
        alert('저장완료!')
        console.log(document);
      }

    
    UNSAVE(){ // 저장초기화 // 중복로직 줄이기
        var item = [' flag',' calflag',' last_n',' last_s',' num',' pmflag',' input',
                    ' numbers',' dp',' full',' dap',' sik'];
        for(var i in item){
          localStorage.removeItem(String(this.getId())+item[i]);
        }
        this.AC();
        alert('초기화완료!')
      }

}