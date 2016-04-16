
document.domain = "gmarket.co.kr";

// AddAntiForgeryToken
AddAntiForgeryToken = function (data) {
	data.__RequestVerificationToken = $('#__AjaxAntiForgeryForm input[name=__RequestVerificationToken]').val();
	return data;
};

/*
	browser check
*/
var browser = {
	version : parseInt(navigator.appVersion),
	isNetscape : navigator.appName.indexOf("Netscape") != -1,
	isMicrosoft : navigator.appName.indexOf("Microsoft") != -1
};

var objPosition = function(obj){
	var results={top:0,left:0};
	while (obj.offsetParent){
		results.top = results.top + obj.offsetTop;
		results.left = results.left + obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return results;
};


/* standard table offsetTop, offserLeft  */
function fnStandardPosition(){
	var standard_table = document.getElementById("standard_table").lastChild;
	return objPosition(standard_table);
}

/*--------------------------------------------------------------------------*/
// gInitHelper Class (for onload event queuing)
/*
(example)

gInitHelper().addHandler(function()
{
	document.getElementById("test").innerText = "document loading completed...";
});
*/
/*--------------------------------------------------------------------------*/
(function(window, undefined)
{
	// Define a local copy of gInitHelper
	var gInitHelper = function()
	{
		return gInitHelper.fn.init();
	},

	document = window.document,

	_singleton,

	// Has the ready events already been bound?
		readyBound = false,

	// The functions to execute on DOM ready
		readyList = [],

	// The ready event handler
	DOMContentLoaded;

	gInitHelper.fn = gInitHelper.prototype =
	{
		init: function()
		{
			return this;
		},

		addHandler: function(fn)
		{
			// Attach the listeners
			this.bindReady();

			// If the DOM is already ready
			if (_singleton.isReady)
			{
			// Execute the function immediately
			fn.call(document);

			// Otherwise, remember the function for later
			} else if (readyList)
			{
				// Add the function to the wait list
				readyList.push(fn);
			}

			return this;
		},

		// Handle when the DOM is ready
		ready: function()
		{
			// Make sure that the DOM is not already loaded
			if (!_singleton.isReady)
			{
				// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
				if (!document.body)
				{
					return setTimeout(_singleton.ready, 13);
				}

				// Remember that the DOM is ready
				_singleton.isReady = true;

				// If there are functions bound, to execute
				if (readyList)
				{
					// Execute all of them
					var fn, i = 0;
					while ((fn = readyList[i++]))
					{
						fn.call(document);
					}

					// Reset the list of functions
					readyList = null;
				}
			}
		},

		bindReady: function()
		{
			if (readyBound)
			{
			return;
			}

			readyBound = true;

			// Catch cases where $(document).ready() is called after the
			// browser event has already occurred.
			if (document.readyState === "complete")
			{
			return _singleton.ready();
			}

			// Mozilla, Opera and webkit nightlies currently support this event
			if (document.addEventListener)
			{
			// Use the handy event callback
			document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

			// A fallback to window.onload, that will always work
			window.addEventListener("load", _singleton.ready, false);

			// If IE event model is used
			}
			else if (document.attachEvent)
			{
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", DOMContentLoaded);

			// A fallback to window.onload, that will always work
			window.attachEvent("onload", _singleton.ready);

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try
			{
				toplevel = window.frameElement == null;
			} catch (e) { }
			}
		}
	};

	// All gInitHelper objects should point back to these
	_singleton = gInitHelper();

	// Cleanup functions for the document ready method
	if (document.addEventListener)
	{
		DOMContentLoaded = function()
		{
			document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
			_singleton.ready();
		};

	} else if (document.attachEvent)
	{
		DOMContentLoaded = function()
		{
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if (document.readyState === "complete")
			{
			document.detachEvent("onreadystatechange", DOMContentLoaded);
			_singleton.ready();
			}
		};
	}

	window.gInitHelper = gInitHelper;

})(window);

// Image Error Loader
var httpheadertag;
if (document.location.href.indexOf("https:")>=0)
{
	httpheadertag = "https://sslimage.";
}else{
	httpheadertag = "http://image.";
}
NoImage = new Image();
NoImage.src = httpheadertag + 'gmarket.co.kr/_Net/Myg/thumb_noimg_120.jpg';

NoImage2 = new Image();
NoImage2.src = httpheadertag + 'gmarket.co.kr/challenge/neo_image/shopping_guide_img/image.gif';


function ImgLoadFirst(obj,simg)
{
	if (simg == undefined)
	{
		if (NoImage.complete) 
		{
			obj.src = NoImage.src;
		}
		else 
		{
			obj.style.display = 'none';
		} 
	}else{
		if (NoImage2.complete) 
		{
			obj.src = NoImage2.src;
		}
		else 
		{
			obj.style.display = 'none';
		} 
	}

}

function imgLoadFirst(obj,simg)
{
	ImgLoadFirst(obj,simg);
}


function fnMessageBox(){
	//wParam = Member2Url("") + "Message/MessageBox" + "#" + document.domain;
	wParam = GmarketUrl("") + "challenge/neo_my_gd/message/my_message_box.asp" + "#" + document.domain;
	//GmktPopLayerAdd(wParam, 610, 500);
	GmktPopLayerAdd(wParam, 590, 480);
}

function fnMyCouponBox(m_id){
	var w = fixed_coupon_box_width;
	var h = fixed_coupon_box_height;
	var my_coupon_pop = window.open(GmarketUrl("") + 'challenge/neo_goods/my_coupon/my_coupon_renew.asp?m_id=' + m_id, 'showMyCoupon', 'top='+(screen.height-h)/3+',left='+(screen.width-w)/2+',toolbar=no, history=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width='+w+', height='+h);
	my_coupon_pop.focus();
}

///////////////////////////////////////////////////////////////////////////////////
// AjaxHelper Method
///////////////////////////////////////////////////////////////////////////////////
var AjaxHelper = AjaxHelper || {};
AjaxHelper.ContentTypeJson = "application/json; charset=utf-8";
AjaxHelper.ContentTypeXml = "text/xml; charset=utf-8";

//Sync Post Json
AjaxHelper.GetDataToPostService = function (requestUrl, argument, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, argument, "POST", "json", AjaxHelper.ContentTypeJson, "", errorHandler);	
}

