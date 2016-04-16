/*Geo IP*/
//국가코드 -> 배송가능 여부
function NationDeliveryYN(data) {
	var nations = ["AL", "AE", "AR", "AU", "AT", "BD", "BY", "BE", "BR", "BN", "BG", "KH", "CA", "CL", "CN", "CR", "HR", "CZ", "DK", "DO", "EC", "EG", "SV", "FJ", "FI", "FR", "DE", "GR", "HK", "HU", "IN", "ID", "IE", "IL", "IT", "JP", "KZ", "KE", "LV", "LU", "MO", "MY", "MX", "MN", "MA", "MM", "NL", "NZ", "NG", "NO", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "SA", "SG", "SK", "SI", "ES", "LK", "SE", "CH", "TW", "TH", "TR", "UA", "GB", "US", "UZ", "VN", "KR"];

	if ($.inArray(data, nations) == -1)   //배송 불가 국가
		return false;
	else                                  //배송 가능 국가
		return true;
}

function NationCurrencyMapping() { }
//국가코드, 국가명, 국가통화
NationCurrencyMapping.NationInfo = {
	"Nation": {
		"AL": { "x": "Albania", "y": "USD" },
		"DZ": { "x": "Algeria", "y": "USD" },
		"AE": { "x": "Arab Emirates", "y": "AED" },
		"AR": { "x": "Argentina", "y": "USD" },
		"AU": { "x": "Australia", "y": "AUD" },
		"AT": { "x": "Austria", "y": "EUR" },
		"BH": { "x": "Bahrain", "y": "USD" },
		"BD": { "x": "Bangladesh", "y": "USD" },
		"BY": { "x": "Belarus", "y": "USD" },
		"BE": { "x": "Belgium", "y": "EUR" },
		"BR": { "x": "Brazil", "y": "BRL" },
		"BN": { "x": "Brunei Darussalam", "y": "USD" },
		"BG": { "x": "Bulgaria", "y": "EUR" },
		"BW": { "x": "Botswana", "y": "USD" },
		"KH": { "x": "Cambodia", "y": "USD" },
		"CA": { "x": "Canada", "y": "CAD" },
		"CV": { "x": "Cape Verde", "y": "USD" },
		"CL": { "x": "Chile", "y": "USD" },
		"CN": { "x": "China", "y": "CNY" },
		"CR": { "x": "CostaRica", "y": "USD" },
		"HR": { "x": "Croatia", "y": "EUR" },
		"CY": { "x": "Cyprus", "y": "USD" },
		"CZ": { "x": "Czech Republic", "y": "EUR" },
		"DK": { "x": "Denmark", "y": "EUR" },
		"DJ": { "x": "Djibouti", "y": "USD" },
		"DO": { "x": "Dominican Republic", "y": "USD" },
		"EC": { "x": "Ecuador", "y": "USD" },
		"EG": { "x": "Egypt", "y": "USD" },
		"EE": { "x": "Estonia", "y": "USD" },
		"ET": { "x": "Ethiopia", "y": "USD" },
		"FJ": { "x": "Fiji", "y": "USD" },
		"FI": { "x": "Finland", "y": "EUR" },
		"FR": { "x": "France", "y": "EUR" },
		"DE": { "x": "Germany", "y": "EUR" },
		"GR": { "x": "Greece", "y": "EUR" },
		"HK": { "x": "Hong Kong", "y": "HKD" },
		"HU": { "x": "Hungary", "y": "EUR" },
		"IN": { "x": "India", "y": "USD" },
		"ID": { "x": "Indonesia", "y": "USD" },
		"IR": { "x": "Iran", "y": "USD" },
		"IE": { "x": "Ireland", "y": "EUR" },
		"IL": { "x": "Israel", "y": "USD" },
		"JP": { "x": "Japan", "y": "JPY" },
		"JO": { "x": "Jordan", "y": "USD" },
		"KZ": { "x": "Kazakhstan", "y": "KZT" },
		"KE": { "x": "Kenya", "y": "USD" },
		"LV": { "x": "Latvia", "y": "EUR" },
		"LS": { "x": "Lesotho", "y": "USD" },
		"LU": { "x": "Luxembourg", "y": "EUR" },
		"MO": { "x": "Macau", "y": "MOP" },
		"MK": { "x": "Macedonia", "y": "USD" },
		"MY": { "x": "Malaysia", "y": "MYR" },
		"MU": { "x": "Mauritius", "y": "USD" },
		"MX": { "x": "Mexico", "y": "USD" },
		"MN": { "x": "Mongolia", "y": "MNT" },
		"MA": { "x": "Morocco", "y": "USD" },
		"MZ": { "x": "Mozambique", "y": "USD" },
		"MM": { "x": "Myanma", "y": "EUR" },
		"NL": { "x": "Netherlands", "y": "EUR" },
		"AN": { "x": "NETHERLANDS ANTILLES", "y": "USD" },
		"NZ": { "x": "New Zealand", "y": "NZD" },
		"NG": { "x": "Nigeria", "y": "USD" },
		"NO": { "x": "Norway", "y": "NOK" },
		"OM": { "x": "Oman", "y": "USD" },
		"PA": { "x": "Panama", "y": "USD" },
		"PE": { "x": "Peru", "y": "USD" },
		"PH": { "x": "Philippines", "y": "PHP" },
		"PL": { "x": "Poland", "y": "EUR" },
		"PT": { "x": "Portugal", "y": "EUR" },
		"QA": { "x": "Qatar", "y": "USD" },
		"RO": { "x": "Romania", "y": "EUR" },
		"RU": { "x": "Russian Federation", "y": "RUB" },
		"RW": { "x": "Rwanda", "y": "USD" },
		"SA": { "x": "Saudi Arabia", "y": "SAR" },
		"SG": { "x": "Singapore", "y": "SGD" },
		"SK": { "x": "Slovakia", "y": "EUR" },
		"SI": { "x": "Slovenia", "y": "EUR" },
		"ES": { "x": "Spain", "y": "EUR" },
		"LK": { "x": "Sri Lanka", "y": "USD" },
		"SE": { "x": "Sweden", "y": "EUR" },
		"CH": { "x": "Switzerland", "y": "EUR" },
		"TW": { "x": "Taiwan", "y": "TWD" },
		"TZ": { "x": "Tanzania", "y": "USD" },
		"TH": { "x": "Thailand", "y": "THB" },
		"TN": { "x": "Tunisia", "y": "USD" },
		"TR": { "x": "Turkey", "y": "TRY" },
		"UA": { "x": "Ukraine", "y": "EUR" },
		"GB": { "x": "United Kingdom", "y": "GBP" },
		"US": { "x": "United States", "y": "USD" },
		"UZ": { "x": "Uzbekistan", "y": "USD" },
		"VN": { "x": "Vietnam", "y": "VND" },
		"ZM": { "x": "Zambia", "y": "USD" },
		"KR": { "x": "South Korea", "y": "USD" }
	}
};

