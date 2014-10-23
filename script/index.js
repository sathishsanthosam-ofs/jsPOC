function LoginCredentials(){
	this.sathish="kumar";
	this.test="123456"	
};
function MyBook(){	
	this.myCredentials = new LoginCredentials();
	this.users = [];
	for(key in this.myCredentials)
	{
		this.users.push(new User(key));
	}		
	this.validate = function(userName,password){		
		return (this.myCredentials[userName]) === password;
	};
	this.currentUser = this.users[0];	
}



var myBook = new MyBook();
function login(username,password){
	if(myBook.validate(document.getElementById(username).value,document.getElementById(password).value))
	{
		var name = document.getElementById(username).value;
		document.getElementById("feeduserName").innerHTML = name;
		document.getElementById("profileuserName").innerHTML = name;	
		for(var i =0,l = myBook.users.length;i<l;i++){				
			if(myBook.users[i].profile.userName === name){
				myBook.currentUser = myBook.users[i];
				createFeedsService = service(myBook.currentUser,"CreateFeed");
				deleteFeedsService = service(myBook.currentUser,"DeleteFeed");
				saveProfileService = service(myBook.currentUser,"SaveProfile");
				break;
			}
		 }	
		document.getElementById(username).value="";
		document.getElementById(password).value="";
		reloadFeeds();
		setCurrentpage("FeedPage");
	} else {
		alert("Login Failed, please enter the correct username and password");
	}
}
function setCurrentpage(currentPage){		
	var e = document.getElementById("LoginPage");
	var e1 = document.getElementById("FeedPage");         	
	var e2 = document.getElementById("ProfilePage");	
	e.style.display = 'none';
	e1.style.display = 'none';
	e2.style.display = 'none';	
	if(currentPage == "LoginPage")
	{	
		e.style.display = 'block';	
	}
	else if(currentPage == "FeedPage")
	{
		e1.style.display = 'block';
	} else 
	{	
		e2.style.display = 'block';	
		loadProfile();
	}
}


var createFeedsService = service(myBook.currentUser,"CreateFeed");
var deleteFeedsService = service(myBook.currentUser,"DeleteFeed");
var saveProfileService = service(myBook.currentUser,"SaveProfile");

function createFeeds(id){	
	var ele = document.getElementById(id).value;
	document.getElementById(id).value = "";	
	var feed;
	if(ele.length > 4 && ele.substring(0,4).toUpperCase() == "HTTP"){
		feed = new URLFeed(1,ele);
	} else {
		feed = new TextFeed(1,ele);
	}
	createFeedsService(feed);
}

function deleteFeeds(id){	
	deleteFeedsService(id);
}

var inputElement = document.getElementById("browse");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	var nBytes = 0,
      oFiles = document.getElementById("profileImage").files,
      nFiles = oFiles.length; 
	  var file = oFiles[0];
	  document.getElementById("fileName").value = file.name;	  
	  var img = document.getElementById("preview");	  
	  var reader = new FileReader();	  
	  reader.onload = (function(aImg) { 
	  return function(e) { 
		aImg.src = e.target.result; 	  
	  }; 
	  })(img);
	  reader.readAsDataURL(file);
}

function validateNumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function saveProfile(){	
	var name = document.getElementById("Profilename").value;
	if(name.length == 0){
		alert("user Name is Empty")
		return false;
	}else if(name.length > 50){
		alert("user Name is too lang. maximum 50 chars")
		return false;
	}
	var age = document.getElementById("age").value;	
	if(age.length == 0){
		alert("age is empty")
	}else if(parseInt(age,10) > 100 || parseInt(age,10) < 0){
		alert("Age should be with in 0 to 100");
		return false;
	}
	var phone = document.getElementById("phone").value;	
	if(phone.length == 0){
		alert("phone number is empty")
		return false;
	}
	var email = document.getElementById("email").value;	
	if(email.length == 0){
		alert("email id is empty")
		return false;
	}
	var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        alert("Not a valid e-mail address");
        return false;
    }
	var address = document.getElementById("address").value;
	var img = document.getElementById("preview");
	myBook.currentUser.profile.profileImage = img.src;
	reloadFeeds();
	saveProfileService(name,age,phone,email,address,document.getElementById("filePath").value);	
}

function getDateString(date){
	return (date.getMonth()+1) +"/"+ (date.getDate()) + "/"+(date.getFullYear()) + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() )+":"+(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM" );
}

 function loadProfile(){	
	var profile = myBook.currentUser.profile;	
	if(profile.name){
		document.getElementById("Profilename").value=profile.name;
	} else {
		document.getElementById("Profilename").value="";
		document.getElementById("Profilename").placeHolder="Name";
	}	
	if(profile.age){
		document.getElementById("age").value=profile.age;
	} else {
		document.getElementById("age").value="";
		document.getElementById("age").placeHolder="age";
	}	
	if(profile.phone){
		document.getElementById("phone").value=profile.phone;
	} else {
		document.getElementById("phone").value="";
		document.getElementById("phone").placeHolder="phone";
	}	
	if(profile.email){
		document.getElementById("email").value=profile.email;
	}  else {
		document.getElementById("email").value="";
		document.getElementById("email").placeHolder="email";
	}	
	if(profile.address){
		document.getElementById("address").value=profile.address;
	} else {
		document.getElementById("address").value="";
		document.getElementById("address").placeHolder="address";
	}	
	if(profile.filePath){
		document.getElementById("fileName").value=profile.filePath;
	} else {
		document.getElementById("fileName").value="";
		document.getElementById("fileName").placeHolder="Profile image";
	}	
	if(profile.profileImage){
		document.getElementById("preview").src=profile.profileImage;
	}	
 }





