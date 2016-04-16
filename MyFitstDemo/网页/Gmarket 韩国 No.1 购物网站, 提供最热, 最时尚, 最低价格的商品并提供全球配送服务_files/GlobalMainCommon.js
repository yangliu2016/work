var CurrencyPoint
function NationCurrencyPoint() {
	if (currentCurrency == "JPY") {CurrencyPoint = 0;}
	else {CurrencyPoint = 2;}
}


$(window).load(function() {
    rpmAjaxCall('l');  //RPM
});


$(document).ready(function() {
    rpmAjaxCall('r');
    //환율별 소수점
    NationCurrencyPoint();

    //슬롯배너(1,2,3,6)
    try {
        SlotBanner();
    } catch (e) { console.log(e); }

    //패션 더룩 배너
    try {
        TheLookBannerF();
    } catch (e) { console.log(e); }
    
    //뷰티 더룩 배너
    try {
        TheLookBannerB();
    } catch (e) { console.log(e); }

    //브랜드 리스트
    try {
        showBrandList();
    } catch (e) { console.log(e); }

    //베스트 셀러
    try {
        ShowBestSeller();
    } catch (e) { console.log(e); }

    //슈퍼딜
    try {
        SuperDeal();
    } catch (e) { console.log(e); }
        
    //banner 
    try {
        showCateBottomBanner();
    } catch (e) { console.log(e); }
    
    try {
        showCenterBanner();
    } catch (e) { console.log(e); }
    try {
        showBottomBannerList();
    } catch (e) { console.log(e); }

    //공지사항 NEWS & EVENT
    try {
        Notice();
    } catch (e) { console.log(e); }

    try {
        topBannerShow();
    } catch (e) { console.log(e); }
        
    
    /*if ($("#topbanner").length > 0) {
        if (getCookie("globalMainTopBannerYN") == null) {
            $("#topbanner").show();
        }
    }*/
    
});

function BannerSwipe(targetID) {
    targetID = "#" + targetID;

    $(targetID + ">ul").carouFredSel({
        auto: false,
        swipe: {
            onTouch: true,
            onMouse: true
        },
        items: {
            start: "random"
        },
        pagination: targetID + " .paginate",
        prev: {
            button: targetID + " .button_prev",
            key: "left",
			onAfter: function() {
				$("img.lazy").lazyload({
					container : $(this)
				});
			}
        },
        next: {
            button: targetID + " .button_next",
            key: "right",
			onAfter: function() {
				$("img.lazy").lazyload({
					container : $(this)
				});
			}
        }
    });
} 


//S:---메인 슬롯-----------------------
function SlotBanner() {
    
    for (var i = 0; i < SlotBanList.length; i++) {
        slotType = SlotBanList[i][0].Type;
        switch (slotType) {
            case "1":
                SlotBanner1(i);
                break;
            case "2":
                SlotBanner2(i);
                break;
            case "3":
                SlotBanner3(i);
                break;
            case "6":
                SlotBanner6(i);
                break;
        }
    }
    BannerSwipe("main_slot_banner");
    //js_random_swipe(".swipe");
}
// 메인배너 슬롯1
function SlotBanner1(seq) {
    var template = "<li class='type1'><a href='" + SlotBanList[seq][0].BanUrl + "'><img src='" + SlotBanList[seq][0].BanImg + "' alt=''></a></li>";

    $("#main_slot_banner ul").append(template);
    $('#main_slot_banner ul li:last-child a img').attr("alt", decodeURIComponent(SlotBanList[seq][0].BanTitle));
}

