//var password=""
SignUp.onshow=function(){
  imgHeader6.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime6.value=timeApp
  
  
  
  //hide the password,if I have time
  //If I have time, add MD5 to the password.

}

btnSubmitSU.onclick=function(){
      iptGradY.value=Number(iptGradY.value)
   if(PasswordInput1.value != PasswordInput2.value) 
      NSB.MsgBox("Your two password didn't match")
   else{
  let queryAdd = "INSERT INTO students VALUES('"+iptNetIDSU.value+"', '"+iptFirstName.value+"', '"+iptLastName.value+"', '"+iptEmail.value+"', "+iptGradY.value+", '"+iptMajor.value+"', '"+PasswordInput1.value+"')";
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ekr74869&pass=Boolarina18%&database=375groupb2&query=" + queryAdd)
  if (req1.status == 200) {
    if (req1.responseText == 500) {
      let result = JSON.parse(req1.responseText)
      NSB.MsgBox("You have successfully added your account!")
      FirstName=iptFirstName.value
      ChangeForm(HomePage)
    } else 
     alert("Error: Your information wasn't able to be added.")
    
  } else
    alert("Error: " + req1.status)
  }
}

btnClearSU.onclick=function(){
  iptNetIDSU.value=""
  iptFirstName.value=""
  iptLastName.value=""
  iptEmail.value=""
  iptEmail.value=""
  iptGradY.value=""
  iptMajor.value=""
  inptPass.value=""
  
}

Hamburger1.onclick=function(s){
  if (typeof(s) == "object") { // do nothing
       return
    }
  
  switch(s) {
  case "Back":
    ChangeForm(LoginPage)
    break
}
}
