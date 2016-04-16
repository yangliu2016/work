
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dimmed Layer Control Script
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var GMKTpopLayerBase = 9998;
var GMKTpopLayerIndex = 0;
var GMKTpopLayerParentReload = "N";
function GmktIframeReload(sIdStr) {
	var IframeLayer = document.getElementById(sIdStr);
	if (IframeLayer) IframeLayer.contentWindow.location.reload();
}
function GmktTopLeft() {
	var T, L;
	if (window.pageYOffset) { T = window.pageYOffset }
	else if (document.documentElement && document.documentElement.scrollTop) { T = document.documentElement.scrollTop; }
	else if (document.body) { T = document.body.scrollTop; }
	if (window.pageXOffset) { L = window.pageXOffset }
	else if (document.documentElement && document.documentElement.scrollLeft) { L = document.documentElement.scrollLeft; }
	else if (document.body) { L = document.body.scrollLeft; }
	arrTopLeft = new Array(T, L);
	return arrTopLeft;
}
function GmktPageSize() {
	var W1, W2, H1, H2;
	var pageWidth, pageHeight;
	if (window.innerHeight && window.scrollMaxY) {
		W2 = document.body.scrollWidth;
		H1 = window.innerHeight + window.scrollMaxY
	} else {
		if (document.body.scrollHeight > document.body.offsetHeight) {
			H1 = document.body.scrollHeight
		} else {
			H1 = document.body.offsetHeight
		}
		if (document.body.scrollWidth > document.body.offsetWidth) {
			W2 = document.body.scrollWidth;
		} else {
			W2 = document.body.offsetWidth;
		}
	}
	if (self.innerHeight) {
		W1 = self.innerWidth;
		H2 = self.innerHeight
	} else {
		if (document.documentElement && document.documentElement.clientHeight) {
			W1 = document.documentElement.clientWidth;
			H2 = document.documentElement.clientHeight
		} else {
			if (document.body) {
				W1 = document.body.clientWidth;
				H2 = document.body.clientHeight
			}
		}
	}
	if (H1 < H2) {
		pageHeight = H2
	} else {
		pageHeight = H1
	}
	if (W2 < W1) {
		pageWidth = W1
	} else {
		pageWidth = W2
	}
	arrPageSize = new Array(pageWidth, pageHeight, W1, H2);
	return arrPageSize;
}
function GmktPopLayerSetParentReload(str) {
	GMKTpopLayerParentReload = str;
}
function GmktPopLayerInit(callback, sUrl, sWidth, sHeight, sClickYn) {
	var fileref = document.createElement('link');
	var tmpUrl = location.href;
	var tmpCss;

	if (tmpUrl.indexOf("https://") < 0)
		tmpCss = "http://script.gmarket.co.kr/_Net/css/dimmed.css";
	else
		tmpCss = "https://script.gmarket.co.kr/_Net/css/dimmed.css";

	// add poplayer css
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", tmpCss);
	if (navigator.appVersion.indexOf("MSIE") > -1) {
		var loaded = false;
		fileref.onreadystatechange = function () {
			if (this.readyState == 'loaded' || this.readyState == 'complete') {
				if (loaded) {
					return;
				}
				loaded = true;
				callback(sUrl, sWidth, sHeight, sClickYn);
			}
		}
	}
	else {
		callback(sUrl, sWidth, sHeight, sClickYn);
	}
	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
}
function GmktPopLayerAddOrigin(sUrl, sWidth, sHeight, sClickYn) {
	var popLayer = document.getElementById("GmktPopLayer");
	if (!popLayer) {
		// create poplayer
		var newPopLayer = document.createElement("div");
		newPopLayer.setAttribute('id', 'GmktPopLayer');
		newPopLayer.className = "poplayer";
		document.body.appendChild(newPopLayer);
		popLayer = newPopLayer;
	}
	var arrPageSize, arrTopLeft;
	arrPageSize = GmktPageSize();
	arrTopLeft = GmktTopLeft();

	popLayer.style.height = arrPageSize[1] + "px";
	popLayer.style.width = arrPageSize[0] + "px";

	GMKTpopLayerIndex++;
	var element = document.createElement("div");
	element.setAttribute('id', 'popLayer' + GMKTpopLayerIndex);

	element.className = "poplayer";
	element.style.height = arrPageSize[1] + "px";
	element.style.width = arrPageSize[0] + "px";
	element.style.zIndex = GMKTpopLayerBase + GMKTpopLayerIndex;

	var dimmed = document.createElement("div");
	dimmed.setAttribute('id', 'popLayerDimmed' + GMKTpopLayerIndex);
	dimmed.className = "dimmed";
	if (navigator.userAgent.indexOf("Opera") != -1) dimmed.className = "dimmed_sub";
	if (sClickYn == "Y") dimmed.onclick = GmktPopLayerDelete;
	else dimmed.onclick = GmktPopLayerNull;

	dimmed.style.width = arrPageSize[0] + "px";
	if (navigator.appVersion.indexOf("MSIE") > -1 && arrPageSize[1] > 4096) {
		var dTop = document.body.scrollTop || document.documentElement.scrollTop;
		dimmed.style.height = 4096 + "px";
		if ((dTop + 4096) < arrPageSize[1]) dimmed.style.top = dTop - 1500;
		else dimmed.style.top = (arrPageSize[1] - 4096) + "px";
	} else
		dimmed.style.height = arrPageSize[1] + "px";

	if ((/MSIE (6)/).test(navigator.userAgent)) {
		var dIframe = document.createElement('iframe');
		dIframe.setAttribute('id', 'popLayerDimmedIframe' + GMKTpopLayerIndex);
		dIframe.className = "blocker";
		if (sClickYn == "Y")
			dIframe.src = "../Dimmed/GmktDimmedLayerEvent";
		else
			dIframe.src = 'about:blank';
		dimmed.appendChild(dIframe);

	}
	element.appendChild(dimmed);

	var contents = document.createElement("div");
	contents.setAttribute('id', 'popLayerContents' + GMKTpopLayerIndex);
	contents.className = "frame_setting";
	if (sClickYn == "Y") contents.onclick = GmktPopLayerDelete;
	else contents.onclick = GmktPopLayerNull;
	var iTempTop = (arrPageSize[3] / 2) - (sHeight / 2) + (arrTopLeft[0])
	iTempTop = iTempTop < 0 ? 0 : iTempTop;
	contents.style.top = iTempTop + "px";
	contents.style.left = (arrPageSize[2] / 2) - (sWidth / 2) + (arrTopLeft[1]) + "px";
	contents.style.width = sWidth + "px";

	var cIframe;
	try {cIframe = document.createElement('iframe');
	}catch(e){cIframe = document.createElement('<iframe name="' + 'popLayerIframe' + GMKTpopLayerIndex + '">');}
	cIframe.setAttribute('name', 'popLayerIframe' + GMKTpopLayerIndex);
	cIframe.setAttribute('id', 'popLayerIframe' + GMKTpopLayerIndex);
	cIframe.src = sUrl;
	cIframe.width = sWidth + 'px';
	cIframe.height = sHeight + 'px';
	cIframe.frameBorder = 'no';
	cIframe.scrolling = 'no';

	contents.appendChild(cIframe);

	element.appendChild(contents);

	for (var i = 0; i < popLayer.childNodes.length; i++) popLayer.childNodes[i].childNodes[0].style.display = "none";
	popLayer.appendChild(element);
}
function GmktPopScrollLayerAddOrigin(sUrl, sWidth, sHeight, sClickYn) {
	var popLayer = document.getElementById("GmktPopLayer");
	if (!popLayer) {
		// create poplayer
		var newPopLayer = document.createElement("div");
		newPopLayer.setAttribute('id', 'GmktPopLayer');
		newPopLayer.className = "poplayer";
		document.body.appendChild(newPopLayer);
		popLayer = newPopLayer;
	}
	var arrPageSize, arrTopLeft;
	arrPageSize = GmktPageSize();
	arrTopLeft = GmktTopLeft();

	popLayer.style.height = arrPageSize[1] + "px";
	popLayer.style.width = arrPageSize[0] + "px";

	GMKTpopLayerIndex++;
	var element = document.createElement("div");
	element.setAttribute('id', 'popLayer' + GMKTpopLayerIndex);

	element.className = "poplayer";
	element.style.height = arrPageSize[1] + "px";
	element.style.width = arrPageSize[0] + "px";
	element.style.zIndex = GMKTpopLayerBase + GMKTpopLayerIndex;

	var dimmed = document.createElement("div");
	dimmed.setAttribute('id', 'popLayerDimmed' + GMKTpopLayerIndex);
	dimmed.className = "dimmed";
	if (navigator.userAgent.indexOf("Opera") != -1) dimmed.className = "dimmed_sub";
	if (sClickYn == "Y") dimmed.onclick = GmktPopLayerDelete;
	else dimmed.onclick = GmktPopLayerNull;

	dimmed.style.width = arrPageSize[0] + "px";
	if (navigator.appVersion.indexOf("MSIE") > -1 && arrPageSize[1] > 4096) {
		var dTop = document.body.scrollTop || document.documentElement.scrollTop;
		dimmed.style.height = 4096 + "px";
		if ((dTop + 4096) < arrPageSize[1]) dimmed.style.top = dTop - 1500;
		else dimmed.style.top = (arrPageSize[1] - 4096) + "px";
	} else
		dimmed.style.height = arrPageSize[1] + "px";

	if ((/MSIE (6)/).test(navigator.userAgent)) {
		var dIframe = document.createElement('iframe');
		dIframe.setAttribute('id', 'popLayerDimmedIframe' + GMKTpopLayerIndex);
		dIframe.className = "blocker";
		if (sClickYn == "Y")
			dIframe.src = "../Dimmed/GmktDimmedLayerEvent";
		else
			dIframe.src = 'about:blank';
		dimmed.appendChild(dIframe);

	}
	element.appendChild(dimmed);

	var contents = document.createElement("div");
	contents.setAttribute('id', 'popLayerContents' + GMKTpopLayerIndex);
	contents.className = "frame_setting";
	if (sClickYn == "Y") contents.onclick = GmktPopLayerDelete;
	else contents.onclick = GmktPopLayerNull;
	var iTempTop = (arrPageSize[3] / 2) - (sHeight / 2) + (arrTopLeft[0])
	iTempTop = iTempTop < 0 ? 0 : iTempTop;
	contents.style.top = iTempTop + "px";
	contents.style.left = (arrPageSize[2] / 2) - (sWidth / 2) + (arrTopLeft[1]) + "px";
	contents.style.width = sWidth + "px";

	var cIframe;
	try {cIframe = document.createElement('iframe');
	}catch(e){cIframe = document.createElement('<iframe name="' + 'popLayerIframe' + GMKTpopLayerIndex + '">');}
	cIframe.setAttribute('name', 'popLayerIframe' + GMKTpopLayerIndex);
	cIframe.setAttribute('id', 'popLayerIframe' + GMKTpopLayerIndex);
	cIframe.src = sUrl;
	cIframe.width = sWidth + 'px';
	cIframe.height = sHeight + 'px';
	cIframe.frameBorder = 'no';
	cIframe.scrolling = 'yes';

	contents.appendChild(cIframe);

	element.appendChild(contents);

	for (var i = 0; i < popLayer.childNodes.length; i++) popLayer.childNodes[i].childNodes[0].style.display = "none";
	popLayer.appendChild(element);
	if ( (/Chrome/).test(navigator.userAgent) ) GmktPopLayerResize();
}
function GmktPopLayerAdd(sUrl, sWidth, sHeight, sClickYn) {
	GmktPopLayerInit(GmktPopLayerAddOrigin, sUrl, sWidth, sHeight, sClickYn);
}
function GmktPopScrollLayerAdd(sUrl, sWidth, sHeight, sClickYn) {
	GmktPopLayerInit(GmktPopScrollLayerAddOrigin, sUrl, sWidth, sHeight, sClickYn);
}
function GmktPopLayerDelete() {
	var popLayer = document.getElementById("GmktPopLayer");
	if (popLayer) {
		if (popLayer.lastChild) {
			popLayer.removeChild(popLayer.lastChild);
			GMKTpopLayerIndex--;
			if (GMKTpopLayerIndex == 0)
				popLayer.style.height = "0px";
		}
		if (popLayer.lastChild)
			popLayer.lastChild.childNodes[0].style.display = "";
	}
	if (GMKTpopLayerParentReload == "Y")
		location.reload();
}
function GmktPopLayerDeleteAll() {
	var popLayer = document.getElementById("GmktPopLayer");
	if (popLayer) {
		while (popLayer.lastChild)
			popLayer.removeChild(popLayer.lastChild);
		GMKTpopLayerIndex = 0;
		popLayer.style.height = "0px";
	}
	if (GMKTpopLayerParentReload == "Y")
		location.reload();
}
function GmktPopLayerNull() { }
function GmktPopLayerModify(sUrl, sWidth, sHeight, sClickYn) {
	var IframeLayer = document.getElementById("popLayerIframe" + GMKTpopLayerIndex);
	var contents = document.getElementById("popLayerContents" + GMKTpopLayerIndex);
	if (contents) {
		var dimmed = document.getElementById("popLayerDimmed" + GMKTpopLayerIndex);
		var dIframe = document.getElementById("popLayerDimmedIframe" + GMKTpopLayerIndex);
		if (sClickYn == "Y") {
			dimmed.onclick = GmktPopLayerDelete;
			contents.onclick = GmktPopLayerDelete;
			if (dIframe) dIframe.src = "../Dimmed/GmktDimmedLayerEvent";
		} else {
			dimmed.onclick = GmktPopLayerNull;
			contents.onclick = GmktPopLayerNull;
			if (dIframe) dIframe.src = 'about:blank';
		}
	}
	if (IframeLayer) {
		if (sUrl.length > 0) IframeLayer.src = sUrl;
		if (sWidth.toString().length > 0) IframeLayer.width = sWidth + "px";
		if (sHeight.toString().length > 0) IframeLayer.height = sHeight + "px";
		GmktPopLayerResize("modify");
	}
}
function GmktPopLayerReload() {
	var IframeLayer = document.getElementById("popLayerIframe" + GMKTpopLayerIndex);
	if (IframeLayer) IframeLayer.contentWindow.location.reload();
}
function GmktPopLayerReloadAll() {
	var IframeLayer;
	for (var i = 1; i <= GMKTpopLayerIndex; i++) {
		IframeLayer = document.getElementById("popLayerIframe" + i);
		if (IframeLayer)
			IframeLayer.contentWindow.location.reload();
	}
}
function GmktPopLayerSetInnerIframe(sUrl) {
	var iframe = document.getElementById('GmktPopupLayerInnerIframe');
	if (!iframe) {
		iframe = document.createElement("IFRAME");
		iframe.setAttribute('id', 'GmktPopupLayerInnerIframe');
		iframe.width = '0px';
		iframe.height = '0px';
		document.body.appendChild(iframe);
	}
	iframe.src = sUrl;
}
function GmktPopLayerAddInner(sUrl, sWidth, sHeight, sClickYn) {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=add&c=' + sClickYn + '&h=' + sHeight + '&w=' + sWidth + '&url=' + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopScrollLayerAddInner(sUrl, sWidth, sHeight, sClickYn) {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=addscroll&c=' + sClickYn + '&h=' + sHeight + '&w=' + sWidth + '&url=' + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerDeleteInner() {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=delete';
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerModifyInner(sUrl, sWidth, sHeight, sClickYn) {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=modify&c=' + sClickYn + '&h=' + sHeight + "&w=" + sWidth + "&url=" + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerReplaceParentInner(sUrl) {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];

	var iframeUrl;
	if (iframeDomain.match("english") && iframeDomain.match("pay"))
		iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=replaceparent&url=' + escape(sUrl);
	else
		iframeUrl = "../Dimmed/GmktDimmedLayerGate&url=" + escape(sUrl); //Member 도메인 설정 
	GmktPopLayerSetInnerIframe(iframeUrl);
}

//2014-07-02  [BC:7947] GBank용 레이어
function GmktPopLayerModifyInnerNet(sUrl, sWidth, sHeight, sClickYn) {
	parent.GmktPopLayerModify( sUrl, sWidth, sHeight, sClickYn );
}
//2014-07-02 [BC:7947] GBank용 레이어
function GmktPopLayerAddInnerNet(sUrl, sWidth, sHeight, sClickYn ){
	parent.GmktPopLayerAdd(sUrl, sWidth, sHeight, sClickYn );
}
function GmktPopLayerDeleteInnerNet(){
	parent.GmktPopLayerDelete();
}
function GmktPopLayerReplaceParentInnerNet( sUrl )
{
	parent.location.href =  sUrl;
}
function GmktPopLayerReloadParentInnerNet()
{
	parent.window.location.reload();
}

function GmktPopLayerModifyInner(sUrl, sWidth, sHeight, sClickYn) {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=modify&c=' + sClickYn + '&h=' + sHeight + "&w=" + sWidth + "&url=" + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
//.추가함수
function GmktPopLayerReplaceLangParentInner(sLang) {
	var iframeDomain = "";
	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl;
	iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=lang&lang=' + sLang;
	GmktPopLayerSetInnerIframe(iframeUrl);
}

//function GmktPopLayerReloadParentInner() {
//	var iframeDomain = "";
//	if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
//	var iframeUrl;

//	if (iframeDomain.match("english") && iframeDomain.match("pay"))
//		iframeUrl = iframeDomain +"/challenge/neo_include/GmktPopLayerGate.asp?mode=replaceparent";
//	else
//		iframeUrl = "../Dimmed/GmktDimmedLayerGate?mode=reloadparent";

//	GmktPopLayerSetInnerIframe(iframeUrl);
//}


function GmktPopLayerReloadParentInner() {
    var iframeDomain = "";
    if (document.location.href.split("#").length == 2) iframeDomain = 'http://' + document.location.href.split("#")[1];
    var iframeUrl = iframeDomain + '/challenge/neo_include/GmktPopLayerGate.asp?mode=reloadparent';
    GmktPopLayerSetInnerIframe(iframeUrl);
}



function GmktPopLayerEtcInner( fname, fparam, fscript )
{
	var iframeDomain = "";
	var iframeUrl = "";
	var parentHostName = parent.location.hostname;

	if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];

	//2015-09-01 kjh PA:453245_글로벌 로그인 레이어 리턴 액션 수정
	if (isParentHostNet())
		iframeUrl = '../Dimmed/GmktDimmedLayerGate?mode=etc&fname=' + fname + '&fscript=' + escape(fscript) + '&fparam=' + fparam;			
	else if (isParentHostItem())
		iframeUrl = 'http://' + parentHostName + '/item/challenge/neo_include/GmktPopLayerGate.aspx?mode=etc&fname=' + fname + '&fscript=' + escape(fscript) + '&fparam=' + fparam;
	else
		iframeUrl = iframeDomain + '/challenge/neo_include/GmktPopLayerGate.asp?mode=etc&fname=' + fname + '&fscript=' + escape(fscript) + '&fparam=' + fparam;

	GmktPopLayerSetInnerIframe(iframeUrl);
}

function isParentHostNet(){
	var idxNo= 0;
	var netUrlArray =new Array ("myg","gbank","claim","member2","sslmember2","escrow","sslescrow","diary2","event2","externalapi","sns","cache","cert","signin","signinssl","global","eventnet");	
	var isNet = "N";
	document.domain = "gmarket.co.kr";
	
	try{
		var parentHostName = parent.location.hostname;
		if ( typeof(parentHostName) != "undefined"  && parentHostName !==null && parentHostName !="" && parentHostName.length>0)	{

		
			for (var i = 0; i < netUrlArray.length; i++){
				
				if ( parentHostName.indexOf(netUrlArray[idxNo]) !==-1)
				{
					isNet = "Y";
					break;
				}		
				idxNo++;
			}
		}			
		if ( isNet == "Y")
		{
			return true;
		}	
		return false;
	
	}
	catch(e)
	{
		return false;
	}
}

//2015-09-15 kjh PA:453245_글로벌 로그인 레이어 리턴 액션 수정
function checkNetParentHost( callBackFunction ){
	var idxNo= 0;
	var netUrlArray =new Array ("myg","gbank","claim","member2","sslmember2","escrow","sslescrow","diary2","event2","externalapi","sns","cache","cert","signin","signinssl");	
	var isNet = "N";
	var callBackFunctionName = callBackFunction;
	document.domain = "gmarket.co.kr";
	
	try{
		var parentHostName = parent.location.hostname;
		if ( typeof(parentHostName) != "undefined"  && parentHostName !==null && parentHostName !="" && parentHostName.length>0)	{

		
			for (var i = 0; i < netUrlArray.length; i++){
				
				if ( parentHostName.indexOf(netUrlArray[idxNo]) !==-1)
				{
					isNet = "Y";
					break;
				}		
				idxNo++;
			}
		}			
		if ( isNet == "Y")
		{

			callBackFunctionName = callBackFunctionName+"Net";
		}	
		eval(callBackFunctionName)();
	
	}
	catch(e)
	{
		eval(callBackFunctionName)();
	}
}
//

function isParentHostItem(){
	var idxNo= 0;
	var netUrlArray =new Array ("item2");	
	var isNet = "N";
	document.domain = "gmarket.co.kr";
	
	try{
		var parentHostName = parent.location.hostname;
		if ( typeof(parentHostName) != "undefined"  && parentHostName !==null && parentHostName !="" && parentHostName.length>0)	{

		
			for (var i = 0; i < netUrlArray.length; i++){
				
				if ( parentHostName.indexOf(netUrlArray[idxNo]) !==-1)
				{
					isNet = "Y";
					break;
				}		
				idxNo++;
			}
		}			
		if ( isNet == "Y")
		{
			return true;
		}	
		return false;
	
	}
	catch(e)
	{
		return false;
	}
}

function GmktPopLayerScroll() {
	var popLayer = document.getElementById("GmktPopLayer");
	if (popLayer && GMKTpopLayerIndex > 0) {
		var arrPageSize, element, dimmed, contents;

		arrPageSize = GmktPageSize();
		popLayer.style.height = arrPageSize[1] + "px";
		popLayer.style.width = arrPageSize[0] + "px";

		for (var i = 1; i <= GMKTpopLayerIndex; i++) {
			element = document.getElementById("popLayer" + i);
			if (element) {
				element.style.height = arrPageSize[1] + "px";
				element.style.width = arrPageSize[0] + "px";
			}
			dimmed = document.getElementById("popLayerDimmed" + i);
			if (dimmed) {
				dimmed.style.width = arrPageSize[0] + "px";
				if (navigator.appVersion.indexOf("MSIE") > -1 && arrPageSize[1] > 4096) {
					var dTop = document.body.scrollTop || document.documentElement.scrollTop;
					dimmed.style.height = 4096 + "px";
					if ((dTop + 4096) < arrPageSize[1]) dimmed.style.top = dTop - 1500;
					else dimmed.style.top = (arrPageSize[1] - 4096) + "px";
				} else
					dimmed.style.height = arrPageSize[1] + "px";
			}
		}
	}
}
function GmktPopLayerResize(sMode) {
	var popLayer = document.getElementById("GmktPopLayer");
	if (popLayer && GMKTpopLayerIndex > 0) {
		var arrPageSize, element, dimmed, contents, ciframe;
		arrPageSize = GmktPageSize();
		arrTopLeft = GmktTopLeft();
		popLayer.style.height = arrPageSize[1] + "px";
		popLayer.style.width = arrPageSize[0] + "px";

		for (var i = 1; i <= GMKTpopLayerIndex; i++) {
			element = document.getElementById("popLayer" + i);
			if (element) {
				element.style.height = arrPageSize[1] + "px";
				element.style.width = arrPageSize[0] + "px";
			}
			dimmed = document.getElementById("popLayerDimmed" + i);
			if (dimmed) {
				dimmed.style.width = arrPageSize[0] + "px";
				if (navigator.appVersion.indexOf("MSIE") > -1 && arrPageSize[1] > 4096) {
					var dTop = document.body.scrollTop || document.documentElement.scrollTop;
					dimmed.style.height = 4096 + "px";
					if ((dTop + 4096) < arrPageSize[1]) dimmed.style.top = dTop - 1500;
					else dimmed.style.top = (arrPageSize[1] - 4096) + "px";
				} else
					dimmed.style.height = arrPageSize[1] + "px";
			}
			contents = document.getElementById('popLayerContents' + i);
			ciframe = document.getElementById("popLayerIframe" + i);
			if (contents && ciframe) {
				if (sMode == "modify") {
					var iTempTop = (arrPageSize[3] / 2) - (parseInt(ciframe.height) / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
					iTempTop = iTempTop < 0 ? 0 : iTempTop;
					contents.style.top = iTempTop + "px";
				}
				contents.style.left = (arrPageSize[2] / 2) - (parseInt(ciframe.width) / 2) + (arrTopLeft[1]) + "px";
				contents.style.width = parseInt(ciframe.width) + "px";
			}
		}
	}
}
function GmktAddEvent(o, evtName, fun) {
	var oldFun = o[evtName];
	if (typeof oldFun != "function") {
		o[evtName] = fun;
	} else {
		o[evtName] = function () {
			oldFun.call(this);
			fun();
		}
	}
}
GmktAddEvent(window, 'onresize', GmktPopLayerResize);
GmktAddEvent(window, 'onscroll', GmktPopLayerScroll);