// 메인배너 슬롯2
function SlotBanner2(seq) {
    var template = "<li class='type2'><a href='" + SlotBanList[seq][0].BanUrl + "' class='item1'><img src='" + SlotBanList[seq][0].BanImg + "' alt=''></a>";
    template += "<a href='" + SlotBanList[seq][1].BanUrl + "' class='item2'><img src='" + SlotBanList[seq][1].BanImg + "' alt=''></a></li>";

    $("#main_slot_banner ul").append(template);
    $("#main_slot_banner ul li:last-child a:first-child img").attr("alt", decodeURIComponent(SlotBanList[seq][0].BanTitle));
    $("#main_slot_banner ul li:last-child a:last-child img").last().attr("alt", decodeURIComponent(SlotBanList[seq][1].BanTitle));
}
// 메인배너 슬롯3
function SlotBanner3(seq) {
    var template = "<li class='type3'>";
    template += "       <a href='" + SlotBanList[seq][0].BanUrl + "'><img src='" + SlotBanList[seq][0].BanImg + "' alt=''></a>";
    template += "       <div class='area'>";
    template += "           <a href='" + SlotBanList[seq][1].BanUrl + "' class='item1'><img src='" + SlotBanList[seq][1].BanImg + "' alt=''></a>";
    template += "           <a href='" + SlotBanList[seq][2].BanUrl + "' class='item2'><img src='" + SlotBanList[seq][2].BanImg + "' alt=''></a>";
    template += "       </div>";
    template += "</li>";

    $("#main_slot_banner ul").append(template);
    $("#main_slot_banner ul li:last-child a img").attr("alt", decodeURIComponent(SlotBanList[seq][0].BanTitle));
    $("#main_slot_banner ul li:last-child div.area a:first-child img").attr("alt", decodeURIComponent(SlotBanList[seq][1].BanTitle));
    $("#main_slot_banner ul li:last-child div.area a:last-child img").attr("alt", decodeURIComponent(SlotBanList[seq][2].BanTitle));
}
// 메인배너 슬롯6
function SlotBanner6(seq) {
    var template = "<li class='type4'>";
    template += "        <div class='area_a'><a href='" + SlotBanList[seq][0].Url + "'><img src='" + SlotBanList[seq][0].Img + "' alt=''></a></div>";
    template += "        <div class='area_b'>";
    template += "            <a href='" + SlotBanList[seq][0].BanUrl + "'><img src='" + SlotBanList[seq][0].BanImg + "' alt=''></a>";
    template += "            <a href='" + SlotBanList[seq][1].BanUrl + "'><img src='" + SlotBanList[seq][1].BanImg + "' alt=''></a>";
    template += "            <a href='" + SlotBanList[seq][2].BanUrl + "'><img src='" + SlotBanList[seq][2].BanImg + "' alt=''></a>";
    template += "            <a href='" + SlotBanList[seq][3].BanUrl + "'><img src='" + SlotBanList[seq][3].BanImg + "' alt=''></a>";
    template += "            <a href='" + SlotBanList[seq][4].BanUrl + "'><img src='" + SlotBanList[seq][4].BanImg + "' alt=''></a>";
    template += "            <a href='" + SlotBanList[seq][5].BanUrl + "'><img src='" + SlotBanList[seq][5].BanImg + "' alt=''></a>";
    template += "        </div>";
    template += "    </li>";

    $("#main_slot_banner ul").append(template);
    $("#main_slot_banner ul li:last-child div.area_a a img").attr("alt", decodeURIComponent(SlotBanList[seq][0].Title));
    $("#main_slot_banner ul li:last-child div.area_b a:nth-child(1) img").attr("alt", decodeURIComponent(SlotBanList[seq][0].BanTitle)); 
    $("#main_slot_banner ul li:last-child div.area_b a:nth-child(2) img").attr("alt", decodeURIComponent(SlotBanList[seq][1].BanTitle)); 
    $("#main_slot_banner ul li:last-child div.area_b a:nth-child(3) img").attr("alt", decodeURIComponent(SlotBanList[seq][2].BanTitle));
    $("#main_slot_banner ul li:last-child div.area_b a:nth-child(4) img").attr("alt", decodeURIComponent(SlotBanList[seq][3].BanTitle));
    $("#main_slot_banner ul li:last-child div.area_b a:nth-child(5) img").attr("alt", decodeURIComponent(SlotBanList[seq][4].BanTitle));
    $("#main_slot_banner ul li:last-child div.area_b a:nth-child(6) img").attr("alt", decodeURIComponent(SlotBanList[seq][5].BanTitle)); 
}
//E:---메인 슬롯-----------------------