//Sync Get Jsong
AjaxHelper.GetDataToGetService = function (requestUrl, errorHandler, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, "", "GET", "json", AjaxHelper.ContentTypeJson, "", errorHandler);
}

//Sync Get JsonP
AjaxHelper.GetDataToGetServiceJsonp = function (requestUrl,argument, errorHandler, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, argument, "GET", "jsonp", AjaxHelper.ContentTypeJson, "", errorHandler);
}
//Async Post Json
AjaxHelper.AsyncGetDataToPostService = function (requestUrl, argument, callBackFunction, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, argument, "POST", "json", AjaxHelper.ContentTypeJson, callBackFunction, errorHandler);
}

//Async Get Json
AjaxHelper.AsyncGetDataToGetService = function (requestUrl, callBackFunction, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, "", "GET", "json", AjaxHelper.ContentTypeJson, callBackFunction, errorHandler);
}

//Async Get Jsonp
AjaxHelper.AsyncGetDataToGetServiceJsonp = function (requestUrl,argument, callBackFunction, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, argument, "GET", "jsonp", AjaxHelper.ContentTypeJson, callBackFunction, errorHandler);
}


//Async Post Soap
AjaxHelper.AsyncGetDataToGetService = function (requestUrl, argument, callBackFunction, errorHandler) {
	return AjaxHelper.CallAjaxService(requestUrl, argument, "GET", "xml", AjaxHelper.ContentTypeXml, callBackFunction, errorHandler);
}

