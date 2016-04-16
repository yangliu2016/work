 
rpmAjaxCall = function (eventId) {

	var pdsUrl = "http://pds.gmarket.co.kr/scriptBrokerMsgJsonp" ;
	

	var params = { id: eventId };
	if (eventId == "l" && !!window.performance) {

		var t = window.performance.timing;

		if (!!t) {

			var paramO = {
				id: eventId,
				NaviStTick: t.navigationStart,
				LookupStTick: t.domainLookupStart,
				RequestStTick: t.requestStart,
				ResponseEdTick: t.responseEnd,
				DomLoadedStTick: t.domContentLoadedEventStart,
				LoadStTick: t.loadEventStart
			}

			if (paramO != null)
				params = paramO;
		}

	}

	$.ajax({
		url: pdsUrl,
		data: params,
		type: "GET",
		contentType: "application/javascript; charset=utf-8",
		scriptCharset: "utf-8",
		dataType: "jsonp",
		crossdomain: true,
		error: function (request, error) {
			//alert("Error: " + error);
		}
	});
}

rpmAjaxCallParameter = function (eventId) {
	var pdsUrl = "http://pds.gmarket.co.kr/scriptBrokerMsgParameterJsonp";
	var params = { id: eventId, RequestKey: __rpmRequestKey, BaseTime: __rpmBaseTime, FilterID: __rpmFilterID };
	if (eventId == "l" && !!window.performance) {

		var t = window.performance.timing;

		if (!!t) {

			var paramO = {
				id: eventId,
				RequestKey: __rpmRequestKey,
				BaseTime: __rpmBaseTime,
				FilterID: __rpmFilterID,
				NaviStTick: t.navigationStart,
				LookupStTick: t.domainLookupStart,
				RequestStTick: t.requestStart,
				ResponseEdTick: t.responseEnd,
				DomLoadedStTick: t.domContentLoadedEventStart,
				LoadStTick: t.loadEventStart
			}

			if (paramO != null)
				params = paramO;
		}

	}


	$.ajax({
		url: pdsUrl,
		data: params,
		type: "GET",
		contentType: "application/javascript; charset=utf-8",
		scriptCharset: "utf-8",
		dataType: "jsonp",
		crossdomain: true,
		error: function (request, error) {
			//alert("Error: " + error);
		}
	});
}