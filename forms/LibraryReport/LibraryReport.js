

LibraryReport.onshow=function(){
  imgHeader.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime63.value=timeApp
  
  lblName63.value=FirstName
  
  //get the data for attendance:Attendance
  let queryR1 = "SELECT count(seat_id) from stillsitting;" 
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR1)
  if (req1.status == 200) {
      let result = JSON.parse(req1.responseText)
      let attendance=result[0][0]
      pbAttendence.value=attendance
    } else 
     alert("Error")
     

  //get the data for attendance:computer
  let queryR2 = "SELECT count(seat_id) from stillsitting where seat_id='%CO%'" 
  req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR2)
  if (req2.status == 200) {
      let result = JSON.parse(req2.responseText)
      let attendanceC=result[0][0]
      pbComputer.value=attendanceC
    } else 
     alert("Error")
  
  
  
  
  //get the data for attendance:sofa
  let queryR3 = "SELECT count(seat_id) from stillsitting where seat_id='%SF%'" 
  req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR3)
  if (req3.status == 200) {
      let result = JSON.parse(req3.responseText)
      let attendanceSF=result[0][0]
      pbSofa.value=attendanceSF
    } else 
     alert("Error")
  
  
  
  
  
  //get the data for attendance:singletable
  let queryR4 = "SELECT count(seat_id) from stillsitting where seat_id='%SS%'" 
  req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR4)
  if (req4.status == 200) {
      let result = JSON.parse(req4.responseText)
      let attendanceSS=result[0][0]
      pbSingleSeat.value=attendanceSS
    } else 
     alert("Error")
  
  
  
  
  //get the data for attendance:bigtable
  let queryR5 = "SELECT count(seat_id) from stillsitting where seat_id='%BT%'" 
  req5 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR5)
  if (req5.status == 200) {
      let result = JSON.parse(req5.responseText)
      let attendanceBT=result[0][0]
      pbBigTable.value=attendanceBT
    } else 
     alert("Error")

}







btnWeekL.onclick=function(){
     hoursDateWeekData=[]
     var queryR8 = "SELECT sum(time),weekday FROM record_date_week group by weekday"
     req8 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR8);
    if (req8.status == 200) {
        result = JSON.parse(req8.responseText)
        console.log(result)
     }else 
      NSB.MsgBox("Error:")
  
     for (i=0;i<result.length;i++){
       switch(result[i][1]){
          case 0:
            result[i][1] = "Mon";
            break;
          case 1:
            result[i][1]= "Tue";
            break;
          case 2:
            result[i][1] = "Wed";
            break;
          case 3:
            result[i][1] = "Thu";
            break;
          case 4:
            result[i][1] = "Fri";
            break;
          case 5:
            result[i][1] = "Sat";
            break;
          case 6:
            result[i][1] = "Sun";
            break;
       }
  
      hoursDateWeekData.push({
        Day: result[i][1],
        Time:(result[i][0]/3600)
      })}

        NSB.jqxSettings["catLibrary"].title = "Volume in the library by Day"
        NSB.jqxSettings["catLibrary"].source = hoursDateWeekData;
        NSB.jqxSettings["catLibrary"].xAxis={dataField:"Day" , showGridLines:false};
        NSB.jqxSettings["catLibrary"].seriesGroups =        [
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
      console.log(result)
      $("#catLibrary").jqxChart(NSB.jqxSettings["catLibrary"]);  
}






btnMonthL.onclick=function(){
     hoursDateMonthData=[]
     var queryR7 = "SELECT sum(time/3600), month FROM record_date_month group by month"
     req7 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + queryR7);
    if (req7.status == 200) {
        result = JSON.parse(req7.responseText)
        console.log(result)
     }else 
      NSB.MsgBox("Error:")
  
     for (i=0;i<result.length;i++){
       switch(result[i][1]){
          case 1:
            result[i][1] = "Jan";
            break;
          case 2:
            result[i][1]= "Feb";
            break;
          case 3:
            result[i][1] = "Mar";
            break;
          case 4:
            result[i][1] = "Apr";
            break;
          case 5:
            result[i][1] = "May";
            break;
          case 6:
            result[i][1] = "June";
            break;
          case 7:
            result[i][1] = "July";
            break;
          case 8:
            result[i][1] = "Aug";
            break;
          case 9:
            result[i][1] = "Sept";
            break;
          case 10:
            result[i][1] = "Oct";
            break;
         case 11:
            result[i][1] = "Nov";
            break;
          case 12:
            result[i][1] = "Dec";
       }
  
      hoursDateMonthData.push({
        Month: result[i][1],
        Time:result[i][0]
      })}

        NSB.jqxSettings["catLibrary"].title = "Volume in the library by month"
        NSB.jqxSettings["catLibrary"].source = hoursDateMonthData;
        NSB.jqxSettings["catLibrary"].xAxis={dataField:"Month" , showGridLines:false};
        NSB.jqxSettings["catLibrary"].seriesGroups =        [
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
      console.log(result)
      $("#catLibrary").jqxChart(NSB.jqxSettings["catLibrary"]);
}


Hamburger12.onclick=function(s){
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