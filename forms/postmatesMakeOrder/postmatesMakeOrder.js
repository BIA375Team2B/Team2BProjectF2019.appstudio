let CustID1 = ""
let DelivName1 = ""
let DelivPhone1 = ""
let DelivAdd1 = ""
let PUAdd1 = ""
let PUPhone1 = "" 
let PUName1 = ""
let Mani1 = ""
let ManiItems1 = ""
let Cost1 = ""

postmatesMakeOrder.onshow=function(){
  imgHeader661.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime661.value=timeApp
  
  lblName661.value=FirstName
}



btnSubmitOrder.onclick=function(){
     let myurl = "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_MSLwXZd9eRT4gV/deliveries";
     
// call requires in the format required (in the Postmates Developer documentation)
         $.ajax({
            url: myurl,
            headers: {
            'Authorization':'Basic Y2YyZjJkNmQtYTMxNC00NGE4LWI2MDAtNTA1M2MwYWYzMTY1Og==',         },
            method: 'POST',
            dataType: 'json',
            success: function(data){   // this function runs with the returned data if trip is successful
                // Grab the results from the API JSON results returned
                let totalresults = data.total   // number of results returned
                // If returned results are greater than 0, continue
                if (totalresults > 0){
               
                    $.each(data.businesses, function(i, item) { 
                        // now inside the function 
                    
                        // Push each piece of the business' information 
                        // onto the appropriate array (that you created earlier)
                        let CustID1= customerId.push(item.customer_id)
                        let DelivName1 = DeliveryName.push(item.dropoff_name)
                        let DelivPhone1 = DeliveryPhone.push(item.dropoff_phone_number)
                        let DelivAdd = DeliveryAddress.push(item.dropoff_address)
                        let PUAdd1 = arrayPickUpAddress.push(item.pickup_address)
                        let PUPhone1 = arrayPickUpPhone.push(item.pickup_phone_number)
                        let PUName1 = arrayPickUpName.push(item.dropoff_name)
                        let Mani1 = arrayManifest.push(item.manifest)
                        let ManiItems1 = arrayManifestItems.push(item.manifest_items)
                        let Cost1 = arrayPrice.push(item.fee)
                  }); 
                 // for debugging to make sure arrayName has what you intended, take a look
                 console.log(arraycustomerId)
                    
                } //close if results not = 0
                else 
                    // If our results are 0; no businesses were returned by the call therefor we display on the page no results were found
                    console.log("No businesses found")
            } // close success funct
         });   // close ajax call
      inptCustomerID.value = CustID1
      inptDeliveryAddress.value = DelivAdd
      inptDeliveryName.value = DelivName1
      inptDeliveryNumber.value = DelivPhone1
      inptManifest.value = Mani1
      inptManifestItems.value = ManiItems1
      inptPickUpAddress.value = PUAdd1
      inptPickUpName.value = PUName1
      inptPickUpNumber.value = PUPhone1
}


btnCancel.onclick=function(){
  inptCustomerID.value = ""
  inptDeliveryAddress.value = ""
  inptDeliveryName.value = ""
  inptDeliveryNumber.value = ""
  inptManifest.value = ""
  inptManifestItems.value = ""
  inptPickUpAddress.value = ""
  inptPickUpName.value = ""
  inptPickUpNumber.value = ""
}

Hamburger14.onclick=function(s){
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