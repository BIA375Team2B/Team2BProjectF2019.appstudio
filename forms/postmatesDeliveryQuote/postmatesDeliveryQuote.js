let CustID = ""
let DelivName = ""
let DelivPhone = ""
let DelivAdd = ""
let PUAdd = ""
let PUPhone = "" 
let PUName = ""
let Mani = ""
let ManiItems = ""
let Cost = ""


postmatesDeliveryQuote.onshow=function(){
  imgHeader66.src="https://ormond.creighton.edu/courses/375/Groups/Group-B2/images/CreightonLogo.jpg"
  
  //time for the header
  var timeApp=(new Date())
  timeApp=String(timeApp)
  timeApp=timeApp.substring(0,10)
  lblTime66.value=timeApp
  
  lblName66.value=FirstName
}

btnQuote.onclick=function(){
   let myurl = "https://cors-anywhere.herokuapp.com/https://api.postmates.com/v1/customers/cus_MSLwXZd9eRT4gV/delivery_quotes";

// call requires in the format required (in the Postmates Developer documentation)
         $.ajax({
            url: myurl,
            headers: {
            'Authorization':'Basic Y2YyZjJkNmQtYTMxNC00NGE4LWI2MDAtNTA1M2MwYWYzMTY1Og==',},
            method: 'GET',
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
                        let CustID = customerId.push(item.customer_id)
                        let DelivName = DeliveryName.push(item.dropoff_name)
                        let DelivPhone = DeliveryPhone.push(item.dropoff_phone_number)
                        let DelivAdd = DeliveryAddress.push(item.dropoff_address)
                        let PUAdd = PickUpAddress.push(item.pickup_address)
                        let PUPhone = PickUpPhone.push(item.pickup_phone_number)
                        let PUName = PickUpName.push(item.dropoff_name)
                        let Mani = Manifest.push(item.manifest)
                        let ManiItems = ManifestItems.push(item.manifest_items)
                        let Cost = Price.push(item.fee)
                  }); // close the loop and loop function. Repeat the loop
                   } //close if results not = 0
                else 
                    // If our results are 0; no businesses were returned by the call therefor we display on the page no results were found
                    console.log("No businesses found")
            } // close success funct
         });   // close ajax call
      iptCustomerID.value = CustID
      iptAddress.value = DelivAdd
      lblResturantA.value = PUAdd
      iptPhone.value = DelivPhone
      txtQuote.value = Cost


}

btnOrder.onclick=function(){
  
  ChangeForm(postmatesMakeOrder)
}


Hamburger13.onclick=function(s){
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

