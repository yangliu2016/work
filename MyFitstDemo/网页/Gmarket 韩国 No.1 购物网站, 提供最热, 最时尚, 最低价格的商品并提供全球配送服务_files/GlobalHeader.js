if (typeof (headerKey) == "undefined") var headerKey = "";
var locationProtocol = document.location.protocol + "//";
var isConnectionSSL = (locationProtocol == "https://") ? true : false;
var currentCurrency = getGlobalCookie("currency");
var shipNation = getGlobalCookie("shipnation");

var GlobalHeaderUri = {
    "Image": document.location.protocol + "//image.gmkt.kr/_Net/global/",
    //"Script": "http://scriptdev.gmarket.co.kr/",
    "Script": "http://script.gmarket.co.kr/",
    
    "GlobalGmarket": "http://global.gmarket.co.kr/",
    "Category": "http://gcategory.gmarket.co.kr/",
    "Listings": "http://glistings.gmarket.co.kr/",
    "Search": "http://gsearch.gmarket.co.kr/",
    "Promotion": "http://gpromotion.gmarket.co.kr/",
    "MyG": "http://gmyg.gmarket.co.kr/",
    "Gbank": "http://ggbank.gmarket.co.kr/",
    "Diary": "http://gdiary.gmarket.co.kr/",
    "Member": "http://gmember.gmarket.co.kr/",
    "MemberSsl": "https://gmemberssl.gmarket.co.kr/",
    "SignIn": "http://gsignin.gmarket.co.kr/",
    "English": "http://english.gmarket.co.kr/",
    "Escrow": "http://escrow.gmarket.co.kr/",
    "FrontAPI": "http://frontapi.gmarket.co.kr/"
};


/* GlobalHeader common functions */
function GlobalHeader() { };

GlobalHeader.AddScript = function (url, callback) {
	var objScript = document.createElement('script');
	objScript.setAttribute("type", "text/javascript");
	objScript.setAttribute("src", GlobalHeader.ConvertSSLRoot(url));
	document.getElementById("HeaderScriptContainer").appendChild(objScript);

	if (objScript.readyState) { //IE
		objScript.onreadystatechange = function () {
			if (objScript.readyState == "loaded" || objScript.readyState == "complete") {
				objScript.onreadystatechange = null;
				if (typeof (callback) != "undefined") { callback(); }
			}
		};
	} else { //Others
		objScript.onload = function () {
			if (typeof (callback) != "undefined") { callback(); }
		};
	}
};

GlobalHeader.ConvertSSLRoot = function (url) {
	return (url.indexOf("https://") < 0 && isConnectionSSL) ? url.replace(/http:/g, "https:") : url;
};

function setGlobalCookie(cookieName, cookieValue, expireDate) {
	var today = new Date();
	today.setDate(today.getDate() + parseInt(expireDate));
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; domain=gmarket.co.kr ;expires=" + today.toGMTString() + ";";
}

function getGlobalCookie(name) {
	var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) {
		start = dc.indexOf(cname);
		if (start != -1) {
			start += cname.length;
			end = dc.indexOf(";", start);
			if (end == -1) end = dc.length;
			return unescape(dc.substring(start, end));
		}
	}
	return null;
}

function getUserInfoCount(name) {
    if (GlobalHeaderComm.Member.IsLogin == "1") {
    	var userInfo = getGlobalCookie("user%5Finfo");
    	if (userInfo != null) {
    		var arrSplit = userInfo.split("&");
    		for (var i = 0; i < arrSplit.length; i++) {
    			var splitValue = arrSplit[i];
    			if (splitValue.indexOf(name) != -1) {
    				val = splitValue.replace(name + "=", "");
    				return "+" + val;
    			}
    		}
    	}
        return "+0";
    }
    else {
        return "";
    }
}

function CharacterSet_SelectedChanged(charSet) {
	setGlobalCookie("charset", charSet, 90);
	window.location.reload();
}

function CurrencySet_SelectedChanged(currency) {
	setGlobalCookie("currency", currency, 90);
	window.location.reload();
}

