function addFavorite() {
    try {
        document.body.style.behavior = "url(#default#homepage):";
        document.body.setHomePage("http://global.gmarket.co.kr/");
    } catch (e) { }
}
function GlobalFooter() { };

GlobalFooter.Display = function() {
    var sb = "";
    //console.log(getGlobalCookie("charset"));
    sb += "<div id='footer'>";
    sb += "<div class='footer-wrap'>";
    sb += "	<div class='link'>";
    sb += "		<ul>";
    sb += "			<li class='first'><a href='" + GlobalHeaderUri.Member + "Pages/AboutGmarket'>" + GlobalHFText['COMMON_HF_TEXT_77'] + "</a></li>";
    sb += "			<li><a href='" + GlobalHeaderUri.Member + "Pages/UserAgreement'>" + GlobalHFText['COMMON_HF_TEXT_78'] + "</a></li>";
    sb += "			<li><a href='" + GlobalHeaderUri.Member + "Pages/PrivacyPolicy'>" + GlobalHFText['COMMON_HF_TEXT_79'] + "</a></li>";
    sb += "			<li><a href='" + GlobalHeaderUri.Member + "Pages/SiteMap'>" + GlobalHFText['COMMON_HF_TEXT_80'] + "</a></li>";
    sb += "			<li><a href='" + GlobalHeaderUri.Member + "CustomerCenter/Main'>" + GlobalHFText['COMMON_HF_TEXT_39'] + "</a></li>";
    sb += "			<li><a href='javascript:addFavorite();'>" + GlobalHFText['COMMON_HF_TEXT_81'] + "</a></li>";
    if (getGlobalCookie("charset") == "zhCN") {
        sb += "			<li class='last'><a href='http://weibo.com/gmarketglobal' TARGET='_blank'><span class='facebook_logo'></span>  微博</a></li>";    
    } else {
        sb += "			<li class='last'><a href='https://www.facebook.com/GmarketGlobal' TARGET='_blank'><span class='facebook_logo'></span> Facebook</a></li>";
    }
    sb += "		</ul>";
    sb += "	</div>";
    sb += "	<div class='copyright'>";
    sb += "		<dl>";
    sb += "			<dt>" + GlobalHFText['COMMON_HF_TEXT_39'] + "</dt>";
    sb += "			<dd>" + GlobalHFText['COMMON_HF_TEXT_40'] + " | " + GlobalHFText['COMMON_HF_TEXT_82'] + " :<a href='" + GlobalHeaderUri.Member + "customerCenter/ContactUs' class='mail'>" + GlobalHFText['COMMON_HF_TEXT_42'] + "</a></dd>";
    sb += "			<dt>" + GlobalHFText['COMMON_HF_TEXT_43'] + "</dt>";
    sb += "			<dd>" + GlobalHFText['COMMON_HF_TEXT_44'] + " | " + GlobalHFText['COMMON_HF_TEXT_45'] + " | " + GlobalHFText['COMMON_HF_TEXT_46'] + " : <a href='mailto:" + GlobalHFText['COMMON_HF_TEXT_47'] + "' class='mail'>" + GlobalHFText['COMMON_HF_TEXT_47'] + "</a></dd>";
    sb += "			<dt class='corp'>" + GlobalHFText['COMMON_HF_TEXT_48'] + "</dt>";
    sb += "			<dd>" + GlobalHFText['COMMON_HF_TEXT_49'] + " | " + GlobalHFText['COMMON_HF_TEXT_50'] + " : " + GlobalHFText['COMMON_HF_TEXT_51'] + " | " + GlobalHFText['COMMON_HF_TEXT_52'] + " : " + GlobalHFText['COMMON_HF_TEXT_53'] + " | " + GlobalHFText['COMMON_HF_TEXT_54'] + ": " + GlobalHFText['COMMON_HF_TEXT_55'] + "<br />";
    sb += "			<a href='http://www.ftc.go.kr/info/bizinfo/communicationList.jsp' class='abtn s_wh'><em>" + GlobalHFText['COMMON_HF_TEXT_56'] + "</em></a>";
    sb += "			</dd>";
    sb += "		</dl>";
    sb += "     <span class='logo'>ebay Gmarket</span>";
    sb += "	</div>";
    sb += "</div>";
    sb += "<p class='footter_btm'>" + GlobalHFText['COMMON_HF_TEXT_83'] + "<br />" + GlobalHFText['COMMON_HF_TEXT_84'] + "</p>";
    sb += "</div>";

    $("#FooterScriptContainer").after(sb);
}

function GlobalFooterInit() {

	GlobalFooter.Display();
}

GlobalFooterInit();	


