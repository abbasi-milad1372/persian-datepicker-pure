const date_el = document.querySelector('.date-picker');
const select_date_el = document.querySelector('.date-picker .selected-date');
const dates_el = document.querySelector('.date-picker .dates');
const mth_el = document.querySelector('.date-picker .dates .month .mth');
const next_mth_el = document.querySelector('.date-picker .dates .month .next');
const prev_mth_el = document.querySelector('.date-picker .dates .month .prev');
const days_el = document.querySelector('.date-picker .dates .days');

const months = [
    ,'فروردین'
    ,'اردیبهشت'
    ,'خرداد'
    ,'تیر'
    ,'مرداد'
    ,'شهریور'
    ,'مهر'
    ,'آبان'
    ,'آذر'
    ,'دی'
    ,'بهمن'
    ,'اسفند']

const m = moment().locale('fa');

let date = m.format('jYYYY/jMM/jDD');
let day  = m.jDate();
let month  = m.jMonth() + 1;
let year  = m.jYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;
let changeMonth =  moment().locale('fa');
isShow = false;

mth_el.textContent = months[month] + ' ' +  year;
select_date_el.textContent = date;

date_el.addEventListener('click', toggleDatePicker);
next_mth_el.addEventListener('click',goToNextMonth);
prev_mth_el.addEventListener('click',goToPrevMonth);



getAllDates();




function goToPrevMonth(e){
    //---- جهت پر کردن روز های ماه
  changeMonth =    changeMonth.add(-1,'month');

    month--;
    if(month < 1){
        month = 12;
        year--;
    }
    mth_el.textContent = months[month] + ' ' + year;
    getAllDates();
}

function goToNextMonth(e){

 changeMonth =  changeMonth.add(1,'month');

    month++;
    if(month > 12){
        month = 1;
        year++;
    }
    mth_el.textContent = months[month] + ' ' + year;
    getAllDates();
}

function toggleDatePicker(e) {
    if (!checkPathClass(e.path, 'dates')) {
        dates_el.classList.toggle('active');
    }
}

function checkPathClass(path, selector) {
    for (let index = 0; index < path.length; index++) {
        if (path[index].classList && path[index].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function getAllDates(){
    days_el.innerHTML = '';
    let amount_days = 31;
    if(month == 12){
        amount_days = 29;
    }
//---------- روز شروع هر ماه
    let startDate = changeMonth.clone().startOf('month').weekday() + 1;
//-------- پر کردن روز های ماه
    for (let i = 0; i < 42; i++) {
        if(i+1 >= startDate && (((i + 1) - startDate) + 1 <= amount_days)){
               
                days_el.innerHTML += `<div class='day'>
                ${((i + 1) - startDate) + 1 }
                </div>`
           
        }else{
            days_el.innerHTML += `<div class='day disabled'>
           
            </div>` 
        }
  
     
    }
    document.querySelectorAll('.days .day').forEach((element,i) => {
        if(selectedDay == +element.textContent.trim() && selectedYear == year && selectedMonth == month){
           element.classList.add('selected');
        }    
         element.addEventListener('click',function(){
            selectedDay = +element.textContent.trim();
            selectedMonth = month;
            selectedYear = year;
            select_date_el.textContent =  m.format(selectedYear + '/'+ selectedMonth + '/' +  selectedDay );
            getAllDates();

         })
    });
 
}


function gotoday(){
     date = moment().locale('fa').format('jYYYY/jMM/jDD');
     day  = moment().locale('fa').jDate();
     month  = moment().locale('fa').jMonth() + 1;
     year  = moment().locale('fa').jYear();
      selectedDate = date;
      selectedDay = day;
      selectedMonth = month;
      selectedYear = year;
     mth_el.textContent = months[month] + ' ' +  year;
     select_date_el.textContent = date;
     changeMonth =  moment().locale('fa');
    getAllDates();
}



window.addEventListener('click', function(e){   
    if (!date_el.contains(e.target)){
        dates_el.classList.remove('active');
    } else{
        dates_el.classList.add('active');
    }
  });