
let SeatAviableArray=[]
SignInNum.onshow=function(){
  imgHeader2.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime2.value=timeApp  
  //hi, name
  lblName2.value=FirstName


  //hidden the textbox
  txtResult.hidden=True
  
  //check if the student already sign in the seat
  query1= "SELECT * FROM stillsitting where NetID='"+NetID+"';"
  
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
  if (req1.status == 200) { //transit worked.
    //NSB.MsgBox("You are successful")
    let results = JSON.parse(req1.responseText)
    console.log (results)
    if (results!=""){
     ChangeForm(SignOut)
    }
    } else {
      // transit error
      NSB.MsgBox("Error: " + req1.status)
    }  

}



//drop down list
droFloor.onclick=function(s){
  if (typeof(s) == "object"){  // means control clicked but no selection made yet
    return                     // do nothing
  } else {
    droFloor.value = s   // make dropdown show choice user made
    //NSB.MsgBox("s is " + s + " and .selection is " + droFloor.selection)
    //(s)
  }
}

droType.onclick=function(s){
  if (typeof(s) == "object"){  // means control clicked but no selection made yet
    return                     // do nothing
  } else {
    droType.value = s   // make dropdown show choice user made
    //NSB.MsgBox("s is " + s + " and .selection is " + droType.selection)
  }
}

btnSearch.onclick=function(){
  let floor = ""
  let EmptyOrNot = 0
  let type = ""
  let query2=""
  
  if (droFloor.value=="Main floor")
     floor=0
   else if (droFloor.value=="Upper floor")
     floor=-1
   else if (droFloor.value=="Lower floor")
     floor=1
   else 
     floor=""
   
  
  if ((droFloor.selection == undefined||droFloor.selection == "All") && (droType.selection == undefined||droType.selection =="All")){
     //("1")
     query2 = "SELECT seat_id,type FROM seats WHERE EmptyOrNot="+EmptyOrNot+";"
  }else if (droType.selection == undefined||droType.selection =="All"){
     //("2")
     
     query2 = "SELECT seat_id,type FROM seats WHERE EmptyOrNot="+EmptyOrNot+" AND floor="+floor+";"
     
  }else if (droFloor.selection == undefined||droFloor.selection == "All"){
     //("3")
     type = droType.selection
     query2 = "SELECT seat_id,type FROM seats WHERE EmptyOrNot="+EmptyOrNot+" AND type='"+type+"';"    
  }else{
     //("4")
     type = droType.selection
     query2 = "SELECT seat_id,type FROM seats WHERE EmptyOrNot="+EmptyOrNot+" AND floor="+floor+" AND type='"+type+"';"
  }
  
  //NSB.MsgBox(query1)
  req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query2)
  
  if (req2.status == 200) { //transit worked.
        //NSB.MsgBox("You are successful")
        let results = JSON.parse(req2.responseText)
        let message = ""
        lisSeatsStillHave.clear()
        SeatAviableArray=[]
        for (i = 0; i <= results.length - 1; i++){ 
          lisSeatsStillHave.addItem(results[i][0])
          SeatAviableArray.push(results[i][0])
        }
        
        //(SeatAviableArray)
        
    } else {
        // transit error
        NSB.MsgBox("Error: " + req1.status)
    }  
}




//Sign in Button
btnSignIn.onclick=function(){
  let query3="INSERT INTO stillsitting VALUES ('"+iptSeatID.value+"','"+NetID+"',CURRENT_TIME);"
  req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query3)

  if (req3.status == 200) { //transit worked.
        if (req3.responseText == 500) {   // means the insert succeeded
            let result = JSON.parse(req3.responseText)
            
            //update the seats empty or not
            let query4 = "UPDATE `seats` SET `EmptyOrNot`=1 WHERE seat_id='"+iptSeatID.value+"';"
            req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query4)
            if (req4.status ==200){
              if (req4.responseText ==500){
                ChangeForm(SignOut)
              }else
                ("somthing wrong with updating")

            }else
              ("Somthing wrong with updating connection")

            //NSB.MsgBox("You have successfully ")
        } else{
            txtResult.hidden=False
            txtResult.value=iptSeatID.value+" is not empty. Sorry."

        }
    } else {
        // transit error
        NSB.MsgBox("Error: " + req1.status)
    }  
}



//List of the seats
lisSeatsStillHave.onclick=function(choice){
  if (typeof(choice) == "object")   // user clicked the control
    return
  
  let seat_id=SeatAviableArray[choice]
  //(seat_id)
  //get the feedback
  message = "The seat your choice is "+seat_id+"\n"
  let query2 = "Select feedback FROM record where seat_id='"+seat_id+"' and feedback != '';"
  req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query2)
  if (req2.status==200){
    result = JSON.parse(req2.responseText)
    for (i = 0; i <= result.length - 1; i++){
          message = message + "Feedback"+(i+1)+":"+"\n"
          message = message + result[i][0] + "\n"
    }
    txtResult.hidden=False
    txtResult.value=message
    iptSeatID.value=seat_id
  }

  
}

Hamburger3.onclick=function(s){
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

