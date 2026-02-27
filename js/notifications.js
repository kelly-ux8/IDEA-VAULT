function sendNotification(message){

let user = JSON.parse(localStorage.getItem("ivc_current_user"));

if(!user) return;

let notifications = JSON.parse(localStorage.getItem("ivc_notifications")) || [];

notifications.push({
user: user.email,
message: message,
date: new Date().toLocaleString()
});

localStorage.setItem("ivc_notifications", JSON.stringify(notifications));

}
