var NetID=""
var FirstName=""
LoginPage.onshow=function(){
  imgHeader.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime.value=timeApp
  
  
}

//only running against our own database, not Creighton's to make it easier for login; you can't run it against 2 databases at the same time
btnLogIn.onclick=function(){
    
    
    var query = "SELECT FirstName FROM students WHERE NetID= " + "'" + iptNetID.value + "'" +"AND password= " + "'" + iptPassword.value + "';"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ekr74869&pass=Boolarina18%&database=375groupb2&query=" + query);
    if (req1.status == 200) {
        Results = JSON.parse(req1.responseText)
        //console.log(Results)
        //console.log(Results.length)
        
        
        if (Results.length == 1) {
            NetID=iptNetID.value//add NetID for other forms
            FirstName=Results[0][0]//add FirstName for other forms
            console.log(Results[0][0])
            console.log(Results.length)
            console.log(FirstName)
            console.log(NetID)
            ChangeForm(HomePage)
          }else 
            NSB.MsgBox("Error: Sorry, your account is not available.Please Sign up first.")
            //ChangeForm(SignUp)
    } else 
      NSB.MsgBox("Error: " + req1.status)
}


//if the user doesn't have an account with us, then they will have to sign up
btnTSignUp.onclick=function(){
  ChangeForm(SignUp)
}