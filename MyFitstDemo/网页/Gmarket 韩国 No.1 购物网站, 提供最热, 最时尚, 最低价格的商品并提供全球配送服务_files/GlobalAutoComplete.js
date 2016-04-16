var bAutoFlag = false;
var shIe = true;
var acDiv_Width = "296", acDiv_Ment1 = "해당 단어로 시작하는 추천어가 없습니다", acDiv_Ment2 = "해당 단어로 끝나는 추천어가 없습니다";
var GmktACkeystatus = 1; // keysatus 1 : No Input, 2 : Start Input
var gmktBRType = GmktACgetNavigatorType();
var GmktACtIE = GmktACget_nav();
var GmktACcBR = GmktACchk_rt(GmktACtIE);
var GmktACIp;
var GmktACm_on = 0, GmktACm_now = 0, GmktACs_now = 0, GmktACshl = 0, GmktACa_now = 0, GmktACa_on = 0, GmktACarr_on = 0, GmktACfrm_on = 0;
var GmktACcn_use = "use_ac";
var GmktACwi_int = 500;
var GmktACbak = "", GmktACold = "";
var qs_ac_list = "", qs_ac_id = "", qs_q = "", qs_qc = "", qs_m = 0, qs_ac_len = 0; // search keyword save
var qs_ac_list_ad = "", qs_ac_ad_len = 0; // monopoly_ad 
var GmktACacuse = 1; // autocomplete on : 1, off : 0
var GmktACcc = new Object();
var GmktAChelp = 0;
var GmktACac_on = 0;
function GmktACinit() {
	GmktACIp = document.HeaderSearchForm.searchfield;
    GmktACbak = GmktACold = GmktACIp.value;
    GmktACwd();
    setTimeout("GmktACwi();", GmktACwi_int);
}
function GmktACgetNavigatorType() {
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("msie") != -1) return 1;
    else if (agt.indexOf("firefox") != -1) return 2;
    else if (agt.indexOf("safari") != -1) return 3;
    else if (agt.indexOf("applewebkit") != -1) return 3;
    else if (agt.indexOf("opera") != -1) return 4;
    else return 0;
}
function GmktACsetTextBox(flag, event) {
	var textbox = document.HeaderSearchForm.searchfield;
    var _event;
    var key;
    try {
        if (gmktBRType == 1) {
            _event = window.event;
            nodeName = _event.srcElement.nodeName;
            key = _event.keyCode;
        } else if (gmktBRType == 2 || gmktBRType == 3 || gmktBRType == 4) {
            _event = event;
            nodeName = _event.target.nodeName;
            key = _event.which;
        } else {
            nodeName = "None";
        }
        if (GmktACkeystatus == 1 && flag && key != 13) {
            textbox.value = "";
            GmktACkeystatus = 2;
        }
    } catch (err) { }
}
function GmktACget_nav() {
    var ver = navigator.appVersion;
    if (navigator.appName.indexOf("Microsoft") != -1 && ver.indexOf("MSIE 4") == -1 && ver.indexOf("MSIE 3") == -1) {
        return 1;
    } else if (navigator.appName.indexOf("Netscape") != -1) return 2;
    else return 0;
}
function GmktACchk_rt(t) {
    if (t != 1) return 0;
    try {
    	var Ip = document.HeaderSearchForm.searchfield;
    } catch (e) {
        return 0;
    }
    return 1;
}
function gmkt_ac(flag, event) {
    GmktACsetTextBox(flag, event);
    var e = window.event ? window.event : event;
    var c = window.event ? window.event.keyCode : event.which;
    if (GmktACgetNavigatorType() == 1) {
        if (c == 220) {
            e.returnValue = false;
            return;
        }
    }
    if (bAutoFlag) return;

    bAutoFlag = true;
    shIe = false;
}
function CurrentCharsetSave() {
   	var currentCharset = document.charset;
   	window.onbeforeunload = function () {
   		if (currentCharset != document.charset) {
   			document.charset = currentCharset;
   		}
   	}
}
var keyword1temp, keyword2temp;
function GmktACwd() {
    if (GmktACacuse == 1) GmktACIp.autocomplete = "off";
    else if (GmktACacuse == 0) GmktACIp.autocomplete = "on";
    GmktACIp.onclick = GmktACreq_ipc;
    GmktACIp.onblur = GmktACdis_p;
}
var GmktACdnc = 0;
function GmktACreq_ipc(event) {
    GmktACdnc = 1;
    GmktACfrm_on = 0;
    GmktACreq_ac2(1, event);
}
function GmktACac_hide() {
    if (document.getElementById('autoSearch')) {
        if (document.getElementById("autoSearch").style.display == "none") return;
        document.getElementById("autoSearch").style.display = "none";
        GmktACa_on = GmktACa_now = 0;
    }
}
function GmktACset_ahl() {
    if (!GmktACa_on) return;
    var o1, o2;
    if (!GmktAChelp) {
        for (i = 0; i < qs_ac_len; i++) {
            o1 = document.getElementById('GmktACac' + (i + 1));
            if ((i + 1) == GmktACa_now) {
                o1.style.backgroundColor = '#f2f2f2';
            }
            else
                o1.style.backgroundColor = '';
        }
    }
}
function GmktACset_acpos(v) {
    GmktACa_now = v;
    setTimeout('GmktACset_ahl();', 10);
}
var GmktACmax_row = 4;
function GmktACackhl(event) {
    var e = window.event ? window.event : event;
    var o1, o2;
    var c = window.event ? window.event.keyCode : event.which;
    if (c == 220) {
        e.returnValue = false;
        return;
    }
    if (c == 39) { // Left arrow
        GmktACreq_ac2(1, event);
    }
    if (c == 13) { // Enter
        if (GmktACa_now > 0) {
            chk_menusrch_val();
        }
    }
    if (c == 40 || (c == 9 && !e.shiftKey)) { // 40 : Down Arrow, 9 : Tab
        if (GmktACm_on) return;
        if (!GmktACa_on) {
            GmktACreq_ac2(1, event);
            return;
        }
        if (GmktACa_now < qs_ac_len) {
            if (GmktACa_now == 0) GmktACbak = GmktACIp.value;
            GmktACa_now++;
            o1 = document.getElementById('GmktACac' + GmktACa_now);
            o2 = document.getElementById('GmktACacq' + GmktACa_now);
            
            if (o2 != null) {
                GmktACold = GmktACIp.value = o2.innerHTML;
                GmktACIp.focus();
                GmktACset_ahl();
                e.returnValue = false;
            }            
        }
    }
    if (GmktACa_on && (c == 38 || (c == 9 && e.shiftKey))) { // 38: Up Arrow, 9 : Tab
        if (!GmktACa_on) return;
        if (GmktACa_now <= 1) {
            GmktACac_hide();
            GmktACold = GmktACIp.value = GmktACbak;
        } else {
            GmktACa_now--;
            o1 = document.getElementById('GmktACac' + GmktACa_now);
            o2 = document.getElementById('GmktACacq' + GmktACa_now);

            if (o2 != null) {
                GmktACold = GmktACIp.value = o2.innerHTML;
                GmktACIp.focus();
                GmktACset_ahl();
                e.returnValue = false;
            }             
        }
    }
}
function GmktACjs_makehigh_pre(s, t) {
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");
    t1 = t1.toLowerCase();
    if (t1 == s1.substring(0, t1.length)) {
        d = "<strong>";
        for (var i = 0, j = 0; j < t1.length; i++) {
            if (s.substring(i, i + 1) != " ") j++;
            d += s.substring(i, i + 1)
        }
        d += "</strong>" + s.substring(i, s.length)
    }
    return d;
}
function GmktACjs_makehigh_suf(s, t) {
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");
    t1 = t1.toLowerCase();
    if (t1 == s1.substring(s1.length - t1.length)) {
        for (var i = 0, j = 0; j < s1.length - t1.length; i++) {
            if (s.substring(i, i + 1) != " ") j++;
            d += s.substring(i, i + 1);
        }
        d += "<strong>";
        for (var k = i, l = 0; l < t1.length; k++) {
            if (s.substring(k, k + 1) != " ") l++;
            d += s.substring(k, k + 1);
        }
        d += "</strong>";
    }
    return d;
}
function GmktACjs_highlight(s, d, is_suf) {
    var ret = "";
    if (!is_suf) {
        ret = GmktACjs_makehigh_pre(s, d);
    } else {
        ret = GmktACjs_makehigh_suf(s, d);
    }
    if (ret == "") return s;
    else return ret;
}
function GmktACjs_strlen(s) {
    var i, l = 0;
    for (i = 0; i < s.length; i++)
        if (s.charCodeAt(i) > 127) l += 2;
        else l++;
    return l;
}
function GmktACset_acinput(v) {
    if (!GmktACa_on) return;
    var o = document.getElementById('GmktACacq' + GmktACa_now);
    GmktACold = GmktACIp.value = o.innerHTML;
    document.getElementById('getSearchEng').innerHTML = GmktACold
    GmktACIp.focus();
    GmktACac_hide();
}
function GmktACget_aclist(aqo) {
    var d = "", ds = "", l = 0, s = "", cnt = 0, pos = 0, qlen = 0, temp_list = "";
    if (qs_ac_list[0] != "") {
        s += "<li class='blind'><span id='getSearchEng' style='display:none'>" + aqo + "</span></li>";
        for (i = 0; i < qs_ac_len; i++) {
            ds = d = qs_ac_list[i];
            l = GmktACjs_strlen(d);
            pos = d.indexOf(GmktACIp.value);
            if (pos >= 0) {
                if (pos == 0) {
                    ds = GmktACjs_highlight(ds, GmktACIp.value, 0);
                } else {
                    ds = GmktACjs_highlight(ds, GmktACIp.value, 1);
                }
            }
            s += "<li id='GmktACac" + (i + 1) + "' onmouseover=\"GmktACset_acpos('" + (i + 1) + "');\" onmouseout=\"GmktACset_acpos(0); \" onclick=\"GmktACset_acinput('" + (i + 1) + "')\">";
            s += "<a href='javascript:GlobalHeaderTop.SetKeyword(\"" + d + "\");'>" + ds + "</a>";
            s += "<span id='GmktACacq" + (i + 1) + "' style='display:none'>" + d + "</span></li>";
        }
    }
    return s;
}
function GmktACget_help() {
    var s = "", ment = "";
    ment = "자동완성기능입니다.";
    s += "<li id='GmktACac1' onmouseover=\"GmktACset_acpos(1); \" onmouseout=\"GmktACset_acpos(0); \"><a>";
    s += ment + "</a></li>";
    s += "<span id=acq1 style='display:none'>" + GmktACold + "</span>";
    s = "";
    return s;
}
function GmktACtrim_space(ke, me) {
    if (me != 2) {
        ke = ke.replace(/^ +/g, "");
        ke = ke.replace(/ +$/g, " ");
    } else {
        ke = ke.replace(/^ +/g, " ");
        ke = ke.replace(/ +$/g, "");
    }
    ke = ke.replace(/ +/g, " ");
    return ke;
}
function GmktACget_ac0() {
    var s = "", ment = "";
    if (qs_m == 1) ment = acDiv_Ment1;
    else if (qs_m == 2) ment = acDiv_Ment2;
    s += "<span id='getSearchEng' style='display:none'></span>";
    s += "<li id='GmktACac1'>";
    s += ment + "</li>";
    s += "<span id=acq1 style='display:none'>" + GmktACold + "</span>";
    s = "";
    return s;
}
function GmktACprint_ac(aqo, aq, ai) {
	if (qs_ac_list[0] == "") {
		document.getElementById("autoFillData").innerHTML = GmktACget_ac0();
		document.getElementById("autoSearch").style.display = "none";
    } else {
		document.getElementById("autoFillData").innerHTML = GmktACget_aclist(aqo);
		if (document.getElementById("autoFillData").innerHTML == "")
			document.getElementById("autoSearch").style.display = "none";
		else 
       		document.getElementById("autoSearch").style.display = "block";
    }
    setTimeout('GmktACset_ahl();', 10);
}
function GmktACprint_ac_help() {
    document.getElementById("autoFillData").innerHTML = GmktACget_help();
    document.getElementById("autoSearch").style.display = "none";
}
function GmktACac_show(aqo, aq, al, ai, am, event) {
    GmktAChelp = 0;
    GmktACac_on = 1;
    if (aq && aq != "" && aq != GmktACtrim_space(GmktACIp.value, am)) return;
    qs_q = aq;
    qs_m = am;
    qs_ac_list = al;
    qs_ac_id = ai;
    qs_ac_len = qs_ac_list.length;

    var h = (qs_ac_len > 4) ? 4 : qs_ac_len;
    h = h * 19;

    GmktACprint_ac(aqo, aq, ai);
    if (qs_ac_list[0] == "" && (qs_m == 1 || qs_m == 2)) {
        qs_ac_len = 1;
        h = 19;
        if (qs_ac_list[0] == "") h = h + 19;
    }
    if (qs_ac_len) {
        h += 38;
        GmktACa_on = 1;
    } else {
        GmktACa_on = 0;
    }
    if (document.getElementById("autoFillData").innerHTML == "")
       	document.getElementById("autoSearch").style.display = "none";
    else
       	document.getElementById("autoSearch").style.display = "block";

    if (GmktACa_on) {
        GmktACset_acpos(0);
        GmktACIp.onkeydown = GmktACackhl;
    }
}
function GmktACget_cc(me) {
    var ke = GmktACtrim_space(GmktACIp.value, me) + me;
    return typeof (GmktACcc[ke]) == "undefined" ? null : GmktACcc[ke];
}
function GmktACset_cc(aqo, aq, al, ai, me) {
    GmktACcc[aq + me] = new Array(aqo, aq, al, ai);
}
function GmktACwi(event) {
	if (GmktACacuse == 0) return;
    if (GmktACm_on) {
        setTimeout("GmktACwi()", GmktACwi_int);
        return;
    }
    var now = GmktACIp.value;
    if (now == "" && now != GmktACold) GmktACac_hide();
    if (now != "" && now != GmktACold && GmktACkeystatus != 1) {
        var o = null, me = 1;
        o = GmktACget_cc(me);
        if (o && o[1][1] != "") {
            GmktACac_show(o[0], o[1], o[2], o[3], me, event);
        } else {
            GmktACreqAC(me, event);
        }
    }
    GmktACold = now;
    setTimeout("GmktACwi()", GmktACwi_int);
}
function GmktACdis_p() {
    if (GmktACdnc) {
        GmktACdnc = 0;
        return;
    }
    if (GmktACarr_on) {
        return;
    }
    if (GmktACfrm_on) {
        return;
    }
    GmktACac_hide();
    GmktAChelp = 0;
}
function GmktACreq_ac2(me, event) {
    if (GmktACIp.value == "" || GmktACacuse == 0) return;
    if (GmktAChelp) {
        GmktACac_hide();
        var o = GmktACget_cc(me);
        if (o && o[1][1] != "") GmktACac_show(o[0], o[1], o[2], o[3], me, event);
        else GmktACreqAC(me, event);
    } else {
        if (GmktACa_on && GmktACdnc) {
            GmktACac_hide();
            return;
        }
        var o = GmktACget_cc(me);
        if (o && o[1][1] != "") GmktACac_show(o[0], o[1], o[2], o[3], me, event);
        else GmktACreqAC(me, event);
    }
}
function GmktACshowAC(data) {
    eval(data.result);
    GmktACset_cc(qs_qc, qs_q, qs_ac_list, qs_ac_id, qs_m);
    GmktACac_show(qs_qc, qs_q, qs_ac_list, qs_ac_id, qs_m);
}
function GmktACreqAC(me, event) {
    var sv, esp, t="";
    var ke = GmktACtrim_space(GmktACIp.value, me);
    ke = ke.replace(/ /g, "%20");
    esp = ke;
    if (ke == "") {
        GmktACac_hide();
        return;
    }
       
    //if (gmktBRType == 2 || gmktBRType == 4) {
    /*if ( gmktBRType == 4 ) {
    	esp = escape(ke);
    }*/
	t = "e";
	if (getGlobalCookie("charset") == "zhCN")
		t = GmktACac_getKeywordType(esp);	
	//var  param = [{ name: 'p', value: me }, { name: 'q', value: esp }, { name: 't', value: t }];
	var  param = [];

    var url;
    url = GlobalHeaderUri.FrontAPI + "autocomplete/global/pcjson/" + esp  + "/" + me + "/" + t + "/10"; 
    CallAjaxService(url, param, "GET", "jsonp", "GmktACshowAC");
}
/*
ASCII CODE
- 숫자 0~9 : 48~57
- 영문 대문자  : 65~90
- 영문 소문자  : 97~122
- 한글 가~힣   : 45032~55203
- 한글 자음 : 12593~12622
- 한글 모음 : 12623~12643
- space		: 37
*/
function GmktACac_getKeywordType(strTemp)
{
	var chrTemp;
	var strLen     = strTemp.length;
	var checkAlpha   = true;
	if (strLen > 0) {
		for (var i=0; i<strTemp.length; i++)
		{
			chrTemp = strTemp.charCodeAt(i);
			if (!(
				(chrTemp == 37) // space
				|| (chrTemp > 47 && chrTemp < 58) // 숫자 0~9
				|| (chrTemp > 64 && chrTemp < 91) // 영문 대문자
				|| (chrTemp > 96 && chrTemp < 123) // 영문 소문자
				|| (chrTemp > 44031 && chrTemp < 55203) // 한글 가~힣
				|| (chrTemp > 12592 && chrTemp < 12644) // 한글 자음, 모음
				)
			) {
				checkAlpha = false;
			} 
		}
	}
	if (!checkAlpha) return "c";
	else return "p";
}
function GmktACac_show_help() {
    var h = 19;
    GmktACa_on = 1;
    GmktACfrm_on = 1;
    GmktAChelp = 1;
    GmktACac_on = 0;
    GmktACprint_ac_help();
    if (document.getElementById("autoFillData").innerHTML == "")
    	document.getElementById("autoSearch").style.display = "none";
    else
    	document.getElementById("autoSearch").style.display = "block";
}