//S:---베스트 셀러---------------------
function ShowBestSeller() {
    var template = "";
    template += "<li><span class='rank n${idx}'></span>";
    template += "   <a href='${link}'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${img}' class='thumb lazy'> ";
    template += "       <span class='title'>${item}</span>";
    template += "   </a>";
    template += "   {{if discount_rate != 0}}<span class='price'><del>￦${org_price}</del> <em class='sale'><strong>${discount_rate}</strong>% <span>OFF</span></em> ";
    template += "   {{else}}<span class='price'><del></del>{{/if}}";
    template += "   <strong>￦<span>${price}</span></strong> <strong class='second_price'>(${exchage_rate} ${currency})</strong></span>";
    template += "</li>";
    $.template("bestseller_itemslst", template);

    var json = "BestCate :[";
    var len = CateBestData[0].length;
    for (var i = 0; i < len; i++) {
        if (i > 49)
            break;

        var objItem = CateBestData[0][i];
        json += "{";
        json += "idx:'" + (i + 1) + "',";
        json += "item:'" + escapeHtml(objItem.gd_nm) + "',";
        json += "price:'" + setComma(objItem.price2) + "',";
        json += "org_price:'" + objItem.price1 + "',";
        json += "discount_rate:'" + objItem.rate.split(".")[0] + "',";
        json += "img:'" + objItem.img + "',";
        json += "link:'" + CornerUrl("Bestsellers/Category/All?itemId=" + objItem.gd_no) + "',";
        json += "exchage_rate:'" + EXCHANGE_RATE + "',";
        json += "currency:'" + setComma(ceiling(((RemoveComma(objItem.price2) * CURR_SELECT_CURRENCY)), CurrencyPoint)) + "'";
        json += "}";
        if ((i+1) < len && (i+1) < 50) json += ",";
        //console.log(escapeHtml(objItem.gd_nm));
    }
    json += "]";
    //console.log(escapeHtml(json));
    $("#main_slot_bestseller>ul").append($.tmpl("bestseller_itemslst", eval(json)));

    BannerSwipe("main_slot_bestseller");
}
//E:---베스트 셀러---------------------


function SuperDeal() {
    var charset = getGlobalCookie("charset");
    var superDealLink = "";
    var template = "";
    
    
    

    template += '{{if org_price != "0"}}';
    template += "<a href='${link}'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${img}' alt='' class='thumb lazy'> ";
    template += "   <span class='title'>${gd_nm}</span>";
    template += "</a>";
    
    template += "<span class='price'>";
    template += '{{if discount_rate != "0"}}';
    template += "<del>￦${org_price}</del> <em class='sale'><strong>${discount_rate}</strong>% <span>OFF</span></em> ";
    template += '{{else}}';
    template += "<del></del>";
    template += '{{/if}}';
    template += "<strong>￦<span>${price}</span></strong> <strong class='second_price'>(${exchage_rate} ${currency})</strong>";
    template += "</span>";

    template += '{{else}}';
    
    template += "<img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${img}' alt='' class='thumb lazy'> ";
    template += "   <span class='title'>${gd_nm}</span>";
    template += "";
    
    template += "<span class='price'>";
    template += '<span class="soldout">Sold Out</span>';
    template += "</span>";
    
    template += '{{/if}}';
    
    
    
    
    $.template("super_deal_item", template);
    
    for (var i = 0;i<SuperDealList.length;i++ ){
        var rank = SuperDealList[i].Rank;
        var objItem = SuperDealList[i];
        if (charset == "zhCN") {
            superDealLink = "http://item2.gmarket.co.kr/English/detailview/item.aspx?goodscode=" + objItem.GoodsCode;
        }
        else {
            superDealLink = "http://item2.gmarket.co.kr/English/detailview/item.aspx?goodscode=" + objItem.GoodsCode;
        }
        
        var json = "SuperDealItem :[";
        json += "{";
        json += "gd_nm:'" + escapeHtml(objItem.GoodsName) + "',";
        json += "link:'" + superDealLink + "',";
        json += "img:'" + objItem.Gd_Img + "',";
        json += "price:'" + setComma(objItem.DiscountPrice) + "',";
        json += "org_price:'" + setComma(objItem.Price) + "',";
        json += "discount_rate:'" + objItem.DiscountRate + "',";
        json += "exchage_rate:'" + EXCHANGE_RATE + "',";
        json += "currency:'" + setComma(ceiling(((parseInt(objItem.DiscountPrice) * CURR_SELECT_CURRENCY)), CurrencyPoint)) + "'";
        json += "}";
        json += "]";

        if ($("#super_deal_item" + rank).length > 0) {
            if (objItem.Price < 1) {
                $("#super_deal_item" + rank).addClass('soldout');
                if (charset == "zhCN") {
                    $("#super_deal_item" + rank).append('<span class="soldout">已售完</span>');
                }
                else {
                    $("#super_deal_item" + rank).append('<span class="soldout">Sold Out</span>');
                }
            }
            
            $("#super_deal_item" + rank).append($.tmpl("super_deal_item", eval(json)));
            $("#super_deal_item" + rank).show();
        }
    }
}