//국가코드 -> 국가명
NationCurrencyMapping.GetNationNm = function (data) {

	if (data != 0 && eval("NationCurrencyMapping.NationInfo.Nation." + data) != undefined)
		return eval("NationCurrencyMapping.NationInfo.Nation." + data + ".x");
	else
		return "";
};

//국가코드 -> 국가통화
NationCurrencyMapping.GetNationCur = function (data) {

	if (data != 0 && eval("NationCurrencyMapping.NationInfo.Nation." + data) != undefined)
		return eval("NationCurrencyMapping.NationInfo.Nation." + data + ".y");
	else
		return "";
};

//통화단위, 통화기호, 통화명
NationCurrencyMapping.CurrencyInfo = {
	"Currency": {
		"USD": { "x": "$", "y": "United States Dollar" },
		"JPY": { "x": "￥", "y": "Japanese Yen" },
		"EUR": { "x": "€", "y": "Euro" },
		"AUD": { "x": "A$", "y": "Australian Dollar" },
		"CAD": { "x": "C$", "y": "Canadian Dollar" },
		"HKD": { "x": "H$", "y": "Hong Kong Dollar" },
		"RUB": { "x": "pуб", "y": "Russian Ruble" },
		"SGD": { "x": "S$", "y": "Singapore Dollar" },
		"THB": { "x": "฿", "y": "Thai Baht" },
		"GBP": { "x": "￡", "y": "British Pound" },
		"TWD": { "x": "NT$", "y": "Taiwan New Dollar" },
		"CNY": { "x": "￥", "y": "Chinese Yuan" },
		"MYR": { "x": "RM", "y": "Malaysian Ringgit" },
		"VND": { "x": "₫", "y": "Vietnamese Dong" },
		"PHP": { "x": "₱", "y": "Philippine Peso" },
		"MNT": { "x": "₮", "y": "Mongolian Tugrik" },
		"NZD": { "x": "NZ$", "y": "New Zealand Dollar" },
		"AED": { "x": "Dh", "y": "Arab Emirates Dirham" },
		"MOP": { "x": "MOP$", "y": "Macanese Pataca" },
		"BRL": { "x": "R$", "y": "Brazilian Real" },
		"KZT": { "x": "KZT", "y": "Kazakhstani Tenge" },
		"NOK": { "x": "Nkr", "y": "Norwegian Krone" },
		"SAR": { "x": "SR", "y": "Saudi Riyal" },
		"TRY": { "x": "TL", "y": "Turkish Lira" }
	}
};