//Common Function
AjaxHelper.CallAjaxService = function (requestUrl, argument, ajaxType, ajaxDataType, ajaxContentType, callBackFunction, errorHandler) {
	var isAsync = true;
	if (callBackFunction == "") {
		isAsync = false;
	}
	return $.ajax({
		type: ajaxType,
		url: requestUrl,
		//processData: false,
		data: argument,
		//contentType: ajaxContentType,
		dataType: ajaxDataType,
		async: isAsync,
		beforeSend: function (xhr) {

		},
		success: function (msg) {
			if (msg) {
				if (isAsync)
					eval(callBackFunction)(msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			try {
				eval(errorHandler)(jqXHR, textStatus, errorThrown);
			}
			catch (ex) {
				//alert(ex.status + ' ' + ex.statusText);	
			}
		}
	})	
}

//onerror = ErrorHandler;

function ErrorHandler(pMsg, pURL, pLines) {
//	var funcname = "";
//	if (ErrorHandler.caller != null) {
//		try {
//			funcname = ErrorHandler.caller.toString();
//			funcname = funcname.substring(0, 50);
//		}
//		catch (e) {
//			// do nothing
//		}
//	}//	var domainNm = document.domain;

//	funcname = funcname.replace(/\r\n/g, "\\n").replace(/\n/g, "\\n").replace(/\r/g, "\\n").replace(/\t/g, "\\n");

//	AjaxHelper.WriteScriptError(pMsg, domainNm, pURL, funcname, pLines);

	return false;
};

/**
* @private
* @param {String} pMsg
* @param {String} domainNm
* @param {String} pURL
* @param {String} pLines
* @return boolean
*/
AjaxHelper.WriteScriptError = function (pMsg, domainNm, pURL, funcname, pLines) {
//	var params = '{';
//	params += '"message":"' + pMsg + " - " + domainNm + '"';
//	params += ', "url":"' + pURL + '"';
//	params += ', "funcname":"' + funcname + '"';
//	params += ', "lines":"' + pLines + '"';
//	params += ', "referer":"' + document.referrer + '\\nUser Agent : ' + window.navigator.userAgent + '\\nUser Language : ' + window.navigator.userLanguage + '"';
//	params += '}';

//	//AjaxHelper.AsyncGetDataToPostService("ArcheUser.svc", "AddScriptExceptionLog", params, "AjaxHelper.WriteScriptErrorResult");
//	AjaxHelper.AsyncGetDataToPostService("ArcheCommon.svc", "AddScriptExceptionLog", params, "AjaxHelper.WriteScriptErrorResult");
};

AjaxHelper.WriteScriptErrorResult = function (result) {
}

///////////////////////////////////////////////////////////////////////////////////
$.extend({
	URLEncode: function (c) {
		var o = ''; var x = 0; c = c.toString(); var r = /(^[a-zA-Z0-9_.]*)/;
		while (x < c.length) {
			var m = r.exec(c.substr(x));
			if (m != null && m.length > 1 && m[1] != '') {
				o += m[1]; x += m[1].length;
			} else {
				if (c[x] == ' ') o += '+';
				else {
					var d = c.charCodeAt(x);
					var h = d.toString(16);
					o += '%' + (h.length < 2 ? '0' : '') + h.toUpperCase();
				}
				x++;
			}
		}
		return o;
	},

	URLDecode: function (s) {
		var o = s; var binVal, t; var r = /(%[^%]{2})/;
		while ((m = r.exec(o)) != null && m.length > 1 && m[1] != '') {
			b = parseInt(m[1].substr(1), 16);
			t = String.fromCharCode(b);
			o = o.replace(m[1], t);
		}
		return o;
	}
});


// commonClose
function ClosePopup() {
	window.opener = null;
	window.open('', '_parent', '');
	window.close();
}

// resize popup
function AutoResizePopup(objname, w, h) {
	if (objname == undefined) {
		objname = "popWrap";  
	}
	var thisX;
	var thisY;

	if (w == undefined) {
		thisX = document.getElementById(objname).scrollWidth;
	} else {
		thisX = w;
	}

	if (h == undefined) {
		thisY = document.getElementById(objname).scrollHeight;
	} else {
		thisY = h;
	}


	var maxThisX = screen.width - 50;
	var maxThisY = screen.height - 50;
	var marginY = 0;
	var marginX = 10;


	if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 45;        // IE 6.x
	else if (navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 75;    // IE 7.x
	else if (navigator.userAgent.indexOf("MSIE 8") > 0) marginY = 80;    // IE 8.x
	else if (navigator.userAgent.indexOf("MSIE 9") > 0) marginY = 90;    // IE 9.x
	else if (navigator.userAgent.indexOf("Firefox") > 0) marginY = 80;   // FF
	else if (navigator.userAgent.indexOf("Opera") > 0) marginY = 30;     // Opera
	else if (navigator.userAgent.indexOf("Netscape") > 0) marginY = -2;  // Netscape
	else if (navigator.userAgent.indexOf("Chrome") > 0) marginY = 64;    // Chrome
	if (navigator.userAgent.indexOf("Chrome") > 0) marginX = 16;

	window.resizeTo(thisX + marginX, thisY + marginY);
}

function safeWinOpen(url, x, y) {
	var centeredY, centeredX;
	var features = 'height=' + y + ',width=' + x + ',toolbar=0,scrollbars=1,status=0,resizable=1,location=0,menuBar=0';
	centeredY = (screen.height - y) / 2;
	centeredX = (screen.width - x) / 2;
	window.open(url, "chdWin", features + ',left=' + centeredX + ',top=' + centeredY).focus();
}

function safePopWinOpen(url, x, y, opt) {
	var centeredY, centeredX;
	var features = 'height=' + y + ',width=' + x + ',' + opt;
	centeredY = (screen.height - y) / 2;
	centeredX = (screen.width - x) / 2;
	window.open(url, "chdWin", features + ',left=' + centeredX + ',top=' + centeredY).focus();
}

function gAlert(msg) {
	alert(msgAllReplace(msg));
}

function gConfirm(msg) {
	if (!confirm(msgAllReplace(msg))) { return false; } else { return true; }
}

function msgAllReplace(inText) {
	var ret;
	var returnText = inText;

	for (var i = 0; i < inText.length; i++) {
		ret = inText.substring(i, i + 1);
		if (ret == "￦") {
			returnText = returnText.replace("￦n", "\n");
		}
		returnText = returnText;
	}
	return returnText;
}

// GUID Generation & Page View Logging Script for GMKT PC (1.0)
/*
 * Guid Profiler
 */
if (typeof guidProfiler === 'undefined') {
    var guidProfiler = {
        __pdsUrl: ((location.protocol.toLowerCase() == 'https:') ? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'),		// prod

        SETGUIDS_URL: '/cookiemanager/setguids/1/P1',
        SETLOGIN_URL: '/cookiemanager/setlogin/1',

        SSGuid_EXPIRE_TIME: 1800000,	// 30min in millisec		
        SSGuid_TEN_MIN: 600000,			// 10min in millisec				
        PERSISTENT_COOKIE_EXPIRE_TIME: 31536000000,
        SSGuid_COOKIE_NAME: 'ssguid',
        SSGuid_FIX_GUID_LENGTH: 23,
        SSGuid_FIX_DIFF_LENGTH: 3,

        isSSGuidReset: false,

        setGUID: function () {
            var self = guidProfiler;

            var ssguid = self._getCookie(self.SSGuid_COOKIE_NAME);
            var ssguid_new = ssguid;

            var sguid = self._getCookie("sguid");
            var pguid = self._getCookie("pguid");
            var cguid = self._getCookie("cguid");

            ssguid_new = self._upsertCheckSSGuid(ssguid);
            if (self.isSSGuidReset == true) {
                self._removeCookie(self.SSGuid_COOKIE_NAME);
                self._send(self.__pdsUrl + self.SETGUIDS_URL);
            }
            else {
                if (self._getCookie(self.SSGuid_COOKIE_NAME).length < 1 || self._getCookie("sguid").length < 1 || self._getCookie("pguid").length < 1 || self._getCookie("cguid").length < 1) {
                    self._send(self.__pdsUrl + self.SETGUIDS_URL);
                }
                if (ssguid_new != '' && ssguid_new != ssguid) {
                    var expireTime = new Date(new Date().getTime() + self.PERSISTENT_COOKIE_EXPIRE_TIME);
                    self._setGlobalCookie(self.SSGuid_COOKIE_NAME, ssguid_new, expireTime, "/", ".gmarket.co.kr");
                }
            }
            if (self._getCookie("pds") == '1') {
                self._setGlobalCookie("pds", "2", null, "/", ".gmarket.co.kr");
                self._send(self.__pdsUrl + self.SETLOGIN_URL);
            }
        },

        _upsertCheckSSGuid: function (currentSSGuid) {
            var self = guidProfiler;

            if (currentSSGuid == null || currentSSGuid == '') {
                self.isSSGuidReset = true;
                return '';
            }
            else {
                var now = new Date();
                var nowTime = now.getTime();

                var SSGuidTimeDiff = currentSSGuid.substr(self.SSGuid_FIX_GUID_LENGTH, self.SSGuid_FIX_DIFF_LENGTH);
                var SSGuidSeqNo = currentSSGuid.substr(self.SSGuid_FIX_GUID_LENGTH + self.SSGuid_FIX_DIFF_LENGTH);
                var firstAccTime = currentSSGuid.substr(1, 13) * 1;

                if (!isNaN(firstAccTime) && !isNaN(SSGuidTimeDiff) && !isNaN(SSGuidSeqNo)) {

                    var LastAccTime = firstAccTime + SSGuidTimeDiff * self.SSGuid_TEN_MIN;
                    if (nowTime - LastAccTime < self.SSGuid_EXPIRE_TIME) {
                        SSGuidSeqNo = SSGuidSeqNo * (1) + 1;
                        SSGuidTimeDiff = "00" + Math.floor(((nowTime - firstAccTime) / self.SSGuid_TEN_MIN)).toString();
                        SSGuidTimeDiff = SSGuidTimeDiff.substr(SSGuidTimeDiff.length - self.SSGuid_FIX_DIFF_LENGTH);

                        self.isSSGuidReset = false;
                        return currentSSGuid.substr(0, self.SSGuid_FIX_GUID_LENGTH) + SSGuidTimeDiff + SSGuidSeqNo.toString();
                    }
                }
                self.isSSGuidReset = true;
                return '';
            }
        },
        _getCookie: function (name) {
            var cookieName = name + '=';
            var docCookie = document.cookie;
            var start = docCookie.indexOf(cookieName);
            var retCookie = '';

            if (start > 0 && docCookie[start - 1] != ' ' && docCookie[start - 1] != ';') {
                start = docCookie.indexOf(cookieName, start + 1);
            }
            if (start != -1) {
                start += cookieName.length;
                var end = docCookie.indexOf(';', start);
                if (end == -1) end = docCookie.length;
                retCookie = docCookie.substring(start, end);
            }
            return retCookie;
        },
        _removeCookie: function (cookieName) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() - 1);		// 어제 날짜를 쿠키 소멸 날짜로 설정한다.
            document.cookie = cookieName + "=; expires=" + expireDate.toGMTString() + "; path=/;domain=gmarket.co.kr;";
        },
        _setGlobalCookie: function (name, value, expires, path, domain, secure) {
            var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
            if ((name + "=" + escape(value)).length <= 4000) {
                document.cookie = curCookie;
            }
        },
        _send: function (url) {
            var imgTag = document.createElement('img');
            imgTag.src = url;
        }
    };
    setTimeout(guidProfiler.setGUID, 25);
}

/*
 * Page View & User Behavior Profiler
 */
// User Behavior Profiler from ubprofiler_gmkt.js (ubprofiler_gmkt.js will be deprecated)
if (typeof ubprofiler === 'undefined') {
    var ubprofiler = {
        __pdsUrl: ((location.protocol.toLowerCase() == 'https:') ? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'),		// prod

        send: function (behavior, src, ids, query) {
            var self = ubprofiler;

            var idStr = (typeof ids === 'object' && typeof ids.join === 'function') ? ids.join(',') : ids;
            var querystring = self._param(query);
            var url = self.__pdsUrl
				+ '/ub/add/1/' + self._encodeUri(behavior)
				+ '/' + self._encodeUri(src)
				+ '/' + self._encodeUri(idStr)
				+ (querystring ? '?' + querystring : '');
            self._send(url);
        },
        sendDirect: function (path, query) {
            var self = ubprofiler;

            var querystring = self._param(query);
            var url = self.__pdsUrl + path + (querystring ? (path.indexOf('?') === -1 ? '?' : '&') + querystring : '');
            self._send(url);
        },

        _send: function (url) {
            var imgTag = document.createElement('img');
            //var imgTag = new Image();		// Image() can be overwritten by other script
            imgTag.src = url;
        },
        _param: function (obj) {
            var self = ubprofiler;

            var ret = '';
            var tList = [];
            if (typeof obj === 'object') {
                for (var e in obj) {
                    tList.push(e + '=' + self._encodeUri(obj[e]));
                }
                ret = tList.join('&');
            }
            return ret;
        },
        _encodeUri: function (value) {
            // There are six possible values that typeof returns: "number," "string," "boolean," "object," "function," and "undefined."
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                return encodeURIComponent(
					value.toString()
						.replace(/ /g, ';WS')
						.replace(/\+/g, ';PL')
						.replace(/\?/g, ';QU')
						.replace(/\//g, ';SL')
						.replace(/\#/g, ';SP')
						.replace(/\&/g, ';AD')
				);
            }
            return '';
        }
    };
}

if (typeof pvprofiler === 'undefined' && typeof ubprofiler !== 'undefined') {
    var pvprofiler = {							// page view profiler 
        // alias
        _windowAlias: window,
        _ubprofilerAlias: ubprofiler,

        send: function () {
            var self = pvprofiler;

            self._ubprofilerAlias.send(			// page view logging
				'view',
				'page',
				'1.0',							// script version
				{
				    'url': self._windowAlias.document.location.href,
				    'ref': self._windowAlias.document.referrer,
				    'lang': self._windowAlias.navigator.language || self._windowAlias.navigator.userLanguage || self._windowAlias.navigator.browserLanguage,
				    'hlen': self._windowAlias.history.length,
				    'sw': self._windowAlias.screen.width,
				    'sh': self._windowAlias.screen.height
				}
			);
        }
    };
    setTimeout(pvprofiler.send, 25);
}