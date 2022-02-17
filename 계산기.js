class LSWCal {
    constructor(id) {
        this.id = id;
        // local 저장해야할 전역변수들
        this.flag = 0; 
        this.calflag = 0;
        this.last_n = 0;
        this.last_s = '';
        this.num;
        this.pmflag=0;
        this.numbers = new Array();
        this.input = '';
        // 여기에 screen.innerText / full.innerText / div3의 child들
        // 버튼들...??
    }

    cal() { // = 입력시 계산
        //alert(flag + '\n' + numbers + '\n' + sachic)
        if(numbers.length == 0 && sachic.length ==0){
          // 아무것도 안함
        }
        else if(flag == 1){
          //alert(1 + '\n' + flag + '\n' + numbers + '\n' + sachic + '\n' + calflag)
          var cal_result;
          switch(last_s){
            case '+':
              cal_result = +(parseFloat(numbers[0]) + parseFloat(last_n)).toFixed(12);
              break;
            case '-':
              cal_result = +(parseFloat(numbers[0]) - parseFloat(last_n)).toFixed(12);
              break;
            case '*':
              cal_result = +(parseFloat(numbers[0]) * parseFloat(last_n)).toFixed(12);
              break;
            case '/':
              cal_result = +(parseFloat(numbers[0]) / parseFloat(last_n)).toFixed(12);
              break;
            default:
              alert('switch error1');
          }
    
          if(calflag == 0){
            const line1 = document.createElement('p');
            line1.innerText = full.innerText + last_n;
            const line2 = document.createElement('h3');
            line2.innerText = cal_result;
            div3.prepend(line2);
            div3.prepend(line1);
          }
          else{
            const line1 = document.createElement('p');
            line1.innerText = '☞'+numbers[0] + last_s + last_n;
            const line2 = document.createElement('h3');
            line2.innerText = cal_result;
            div3.prepend(line2);
            div3.prepend(line1);
          }
          
          screen.innerText = cal_result;
          full.innerText = '☞'+numbers[0] + last_s + last_n;
          numbers = new Array();
          numbers.push(cal_result);
          input = '';
          num = '';
          flag = 1;
          calflag = 1;
          //alert(flag +'\n'+ calflag +'\n'+ numbers);
        }
        else{
          //alert(2 + '\n' + flag + '\n' + numbers + '\n' + sachic + '\n' + calflag)
          //last_n = screen.innerText;
          //last_s = sachic[0];
          //alert(last_n +'\n'+ last_s)
          var cal_result;
          switch(last_s){
            case '+':
              cal_result = +(parseFloat(numbers[0]) + parseFloat(last_n)).toFixed(12);
              break;
            case '-':
              cal_result = +(parseFloat(numbers[0]) - parseFloat(last_n)).toFixed(12);
              break;
            case '*':
              cal_result = +(parseFloat(numbers[0]) * parseFloat(last_n)).toFixed(12);
              break;
            case '/':
              cal_result = +(parseFloat(numbers[0]) / parseFloat(last_n)).toFixed(12);
              break;
            default:
              alert('switch error2');
          }
          
          const line1 = document.createElement('p');
          line1.innerText = full.innerText + screen.innerText;
          const line2 = document.createElement('h3');
          line2.innerText = cal_result;
    
          screen.innerText = cal_result;
          if(calflag == 1){
            full.innerText = '☞'+numbers[0] + last_s + last_n;
            line1.innerText = full.innerText;
          }
          else{
            full.innerText = '☞';
          }
          
          div3.prepend(line2);
          div3.prepend(line1);
    
          numbers = new Array();
          numbers.push(cal_result);
          sachic = new Array();
          sachic.push(last_s);
          input = '';
          num = '';
          flag = 0;
          calflag = 1;
          //last_s = sachic[0];
          //alert(flag + '\n' + numbers + '\n' + sachic + '\n' + calflag)
        }
      }

      SACHIC(thing) { // 나머지 사칙연산
        if((screen.innerText == '0' && thing == '-') || screen.innerText == '-'){ // 맨 처음 음수
          screen.innerText = '-';
          input = '-';
          flag = 1;
          return 0;
        }
    
        if(flag == 1 && screen.innerText != 0 && calflag != 1 && sachic.length !=0 ){ // 부호만 바꿀 때
          //alert(1);
          sachic[sachic.length-1] = thing;
          full.innerText = full.innerText.substring(0, full.innerText.length-1);
          full.innerText += thing;
          input = '';
          last_s = thing;
        }
    
        else if(calflag == 1){ // cal 돌고 왔을때
          //alert(2);
          //alert(flag + '\n' + numbers + '\n' + sachic + '\n' + calflag);
          if(numbers.length == 0 && sachic.length ==0){
            // 아무것도 안함
          }
          else{
            sachic.push(thing);
            //full.innerText = full.innerText.substring(0, full.innerText.length-1);
            if(pmflag == 1){
              numbers[0] = screen.innerText;
              //alert(numbers[0]);
              pmflag = 0;
            }
            full.innerText = '☞'+numbers[0];
            full.innerText += thing;
            input = '';
            calflag = 0;
            flag = 1;
            last_s = thing;
          }
    
        }
    
        else if(flag == 1 && numbers.length != 0){ // 계산하다가 = 입력 후
          //alert(3);
          full.innerText += screen.innerText+thing;
          //numbers.push(screen.innerText);
          sachic.push(thing);
          input = '';
          flag = 1;
          last_s = thing;
          //alert(flag + '\n' + numbers + '\n' + sachic + '\n' + calflag)
        }
    
        else{ // 부호가 아니고 넣을 때
          //alert(4);
          if(screen.innerText[screen.innerText.length-1]=='.'){
            screen.innerText = screen.innerText.replace('.','');
          }
          if(pmflag==1 && numbers.length != 0){
            numbers[numbers.length-1] = screen.innerText;
            sachic.push(thing);
            full.innerText += screen.innerText+thing;
            //last_n = screen.innerText;
            last_s = thing;
            input = '';
            flag = 1;
          }
          else{
            numbers.push(screen.innerText);
            sachic.push(thing);
            full.innerText += screen.innerText+thing;
            //last_n = screen.innerText;
            last_s = thing;
            input = '';
            flag = 1;
          }
        }
    
        if(numbers.length>=2){ // 집어넣었는데 넘버가 두개 이상일 때 = 계산
          //alert(5);
          //alert(3 + '\n' + flag + '\n' + numbers + '\n' + sachic + '\n' + calflag)
          var sachic_result;
          const first = numbers[0];
          const second = numbers[1];
          numbers = new Array();
          const first_s = sachic[0];
          const second_s = sachic[1];
          sachic = new Array();
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
              alert('switch error3');
          }
          screen.innerText = sachic_result;
          numbers.push(sachic_result);
          sachic.push(second_s);
          flag = 1;
          num = '';
          last_s = thing;
        }
    
        if(pmflag == 1 && numbers.length == 0){ // 음수 누르고 바로계산 할 때
          //alert(6);
          //alert(flag + '\n' + numbers + '\n' + sachic + '\n' + calflag)
          var sachic_result;
          const first = numbers[0];
          const second = screen.innerText;
          numbers = new Array();
          const first_s = sachic[0];
          sachic = new Array();
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
          screen.innerText = sachic_result;
          numbers.push(sachic_result);
          sachic.push(first_s);
          flag = 1;
          num = '';
          pmflag=0;
          last_s = thing;
        }
      }

      CE() { // 현재 숫자 0으로
        numbers = new Array();
        sachic = new Array();
        screen.innerText = '0';
        input = '';
        num = 0;
        full.innerText = '☞ ';
        calflag = 0;
        flag = 0;
        pmflag = 0;
      }
    
      C() { // 가장 마지막 숫자 지우기
        if(screen.innerText.length <= 1){
          screen.innerText = '0';
          input = '';
        }
        else{
          num = screen.innerText;
          num = num.substring(0, num.length-1);
          screen.innerText = num;
          input = num;
          flag = 0;
        }
      }
    
      AC(){ // 현재 숫자 0으로 + 저장결과 초기화
        numbers = new Array();
        sachic = new Array();
        screen.innerText = '0';
        input = '';
        full.innerText = '☞ ';
        calflag = 0;
        flag = 0;
        pmflag = 0;
    
        while(div3.hasChildNodes()){
          div3.removeChild(div3.firstChild);
        }
      }
    
      PM(){ // 현재 숫자 음수로
        if(screen.textContent!=0){
          screen.innerText *= -1
          input = screen.innerText;
          flag = 0;
          last_n = screen.innerText;
          pmflag = 1;
        }
      }
  }
