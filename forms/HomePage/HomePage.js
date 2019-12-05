
HomePage.onshow=function(){
  imgHeader61.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime61.value=timeApp
  
  lblName61.value=FirstName
}


btnSignH.onclick=function(){
  ChangeForm(SignInNum)
}

btnMapH.onclick=function(){
  ChangeForm(MapSign)
}

btnFood.onclick=function(){
  ChangeForm(postmatesDeliveryQuote)
}

btnLibraryRH.onclick=function(){
  ChangeForm(LibraryReport)
}

btnStudyRH.onclick=function(){
  ChangeForm(StudyReport)
  
}

btnAccountH.onclick=function(){
  ChangeForm(MyAccount)
}

Hamburger15.onclick=function(s){
  switch(s) {
    case "Log Out":
      ChangeForm(LoginPage)
      break
  }
}
