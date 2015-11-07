var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 7.5;
var dragging = false;
var erase = false;

canvas.width = window.innerWidth*0.95;
canvas.height = window.innerHeight*0.95;

context.lineWidth = radius*2;

document.ontouchmove = function(event){
    event.preventDefault();
}

document.getElementById('erase').onclick = function() {
	if(!erase){
		context.fillStyle = "#FFF"
		context.strokeStyle = "#FFF"
		radius = 15;
		context.lineWidth = radius*2;
		erase = true;
	}else if(erase){
		context.fillStyle = "#000"
		context.strokeStyle = "#000"
		radius = 7.5;
		context.lineWidth = radius*2;
		erase = false;
	}
}

var putPoint = function(e){	

	var rect = canvas.getBoundingClientRect();

	if(dragging){
		if(isMobile.any()){
			context.lineTo(e.touches[0].clientX - rect.left ,e.touches[0].clientY - rect.top);
			context.stroke();
			context.beginPath();
			context.arc(e.touches[0].clientX - rect.left ,e.touches[0].clientY - rect.top,radius,0,Math.PI*2);
			context.fill();
			context.beginPath();
			context.moveTo(e.touches[0].clientX - rect.left ,e.touches[0].clientY - rect.top);
		}else{
			context.lineTo(e.clientX - rect.left ,e.clientY - rect.top);
			context.stroke();
			context.beginPath();
			context.arc(e.clientX - rect.left ,e.clientY - rect.top,radius,0,Math.PI*2);
			context.fill();
			context.beginPath();
			context.moveTo(e.clientX - rect.left ,e.clientY -rect.top);
		}
		
	}

}


var engage = function(e){
	dragging=true;
	putPoint(e);
	console.log("Engaged");
}

var disengage = function(){
	dragging=false;
	context.beginPath();
	console.log("Disengaged");
}

var check = function(){
	alert("Hello");
}

if(isMobile.any()){
	canvas.addEventListener('touchstart', engage);
	canvas.addEventListener('touchmove', putPoint);
	canvas.addEventListener('touchend', disengage);	
}else{
	canvas.addEventListener('mousedown', engage);
	canvas.addEventListener('mousemove', putPoint);
	canvas.addEventListener('mouseup', disengage);	
}

var link = document.getElementById('download');

link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL();
    link.download = "whiteboard.png";
}, false);


