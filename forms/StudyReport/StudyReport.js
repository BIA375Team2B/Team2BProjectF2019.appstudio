let i;
let hoursDateDayData =[]
let hoursDateMonthData =[]
let arrayTotalTimeDay=[]
let arrayTotalTimeMonth=[]
let s; 
let sortChoice = ["Day","Week","Month"]
let arrayWeek=[]
let currentWeek;
let arrayWeekTotal=[];
let hoursDateWeekData =[];

//let NetID="ekr74869"

StudyReport.onshow=function(){
  imgHeader62.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime62.value=timeApp
  
  lblName62.value=FirstName
  
  drpRepTS.clear()  
  for (i = 0; i <= sortChoice.length - 1; i++) 
    drpRepTS.addItem(sortChoice[i])
  
  iptWeekS.hidden=True
  btnSearchS.hidden=True
}






drpRepTS.onclick=function(s){
  if (typeof(s) == "object"){  // means control clicked but no selection made yet
    return                     // do nothing
  } else {
    drpRepTS.value = s   // make dropdown show choice user made
    //NSB.MsgBox("s is " + s + " and .selection is " + droType.selection)
  }
}




btnSearchS.onclick=function(){
  hoursDateWeekData=[]
  arrayWeek=[]
  currentWeek=0;
     let userDate =iptWeekS.value
     let query5 = "SELECT * FROM record_date_week WHERE NetID= " + '"'+ NetID + '"' + "AND  date=" +'"'+userDate + '"'
      req6 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mye34781&pass=Tennis382006&database=375groupb2&query=" + query5);
      if (req6.status == 200) {
          arrayWeek = JSON.parse(req6.responseText)
      } else {
        NSB.MsgBox("Error: " + req6.status)
        }

  currentWeek = arrayWeek[0][3]
  console.log(arrayWeek)
  console.log(currentWeek)
  arrayWeekTotal=[]
  let query6 = "SELECT * FROM record_date_week WHERE NetID= " + '"'+ NetID + '"' + "AND week=" +'"'+currentWeek + '"'
      req7 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mye34781&pass=Tennis382006&database=375groupb2&query=" + query6);
      if (req7.status == 200) {
          arrayWeekTotal = JSON.parse(req7.responseText)
      } else {
        NSB.MsgBox("Error: " + req7.status)
        }

console.log(arrayWeekTotal)

    for (i=0;i<arrayWeekTotal.length;i++){
      switch(arrayWeekTotal[i][4]){
  case 0:
    arrayWeekTotal[i][4] = "Mon";
    break;
    
     case 1:
    arrayWeekTotal[i][4] = "Tue";
    break;
    
     case 2:
    arrayWeekTotal[i][4]= "Wed";
    break;
    
     case 3:
    arrayWeekTotal[i][4] = "Thu";
    break;
    
    
     case 4:
    arrayWeekTotal[i][4] = "Fri";
    break;
    
    
     case 5:
    arrayWeekTotal[i][4] = "Sat";
    break;
    
     case 6:
    arrayWeekTotal[i][4] = "Sun";
   
    }
  hoursDateWeekData.push({
    Day: arrayWeekTotal[i][4], 
    Time:(arrayWeekTotal[i][1]/3600)
  })
  
  
  
}

  



  NSB.jqxSettings["catStudy"].title = "Time spent in the library for this week"
  NSB.jqxSettings["catStudy"].source = hoursDateWeekData;
  NSB.jqxSettings["catStudy"].xAxis={dataField:"Day" , showGridLines:false};
  NSB.jqxSettings["catStudy"].seriesGroups =        [
            {
                type: 'column',
               
                columnsGapPercent: 20,
                seriesGapPercent: 0,
                valueAxis:
                {
                    minValue: 0,
                    maxValue: 24,
                    unitInterval: 2,
                    description: 'Time in hours'
                },
                series: [
                        { dataField: 'Time', displayText: 'Time'},
                      
                    ]
            }
        ]
        
$("#catStudy").jqxChart(NSB.jqxSettings["catStudy"]);

}