function globalCharsetSelected(charset) {

	//기획전 예외
	if (location.pathname == "/Plan/PlanView") {

		if (charset == "enUS") {
			if (getGlobalCookie("charset") == "zhCN") {
				setGlobalCookie("charset", charset, 90);
				location.href = GlobalHeaderUri.GlobalGmarket;
			}
			else {
				CharacterSet_SelectedChanged(charset);
			}

		}
		else if (charset == "zhCN") {
			if (getGlobalCookie("charset") == "enUS") {
				setGlobalCookie("charset", charset, 90);
				location.href = GlobalHeaderUri.GlobalGmarket;
			}
			else {
				CharacterSet_SelectedChanged(charset);
			}
		}
	}
	else if (headerKey == "ESCROW") {
		setGlobalCookie("charset", charset, 90);
		var pathname = (charset == "zhCN") ? location.pathname.replace("/en/", "/cn/") : location.pathname.replace("/cn/", "/en/");
		var params = document.location.search;
		location.href = locationProtocol + location.host + pathname + params;
	}
	else if (headerKey == "ENGLISH") {
		setGlobalCookie("charset", charset, 90);
		var url ="";
		if (charset == "zhCN" && (location.pathname.toLowerCase().indexOf("/lounge/") > -1 || location.pathname == "/challenge/neo_help/international_shipping_info.asp"))
			url = GlobalHeaderUri.GlobalGmarket;
		else
			url = (charset == "zhCN") ? document.location.href.replace(GlobalHeaderUri.English, GlobalHeaderUri.English + "china/") : document.location.href.replace(GlobalHeaderUri.English + "china/", GlobalHeaderUri.English);
		
		location.href = url;
	}
	else {	//일반 링크
		CharacterSet_SelectedChanged(charset);
	}
}

/*Global GNB Functions*/
var CURR_SELECT_CURRENCY; // CurrselectCurrency;
var EXCHANGE_RATE; // ExchageRate;
function initSelectCurrency() {
	switch (currentCurrency) {
		case "USD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_USD[0]['ExchRate']);
			EXCHANGE_RATE = "$";
			break;
		case "MNT":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_MNT[0]['ExchRate']);
			EXCHANGE_RATE = "₮";
			break;
		case "CNY":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_CNY[0]['ExchRate']);
			EXCHANGE_RATE = "￥";
			break;
		case "NZD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_NZD[0]['ExchRate']);
			EXCHANGE_RATE = "NZ$";
			break;
		case "AED":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_AED[0]['ExchRate']);
			EXCHANGE_RATE = "Dh";
			break;
		case "NOK":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_NOK[0]['ExchRate']);
			EXCHANGE_RATE = "Nkr";
			break;
		case "AUD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_AUD[0]['ExchRate']);
			EXCHANGE_RATE = "A$";
			break;
		case "PHP":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_PHP[0]['ExchRate']);
			EXCHANGE_RATE = "₱";
			break;
		case "BRL":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_BRL[0]['ExchRate']);
			EXCHANGE_RATE = "R$";
			break;
		case "RUB":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_RUB[0]['ExchRate']);
			EXCHANGE_RATE = "руб";
			break;
		case "CAD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_CAD[0]['ExchRate']);
			EXCHANGE_RATE = "C$";
			break;
		case "SAR":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_SAR[0]['ExchRate']);
			EXCHANGE_RATE = "SR";
			break;
		case "EUR":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_EUR[0]['ExchRate']);
			EXCHANGE_RATE = "€";
			break;
		case "SGD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_SGD[0]['ExchRate']);
			EXCHANGE_RATE = "S$";
			break;
		case "HKD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_HKD[0]['ExchRate']);
			EXCHANGE_RATE = "H$";
			break;
		case "TWD":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_TWD[0]['ExchRate']);
			EXCHANGE_RATE = "NT$";
			break;
		case "JPY":
			CURR_SELECT_CURRENCY = (100 * (1 / arrEXCHAGERATE_JPY[0]['ExchRate']));
			EXCHANGE_RATE = "￥";
			break;
		case "THB":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_THB[0]['ExchRate']);
			EXCHANGE_RATE = "฿";
			break;
		case "KZT":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_KZT[0]['ExchRate']);
			EXCHANGE_RATE = "KZT";
			break;
		case "TRY":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_TRY[0]['ExchRate']);
			EXCHANGE_RATE = "TL";
			break;
		case "MOP":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_MOP[0]['ExchRate']);
			EXCHANGE_RATE = "MOP$";
			break;
		case "GBP":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_GBP[0]['ExchRate']);
			EXCHANGE_RATE = "￡";
			break;
		case "MYR":
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_MYR[0]['ExchRate']);
			EXCHANGE_RATE = "RM";
			break;
		case "VND":
			CURR_SELECT_CURRENCY = (100 * (1 / arrEXCHAGERATE_VND[0]['ExchRate']));
			EXCHANGE_RATE = "₫";
			break;
		default:
			CURR_SELECT_CURRENCY = (1 / arrEXCHAGERATE_USD[0]['ExchRate']);
			EXCHANGE_RATE = "$";
			break;
	}

	var dispCurrency = getGlobalCookie("currency");
	var dispCurrencyRate = (CURR_SELECT_CURRENCY * 1000);

	$("#dispCurrency").text("KRW 1,000 = " + dispCurrency + " " + flooring(dispCurrencyRate, 4) + "...");
}


