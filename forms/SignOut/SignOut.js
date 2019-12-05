//let NetID ="ekr74869"
SignOut.onshow=function(){
  imgHeader3.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime3.value=timeApp
  
  //use label to tell them where the seat they already sign in
  let query1 = "SELECT * From stillsitting WHERE NetID='"+NetID+"';"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
  if (req1.status==200){
   results=JSON.parse(req1.responseText)
   lblSignOut.value="You are sign in the seat "+results[0][0]+" at the time "+results[0][2]+"."
  }else
    alert("somthing wrong with label connection")

}


btnSignOut.onclick=function(){
  //delete from stillsiting
  
  //get start time from stillsiting
  let query1 = "SELECT `seat_id`,`time_Start` FROM stillsitting WHERE NetID='"+NetID+"';"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
  if (req1.status == 200){
    results=JSON.parse(req1.responseText)
    let seat_id=results[0][0]
    //alert(seat_id)
    let Start_time=results[0][1]
    //alert(Start_time)
    /*insert data into record*/
    let query2 = "INSERT INTO `record` (`seat_id`,`NetID`,`Start_Time`,`End_Time`,`date`,`feedback`)VALUE ('"+seat_id+"','"+NetID+"','"+Start_time+"',CURRENT_TIME,CURRENT_DATE,'"+txtFeedback.value+"');"
    req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query2)
    if (req2.status == 200){
      if(req2.responseText ==500){
        /*delete data from stillsitting*/
        let query3 = "Delete FROM `stillsitting` WHERE seat_id='"+seat_id+"';"
        req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query3)
        if (req3.status==200){
          if (req3.responseText==500){
            let query4 = "UPDATE `seats` SET `EmptyOrNot`=0 WHERE seat_id='"+seat_id+"';"
            req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query4)
            if (req4.status ==200){
              if (req4.responseText ==500)
                ChangeForm(HomePage)
              else
                alert("somthing wrong with updating")

            }else
              alert("Somthing wrong with updating connection")
          
          }else
            alert("Something wrong with deleting")
        }else
          alert("Somthing wrong with delet connecting")
        

      }else
        alert("Somthing wrong with insert.")
    }else
      alert("Somthing wrong with connection")
    

  }else
    alert("Something wrong with connection")
  

}

Hamburger2.onclick=function(s){
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