/*function SuperDealClassName(rank) {
    var classname = "";
    if (rank==1 || rank==2) {
        classname = "unit2";
    }
    else if (rank==3 || rank==4 || rank==5 || rand==10 || rand==11 || rand==12){
        classname = "unit3";
        if (rank==3 || rand==10) {
            classname = classname + " first";
        }
    }
    else if (rank==6 || rank==7 ||rank==8 ||rank==9 || rank==13 || rank==14 ||rank==15 ||rank==16){
        classname = "unit4";
    }
    return classname;
}*/

//S--- Brand List ---------------------------


//E--- Brand List ---------------------------


function Notice() {
    //news_event_area
    var Maxlength = 3;
    var noticeTitle;
    var notice_cnt = NoticeList.length;

    var template = "<li><a onclick=\"window.open(GlobalUrl('Popup/ListView?seq=${seq}&preListNo=1'), '', 'width=615, height=480');\"><strong>${type}</strong> ${title}</a></li>";
    
    $.template("noticelst", template);
    var json = "Notice :[";
    for (var i = 0; i < Maxlength; i++) {
        
        if (i < notice_cnt) {
			var NoticeName = (NoticeList[i].Type == "N") ? "NEWS" : "EVENT";
            noticeTitle = NoticeList[i].Txt.split("|");
            json += "{";
            json += "type:\"[" + NoticeName + "]\",";
            json += "title:\"" + noticeTitle[0] + "\",";
            json += "seq:\"" + NoticeList[i].Seq + "\"";
            json += "}";
            if (i != Maxlength - 1) json += ",";
        }
        else {
            json += "{";
            json += "type:\"\",";
            json += "title:\"\",";
            json += "seq:\"\"";
            json += "}";
            if (i != Maxlength - 1) json += ",";
        }
    }
    json += "]";
    $("#news_event_area ul").append($.tmpl("noticelst", eval(json)));
}

//S:--- 배너 -------------------------------------------
function showCateBottomBanner() {
    if (CateBottomBanner.length > 0) {
        var objItem = CateBottomBanner[0];
        var template = "<a href='" + objItem.Url + "'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='" + objItem.Img + "' class='thumb lazy' alt=''></a>";

        $("#cate_bottom_banner").append(template);
        $('#cate_bottom_banner>a>img').attr("alt", decodeURIComponent(objItem.Txt));
    }
}

function showCenterBanner() {
	if (CenterBanner.length > 0) {
        //center_banner
        var template = "";
        for (var i = 0; i < CenterBanner.length; i++) {
			var objItem = CenterBanner[i];
			//template = "<li><a href='" + objItem.Url + "'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='" + objItem.Img + "' alt='' class='thumb lazy'></a></li>";
			template = "<li><a href='" + objItem.Url + "'><img src='" + objItem.Img + "' data-original='" + objItem.Img + "' alt='' class='thumb lazy'></a></li>";
			$("#center_banner>ul").append(template);
			$("#center_banner>ul>li:last-child a img").attr("alt", decodeURIComponent(objItem.Txt));
        }
        BannerSwipe("center_banner");
    }
}
function showBottomBannerList() {
    //BottomBannerList
    //bottom_banner_list

    var Maxlength = 2;
    var template = "";

	for (var i = 0; i < BottomBannerList.length; i++) {
        if ((i+1) > Maxlength) {
            break;
        }         
        var objItem = BottomBannerList[i];

        template = "<a href='" + objItem.Url + "'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='" + objItem.Img + "' class='thumb lazy' alt=''></a>";
        $("#bottom_banner_list").append(template);
        $("#bottom_banner_list a:last-child img").attr("alt", decodeURIComponent(objItem.Txt));
    }
	
	
}
//E:--- 배너 ------------------------------------------