function GmktACset_mouseon(f) {
    if (f == 1) GmktACarr_on = 1;
    else if (f == 2) GmktACfrm_on = 1;
}
function GmktACset_mouseoff(f) {
    if (f == 1) GmktACarr_on = 0;
    else if (f == 2) GmktACfrm_on = 0;
    GmktACac_on = 0;
}
function GmktACreq_pf() {
    GmktACfrm_on = 1;
    GmktACreq_ac2(1);
    GmktACIp.focus();
    GmktACcursor_end();
}
function GmktACreq_sf() {
    GmktACfrm_on = 1;
    GmktACreq_ac2(2);
    GmktACIp.focus();
    GmktACcursor_end();
}
function GmktACcursor_end() {
    if (GmktACtIE == 1 && GmktACcBR == 1) {
        var rng = GmktACIp.createTextRange();
        if (rng != null) {
            rng.move("textedit");
            rng.select();
        }
    }
}
function GmktACac_swap(event) {
    if (GmktAChelp) {
        GmktACac_hide();
        GmktAChelp = 0;
        GmktACac_on = 0;
    } else if (document.HeaderSearchForm.searchfield.value == "") {
        GmktACac_show_help();
    } else {
        if (GmktACac_on == "0") {
        	if (qs_ac_list[GmktACa_now] == "undefined" || qs_ac_list[GmktACa_now] == null || qs_ac_list[GmktACa_now] == "" || document.HeaderSearchForm.searchfield.value == "") {
                GmktACac_show_help();
            } else {
                var me = 1;
                GmktACold = GmktACtrim_space(GmktACIp.value, me) + me;
                document.HeaderSearchForm.searchfield.focus();
                gmkt_ac(0, event);
            }
        } else {
            GmktACac_hide();
            GmktAChelp = 0;
            GmktACac_on = 0;
        }
    }
}
function CallAjaxService(requestUrl, argument, ajaxType, ajaxDataType, callBackFunction) {
    var isAsync = true;
    if (callBackFunction == "") {
        isAsync = false;
    }
    return jQuery.ajax({
    	type: ajaxType,
    	url: requestUrl,
    	data: argument,
    	dataType: ajaxDataType,
    	async: isAsync,
    	beforeSend: function (xhr) {

    	},
    	success: function (msg) {
    		og.debug("success", msg);
    		if (msg) {
    			if (isAsync)
    				eval(callBackFunction)(msg);
    		}
    	},
    	error: function (jqXHR, textStatus, errorThrown) {
    	}
    })
}