var NetID ="ekr74869"
MapSign.onshow=function(){
  imgHeader5.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime5.value=timeApp
  
  //show main floor at the beginning
  htm=ReadFile("includes/Main_Floor.html");
  if(htm.status == 200) {
    HTMLview1.innerHTML=htm.responseText;
    HTMLview1.refresh();
 } else {
    NSB.MsgBox("Could not read file. Are you running from a deployed app? It will not work locally.");
  }
  //button
  //check if the student sign in or not
  
    query1= "SELECT * FROM stillsitting where NetID='"+NetID+"';"
  
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
  if (req1.status == 200) { //transit worked.
    //NSB.MsgBox("You are successful")
    let results = JSON.parse(req1.responseText)
    console.log (results)
    if (results!=""){
     btnMap.value="SignOut"
     iptSeatIDMP.hidden=True
    }else{
     btnMap.value="SignIn"
     iptSeatIDMP.hidden=False
    }
  } else {
      // transit error
      NSB.MsgBox("Error: " + req1.status)
    }  
  
}


//SignIn/SignOut button
btnMap.onclick=function(){
  if (btnMap.value=="SignIn"){
    let query3="INSERT INTO stillsitting VALUES ('"+iptSeatIDMP.value+"','"+NetID+"',CURRENT_TIME);"
    req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query3)

  if (req3.status == 200) { //transit worked.
        if (req3.responseText == 500) {   // means the insert succeeded
            let result = JSON.parse(req3.responseText)
            
            //update the seats empty or not
            let query4 = "UPDATE `seats` SET `EmptyOrNot`=1 WHERE seat_id='"+iptSeatIDMP.value+"';"
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
            txtResult.value=iptSeatID.value+" is not empty. Sorry."

        }
    } else {
        // transit error
        NSB.MsgBox("Error: " + req1.status)
    }  
  }else if (btnMap.value=="SignOut")
    ChangeForm(SignOut)
  else
    NSB.MsgBox("Error")
  
}





//three buttons: Main/Upper/Lower
btnMainFloor.onclick=function(){
  htm=ReadFile("includes/Main_Floor.html");
  if(htm.status == 200) {
    HTMLview1.innerHTML=htm.responseText;
    HTMLview1.refresh();
 } else {
    NSB.MsgBox("Could not read file. Are you running from a deployed app? It will not work locally.");
  }
}

btnLowerFloor.onclick=function(){
  htm=ReadFile("includes/Lower_Floor.html");
  //htm=ReadFile("includes/A1_Main_php");
  if(htm.status == 200) {
    HTMLview1.innerHTML=htm.responseText;
    HTMLview1.refresh();
 } else {
    NSB.MsgBox("Could not read file. Are you running from a deployed app? It will not work locally.");
  }
}

btnUpperFloor.onclick=function(){
  htm=ReadFile("includes/Upper_Floor.html");
  if(htm.status == 200) {
    HTMLview1.innerHTML=htm.responseText;
    HTMLview1.refresh();
 } else {
    NSB.MsgBox("Could not read file. Are you running from a deployed app? It will not work locally.");
  }
}



//humburger
Hamburger4.onclick=function(s){
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








//all the functions
function myFunction1M() {
      //alert("You clicked the 1M!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'M1%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}



function myFunction2M() {
      //alert("You clicked the 2M");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'M2%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}



function myFunction3M() {
      //alert("You clicked the 3M!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'M3%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}



function myFunction4U() {
      //alert("You clicked the 4U!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'U1%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}



function myFunction5U() {
      //alert("You clicked the 5U!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'U2%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}




function myFunction6U() {
      //alert("You clicked the 6U!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'U3%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}



function myFunction7U() {
      //alert("You clicked the 7U!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'U4%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}





function myFunction8U() {
      //alert("You clicked the 8U!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'U5%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}


function myFunction9U() {
      //alert("You clicked the 9U!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'U6%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}


function myFunction10L() {
      //alert("You clicked the 10L!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'L1%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}




function myFunction11L() {
      //alert("You clicked the 11L!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'L2%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}


function myFunction12L() {
      //alert("You clicked the 12L!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'L3%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}




function myFunction13L() {
      //alert("You clicked the 13L!");
      let query1 = "SELECT seat_id,type From seats WHERE EmptyOrNot=0 AND seat_id like 'L4%';"
      req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=sch54620&pass=C19971106w&database=375groupb2&query=" + query1)
      if (req1.status==200){
        results=JSON.parse(req1.responseText)
        let message=""
        for (i = 0; i <= results.length - 1; i++) 
          message=message+results[i][0]+" "+results[i][1]+"\n"
        txtMap.value=message
      }else
        alert("somthing wrong with label connection")
}
      


