////init var

var WingGoodsDomain = "http://item.gmarket.co.kr/";
var wingEngGoodsUrl = "http://item2.gmarket.co.kr/English/detailview/item.aspx?goodscode=";
var WWWDomain = "http://www.gmarket.co.kr/";
var floatingImgflag = false;
//IndexWing.js

function animatedImgStatChange(stat) {
    var link_Obj = $("#animatedImgStat");
    var img_Obj = $("#animatedImg");
    if (stat == "stop") {
        if (document.readyState == "complete") {
            stopGoodsImg();
            link_Obj.attr("href", "javascript:animatedImgStatChange('move');");
            img_Obj.text("Play Pics");

        }
        return;
    }
    else if (stat == "move") {
        if (document.readyState == "complete") {
            moveGoodsImg();
            link_Obj.attr("href", "javascript:animatedImgStatChange('stop');");
            img_Obj.text("Stop Flash");
        }
        return;
    }
}

function moveGoodsImg() {
    try {
        var tmpstr;
        allchk = document.getElementsByTagName("IMG");
        for (i = 0; i < allchk.length; i++) {
            if (allchk[i].src.indexOf("gmarket.co.kr/goods_image2/large") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/small") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/middle") > 0) {
                tmpstr = allchk[i].src;
                tmpstr = tmpstr.replace('large_jpgimg', 'large_img');
                tmpstr = tmpstr.replace('middle_jpgimg', 'middle_img');
                tmpstr = tmpstr.replace('small_jpgimg', 'small_img');
                allchk[i].src = tmpstr;
            }
        }
    } catch (e) {
        window.status = "현재 브라우저에서 해당 기능을 지원하지 않습니다.";
    }
}
function stopGoodsImg() {
    try {
        var tmpstr;
        allchk = document.getElementsByTagName("IMG");
        for (i = 0; i < allchk.length; i++) {
            if (allchk[i].src.indexOf("gmarket.co.kr/goods_image2/large") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/small") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/middle") > 0) {
                tmpstr = allchk[i].src;
                tmpstr = tmpstr.replace('large_img', 'large_jpgimg');
                tmpstr = tmpstr.replace('middle_img', 'middle_jpgimg');
                tmpstr = tmpstr.replace('small_img', 'small_jpgimg');
                allchk[i].src = tmpstr;
            }
        }
    } catch (e) {
        window.status = "현재 브라우저에서 해당 기능을 지원하지 않습니다.";
    }
}
function animatedImgStatChgMain(stat) {
    if (typeof moveBestTimer != "undefined")
        clearTimeout(moveBestTimer);
    if (stat == "stop") {
        var img_Obj = document.getElementById("animatedImgStat");
        if (document.readyState == "complete") {
            setCookieForWing("ImgStop", "Y", 1);
            stopGoodsImg();
            img_Obj.href = "javascript:animatedImgStatChgMain('move')";
            //document.getElementById("animatedImgTxt").src = "http://image.gmarket.co.kr/main/2012/04/09/btn_animation.gif";
        }
        return;
    }
    else if (stat == "move") {
        var img_Obj = document.getElementById("animatedImgStat");
        if (document.readyState == "complete") {
            setCookieForWing("ImgStop", "N", 1);
            moveGoodsImg();
            img_Obj.href = "javascript:animatedImgStatChgMain('stop')";
            //document.getElementById("animatedImgTxt").src = "http://image.gmarket.co.kr/main/2012/04/09/btn_animation_stop.gif";
        }
        return;
    }
}
function animatedImgStatChgStop() {
    if (getCookieForWing("ImgStop") == "Y") {
        setTimeout("animatedImgStatChgMain('stop')", 500);
    }
}
function WindScroll() {
    if (startFloatFlag == true) {
        var start_num = Math.floor(Math.random() * (total_cnt2));
        start_floate(start_num);
    }
}

function setLayerDisplayWing(layerId, attribute) {
    if (document.getElementById(layerId)) {
        document.getElementById(layerId).style.display = attribute;
    }
}
function setLayerDisplay(layerId, attribute) {
    if (document.getElementById(layerId)) {
        document.getElementById(layerId).style.display = attribute;
    }
}

function setBrowserCookie(name, value) {
    document.cookie = name + "=" + escape(value) + "; domain=gmarket.co.kr; path=/;";
}
function getMsgCookie(name) {
    var Found = false;
    var start, end;
    var i = 0;

    while (i <= document.cookie.length) {
        start = i;
        end = start + name.length;

        if (document.cookie.substring(start, end) == name) {
            Found = true;
            break;
        }

        i++
    }
    if (Found == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if (end < start)
            end = document.cookie.length;

        return document.cookie.substring(start, end);
    }
    return "";
}

