 var data = [
            {"title":"event 1", "date":"2014/09/25"},
            {"title":"event 2", "date":"2014/09/26", "enddate":"2014/09/29"},
            {"title":"event 3", "date":"2014/09/27"},
            {"title":"event 4", "date":"2014/09/30"}
        ]; 
        var today = new Date('2014-09-01 00:00');    
        var todayNew = new Date();     
        currentMonth = today.getMonth();      
        currentYear = today.getFullYear();
        months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];   
        showCalendar(currentMonth, currentYear);
        
	function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
	}
        function showCalendar(month, year) {        
        let firstDay = (new Date(year, month)).getDay() - 1;        
        tbl = document.getElementById("calendar-body");        
        tbl.innerHTML = "";
        
        document.getElementById("monthAndYear").innerHTML = months[month] + " " + year;        
        
        let date = 1;
        let dateEvent = 0;
        for (let i = 0; i < 6; i++) {            
            let row = document.createElement("tr");                        
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    var cell = document.createElement("td");                 
                    cell.style.height = "100px";        
                    cell.style.width = "100px";
                    cell.style.verticalAlign = "bottom";
                    cell.style.textAlign = "center";                               
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > daysInMonth(month, year)) {
                    break;
                }
                else {                    
                    var dayNew = new Date(data[dateEvent]['date']).getDate();
                    var monthNew = new Date(data[dateEvent]['date']).getMonth();
                    var yearNew = new Date(data[dateEvent]['date']).getFullYear(); 
                    var dayEndEvent, monthEndEvent, yearEndEvent;
                    var endDayEventCheck;                                                       
                    var cell = document.createElement("td");
                    cell.style.height = "100px"; 
                    cell.style.width = "100px";
                    var datediv = document.createElement("div");
                    datediv.style.textAlign = "center";                         
                    datediv.style.paddingTop = "75px"; 
                    var cellText = document.createTextNode(date); 
                    datediv.appendChild(cellText);    
                                        
                    if(date === endDayEventCheck && endDayEventCheck <= dayEndEvent){
                        console.log("dayEndEvent : " + dayEndEvent);
                        var spanEvent = document.createElement("div");                                          
                        spanEvent.style.backgroundColor = "#4472C4";
                        spanEvent.style.marginTop = "10px";  
                        cellTextEndEvent = document.createTextNode('\u00A0');
                        spanEvent.appendChild(cellTextEndEvent);       
                        cell.appendChild(spanEvent);
                                              
                        endDayEventCheck++;  
                        console.log("endDayEventCheck : " + endDayEventCheck);
                    } 
                    if(date === dayNew && year === yearNew && month === monthNew){                        
                        console.log("Girdi" + date);
                        var checkEvents = 0;
                        for(var k = 0; k < data.length; k++){
                            dayNew2 = new Date(data[k]['date']).getDate();
                            monthNew2 = new Date(data[k]['date']).getMonth();
                            yearNew2 = new Date(data[k]['date']).getFullYear();
                            var endEvent = data[k]['enddate'] ? new Date(data[dateEvent]['enddate']) : false;  
                            if(date === dayNew2 && year === yearNew2 && month === monthNew2){ 
                                checkEvents++;                                
                                console.log(date);                                
                                var span = document.createElement("div");
                                span.style.color = "white";
                                span.style.backgroundColor = "#4472C4";
                                span.style.marginTop = "10px";                                                   
                                cellTextEvent = document.createTextNode(data[k]['title']);
                                span.appendChild(cellTextEvent);       
                                cell.appendChild(span);   
                                // end event kontrol etme
                                if(endEvent !== false){
                                    console.log("End Date Var!");
                                    dayEndEvent = endEvent.getDate();
                                    monthEndEvent = endEvent.getMonth();
                                    yearEndEvent = endEvent.getFullYear();
                                    console.log(dayEndEvent + " " + monthEndEvent + " " + yearEndEvent); 
                                    endDayEventCheck = date + 1;  
                                    console.log("endDayEventCheck :" + endDayEventCheck);                                 
                                }                                                                                                
                            }else{
                                console.log("Girmedi");
                            }
                            // aynı günde birden fazala event olm adurumu
                            if(checkEvents > 1 && k == data.length - 1){
                                dateEvent++;
                            }                            
                        } 
                        dateEvent++; 
                        datediv.style.paddingTop = "40px";                                                                      
                    }                                                                                                           
                    if(date === todayNew.getDate() && year === todayNew.getFullYear() && month ===todayNew.getMonth()) {                        
                        cell.classList.add("bg-success");                        
                    }                    
                    cell.appendChild(datediv);
                    row.appendChild(cell);
                    date++;
                                       
                }
                }
                tbl.appendChild(row);
            }            
        }
        function daysInMonth(iMonth, iYear) {
            return 32 - new Date(iYear, iMonth, 32).getDate();
        }