//S:--- 브랜드 리스트 ---------------------------------
function showBrandList() {
    var maxlen = 20;
    var charset = getGlobalCookie("charset");
    var template = "<li><a href='${Url}'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' alt='${Title}' class='thumb lazy'></a></li>";
    $.template("GlobalTheLookBrandList", template);
    var json = "BrandList :[";           
    for (var i=0;i<GlobalTheLookBrandList.length;i++) {
        var objItem = GlobalTheLookBrandList[i];
        var Url = ListingLink("TheLook/TheLookBrandItemList?BrandSeq=" + objItem.BrandSeq);
        var ImageUrl = '';
        var Title = '';
        if (charset == "zhCN") {
            ImageUrl = objItem.ZhImageUrl;
            Title = objItem.ZhTitle;
        }
        else {
            ImageUrl = objItem.EngImageUrl;
            Title = objItem.EngTitle;
        }
        json += "{";
        json += "Url" + ":'" + Url + "',";
        json += "ImageUrl" + ":'" + ImageUrl + "',";
        json += "Title" + ":'" + escapeHtml(Title) + "',";
        json += "}";
        if ((i + 1) < GlobalTheLookBrandList.length && (i + 1) < maxlen) json += ",";

        if ((i + 1) >= maxlen)
            break;
    }
    json += "]";

    $("#main_slot_brand>ul").append($.tmpl("GlobalTheLookBrandList", eval(json)));
    BannerSwipe("main_slot_brand");    
}
//E:--- 브랜드 리스트 ---------------------------------

//S:--- 더룩 배너 -------------------------------------

function TheLookBannerF() {
    $("#the_look_banner_f").append("<a href='/TheLook/TheLook' class='link fashion'>FASHION</a>");
    var Template1 = "<a href='${LnkUrl}' class='n1'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' width='231' height='390' alt='${Title}' class='${Lasy}'></a>";
    var Template2 = "<a href='${LnkUrl}' class='n2'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' width='231' height='259' alt='${Title}' class='${Lasy}'></a>";
    var Template3 = "<a href='${LnkUrl}' class='n3'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' width='231' height='259' alt='${Title}' class='${Lasy}'></a>";
    var Template4 = "<a href='${LnkUrl}' class='n4'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' width='231' height='390' alt='${Title}' class='${Lasy}'></a>";
    $.template("type1_template", Template1);
    $.template("type2_template", Template2);
    $.template("type3_template", Template3);
    $.template("type4_template", Template4);

    var typeSize1 = ["width=231 height=390", "width=231 height=259", "width=231 height=259", "width=231 height=390"];
    var typeSize2 = ["width=480 height=259", "width=231 height=186", "width=231 height=186", "width=231 height=390"];
    var typeLazy1 = ["thumb_sz2 lazy", "thumb_sz1 lazy", "thumb_sz1 lazy", "thumb_sz2 lazy"];
    var typeLazy2 = ["thumb_sz3 lazy", "thumb_sz4 lazy", "thumb_sz4 lazy", "thumb_sz2 lazy"];
    
    var classname = "item_list ";
    if (GlobalTheLookFashionBannerList.length > 0) {
        var imageSize;
        var lazy;
        if (GlobalTheLookFashionBannerList[0].Template == "B") {
            classname += " type2";
            imageSize = typeSize2;
            lazy = typeLazy2;
        }
        else {
            classname += " type1";
            imageSize = typeSize1;
            lazy = typeLazy1;
        }
        for (var i = 0; i < GlobalTheLookFashionBannerList.length; i++) {
            var objItem = GlobalTheLookFashionBannerList[i];
            var json = "Banner :[";
            json += "{";
            json += "LnkUrl:'" + objItem.LnkUrl + "',";
            json += "ImageUrl:'" + objItem.ImageUrl + "',";
            if (objItem.AreaNo == 1) {
                json += "Size:'" + imageSize[0] + "',";
                json += "Lasy:'" + lazy[0] + "',";
            }
            else if (objItem.AreaNo == 2) {
                json += "Size:'" + imageSize[1] + "',";
                json += "Lasy:'" + lazy[1] + "',";
            }
            else if (objItem.AreaNo == 3) {
                json += "Size:'" + imageSize[2] + "',";
                json += "Lasy:'" + lazy[2] + "',";
            }
            else if (objItem.AreaNo == 4) {
                json += "Size:'" + imageSize[3] + "',";
                json += "Lasy:'" + lazy[3] + "',";
            }
            json += "Title:'" + escapeHtml(objItem.Title) + "',";
            json += "}";
            json += "]";
            if (objItem.AreaNo == 1) {
                $("#the_look_banner_f").append($.tmpl("type1_template", eval(json)));
            }
            else if (objItem.AreaNo == 2) {
                $("#the_look_banner_f").append($.tmpl("type2_template", eval(json)));
            }
            else if (objItem.AreaNo == 3) {
                $("#the_look_banner_f").append($.tmpl("type3_template", eval(json)));
            }
            else if (objItem.AreaNo == 4) {
                $("#the_look_banner_f").append($.tmpl("type4_template", eval(json)));
            }
        }
    }
    classname += " area_a";
    $("#the_look_banner_f").attr("class", classname);
}