function getCookieForWing(name) {
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
function recentOpen(gb) {
    $("#recentOpen").parent().removeClass("quick-close");
    $("#recentOpen").attr("style", "display:none");
    $("#recentClose").attr("style", "display:");
    $("#recentClose2").attr("style", "display:");
}
function recentClose(gb) {

    $("#recentOpen").parent().addClass("quick-close");
    $("#recentOpen").attr("style", "display:");
    $("#recentClose").attr("style", "display:none");
    $("#recentClose2").attr("style", "display:none");
}
function plusOpen(gb) {

    $("#plusOpen").parent().removeClass("quick-close");
    $("#plusOpen").attr("style", "display:none");
    $("#plusClose").attr("style", "display:");
    $("#plusClose2").attr("style", "display:");
}
function plusClose(gb) {

    $("#plusOpen").parent().addClass("quick-close");
    $("#plusOpen").attr("style", "display:");
    $("#plusClose").attr("style", "display:none");
    $("#plusClose2").attr("style", "display:none");
}
function setCookieForWing(cookieName, cookieValue, expireDate) {
    var today = new Date();
    today.setDate(today.getDate() + parseInt(expireDate));
    document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/;domain=gmarket.co.kr; expires=" + today.toGMTString() + ";";
}
function setCommaForWing(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';
    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}
function setNumberForWing(str) {
    var tmpStr;
    tmpStr = str.replace(",", "");
    tmpStr = tmpStr.replace("원", "");
    return tmpStr;
}

function cutStringByteLength(pStr, iLength) {
    if (iLength == 0) return ("");

    var c;
    var nLength = 0;
    var sStr = new String(pStr);
    var sResultStr = "";

    for (i = 0; i < sStr.length; i++) {
        c = sStr.charAt(i);
        if (escape(c).length > 4)   // 한글
        {
            if (nLength + 2 > iLength)
                return sResultStr;
            else
                nLength += 2;
        }
        else {
            if (nLength + 1 > iLength)
                return sResultStr;
            else
                nLength++;
        }
        sResultStr += c;
    }
    return sResultStr;
}

function wing() { }
wing.GoodsUrl = "";
wing.RecentPageSize = 4;
wing.totalRecentCount = 0;
wing.flag = "";
wing.retryCount = 0;
function InitWingRecentGoodsOriginal() {

	wing.printRecentGoodsView(0);
    wing.printRecentGoodsView(-2);

	wing.totalRecentCount = RVI.getGoodsCount();
    if (RVI.currPage > RVI.totalPage) RVI.currPage = RVI.totalPage;

    if (wing.totalRecentCount > 0) {
        $("#VIEW_L1").attr("style", "display:block;");
        $("#VIEW_L2").attr("style", "display:none;");
        //$("#nextItems1").html("<a href=\"javascript:wing.printRecentGoodsView(-1);\" class=\"prev\">Prev</a> <strong id=\"WingRecentPage\"><span></span> / </strong> <a href=\"javascript:wing.printRecentGoodsView(1)\" class=\"next\">Next</a>");
        $("#nextItems1").html("<a href=\"javascript:wing.printRecentGoodsView(-1);\" class=\"prev\">Prev</a> <strong id=\"WingRecentPage\"></strong> / <span id=\"WingTotalPage\"></span> <a href=\"javascript:wing.printRecentGoodsView(1)\" class=\"next\">Next</a>");
        wing.printRecentGoodsView(0);
    } else {
        //$(".overview").remove(); // 광고 상품 delete 레이어 제거
        $("#VIEW_L1").attr("style", "display:none;");
        $("#VIEW_L2").attr("style", "display:block;");
        $("#nextItems2").html("<a href=\"javascript:fnNaviItems(-1);\" class=\"prev\">Prev</a> <span id=\"currRecoItemPage\">1</span>/<span id=\"totalRecoItemPage\">10</span> <a href=\"javascript:fnNaviItems(1);\" class=\"next\">Next</a>");
        if (typeof RVIRecomGoods == "undefined") {
        	fnSetBestSellerItems(0);
        } else {
        	fnRVIRecomItems(0);
        }
    }

    if (wing.flag == "R" && wing.totalRecentCount > 0) wing.openTodayGoods();
    else wing.openPlusGoods();
}

var currBestItemIdx = 0;
function fnSetBestSellerItems(index) {
    for (var i = 0; i < 4; i++) {
        $("#RVI" + (i + 1) + "_IMG2").attr("src", FloatingRecoGoods[index][i]["ItemImg"]);        
        $("#RVI" + (i + 1) + "_URL2").attr("href", FloatingRecoGoods[index][i]["ItemUrl"]);
        $("#RVI" + (i + 1) + "_CODE2").text(FloatingRecoGoods[index][i]["ItemNo"]);
    }

    $("#totalRecoItemPage").text(FloatingRecoGoods.length);

}

function fnNaviItems(index) {
	if (typeof RVIRecomGoods != "undefined") {
		fnRVIRecomItems(index);
		return;
	}

	if (index == 1) {
        currBestItemIdx = currBestItemIdx + 1;
    } else if (index == -1) {
        currBestItemIdx = currBestItemIdx - 1;
    }

    if (currBestItemIdx < 0) currBestItemIdx = 0;

    if (currBestItemIdx >= FloatingRecoGoods.length) {
        currBestItemIdx = FloatingRecoGoods.length - 1;
    }

    $("#currRecoItemPage").text(currBestItemIdx + 1);

    fnSetBestSellerItems(currBestItemIdx);
}

var currRVIRecomItemTab = 0;
function fnRVIRecomItems(selTab) {
	var tabLen = Math.ceil(RVIRecomGoods.length / 4);

	if (selTab != 0) { currRVIRecomItemTab = currRVIRecomItemTab + selTab; }

	if (currRVIRecomItemTab >= tabLen) { currRVIRecomItemTab = 0 }
	if (currRVIRecomItemTab < 0) { currRVIRecomItemTab = tabLen - 1 }

	var startIdx = currRVIRecomItemTab * 4;
	var endIdx = startIdx + 3;

	if (RVIRecomGoods.length > 0) {
		var j = 1;
		for (var i = startIdx; i <= endIdx && i < RVIRecomGoods.length; i++) {
			$("#RVI" + j + "_IMG2").attr("src", RVIRecomGoods[i].Image);
			$("#RVI" + j + "_URL2").attr("href", wingEngGoodsUrl + RVIRecomGoods[i].GoodsCode);
			$("#RVI" + j + "_CODE2").text(RVIRecomGoods[i].GoodsCode);
			j++;
		}
	}

	$("#currRecoItemPage").text(currRVIRecomItemTab + 1);
	$("#totalRecoItemPage").text(tabLen);
}

InitWingRecentGoods = function () {
    RVI.loadGoods(InitWingRecentGoodsOriginal);
}
wing.openPlusGoods = function () {
    setBrowserCookie("WingFlag", "");
    wing.flag = "";
}
wing.openTodayGoods = function () {
    setBrowserCookie("WingFlag", "R");
    wing.flag = "R";
}
var recentGoods;
var totalGoods;
var isMyg = false;
var todayCurrPage = 1;
wing.printRecentGoodsView = function (idx) {

    var changeCost, currencyPoint;
    if (currentCurrency == "JPY") currencyPoint = 0;
    else currencyPoint = 2;

    if (idx == 1) {
        isMyg = false;

        for (var i = 0; i < recentGoods.length; i++) {
            $("#RVI" + (i + 1) + "_TXT1").empty();
        }

        recentGoods = RVI.getNextPageGoodsArr(wing.RecentPageSize);
    } else if (idx == -1) {
        isMyg = false;

        for (var i = 0; i < recentGoods.length; i++) {
            $("#RVI" + (i + 1) + "_TXT1").empty();
        }

        recentGoods = RVI.getPrevPageGoodsArr(wing.RecentPageSize);
    } 
    else {
        isMyg = false;
        recentGoods = RVI.getPageGoodsArr(RVI.currPage, wing.RecentPageSize);
    }


    if (idx != -2) {
        for (var i = 0; i < recentGoods.length; i++) {

            changeCost = parseInt(recentGoods[i].price.replace(/,/g, ""));
            changeCost = setCommaForWing(wing.ceiling((changeCost * CURR_SELECT_CURRENCY), currencyPoint));

            $("#RVI" + (i + 1) + "_URL1").attr("href", wingEngGoodsUrl + recentGoods[i].code);
            $("#RVI" + (i + 1) + "_TAG1").attr("href", $("#RVI" + (i + 1) + "_URL1").attr("href"));
            $("#RVI" + (i + 1) + "_IMG1").attr("src", recentGoods[i].img);
            $("#RVI" + (i + 1) + "_IMG1").removeClass("off");
            $("#RVI" + (i + 1) + "_CODE").html(recentGoods[i].code);            
            $("#RVI" + (i + 1) + "_TXT1").html(cutStringByteLength(recentGoods[i].name, 44));
            $("#RVI" + (i + 1) + "_LI").attr("style", "display:block;");

            $("#RVI" + (i + 1) + "_PRICE1").html("");
            if (recentGoods[i].price != "")
                $("#RVI" + (i + 1) + "_PRICE1").html("<strong>￦" + setCommaForWing(recentGoods[i].price) + "</strong><strong class='second_price'>(" + EXCHANGE_RATE + " " + changeCost + ")</strong>");
        }

        for (var i = recentGoods.length; i < wing.RecentPageSize; i++) {
            $("#RVI" + (i + 1) + "_URL1").attr("href", "#");
            $("#RVI" + (i + 1) + "_TAG1").attr("href", "#");
            $("#RVI" + (i + 1) + "_IMG1").attr("src", "#"); //2014-04-28 herf 속성 변경 => src
            $("#RVI" + (i + 1) + "_CODE").html("");
            $("#RVI" + (i + 1) + "_PRICE1").html("");
            $("#RVI" + (i + 1) + "_TXT1").html("");
            $("#RVI" + (i + 1) + "_LI").attr("style", "display:none;");
        }
    }

    if (idx != -2) {
        $("#WingRecentPage").html(RVI.currPage)
        $("#WingTotalPage").html(RVI.totalPage);
        //WingTodayViewItems.WritePage(RVI.totalPage);
    }
}
wing.resetGoodsDetail = function () {
    for (var i = 1; i <= wing.RecentPageSize; i++) {
        $("#RVI" + i + "_TAG1").html("");
        $("#RVI" + i + "_TXT1").html("");
    }
}
wing.showGoodsDetail = function (idx) {

    var langType;
    if (getGlobalCookie("charset") == "zhCN") langType = "ZhCn";
    else langType = "EnUs";




    if ($("#RVI" + idx + "_CODE").html().length > 0) {
        var sGoodsCode;
        if ($("#RVI" + idx + "_TXT1").html().length == 0) {
            sGoodsCode = $("#RVI" + idx + "_CODE").html();

            var url = WWWDomain + "challenge/neo_include/GetGoodsDetailWing.asp?callback=?";
            var hdCharSet = langType;
            var param = [{ name: 'goodscode', value: sGoodsCode },
								{ name: 'idx', value: idx },
								{ name: 'lang', value: hdCharSet}];

            AjaxHelper.AsyncGetDataToGetServiceJsonp(url, param, "wing.ShowGoodsDetailResult", "wing.Error");
        }
        $("#RVI" + idx + "_LI").addClass("on");
        $("#RVI" + idx + "_DIV1").attr("style", "display:block");
    }

}

wing.ShowGoodsDetailResult = function (data) {
    var ret = data.result.split("|");
    var sGoodsCode;
    var changeCost;
    var currencyPoint
    var sGoodsName;

    if (currentCurrency == "JPY") {
        currencyPoint = 0;
    }
    else {
        currencyPoint = 2;
    }

    if (ret.length > 1 && data.result.length < 512) {
        if (ret[0].length < 30) {
            sGoodsCode = $("#RVI" + ret[2] + "_CODE").html();

            changeCost = parseInt(ret[0].replace(/,/g, ""));
            changeCost = setCommaForWing(wing.ceiling((changeCost * CURR_SELECT_CURRENCY), currencyPoint));

            if (ret[3] == "")
                $("#RVI" + ret[2] + "_TXT1").html(cutStringByteLength(ret[1], 40));
            else
                $("#RVI" + ret[2] + "_TXT1").html(cutStringByteLength(ret[3], 40));

            if (typeof ret[3] != "undefined")
                sGoodsName = ret[3];
            else
                sGoodsName = "";

            $("#RVI" + ret[2] + "_PRICE1").html("<strong>￦" + ret[0].replace("원", "") + "</strong><strong class='second_price'>(" + EXCHANGE_RATE + " " + changeCost + ")</strong>");            
            RVI.modifyGoods(sGoodsCode, sGoodsName, setNumberForWing(ret[0]));
        }

    }

}

wing.ceiling = function (n, pos) {
    var digits = Math.pow(10, pos);

    var num = Math.ceil(n * digits) / digits;

    return num.toFixed(pos);
}

wing.Error = function (error) {
}

wing.hideGoodsDetail = function (idx) {
    $("#RVI" + idx + "_LI").removeClass("on");
    $("#RVI" + idx + "_DIV1").attr("style", "display:none");
}
wing.deleteRecentGoods = function (idx) {
    var sGoodsCode;
    if ($("#RVI" + idx + "_CODE").html().length > 0) {
        sGoodsCode = $("#RVI" + idx + "_CODE").html();
        $("#RVI" + idx + "_DIV1").attr("style", "display:none");
        RVI.deleteGoods(sGoodsCode);
        InitWingRecentGoodsOriginal();
    }

}
wing.loadRecentGoods = function (loadYN) {
    if (loadYN) {
        //RVI.loadRVI();
        wing.flag = getMsgCookie("WingFlag");
    } else {
        setBrowserCookie("WingFlag", "R");
        wing.flag = "R";
    }
    wing.GoodsUrl = WingGoodsDomain + "detailview/Item.asp?goodscode=";
    wing.RecentPageSize = 4;    
}


wing.hideGoodsDetailOrg = function (idx) {
    $("#RVI" + idx + "_LI").removeClass("on");
    $("#RVI" + idx + "_DIV1").attr("style", "display:none");
}



//// Image Error Loader
var httpheadertag;
if (document.location.href.indexOf("https:") >= 0) {
    httpheadertag = "https://sslimage.";
} else {
    httpheadertag = "http://image.";
}
NoImage = new Image();
NoImage.src = httpheadertag + 'gmarket.co.kr/_Net/Myg/thumb_noimg_120.jpg';

NoImage2 = new Image();
NoImage2.src = httpheadertag + 'gmarket.co.kr/challenge/neo_image/shopping_guide_img/image.gif';


function ImgLoadFirst(obj, simg) {
    if (simg == undefined) {
        if (NoImage.complete) {
            obj.src = NoImage.src;
        }
        else {
            obj.style.display = 'none';
        }
    } else {
        if (NoImage2.complete) {
            obj.src = NoImage2.src;
        }
        else {
            obj.style.display = 'none';
        }
    }

}

function imgLoadFirst(obj, simg) {
    ImgLoadFirst(obj, simg);
}

function getUserAgentName() {
    var agent = navigator.userAgent;
    var agentName = "";

    if (/Firefox[\/\s](\d+\.\d+)/.test(agent)) {//test for Firefox
        agentName = "FF";
    } else if (/MSIE (\d+\.\d+);/.test(agent)) {
        agentName = "IE";
    } else if (/Opera[\/\s](\d+\.\d+)/.test(agent)) {
        agentName = "OP";
    } else {
        agentName = "NA";
    }

    return agentName;
}

function msg_09_slide_up() {
    var sAgentName = getUserAgentName();
    var msgLayer = $("#msg_09_layer");
    msgLayer.css({ bottom: "-80px", right: "100px" });
    if (sAgentName == "IE") {
        setTimeout("msg_09_fadeout()", 5000);
    } else {
        setTimeout("msg_09_fadeout()", 10000);
    }
}
var msg_09_Alpha = 100;
function msg_09_fadeout() {
    var sAgentName = getUserAgentName();
    var msgLayer = $("#msg_09_layer");
    if (sAgentName == "IE") {
        if (msg_09_Alpha != 0) {
            msg_09_Alpha -= 10;
            msgLayer.css({ filter: "alpha(opacity=" + msg_09_Alpha + ")" });
            setTimeout("msg_09_fadeout()", 1);
        } else {
            msgLayer.attr("style", "display:none");
        }
    } else {
        msgLayer.attr("style", "display:none");
    }
}
function msg_09_hide() {
    document.getElementById("msg_09_layer").style.display = "none";
}
function goToMessageBoxOpt(opt) {
    goToMessageBoxLayer();
}


function GMKT() {
    this.version = 'web real version';
}

GMKT.prototype.onload = function (_func) {
    var _oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = _func;
    } else {
        window.onload = function () {
            _oldonload();
            _func();
        }
    }
}

GMKT.prototype.onscroll = function (_func) {
    var _oldscroll = window.onscroll;
    if (typeof window.onscroll != 'function') {
        window.onscroll = _func;
    } else {
        window.onscroll = function () {
            _oldscroll();
            _func();
        }
    }
}
/*
gmkt Class
gmkt.onload()
gmkt.onresize()
*/
var gmkt = new GMKT();

$(document).ready(function () {
	$("#wing li.pics").hide();
});