function flooring(n, pos) {
	var digits = Math.pow(10, pos);
	var num = Math.floor(n * digits) / digits;
	return num.toFixed(pos);
}


/* GlobalHeaderGNB */
function GlobalHeaderGNB() { };
GlobalHeaderGNB.Init = function () {
	GlobalHeaderGNB.SkipNavi();
	GlobalHeaderGNB.Display();	
};

GlobalHeaderGNB.SkipNavi = function () {
	var sb = "";
	sb += "<ul id='skipnavi'>";
	sb += " <li><a href='#container'>본문 바로가기</a></li>";
	sb += " <li><a href='#gnb'>카테고리 바로가기</a></li>";
	sb += " <li><a href='#footer'>하단내용 바로가기</a></li>";
	sb += "</ul>";
	$('body').prepend(sb);
};

GlobalHeaderGNB.Display = function() {

    var sb = "";
    sb += "<div id='utill'>";
    sb += "<meta charset='utf-8'>";
    sb += "	<div class='wrap'>";

    sb += "	<ul class='adv_utill'>";
    if (GlobalHeaderComm.Member.IsLogin == "0") {
        sb += "	<li class='signin'>" + GlobalHFText["COMMON_HF_TEXT_138"] + " <a href='" + GlobalHeaderUri.SignIn + "LogIn/LogIn'>" + GlobalHFText["COMMON_HF_TEXT_8"] + "</a> " + GlobalHFText["COMMON_HF_TEXT_139"] + " <a href='" + GlobalHeaderUri.Member + "Registration/MemberRegistration'>" + GlobalHFText["COMMON_HF_TEXT_7"] + "</a></li>";
    }
    else {
        sb += "	<li class='signout'>" + GlobalHFText["COMMON_HF_TEXT_143"] + " <em>" + GlobalHeaderComm.Member.Name + "</em><a href='" + GlobalHeaderUri.SignIn + "LogOut/LogOutProc'>" + GlobalHFText["COMMON_HF_TEXT_9"] + "</a><!-- <span class='ic_grade " + GlobalHeaderComm.Member.Grade.toLowerCase() + "'>" + GlobalHeaderComm.Member.Grade + "</span>--></li>";
    }
    if (getGlobalCookie("charset") == "zhCN")
        sb += "	<li><a href=\"javascript:globalCharsetSelected('enUS');\">" + GlobalHFText["COMMON_HF_TEXT_141"] + "</a></li><!--English-->";
    else
        sb += "	<li><a href=\"javascript:globalCharsetSelected('zhCN');\">" + GlobalHFText["COMMON_HF_TEXT_140"] + "</a></li><!--Chinese-->";
    sb += "		<li><a href=\"javascript:GlobalHeaderGNB.viewUrl('http://www.gmarket.co.kr/', this);\">" + GlobalHFText["COMMON_HF_TEXT_142"] + "</a></li><!--Korean-->";
    sb += "	</ul>";


    sb += "	<ul class='utill'>";
    /*if (GlobalHeaderComm.Member.IsLogin != "0") {
        sb += " <li class='sign'><a href='" + GlobalHeaderUri.SignIn + "LogOut/LogOutProc'>" + GlobalHFText["COMMON_HF_TEXT_9"] + "</a></li>";
    }*/
    sb += "		<li class='help'><a href='" + GlobalHeaderUri.Member + "customerCenter/main'>" + GlobalHFText["COMMON_HF_TEXT_12"] + "</a></li><!--Help-->";
    sb += "		<li class='livechat'><a href='javascript:GlobalHeaderGNB.goLiveChat();'>" + GlobalHFText["COMMON_HEADER_TEXT_13"] + "<span class='icon'></span></a></li><!--Live Chat-->";
    /*sb += "		<li class='myg'><a href='" + GlobalHeaderUri.MyG + "'>" + GlobalHFText["COMMON_HF_TEXT_10"] + "</a><span class='arrow'></span><!--My Gmarket-->";
    sb += "			<ul class='layer'>";
    sb += "				<li><a href='" + GlobalHeaderUri.MyG + "ContractList/GlobalContractList'>" + GlobalHFText["COMMON_HF_TEXT_25"] + "</a></li><!--Shopping list -->";
    sb += "				<li><a href='" + GlobalHeaderUri.Gbank + "'>" + GlobalHFText["COMMON_HF_TEXT_27"] + "</a></li><!--Gaccount-->";
    sb += "				<li><a href='" + GlobalHeaderUri.Diary + "Favorite/MyFavoriteItems'>" + GlobalHFText["COMMON_HF_TEXT_130"] + "</a></li><!--My Interests -->";
    sb += "				<li><a href='" + GlobalHeaderUri.Diary + "MYBBS/MyInqueryList'>" + GlobalHFText["COMMON_HF_TEXT_131"] + "</a></li><!--My Inquiries-->";
    sb += "				<li><a href='" + GlobalHeaderUri.MemberSsl + "MyInfo/MemberInfo'>" + GlobalHFText["COMMON_HF_TEXT_132"] + "</a></li><!--Personal Info. -->";
    sb += "			</ul>";
    sb += "		</li>";*/
    sb += "     <li class='myg'><a href='" + GlobalHeaderUri.MyG + "'>" + GlobalHFText["COMMON_HF_TEXT_10"] + "</a></li><!--My Gmarket-->";
    sb += "		<li class='currency' id='daigram_data'></li>";
    sb += "	</ul>";

    sb += "	</div>";
    sb += "</div>";

    sb += "<div style='display: none;'><iframe id='getGeoIP' src='about:blank' frameBorder='0' width='0' height='0' ></iframe></div>";
    if (getGlobalCookie("charset") == "zhCN")
        sb += "<input id='hdCharSet' type='hidden' value='zhCN'/>";
    else
        sb += "<input id='hdCharSet' type='hidden' value=''/>";

    $("#HeaderScriptContainer").after(sb);
}

