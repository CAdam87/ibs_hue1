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
		alert("Statistik Server nicht erreichbar");
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

	CanvasJS.addColorSet("blueShades",
	[
		"#528B8B",
		"#96CDCD",
		"#66CCCC",
		"#00CDCD",
		"#4A777A",
		"#0EBFE9",
		"#162252"
	]);
	var options = {
		colorSet: "blueShades",
		animationEnabled: true,
		axisY: {
 				labelFontFamily: "Arial, Sans",
				labelFontSize: 14,
				labelFontColor: "Black",
				labelAngle: 0
		},
		axisX: {
				labelFontFamily: "Arial, Sans",
				labelFontSize: 14,
				labelFontColor: "Black",
				labelAngle: -45
		},
		data: [
		{
			type: "column",
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
