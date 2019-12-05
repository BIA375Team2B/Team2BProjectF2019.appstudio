var password=""

MyAccount.onshow=function(){
  imgHeader65.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime65.value=timeApp
  
  
  lblName65.value=FirstName
  //hide the password,if I have time
  //If I have time, add MD5 to the password.
  
  
  //get information from database
  var query = "SELECT * FROM students WHERE NetID=" +"'"+NetID+"';"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ekr74869&pass=Boolarina18%&database=375groupb2&query=" + query);
    if (req1.status == 200) {
        Results = JSON.parse(req1.responseText)
        //console.log(Results)
        //console.log(Results.length)
        iptNetIDSU1.value=NetID
        iptFirstName1.value=FirstName
        iptLastName1.value=Results[0][2]
        iptEmail1.value=Results[0][3]
        iptGradY1.value=Results[0][4]
        iptMajor1.value=Results[0][5]
        password=Results[0][6]
          
    } else 
      NSB.MsgBox("Error: " + req1.status)

}

btnChange.onclick=function(){
      iptGradY1.value=Number(iptGradY1.value)
   
   if (PasswordInput11.value==password){
    let queryChange = "Update students Set FirstName='"+iptFirstName1.value+"',LastName='"+iptLastName1.value+"',Email='"+iptEmail1.value+"',GradYear="+iptGradY1.value+",Major='"+iptMajor1.value+"' Where NetID='"+NetID+"';"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ekr74869&pass=Boolarina18%&database=375groupb2&query=" + queryChange)
    if (req1.status == 200) {
      if (req1.responseText == 500) {
        let result = JSON.parse(req1.responseText)
        NSB.MsgBox("You have successfully updated your account!")
        FirstName=iptFirstName1.value
        PasswordInput11.value=""
        ChangeForm(HomePage)
    } else 
      alert("Error: Your information wasn't able to be changed.")
    
  } else
    alert("Error: " + req1.status)
  }
   
   else if(PasswordInput11.value != PasswordInput21.value) 
      NSB.MsgBox("Your two password didn't match")
   else{
    let queryChange = "Update students Set FirstName='"+iptFirstName1.value+"',LastName='"+iptLastName1.value+"',Email='"+iptEmail.value+"',GradYear="+iptGradY1.value+",Major='"+iptMajor1.value+"',Password='"+PasswordInput11.value+"' Where NetID='"+NetID+"';"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ekr74869&pass=Boolarina18%&database=375groupb2&query=" + queryChange)
  if (req1.status == 200) {
    if (req1.responseText == 500) {
      let result = JSON.parse(req1.responseText)
      NSB.MsgBox("You have successfully changed your account!")
      FirstName=iptFirstName1.value
      //clear everything inside the password
      PasswordInput21.value=""
      PasswordInput11.value=""
      ChangeForm(HomePage)
    } else 
     alert("Error: Your information wasn't able to be added.")
     
  } else
    alert("Error: " + req1.status)
  }
}

btnBack.onclick=function(){
  ChangeForm(HomePage)
  
}


Hamburger11.onclick=function(s){
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
