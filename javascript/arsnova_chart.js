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

	var options = {
		animationEnabled: true,
		legend:{
			fontFamily: "Arial, Sans",
			fontColor: "Black",
			fontSize: 14,
			itemWidth: 350,
			fontWeight: "bold"
		 },
		data: [
		{
			indexLabelFontSize: 20,
			indexLabelFontFamily: "Arial, Sans",
			indexLabelFontColor: "Black",
			indexLabelLineThickness: 3,    
			type: "pie",
			indexLabel: "{label}",
			toolTipContent: "{y} [#percent %]",
			legendText: "{label} - {y} [#percent %] ",
			showInLegend: true,
			dataPoints: [
				{ y: result.answers, label: "answers" },
				{ y: result.lectureQuestions, label: "lectureQuestions" },
				{ y: result.preparationQuestions, label: "preparationQuestions" },
				{ y: result.openSessions, label: "openSessions"},
				{ y: result.closedSessions, label: "closedSessions" },
				{ y: result.creators, label: "creators"},
				{ y: result.activeUsers, label: "activeUsers"},
				{ y: result.activeStudents, label: "activeStudents"},
				{ y: result.loggedinUsers, label: "loggedinUsers"},
				{ y: result.interposedQuestions, label: "interposedQuestions"},
				{ y: result.conceptQuestions, label: "conceptQuestions"},
				{ y: result.questions, label: "questions"},
				{ y: result.sessions, label: "sessions"}
			]
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}