//통화단위 -> 통화기호
NationCurrencyMapping.GetCurrencySign = function (data) {
	if (data != "" && eval("NationCurrencyMapping.CurrencyInfo.Currency." + data) != undefined)
		return eval("NationCurrencyMapping.CurrencyInfo.Currency." + data + ".x");
	else
		return "";
};

//통화단위 -> 통화명
NationCurrencyMapping.GetCurrencyNM = function (data) {
	if (data != "" && eval("NationCurrencyMapping.CurrencyInfo.Currency." + data) != undefined)
		return eval("NationCurrencyMapping.CurrencyInfo.Currency." + data + ".y");
	else
		return "";
};

var SELECTED_LANGUAGE;
var SELECTED_CURRENCY;
var SELECTED_CURRENCY_SIGN;
var SELECTED_CURRENCY_NAME;
var SELECTED_NATION;
var SELECTED_NATION_NAME;

function CommonCheckNatinoInfo() { };

CommonCheckNatinoInfo.GetGeoIpInfo = function () {
	var code = document.getElementById("getGeoIP").value;
	return code;
}
//bottom shopping preferences layer
CommonCheckNatinoInfo.Init = function () {
	var nationCode;
	var htmlText = "";
	var htmlCurrency = "";
	var deliveryYn;
	var language;
	var currency;
	var currencySign;
	var currencyNM;
	var nationNM;
	var notDeliveryNation;

	var htmlStr1, htmlStr2, htmlStr3, htmlStr4, htmlStr5;

	SELECTED_LANGUAGE = "enUS";
	SELECTED_CURRENCY = "USD";
	SELECTED_NATION = "US";

	nationCode = CommonCheckNatinoInfo.GetGeoIpInfo();          //Geo IP 모듈에서 국가코드    
	nationNM = NationCurrencyMapping.GetNationNm(nationCode);   //국가코드 -> 해당 국가명
	currency = NationCurrencyMapping.GetNationCur(nationCode);  //국가코드 -> 해당 국가의 통화단위        

	if (currency != "") {
		currencySign = NationCurrencyMapping.GetCurrencySign(currency); //통화단위 -> 통화기호
		currencyNM = NationCurrencyMapping.GetCurrencyNM(currency);     //통화단위 -> 통화명
	}
	else {  //배송불가 국가        
		currencySign = "$";                     //통화단위 -> 통화기호        
		currencyNM = "United States Dollar";    //통화단위 -> 통화명
	}

	if (nationCode == "CN") {
		htmlStr1 = "您可以设置您的购物环境";
		htmlStr2 = "中文简体";
		htmlStr3 = "基本配送国家";
		htmlStr4 = "确认";
		htmlStr5 = "重新设置";
	}
	else {
		htmlStr1 = "Gmarket Global would like to set your Shopping Preferences";
		htmlStr2 = "English";
		htmlStr3 = "Ship to";
		htmlStr4 = "Okay";
		htmlStr5 = "Change My Preferences";
	}

	if (nationCode == null) {       // Case 1 : Geo Ip 정보가 없는 경우 
		language = "English";
	}
	else {                          // Case 2: 한국 
		deliveryYn = NationDeliveryYN(nationCode);
		if (deliveryYn == true) {
			if (nationCode == "KR") {
				language = "English";
			}                       // Case 3: 중국 
			else if (nationCode == "CN") {
				language = "中文简体";
			}
			else {
				language = "English";
			}
		}
		else {                      // Case 4: 예외 케이스 (G마켓 배송불가 국가)                                  
			language = "English";
			nationNM = "";
			currency = "USD";
		}
	}


	if (language != "English") SELECTED_LANGUAGE = "zhCN";
	else SELECTED_LANGUAGE = "enUS";

	htmlText += "<div class='modal_top'>";
	htmlText += "</div>";
	htmlText += "<div class='modal_pop11' id='modal_pop11_layer'>";

	if (nationNM != "") {
		htmlText += "   <div class='modal_pop11_cont1' id='divChangeLayer1'>";
		htmlText += "	    <p class='count_pop'><strong>" + htmlStr1 + " :</strong></p>";
		htmlText += "	    <div class='gu_type1 count_pop'>";
		htmlText += "		    " + htmlStr2 + "  <span class='bar_b'>|</span>";
		htmlText += "		    <span class='p_mark'>" + currencySign + "</span> " + currencyNM + " " + currency + "  <span class='bar_b'>|</span>";
		htmlText += htmlStr3 + " " + nationNM;
		htmlText += "		    <em class='flag sml nb  " + nationCode.toLowerCase() + "'>" + nationNM + "</em>";
		htmlText += "	    </div>";
		htmlText += "   </div>";
		htmlText += "   <div class='count31' id='divChangeLayer2'>";
		htmlText += "	    <a class='abtn l_bl' href='javascript:DispSetContinue();'><em>" + htmlStr4 + "</em></a>";
		htmlText += "	    <a class='abtn l_wh_free' href='javascript:DispSetLayer();'><em>" + htmlStr5 + "</em></a>";
		htmlText += "   </div>";
	}
	else {
		if (nationCode != null && nationCode != "0") {
			notDeliveryNation = nationCode;
		}
		else {
			notDeliveryNation = "";
			nationCode = "KR";
		}

		htmlText += "   <div class='modal_pop11_cont' id='divChangeLayer1'>";
		htmlText += "	    <p class='count_pop' style='color:#aad3ff;'><strong>" + htmlStr1 + " :</strong></p>";
		htmlText += "	    <div class='gu_type1 count_pop'>";
		htmlText += "		    " + htmlStr2 + "  <span class='bar_b'>|</span>";
		htmlText += "		    <span class='p_mark'>" + currencySign + "</span> " + currencyNM + " " + currency + "  <span class='bar_b'>|</span>";
		htmlText += htmlStr3 + " " + notDeliveryNation;
		htmlText += "		    <strong>(Unavailable)</strong>";
		htmlText += "	    </div>";
		htmlText += "		<p class='wh_font'>Please change your shipping country via ‘Change my Preferences'.</p>";
		htmlText += "	</div>";
		htmlText += "	<div class='count31'>";
		htmlText += "		<a class='abtn l_wh_free' href='javascript:DispSetLayer();'><em>" + htmlStr5 + "</em></a>";
		htmlText += "	</div>";
		htmlText += "</div>";
	}

	$("body").append(htmlText);

	SELECTED_CURRENCY = currency;
	SELECTED_NATION = nationCode;
	SELECTED_CURRENCY_SIGN = currencySign;
	SELECTED_CURRENCY_NAME = currencyNM;
	SELECTED_NATION_NAME = nationNM;
};


