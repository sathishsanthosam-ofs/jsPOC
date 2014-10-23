function Profile(userName){
	this.userName=userName;	
	this.profileImage = "images/user.jpg";
	this.saveProfile = function(name,age,phone,email,address,filePath){
		this.name=name;
		this.age=age;
		this.phone=phone;
		this.email=email;
		this.address=address;
		this.filePath = filePath;
	};
}

function User(userName){
	this.profile = new Profile(userName);
	this.feeds = [];
	this.feeds.push(new TextFeed(1,userName));
	this.feeds.push(new URLFeed(2,"https://www.google.co.in/"));
}