GlobalHeaderGNB.SetGlobalGNBInfo = function() {

	var curDomain = location.href;
	var url, ip;
	var charset = getGlobalCookie("charset");
	var currency = getGlobalCookie("currency");
	var nation = getGlobalCookie("shipnation");

	if (charset == null) charset = "enUS";
	if (currency == null) currency = "USD";
	if (nation == null) nation = "KR";

	var charsetStr, currencyStr, nationStr;
	var htmlText = "";
	var shipTitle;

	if (charset == "zhCN") {
		charsetStr = "中文简体";
		shipTitle = "基本配送国家 ";
	}
	else {
		charsetStr = "English";
		shipTitle = "Ship to ";
	}

	currencyStr = NationCurrencyMapping.GetCurrencySign(currency);
	nationStr = NationCurrencyMapping.GetNationNm(nation);

	if (curDomain.match("https")) {
		/*htmlText += shipTitle;
		htmlText += nationStr;
		htmlText += "<em class='flag sml nb " + nation.toLowerCase() + "'>" + nationStr + "</em>";
		htmlText += "<span class='p_mark'>" + currencyStr + "</span> " + currency + "<span class='arrow'></span>";*/

		htmlText += "<span class=\"icon\"></span>";
		htmlText += shipTitle;
		htmlText += "<span>" + nationStr + "";
		htmlText += "<em class='flag " + nation.toLowerCase() + "'>" + nationStr + "</em></span>";

		htmlText += "<span class='usdB'><span class='p_mark'>" + currencyStr + "</span> " + currency + "<span class='arrow'></span></span>";
				
	}
	else {
	    htmlText += "<span class=\"icon\"></span>";
		htmlText += shipTitle;
		htmlText += "<a href='javascript:DispSetLayer();'>" + nationStr + "";
		htmlText += "<em class='flag " + nation.toLowerCase() + "'>" + nationStr + "</em></a>";
		
		htmlText += "<a href='javascript:DispSetLayer();' class='usdB'><span class='p_mark'>" + currencyStr + "</span> " + currency + "<span class='arrow'></span></a>";
	}

	$("#daigram_data").append(htmlText);
	
}

