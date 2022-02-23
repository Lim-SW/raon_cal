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

        var dp = document.createElement('input'); // 입력값 및 결과값 받는부분
        dp.id = 'dp'+this.id;
        //dp.type = 'number'
        //dp.readOnly = true;
        dp.value = '0';
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

        // 저장되어있으면 불러오기
        if(localStorage.getItem(String(this.getId())+' flag')){
          this.setFlag(localStorage.getItem(String(this.getId())+' flag'));
        }
        if(localStorage.getItem(String(this.getId())+' calflag')){
          this.setCalflag(localStorage.getItem(String(this.getId())+' calflag'));
        }
        if(localStorage.getItem(String(this.getId())+' last_n')){
          this.setLast_n(localStorage.getItem(String(this.getId())+' last_n'));
        }
        if(localStorage.getItem(String(this.getId())+' last_s')){
          this.setLast_s(localStorage.getItem(String(this.getId())+' last_s'));
        }
        if(localStorage.getItem(String(this.getId())+' num')){
          this.setNum(localStorage.getItem(String(this.getId())+' num'));
        }
        if(localStorage.getItem(String(this.getId())+' pmflag')){
          this.setPmflag(localStorage.getItem(String(this.getId())+' pmflag'));
        }
        if(localStorage.getItem(String(this.getId())+' input')){
          this.setInput(localStorage.getItem(String(this.getId())+' input'));
        }
        if(localStorage.getItem(String(this.getId())+' numbers')){
            this.setNumbers(JSON.parse(localStorage.getItem(String(this.getId())+' numbers')));
        }
        if(localStorage.getItem(String(this.getId())+' dp')){
            dp.value = localStorage.getItem(String(this.getId())+' dp');
        }
        if(localStorage.getItem(String(this.getId())+' full')){
            full.innerText = localStorage.getItem(String(this.getId())+' full');
        }
        if(localStorage.getItem(String(this.getId())+' dap') || localStorage.getItem(String(this.getId())+' sik')){
            var dap = JSON.parse(localStorage.getItem(String(this.getId())+' dap'));
            var sik = JSON.parse(localStorage.getItem(String(this.getId())+' sik'));
            for(var i=dap.length-1;i>=0;i--){
            var log1 = document.createElement('h2');
            log1.innerText = dap[i];
            div4.prepend(log1);
            var log2 = document.createElement('h4');
            log2.innerText = sik[i];
            div4.prepend(log2);
            }
        }
        else{
            var log = document.createElement('p');
            log.innerText = '';
            div4.appendChild(log);
        }

        console.log(this);
        
        dp.onkeydown = function() {
          var id = this.id.replace('dp','');
          var key = event.keyCode;
          if(((event.keyCode>=48) && (event.keyCode<=57)) || ((event.keyCode>=96) && (event.keyCode<=105))){ // 48~57, 96~105
            if(lsw.getFlag() == 1){
              dp.value = '';
              lsw.setFlag(0);
            }
            if(lsw.getCalflag() == 1){
              full.innerText = '☞';
              dp.value = '';
              lsw.setNumbers(new Array());
              lsw.setFlag(0);
              lsw.setCalflag(0);
            }
            if (key == 96){
              key = 48;
            }
            else if(key>=97){
              key -= 48;
            }
            if(dp.value == '0'){
              dp.value = '';
            }
            lsw.setInput(lsw.getInput() + String.fromCharCode(key));    
            lsw.setLast_n(lsw.getInput());
          }
          else if(event.keyCode==8){
            lsw.C_KEY();
          }
          else if(event.keyCode==27){
            lsw.CE();
          }
          else if(event.keyCode==107){
            lsw.SACHIC('+');
          }
          else if(event.keyCode==109 || event.keyCode==189){
            lsw.SACHIC('-');
          }
          else if(event.keyCode==106){
            lsw.SACHIC('*');
          }
          else if(event.keyCode==111){
            lsw.SACHIC('/');
          }
          else if(event.keyCode==13){
            lsw.cal();
          }

          else{
            this.value = this.value.replace(/[^0-9]/g,'');
            return false;
          }
        }
      
    }

    JUM(){ // 소숫점
      var dp = document.getElementById('dp'+this.id);
        if(dp.value.split('.').length-1 == 0){
          if(dp.value=='0'){
            this.setInput(0);
          }
          else if(dp.value.length != 0){
            this.setInput(dp.value);
          }
          
          this.setInput(this.getInput() + '.');
          dp.value = this.getInput();
        }
    }

    BC(BN){ // 버튼 이벤트
      var dp = document.getElementById('dp'+this.id);
      var full = document.getElementById('full'+this.id);
        if(this.getFlag() == 1){
          dp.value = '';
          this.setFlag(0);
        }
        if(this.getCalflag() == 1){
          full.innerText = '☞';
          dp.value = '';
          this.setNumbers(new Array());
          this.setFlag(0);
          this.setCalflag(0);
        }
        if(dp.value == '0' && BN == 0){
          this.setInput('');  
        }
        this.setInput(this.getInput()+BN);
        if(this.getInput()[0]=='0' && this.getInput().length > 1){
          this.setInput(this.getInput().substring(1));
        }
        dp.value = this.getInput();
        this.setLast_n(dp.value);

    }

    cal() { // = 입력시 계산
      var dp = document.getElementById('dp'+this.id);
      var full = document.getElementById('full'+this.id);
      var div4 = document.getElementById('div4'+this.id);
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
            line1.innerText = full.innerText + this.getLast_n();
            var line2 = document.createElement('h2');
            line2.innerText = cal_result;
            line1.className = 'sik';
            line2.className = 'dap';
            div4.prepend(line2);
            div4.prepend(line1);
          }
          else{ // 두번째 이후
            var line1 = document.createElement('h4');
            line1.innerText = '☞'+this.getNumbers()[0] + this.getLast_s() + this.getLast_n();
            var line2 = document.createElement('h2');
            line2.innerText = cal_result;
            line1.className = 'sik';
            line2.className = 'dap';
            div4.prepend(line2);
            div4.prepend(line1);
          }

          dp.value = cal_result;
          full.innerText = '☞'+this.getNumbers()[0] + this.getLast_s() + this.getLast_n();
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
          line1.innerText = full.innerText + dp.value;
          var line2 = document.createElement('h2');
          line2.innerText = cal_result;

          dp.value = cal_result;
          if(this.getCalflag() == 1){
            full.innerText = '☞'+this.getNumbers()[0] + this.getLast_s() + this.getLast_n();
            line1.innerText = full.innerText;
          }
          else{
            full.innerText = '☞';
          }
          line1.className = 'sik';
          line2.className = 'dap';
          div4.prepend(line2);
          div4.prepend(line1);

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
      var dp = document.getElementById('dp'+this.id);
      var full = document.getElementById('full'+this.id);
        if((dp.value == '0' && thing == '-') || dp.value == '-'){ // 맨 처음 음수
          dp.value = '-';
          this.setInput('-');
          this.setFlag(1);
          return 0;
        }

        if(this.getFlag() == 1 && dp.value != 0 && this.getCalflag() != 1){ // 부호만 바꿀 때
          //alert(1);
          full.innerText = full.innerText.substring(0, full.innerText.length-1);
          full.innerText += thing;
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
                tempArr[0] = dp.value;
                this.setNumbers(tempArr);
                this.setPmflag(0);
            }
            if(this.getNumbers()[0]!=dp.value){
                var tempArr = this.getNumbers();
                tempArr[0] = dp.value;
                this.setNumbers(tempArr);
            }
            full.innerText = '☞'+this.getNumbers()[0];
            full.innerText += thing;
            this.setInput('');
            this.setCalflag(0);
            this.setFlag(1);
          }

        }

        else if(this.getFlag() == 1 && this.getNumbers().length != 0){ // 계산하다가 = 입력 후
          //alert(3);
          full.innerText += dp.value+thing;
          this.setInput('');
          this.setFlag(1);
        }

        else{ // 부호가 아니고 넣을 때
          //alert(4);
          if(dp.value[dp.value.length-1]=='.'){
            dp.value = dp.value.replace('.','');
          }
          if(this.getPmflag()==1 && this.getNumbers().length != 0){
            if(this.getNumbers().length == 0) {
              var tempArr = this.getNumbers();
              tempArr[tempArr.length-1] = dp.value;
              this.setNumbers(tempArr);
              full.innerText += dp.value+thing;
              this.setInput('');
              this.setFlag(1);
            }
            else{
              var tempArr = this.getNumbers();
              tempArr.push(dp.value);
              this.setNumbers(tempArr);
              full.innerText += dp.value+thing;
              this.setInput('');
              this.setFlag(1);
            }
          }
          else{
            if(full.innerText == '☞'){
              var tempArr = this.getNumbers();
              tempArr[0] = dp.value;
              this.setNumbers(tempArr);
              full.innerText += dp.value+thing;
              this.setInput('');
              this.setFlag(1);
            }
            else{
              var tempArr = this.getNumbers();
              tempArr.push(dp.value);
              this.setNumbers(tempArr);
              full.innerText += dp.value+thing;
              this.setInput('');
              this.setFlag(1);
            }
          }
        }

        if(this.getNumbers().length>=2){ // 집어넣었는데 넘버가 두개 이상일 때 = 계산
          var sachic_result;
          var first = this.getNumbers()[0];
          var second = this.getNumbers()[1];
          this.setNumbers(new Array());
          switch(thing){
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
          dp.value = sachic_result;
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
          var second = dp.value;
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
          dp.value = sachic_result;
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
      var dp = document.getElementById('dp'+this.id);
      var full = document.getElementById('full'+this.id);
        this.setNumbers(new Array());
        dp.value = '0';
        this.setInput('');
        this.setNum(0);
        full.innerText = '☞ ';
        this.setCalflag(0);
        this.setFlag(0);
        this.setPmflag(0);
      }

    C() { // 가장 마지막 숫자 지우기
      var dp = document.getElementById('dp'+this.id);
        if(dp.value.length <= 1){
          dp.value = '0';
          this.setInput('');
        }
        else{
          this.setNum(dp.value);
          this.setNum(this.getNum().substring(0, this.getNum().length-1));
          dp.value = this.getNum();
          this.setInput(this.getNum());
          this.setFlag(0);
        }
      }
    
    C_KEY() { // 가장 마지막 숫자 지우기 (키로)
      var dp = document.getElementById('dp'+this.id);
        if(dp.value.length <= 1){
          dp.value = '0';
          this.setInput('');
        }
        else{
          this.setNum(dp.value);
          this.setNum(this.getNum().substring(0, this.getNum().length-1));
          this.setInput(this.getNum());
          this.setFlag(0);
        }
      }

    AC(){ // 현재 숫자 0으로 + 저장결과 초기화
      var dp = document.getElementById('dp'+this.id);
      var full = document.getElementById('full'+this.id);
      var div4 = document.getElementById('div4'.this.id);
        this.setNumbers(new Array());
        dp.value = '0';
        this.setInput('');
        full.innerText = '☞ ';
        this.setCalflag(0);
        this.setFlag(0);
        this.setPmflag(0);

        while(div4.hasChildNodes()){
          div4.removeChild(div4.firstChild);
        }
      }

    PM(){ // 현재 숫자 음수로
      var dp = document.getElementById('dp'+this.id);
        if(dp.value != 0 && dp.value != '-'){
          dp.value *= -1
          this.setInput(dp.value);
          this.setFlag(0);
          this.setLast_n(dp.value);
          this.setPmflag(1);
        }
        else if(this.getInput('-')){
          dp.value = 0;
          this.setInput('');
          this.setFlag(0);
          this.setLast_n(dp.value);
          this.setPmflag(0);
        }
        else{
          dp.value = '-';
          this.setInput('-');
          this.setFlag(0);
          return 0;
        }
      }
    
    SAVE(){ // 진행상황 저장
      var dp = document.getElementById('dp'+this.id);
      var container = document.getElementById('container'+this.getId());
        localStorage.setItem(String(this.getId())+' flag', this.getFlag());
        localStorage.setItem(String(this.getId())+' calflag', this.getCalflag());
        localStorage.setItem(String(this.getId())+' last_n', this.getLast_n());
        localStorage.setItem(String(this.getId())+' last_s', this.getLast_s());
        localStorage.setItem(String(this.getId())+' num', this.getNum());
        localStorage.setItem(String(this.getId())+' pmflag', this.getPmflag());
        localStorage.setItem(String(this.getId())+' input', this.getInput());
        localStorage.setItem(String(this.getId())+' numbers', JSON.stringify(this.getNumbers()));

        localStorage.setItem(String(this.getId())+' dp', dp.value);
        localStorage.setItem(String(this.getId())+' full', full.innerText);
        var dap = container.getElementsByTagName('h2');
        var sik = container.getElementsByTagName('h4');
        var dap_arr = new Array();
        var sik_arr = new Array();

        for(var i=0;i<dap.length;i++){
          dap_arr.push(dap[i].innerText);
          sik_arr.push(sik[i].innerText);
        }
        localStorage.setItem(String(this.getId())+' dap', JSON.stringify(dap_arr));
        localStorage.setItem(String(this.getId())+' sik', JSON.stringify(sik_arr))
        alert('저장완료!')
      }

    
    UNSAVE(){ // 저장초기화 // 중복로직 줄이기
        var item = [' flag',' calflag',' last_n',' last_s',' num',' pmflag',' input',
                    ' numbers',' dp',' full',' dap',' sik'];
        for(var i in item){
          localStorage.removeItem(String(this.getId())+item[i]);
        }
        this.AC();
        alert('초기화완료!');
      }

}