function DispSetContinue() {
	var htmlText = "";
	var htmlStr1, htmlStr2, htmlStr3;
	var nationNM;

	if (SELECTED_LANGUAGE == "zhCN") {
		htmlStr1 = "您的购物环境已设置完成.";
		htmlStr2 = "中文简体";
		htmlStr3 = "基本配送国家";
	}
	else {
		htmlStr1 = "Your Shopping Preferences have been Saved.";
		htmlStr2 = "English";
		htmlStr3 = "Ship to";
	}

	htmlText += "<div class='modal_pop11_cont2'>";
	htmlText += "	<p class='count_pop'>" + htmlStr1 + "</p>";
	htmlText += "</div>";
	htmlText += "<div class='count41'>";
	htmlText += "	<div class='gu_type1 count_pop'><span class='bar_b'>(</span>";
	htmlText += "		" + htmlStr2 + "  <span class='bar_b'>|</span>";
	htmlText += "		<span class='p_mark'>" + SELECTED_CURRENCY_SIGN + "</span> " + SELECTED_CURRENCY_NAME + "  <span class='bar_b'>|</span>";
	htmlText += "		" + htmlStr3;
	htmlText += "		" + SELECTED_NATION_NAME.toLowerCase();
	htmlText += "		<em class='flag sml nb " + SELECTED_NATION.toLowerCase() + "'>korea</em><span class='bar_b'>)</span>";
	htmlText += "	</div>";
	htmlText += "</div>";

	$("#modal_pop11_layer").empty();
	$("#modal_pop11_layer").html(htmlText);

	setGlobalCookie("charset", SELECTED_LANGUAGE, 90);
	setGlobalCookie("currency", SELECTED_CURRENCY, 90);
	setGlobalCookie("shipnation", SELECTED_NATION, 90);

	setTimeout("DispSetClose()", 3000);
}