btnSubmitS.onclick=function(){
  hoursDateDayData =[]
  hoursDateMonthData =[]
  arrayTotalTimeDay=[]
  arrayTotalTimeMonth=[]

   if ( drpRepTS.value=="Month"){
     iptWeekS.hidden=True
     btnSearchS.hidden=True
     var query3 = "SELECT (time/3600), month FROM record_date_month WHERE NetID= " + '"'+ NetID + '"'
     req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mye34781&pass=Tennis382006&database=375groupb2&query=" + query3);
    if (req4.status == 200) {
        arrayTotalTimeMonth = JSON.parse(req4.responseText)
     }else 
      NSB.MsgBox("Error: " + req4.status)
  
     for (i=0;i<arrayTotalTimeMonth.length;i++){
       switch(arrayTotalTimeMonth[i][1]){
          case 1:
            arrayTotalTimeMonth[i][1] = "Jan";
            break;
          case 2:
            arrayTotalTimeMonth[i][1]= "Feb";
            break;
          case 3:
            arrayTotalTimeMonth[i][1] = "Mar";
            break;
          case 4:
            arrayTotalTimeMonth[i][1] = "Apr";
            break;
          case 5:
            arrayTotalTimeMonth[i][1] = "May";
            break;
          case 6:
            arrayTotalTimeMonth[i][1] = "June";
            break;
          case 7:
            arrayTotalTimeMonth[i][1] = "July";
            break;
          case 8:
            arrayTotalTimeMonth[i][1] = "Aug";
            break;
          case 9:
            arrayTotalTimeMonth[i][1] = "Sept";
            break;
          case 10:
            arrayTotalTimeMonth[i][1] = "Oct";
            break;
         case 11:
            arrayTotalTimeMonth[i][1] = "Nov";
            break;
          case 12:
            arrayTotalTimeMonth[i][1] = "Dec";
       }
  
      hoursDateMonthData.push({
        Month: arrayTotalTimeMonth[i][1],
        Time:arrayTotalTimeMonth[i][0]
      })}
      console.log(hoursDateMonthData)

        NSB.jqxSettings["catStudy"].title = "Time spent in the library by month"
        NSB.jqxSettings["catStudy"].source = hoursDateMonthData;
        NSB.jqxSettings["catStudy"].xAxis={dataField:"Month" , showGridLines:false};
        NSB.jqxSettings["catStudy"].seriesGroups =        [
                {
                    type: 'column',
                   
                    columnsGapPercent: 20,
                    seriesGapPercent: 0,
                    valueAxis:
                    {
                        minValue: 0,
                        maxValue: 150,
                        unitInterval: 10,
                        description: 'Time in hours'
                    },
                    series: [
                            { dataField: 'Time', displayText: 'Time'},
                          
                        ]
                }
            ]
      //console.log(arrayTotalTimeMonth)
      $("#catStudy").jqxChart(NSB.jqxSettings["catStudy"]);
      }
    else if (drpRepTS.value=="Day"){
      iptWeekS.hidden=True
      btnSearchS.hidden=True
     var query2 = "SELECT (time/3600), date FROM record_date WHERE NetID= " + '"'+ NetID + '"'
     req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mye34781&pass=Tennis382006&database=375groupb2&query=" + query2);
      if (req3.status == 200) {
          arrayTotalTimeDay = JSON.parse(req3.responseText)
      } else 
        NSB.MsgBox("Error: " + req3.status)
      /*for (i=0;i<arrayTotalTimeDay.length;i++){
        arrayTotalTimeDay[i][1]=String(arrayTotalTimeDay[i][1])
        
        hoursDateDayData.push({
          Date: arrayTotalTimeDay[i][1],
          Time:arrayTotalTimeDay[i][0]
         })}

    console.log(arrayTotalTimeDay)
    console.log(hoursDateDayData)
    */
    for (i=0;i<arrayTotalTimeDay.length;i++){
        let TMonth=arrayTotalTimeDay[i][1].substring(5,7)
        console.log(TMonth)
        switch(TMonth){
          case "01":
            arrayTotalTimeDay[i][1] = "Jan"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "02":
            arrayTotalTimeDay[i][1]= "Feb"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "03":
            arrayTotalTimeDay[i][1] = "Mar"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "04":
            arrayTotalTimeDay[i][1] = "Apr"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "05":
            arrayTotalTimeDay[i][1] = "May"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "06":
            arrayTotalTimeDay[i][1] = "June"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "07":
            arrayTotalTimeDay[i][1] = "July"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case 08:
            arrayTotalTimeDay[i][1] = "Aug"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "09":
            arrayTotalTimeDay[i][1] = "Sep"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "10":
            arrayTotalTimeDay[i][1] = "Oct"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
         case "11":
            arrayTotalTimeDay[i][1] = "Nov"+arrayTotalTimeDay[i][1].substring(8,10);
            break;
          case "12":
            arrayTotalTimeDay[i][1] = "Dec"+arrayTotalTimeDay[i][1].substring(8,10);
       }
        
        
        
        
        
        
        hoursDateDayData.push({
          Month:arrayTotalTimeDay[i][1],
          Time:arrayTotalTimeDay[i][0]
      })}
    
    
    //console.log(arrayTotalTimeDay)
    console.log(hoursDateDayData)
    
        NSB.jqxSettings["catStudy"].title = "Time spent in the library by Day"
        NSB.jqxSettings["catStudy"].source = hoursDateDayData;
        NSB.jqxSettings["catStudy"].xAxis={dataField:"Month" , showGridLines:false};
        NSB.jqxSettings["catStudy"].seriesGroups =        [
                {
                    type: 'column',
                   
                    columnsGapPercent: 20,
                    seriesGapPercent: 0,
                    valueAxis:
                    {
                        minValue: 0,
                        maxValue: 24,
                        unitInterval: 3,
                        description: 'Time in hours'
                    },
                    series: [
                            { dataField: 'Time', displayText: 'Time'},
                          
                        ]
                }
            ]
      $("#catStudy").jqxChart(NSB.jqxSettings["catStudy"]);
  }else if (drpRepTS.value=="Week"){
    iptWeekS.hidden=False
    btnSearchS.hidden=False
  }



}


Hamburger5.onclick=function(){
  switch(s) {
  case "Home Page":
    ChangeForm(HomePage)
    break
  case "SignIn/SignOut":
    ChangeForm(SignInNum)
    break
  case "My Account":
    //ChangeForm()
    break
  case "Library Map":
    ChangeForm(MapSign)
    break
  case "Food Order":
    //ChangeForm()
    break
  case "Library Report":
    //ChangeForm(SignInNum)
    break
  case "Log Out":
    ChangeForm(LogIn)
}
}




Hamburger5.onclick=function(s){
  switch(s) {
    case "Home Page":
      ChangeForm(HomePage)
      break
    case "My Account":
      ChangeForm(MyAccount)
      break
    case "Sign in/Sign out":
      ChangeForm(SignInNum)
      break
    case "Library Map":
      ChangeForm(MapSign)
      break
    case "Library Report":
      ChangeForm(LibraryReport)
      break
    case "Study Report":
      ChangeForm(StudyReport)
      break
    case "Food Order":
      ChangeForm(postmatesDeliveryQuote)
      break
    case "Log Out":
      ChangeForm(LoginPage)
      break
}
}