function TheLookBannerB() {
    $("#the_look_banner_b").append("<a href='/TheLook/TheLook?type=beauty' class='link beauty'>BEAUTY</a>");
    var Template1 = "<a href='${LnkUrl}' class='n1'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' ${Size} alt='${Title}' class='${Lasy}'></a>";
    var Template2 = "<a href='${LnkUrl}' class='n2'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' ${Size} alt='${Title}' class='${Lasy}'></a>";
    var Template3 = "<a href='${LnkUrl}' class='n3'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' ${Size} alt='${Title}' class='${Lasy}'></a>";
    var Template4 = "<a href='${LnkUrl}' class='n4'><img src='http://pics.gmarket.co.kr/pc/gc/shop/look/lazy.png' data-original='${ImageUrl}' ${Size} alt='${Title}' class='${Lasy}'></a>";
    $.template("type1_template", Template1);
    $.template("type2_template", Template2);
    $.template("type3_template", Template3);
    $.template("type4_template", Template4);

    var typeSize1 = ["width=231 height=390","width=231 height=259","width=231 height=259","width=231 height=390" ];
    var typeSize2 = ["width=480 height=259","width=231 height=186","width=231 height=186","width=231 height=390" ];
    var typeLazy1 = ["thumb_sz2 lazy", "thumb_sz1 lazy", "thumb_sz1 lazy", "thumb_sz2 lazy"];
    var typeLazy2 = ["thumb_sz3 lazy", "thumb_sz4 lazy", "thumb_sz4 lazy", "thumb_sz2 lazy"];
    
    var classname = "item_list ";
    if (GlobalTheLookBeautyBannerList.length > 0) {
        var imageSize;
        if (GlobalTheLookBeautyBannerList[0].Template == "B") {
            classname += " type2";
            imageSize = typeSize2;
            lazy = typeLazy2;
        }
        else {
            classname += " type1";
            imageSize = typeSize1;
            lazy = typeLazy1;
        }
        for (var i = 0; i < GlobalTheLookBeautyBannerList.length; i++) {
            var objItem = GlobalTheLookBeautyBannerList[i];
            var json = "Banner :[";
            
            json += "{";
            json += "LnkUrl:'" + objItem.LnkUrl + "',";
            json += "ImageUrl:'" + objItem.ImageUrl + "',";
            if (objItem.AreaNo == 1) {
                json += "Size:'" + imageSize[0] + "',";
                json += "Lasy:'" + lazy[0] + "',";
            }
            else if (objItem.AreaNo == 2) {
                json += "Size:'" + imageSize[1] + "',";
                json += "Lasy:'" + lazy[1] + "',";
            }
            else if (objItem.AreaNo == 3) {
                json += "Size:'" + imageSize[2] + "',";
                json += "Lasy:'" + lazy[2] + "',";
            }
            else if (objItem.AreaNo == 4) {
                json += "Size:'" + imageSize[3] + "',";
                json += "Lasy:'" + lazy[3] + "',";
            }
            json += "Title:'" + escapeHtml(objItem.Title) + "',";
            json += "}";
            json += "]";
            if (objItem.AreaNo == 1) {
                $("#the_look_banner_b").append($.tmpl("type1_template", eval(json)));
                json += "Title:'" + imageSize[1] + "',";
            }
            else if (objItem.AreaNo == 2) {
                $("#the_look_banner_b").append($.tmpl("type2_template", eval(json)));
                json += "Title:'" + imageSize[2] + "',";
            }
            else if (objItem.AreaNo == 3) {
                $("#the_look_banner_b").append($.tmpl("type3_template", eval(json)));
                json += "Title:'" + imageSize[3] + "',";
            }
            else if (objItem.AreaNo == 4) {
                $("#the_look_banner_b").append($.tmpl("type4_template", eval(json)));
                json += "Title:'" + imageSize[4] + "',";
            }
        }
    }
    classname += " area_b";
    $("#the_look_banner_b").attr("class", classname);
}