/*
  // 계산 화면
  var full = document.createElement('p');
  full.innerText = '☞ ';
  document.body.appendChild(full);
  
  var screen = document.createElement('h1');
  screen.id = 'screen';
  screen.innerText = '0';
  document.body.appendChild(screen);

  // 임시틀
  var div = document.createElement('div');
  var div2 = document.createElement('div'); 
  document.body.appendChild(div);
  document.body.appendChild(div2);

  //계산저장공간
  var div3 =  document.createElement('div');
  document.body.appendChild(div3);

  // 사칙연산 버튼
  var plus = document.createElement('button');
  plus.innerText = '+';
  div.appendChild(plus); 
  plus.addEventListener('click', function(){ SACHIC(plus.textContent) });

  var minus = document.createElement('button');
  minus.innerText = '-';
  div.appendChild(minus);
  minus.addEventListener('click', function(){ SACHIC(minus.textContent) });

  var divide = document.createElement('button');
  divide.innerText = '/';
  div.appendChild(divide); 
  divide.addEventListener('click', function(){ SACHIC(divide.textContent) });

  var multiply = document.createElement('button');
  multiply.innerText = '*';
  div.appendChild(multiply);
  multiply.addEventListener('click', function(){ SACHIC(multiply.textContent) });

  var equal = document.createElement('button');
  equal.innerText = '=';
  div.appendChild(equal);
  equal.addEventListener('click',cal)

  // C 버튼
  var button_C = document.createElement('button');
  button_C.innerText = 'C';
  div2.appendChild(button_C);
  button_C.addEventListener('click', C)

  // CE 버튼
  var button_CE = document.createElement('button');
  button_CE.innerText = 'CE';
  div2.appendChild(button_CE);
  button_CE.addEventListener('click', CE)

  // AC 버튼
  var button_AC = document.createElement('button');
  button_AC.innerText = 'AC';
  div2.appendChild(button_AC);
  button_AC.addEventListener('click', AC)

  // 음수 버튼
  var button_pm = document.createElement('button');
  button_pm.innerText = '±';
  div2.appendChild(button_pm);
  button_pm.addEventListener('click', PM)
  
  // 키보드 이벤트
  window.onkeydown = function() {
    if(((event.keyCode>=48) && (event.keyCode<=57)) || ((event.keyCode>=96) && (event.keyCode<=105))){ // 48~57, 96~105
      if(flag == 1){
        screen.innerText = '';
        flag = 0;
      }
      if(calflag == 1){
        screen.innerText = '';
        numbers = new Array();
        sachic = new Array();
        flag = 0;
        calflag = 0;
      }
      key = event.keyCode;
      if (key == 96){
        key = 48;
      }
      else if(key>=97){
        key -= 48;
      }
      input += String.fromCharCode(key);     
      screen.innerText = input;
      last_n = screen.innerText;
    }
    else if(event.keyCode==190 || event.keyCode==110){
      if(screen.innerText.split('.').length-1 == 0){
        if(input==''){
          input=0
        }
        input += '.';     
        screen.innerText = input;
      }
    }
    else if(event.keyCode==8){
      C();
    }
    else if(event.keyCode==27){
      AC();
    }
    else if(event.keyCode==107){
      SACHIC(plus.textContent);
    }
    else if(event.keyCode==109 || event.keyCode==189){
      SACHIC(minus.textContent);
    }
    else if(event.keyCode==106){
      SACHIC(multiply.textContent);
    }
    else if(event.keyCode==111){
      SACHIC(divide.textContent);
    }
    else if(event.keyCode==13){
      cal();
    }
  }
  */