GlobalHeaderGNB.viewUrl = function (linkUrl, linkObject) {
	var mobileCookie = getGlobalCookie("app_info");
	if (mobileCookie != null && typeof mobileCookie !== "undefined" && mobileCookie.toLowerCase().indexOf("ipad") >= 0) {
		document.location.href = linkUrl;
	}
	else {
		window.open(linkUrl, "_blank");
	}
}

GlobalHeaderGNB.goLiveChat = function () {
	var charset = getGlobalCookie("charset");
	if (charset == null) charset = "enUS";
	if (charset == "enUS") {
		window.open("https://chatc.gmarket.co.kr/guide/G-B-003", "liveChatPop", "width=488,height=640,title=no,menubar=no,location=no,toolbars=no,scroll=no,status=no,scrollbars=no,resizable=no");
	}
	else {
		window.open("https://chatc.gmarket.co.kr/guide/G-B-004", "liveChatPop", "width=488,height=640,title=no,menubar=no,location=no,toolbars=no,scroll=no,status=no,scrollbars=no,resizable=no");
	}

}
/*End GlobalHeaderGNB*/

/* GlobalHeaderTop */
var ALL_CATE_CK = 0;
function GlobalHeaderTop() { };
GlobalHeaderTop.Init = function () {
	GlobalHeaderTop.Layout();
};

GlobalHeaderTop.CategoryOpen = function () {
	if (ALL_CATE_CK == 0) {
		ALL_CATE_CK = 1;
		GlobalHeader.AddScript(GlobalHeaderUri.Script + "_Net/js/global/header/GlobalHeaderTopCategory.js");
	}
};

GlobalHeaderTop.CategoryClose = function () {
	$("#all_category a.all").removeClass("active");
	$("#category").slideUp("500");
};