function DispSetClose() {
	$(".modal_top").remove();
	parent.window.location.reload();
}

function DispSetLayer() {
	var url;
	if (location.hostname.match("gmarket.co.kr") != null && document.domain != "gmarket.co.kr")
		document.domain = "gmarket.co.kr";

	url = "http://global.gmarket.co.kr/Home/MainSettingPage";

	GmktPopLayerAdd(url, 741, 436, 'N');
}

//var SELECTED_LANGUAGE;
//var SELECTED_CURRENCY;
//var SELECTED_NATION;

function settingChange() {	
	var url = "http://global.gmarket.co.kr/Home/MainSettingPage";
	GmktPopLayerModifyInnerNet(url, 741, 436, 'N');
}

function CheckGlobalGeoIP() {
	var charset_c = getGlobalCookie("charset");
	var currency_c = getGlobalCookie("currency");
	var nation_c = getGlobalCookie("nation");

	var domain;
	domain = location.href;
	domain = domain.split("//");
	domain = domain[1].substr(0, domain[1].indexOf("."));

	if ((typeof (headerKey) != "undefined" && headerKey == "ESCROW") || document.location.href.indexOf("escrow") > -1 || document.location.protocol == "https:") {  //장바구니, 주문서, https 페이지 예외
		return;
	}

	if (currency_c == null || charset_c == null || nation_c == null) {
		if (document.getElementById("getGeoIP") != null) {   // iframe 존재
			document.getElementById("getGeoIP").src = "http://www.gmarket.co.kr/challenge/neo_include/GeoIpGate.asp";
		}
	}
}

//GeoIPGate.asp에서 호출됨!!
function GlobalLinkRedirection() {
	var url
	var curUrl;

	curUrl = location.href;
	curUrl = curUrl.split('//');
	curUrl = curUrl[1].split('.');
	curUrl = curUrl[0];
	curUrl = curUrl.substr(0, 6);

	if (curUrl == "global") {
		url = "http://global.gmarket.co.kr/Home/MainStartPage";
		GmktPopLayerAdd(url, 706, 387, 'N');
	}
	else {
		CommonCheckNatinoInfo.Init();
	}
}
/* End Geo IP*/