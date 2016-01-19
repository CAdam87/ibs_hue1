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
				drawGraph(result);
			}
		};
		xmlHttp.send(null);
	}
}

function drawGraph(result) {

//Better to construct options first and then pass it as a parameter

	var options = {
		title: {
			text: "Arsnova.eu Statistik"
		},
                animationEnabled: true,
        axisY: {
				labelFontSize: 14,
				labelFontColor: "dimGrey",
				labelAngle: -45
		},
        axisX: {
				labelFontSize: 14,
				labelFontColor: "dimGrey",
				labelAngle: -45
		},
		data: [
		{
			type: "column", //change it to line, area, bar, pie, etc
			dataPoints: [
				{ label: "answers", y: result.answers },
				{ label: "lectureQuestions", y: result.lectureQuestions },
				{ label: "preparationQuestions", y: result.preparationQuestions },
				{ label: "openSessions", y: result.openSessions },
				{ label: "closedSessions", y: result.closedSessions },
				{ label: "creators", y: result.creators },
				{ label: "activeUsers", y: result.activeUsers },
				{ label: "activeStudents", y: result.activeStudents },
				{ label: "loggedinUsers", y: result.loggedinUsers },
				{ label: "interposedQuestions", y: result.interposedQuestions },
				{ label: "conceptQuestions", y: result.conceptQuestions },
				{ label: "questions", y: result.questions },
				{ label: "sessions", y: result.sessions }
			]
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}