GlobalHeaderTop.Layout = function() {

    var sb = "";
    sb += "<div id='header'>";
    sb += " <div class='wrap'>";
    //sb += "	<h1><a href='" + GlobalHeaderUri.GlobalGmarket + "Home/Main'><img src='" + GlobalHeaderUri.Image + "/gl_common/logo.gif' alt='Gmarket'></a></h1>";
    sb += "     <h1><a href='" + GlobalHeaderUri.GlobalGmarket + "Home/Main' class='logo'>Gmarket</a></h1>";
    sb += "		<div id='search'>";
    sb += "			<form id='HeaderSearchForm' name='HeaderSearchForm' onSubmit='GlobalHeaderTop.Search();return false;'>";
    sb += "			<fieldset>";
    sb += "				<legend>Search Area</legend>";
    sb += "				<span id='search_cate'>";
    sb += "					<a href='#' class='search_cate'>";
    sb += "						<span id='search_cate_word'>" + GlobalHFText['COMMON_HF_TEXT_18'] + "</span>";
    sb += "						<span class='arrow'></span>";
    sb += "					</a>";
    sb += "					<div id='search_dropdown'>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('');\">" + GlobalHFText['COMMON_HF_TEXT_18'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000003');\">" + GlobalHFText['COMMON_HF_TEXT_85'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000046');\">" + GlobalHFText['COMMON_HF_TEXT_86'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000070');\">" + GlobalHFText['COMMON_HF_TEXT_88'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000035');\">" + GlobalHFText['COMMON_HF_TEXT_97'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000103');\">" + GlobalHFText['COMMON_HF_TEXT_163'] + "</a>"; 
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000104');\">" + GlobalHFText['COMMON_HF_TEXT_164'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000105');\">" + GlobalHFText['COMMON_HF_TEXT_165'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000108');\">" + GlobalHFText['COMMON_HF_TEXT_168'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000106');\">" + GlobalHFText['COMMON_HF_TEXT_166'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000107');\">" + GlobalHFText['COMMON_HF_TEXT_167'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000096');\">" + GlobalHFText['COMMON_HF_TEXT_136'] + "</a>"; 
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000099');\">" + GlobalHFText['COMMON_HF_TEXT_169'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000043');\">" + GlobalHFText['COMMON_HF_TEXT_170'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000049');\">" + GlobalHFText['COMMON_HF_TEXT_91'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000064');\">" + GlobalHFText['COMMON_HF_TEXT_92'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000095');\">" + GlobalHFText['COMMON_HF_TEXT_133'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000027');\">" + GlobalHFText['COMMON_HF_TEXT_93'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000096');\">" + GlobalHFText['COMMON_HF_TEXT_136'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000110');\">" + GlobalHFText['COMMON_HF_TEXT_176'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000005');\">" + GlobalHFText['COMMON_HF_TEXT_89'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000071');\">" + GlobalHFText['COMMON_HF_TEXT_90'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000057');\">" + GlobalHFText['COMMON_HF_TEXT_94'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000006');\">" + GlobalHFText['COMMON_HF_TEXT_96'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000042');\">" + GlobalHFText['COMMON_HF_TEXT_98'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000035');\">" + GlobalHFText['COMMON_HF_TEXT_97'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000095');\">" + GlobalHFText['COMMON_HF_TEXT_133'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000020');\">" + GlobalHFText['COMMON_HF_TEXT_99'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000036');\">" + GlobalHFText['COMMON_HF_TEXT_100'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000068');\">" + GlobalHFText['COMMON_HF_TEXT_101'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000094');\">" + GlobalHFText['COMMON_HF_TEXT_134'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000074');\">" + GlobalHFText['COMMON_HF_TEXT_106'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000073');\">" + GlobalHFText['COMMON_HF_TEXT_95'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000071');\">" + GlobalHFText['COMMON_HF_TEXT_90'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000031');\">" + GlobalHFText['COMMON_HF_TEXT_102'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000039');\">" + GlobalHFText['COMMON_HF_TEXT_103'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000093');\">" + GlobalHFText['COMMON_HF_TEXT_135'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000014');\">" + GlobalHFText['COMMON_HF_TEXT_104'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000085');\">" + GlobalHFText['COMMON_HF_TEXT_105'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000041');\">" + GlobalHFText['COMMON_HF_TEXT_128'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000043');\">" + GlobalHFText['COMMON_HF_TEXT_112'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000037');\">" + GlobalHFText['COMMON_HF_TEXT_111'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000098');\">" + GlobalHFText['COMMON_HF_TEXT_145'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000058');\">" + GlobalHFText['COMMON_HF_TEXT_109'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000097');\">" + GlobalHFText['COMMON_HF_TEXT_144'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000017');\">" + GlobalHFText['COMMON_HF_TEXT_110'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000099');\">" + GlobalHFText['COMMON_HF_TEXT_149'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000083');\">" + GlobalHFText['COMMON_HF_TEXT_108'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000068');\">" + GlobalHFText['COMMON_HF_TEXT_101'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000037');\">" + GlobalHFText['COMMON_HF_TEXT_111'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000002');\">" + GlobalHFText['COMMON_HF_TEXT_115'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000082');\">" + GlobalHFText['COMMON_HF_TEXT_117'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000055');\">" + GlobalHFText['COMMON_HF_TEXT_116'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000075');\">" + GlobalHFText['COMMON_HF_TEXT_118'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000056');\">" + GlobalHFText['COMMON_HF_TEXT_119'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000033');\">" + GlobalHFText['COMMON_HF_TEXT_120'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000072');\">" + GlobalHFText['COMMON_HF_TEXT_121'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000102');\">" + GlobalHFText['COMMON_HF_TEXT_152'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000032');\">" + GlobalHFText['COMMON_HF_TEXT_122'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000008');\">" + GlobalHFText['COMMON_HF_TEXT_123'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000077');\">" + GlobalHFText['COMMON_HF_TEXT_124'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000092');\">" + GlobalHFText['COMMON_HF_TEXT_146'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000102');\">" + GlobalHFText['COMMON_HF_TEXT_175'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000083');\">" + GlobalHFText['COMMON_HF_TEXT_108'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000045');\">" + GlobalHFText['COMMON_HF_TEXT_126'] + "</a>";
    sb += "                     <a href=\"javascript:GlobalHeaderTop.SetGdlc('100000091');\">" + GlobalHFText['COMMON_HF_TEXT_137'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000038');\">" + GlobalHFText['COMMON_HF_TEXT_127'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000084');\">" + GlobalHFText['COMMON_HF_TEXT_129'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000028');\">" + GlobalHFText['COMMON_HF_TEXT_125'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000030');\">" + GlobalHFText['COMMON_HF_TEXT_113'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000079');\">" + GlobalHFText['COMMON_HF_TEXT_114'] + "</a>";
    sb += "						<a href=\"javascript:GlobalHeaderTop.SetGdlc('100000076');\">" + GlobalHFText['COMMON_HF_TEXT_107'] + "</a>";
    sb += "					</div>";
    sb += "				</span>";
    sb += "				<div id='searchfield_outer'>";
    sb += "					<div id='searchfield_in'>";
    sb += "						<label for='searchfield' class='blind'>" + GlobalHFText['COMMON_HF_TEXT_19'] + "</label>";
    if (isConnectionSSL)
        sb += "						<input id='searchfield' name='searchfield' value='' title='" + GlobalHFText['COMMON_HF_TEXT_19'] + "' onkeydown='GlobalHeaderTop.SearchKeyDown();'>";
    else
        sb += "						<input autocomplete='off' id='searchfield' value='' title='" + GlobalHFText['COMMON_HF_TEXT_19'] + "' onfocus='return gmkt_ac(0,event);' onkeydown='this.focus();return gmkt_ac(1,event);' onmousedown='this.focus();return gmkt_ac(1,event);'>    ";

    sb += "						<input id='hdKeyword' name='hdKeyword' type='hidden' value='' />";
    sb += "						<input id='hdGdlc' name='hdGdlc' type='hidden' value='' />";
    sb += "					</div>";
    sb += "					<div class='search-auto' id='autoSearch' style='display:none'>";
    sb += "						<div>";
    sb += "							<ul id='autoFillData'>";
    sb += "							</ul>";
    sb += "						</div>";
    sb += "					</div>";
    sb += "				</div>";
    sb += "				<button type='submit' class='button_search' title='Search' onclick='javascript:GlobalHeaderTop.Search();'>" + GlobalHFText['COMMON_HF_TEXT_19'] + "</button>";
    sb += "			</fieldset>";
    sb += "			</form>";
    sb += "	</div>";

    sb += "	<ul class='popular'>";
    if (getGlobalCookie("charset") == "zhCN") {
        if (GlobalHeaderComm.Member.IsLogin == "0") {
            sb += " <li class='shopping'><a href='" + GlobalHeaderUri.Escrow + "cn/cart'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_153'] + "</a></li>";
        }
        else {
            sb += " <li class='shopping'><a href='" + GlobalHeaderUri.Escrow + "cn/cart'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_153'] + "</a></li>";
        }
    }
    else {
        if (GlobalHeaderComm.Member.IsLogin == "0") {
            sb += " <li class='shopping'><a href='" + GlobalHeaderUri.Escrow + "en/cart'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_153'] + "</a></li>";
        }
        else {
            sb += " <li class='shopping'><a href='" + GlobalHeaderUri.Escrow + "en/cart'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_153'] + "</a></li>";
        }
    }
    if (GlobalHeaderComm.Member.IsLogin == "0") {
        sb += "     <li class='wish'><a href='" + GlobalHeaderUri.Diary + "Favorite/MyFavoriteItems'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_154'] + "</a></li>";
    }
    else {
        sb += "     <li class='wish'><a href='" + GlobalHeaderUri.Diary + "Favorite/MyFavoriteItems'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_154'] + "</a></li>";
    }
    //sb += "     <li class='purchased'><a href='" + GlobalHeaderUri.Diary + "Favorite/MyPurchaseShop'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_22'] + "<span class='count'>" + getUserInfoCount("BuyShopCnt") + "</span></a></li>";
    //sb += "     <li class='favorite'><a href='" + GlobalHeaderUri.Diary + "Favorite/MyFavoriteShop'><span class='icon'></span>" + GlobalHFText['COMMON_HF_TEXT_23'] + "<span class='count'>" + getUserInfoCount("InterestShopCnt") + "</span></a></li>";

    if (getGlobalCookie("charset") == "zhCN") {
        sb += "<li class='lucky'><a href='http://english.gmarket.co.kr/china/promotion/pluszone.asp'><span>" + GlobalHFText['COMMON_HF_TEXT_155'] + "</span></a></li>";
    }
    else {
        sb += "<li class='lucky'><a href='http://english.gmarket.co.kr/promotion/pluszone.asp'><span>" + GlobalHFText['COMMON_HF_TEXT_155'] + "</span></a></li>";
    }

    if (getGlobalCookie("charset") == "zhCN") {
        sb += "<li class='coupon'><a href='http://english.gmarket.co.kr/china/promotion/CouponZone.asp'><span>" + GlobalHFText['COMMON_HF_TEXT_156'] + "</span></a></li>";
    }
    else {
        sb += "<li class='coupon'><a href='http://english.gmarket.co.kr/promotion/CouponZone.asp'><span>" + GlobalHFText['COMMON_HF_TEXT_156'] + "</span></a></li>";
    }


    sb += "	</ul>";
    sb += " <div id='all_category'><a href='#category' class='all' onclick='GlobalHeaderTop.CategoryOpen()'>" + GlobalHFText['COMMON_HF_TEXT_17'] + "<span class='arrow'></span></a>";
    sb += "		<div id='category_layer'></div>";
    sb += " </div>";
    sb += "</div>";

    $("#utill").after(sb);
};

GlobalHeaderTop.SetGdlc = function(gdlc) {
	$("#hdGdlc").val(gdlc);
}

GlobalHeaderTop.SetKeyword = function(str) {
	$("#hdKeyword").val(str);
	GlobalHeaderTop.GoSearch();
}

GlobalHeaderTop.Search = function () {
    var tempKeyword = $("#searchfield").val();
    if (tempKeyword == "") {
        alert("Please enter the keyword.");
        $("#searchfield").focus();
        return;
    }
    GlobalHeaderTop.SetKeyword(tempKeyword);
}

GlobalHeaderTop.GoSearch = function() {

    var tempKeyword = $("#hdKeyword").val();
	var tempGdlc = $("#hdGdlc").val();
	var tempLocation;
	tempLocation = GlobalHeaderUri.Search + "Listview/Search";
	tempLocation += "?keyword=" + encodeURIComponent(tempKeyword);
	if ($("#hdGdlc").val() != "") {
		tempLocation += "&GdlcCd=" + tempGdlc;
	}
	window.location.href = tempLocation;
}


GlobalHeaderTop.SearchKeyDown = function() {
	if (event.keyCode == 13)
		GlobalHeaderTop.Search();
}
/* End GlobalHeaderTop */
function GlobalGeoIPInit() {
	GlobalHeaderGNB.SetGlobalGNBInfo();
	CheckGlobalGeoIP();
}
function GlobalAutoCompleteInit() {
	GmktACinit();
}
$(document).ready(function () {
	if (location.hostname.match("gmarket.co.kr") != null && document.domain != "gmarket.co.kr") document.domain = "gmarket.co.kr";
	GlobalHeader.AddScript(GlobalHeaderUri.Script + "_Net/js/global/header/GlobalGeoIP.js", GlobalGeoIPInit);
	if (!isConnectionSSL) GlobalHeader.AddScript(GlobalHeaderUri.Script + "_Net/js/global/header/GlobalAutoComplete.js", GlobalAutoCompleteInit);
});
$(window).load(function () {

});
(function () { 
	GlobalHeaderGNB.Init();
	GlobalHeaderTop.Init();
	initSelectCurrency(); //환율 정보 가져옴.
}());

//2015.05.07 add nis733
function escapeHtmlRemove(unsafe) {
    return unsafe
         .replace(/&/g, " ")
         .replace(/</g, " ")
         .replace(/>/g, " ")
         .replace(/"/g, " ")
         .replace(/'/g, " ");
}
 