//E:--- 더룩 배너 -------------------------------------

//S--- util ----------------------------------
function convertUrlParm(seq) {
    var parm = "All";
    switch (seq) {
        case 0:
            parm = "All";
            break;
        case 1:
            parm = "Apparel";
            break;
        case 2:
            parm = "Accessories-Shoes";
            break;
        case 3:
            parm = "Beauty";
            break;
        case 4:
            parm = "Baby-Maternity";
            break;
        case 5:
            parm = "Food";
            break;
        case 6:
            parm = "Furniture-Bedding";
            break;
        case 7:
            parm = "Home-Health";
            break;
        case 8:
            parm = "Sports-Motors";
            break;
        case 9:
            parm = "Electronics";
            break;
        case 10:
            parm = "Books-Music";
            break;
        case 11:
            parm = "Stationery-Hobbies";
            break;
        default:
            parm = "All";
            break;
    }
    return parm;
}

function RemoveComma(str) {
    return parseInt(str.replace(/,/g, ""));
}

function setComma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';
    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

var regExp = /<\/?[^>]+>/gi;
function replaceTags(html) {
    var text;
    text = html.replace(regExp, "");
    return text;
}

function ceiling(n, pos) {
    var digits = Math.pow(10, pos);

    var num = Math.ceil(n * digits) / digits;

    return num.toFixed(pos);
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
//E--- util ----------------------------------

//S--- top banner ---------------------------
/* rm success */
function topBannerShow() {
    if (PromotionBannerList.length > 0 && getCookie("globalMainTopBannerYN") == null) {
        var image, background;
        if (PromotionBannerList[0].Img.split('^').length > 1) {
            image = PromotionBannerList[0].Img.split('^')[0];
            background = PromotionBannerList[0].Img.split("^")[1];
        }
        else {
            image = PromotionBannerList[0].Img;
            background = '';
        }
        var Template = ''
        if (background == '') {
            Template += '<div class="adArea" id="topbanner">';
        }
        else {
            Template += '<div class="adArea" id="topbanner" style="width:100%;height:70px;background:url(' + background + ') no-repeat 50% 0">';
        }
        Template += '   <a href="' + PromotionBannerList[0].Url + '" class="bnr_ad" target="_blank" title="New Window"><img src="' + image + '" alt="" width="980px" height="70px"></a>';
        Template += '   <div class="linkContainer">';
        Template += '       <a href="javascript:topBannerClose();" class="top_bnn_close"><span class="btn_bnn_close">닫기</span></a>';
        Template += '   </div>'
        Template += '</div>'
        $('#homemain').prepend(Template);
        $('#homemain>div>a>img').attr("alt", decodeURIComponent(PromotionBannerList[0].Txt));
    }
}

function topBannerClose() {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + parseInt(1));
    expireDate.setHours(0, 0, 0);
    setCookieExpire("globalMainTopBannerYN", "Y", expireDate);
    $("#topbanner").hide();
}

function setCookieExpire(cookieName, cookieValue, expireDate) {
    document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + expireDate.toGMTString() + ";";
}

function getCookie(name) {
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        start = dc.indexOf(cname);
        if (start != -1) {
            start += cname.length;
            end = dc.indexOf(";", start);
            if (end == -1) end = dc.length;
            return decodeURIComponent(dc.substring(start, end));
        }
    }
    return null;
}
//E--- top banner ---------------------------