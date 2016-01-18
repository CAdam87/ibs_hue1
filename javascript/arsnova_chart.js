$(document).ready(function(){
	getArsnovaStats();
});

setInterval(function(){ 
	getArsnovaStats();
}, 30000);

function getArsnovaStats(){
	var xmlHttp = null;
	try {
		xmlHttp = new XMLHttpRequest();
	} catch(e) {
		// Fehlerbehandlung, wenn die Schnittstelle vom Browser nicht unterstützt wird.
	}
	if (xmlHttp) {
		xmlHttp.open('GET', 'https://arsnova.eu/api/statistics/', true);
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4) {
				var result = JSON.parse(xmlHttp.responseText);
				document.getElementById("answers-count").innerHTML = result.answers;
				document.getElementById("lectureQuestions-count").innerHTML = result.lectureQuestions;
				document.getElementById("preparationQuestions-count").innerHTML = result.preparationQuestions;
				document.getElementById("openSessions-count").innerHTML = result.openSessions;
				document.getElementById("closedSessions-count").innerHTML = result.closedSessions;
				document.getElementById("creators-count").innerHTML = result.creators;
				document.getElementById("activeUsers-count").innerHTML = result.activeUsers;
				document.getElementById("activeStudents-count").innerHTML = result.activeStudents;
				document.getElementById("loggedinUsers-count").innerHTML = result.loggedinUsers;
				document.getElementById("interposedQuestions-count").innerHTML = result.interposedQuestions;
				document.getElementById("conceptQuestions-count").innerHTML = result.conceptQuestions;
				document.getElementById("questions-count").innerHTML = result.questions;
				document.getElementById("sessions-count").innerHTML = result.sessions;
			}
		};
		xmlHttp.send(null);
	}
}
