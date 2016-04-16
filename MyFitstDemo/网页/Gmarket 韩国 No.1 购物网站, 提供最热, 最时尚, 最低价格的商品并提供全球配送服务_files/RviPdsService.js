// PDS webservice
var PdsService = {
    __pdsUrl: ((location.protocol.toLowerCase() == 'https:') ? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'), 	// prod
    /*
    Private Functions
    */
    _send: function(url) {
        var imgTag = document.createElement('img');
        imgTag.src = url;
    },
    _sendJsonp: function(url, data, callback, altJsonpCallback) {
        var xhr = jQuery.ajax({
            url: url
			, data: data
			, type: "GET"
			, jsonpCallback: altJsonpCallback
			, scriptCharset: "UTF-8"
			, contentType: "application/javascript; charset=utf-8"
			, dataType: "jsonp"
			, async: false
			, crossdomain: true
			, error: function(req, err) {
			    if (typeof Logger !== 'undefined') {
			        Logger.LoggingMsg(err.error);
			    }
			}
			, success: function(replies) {
			    if (callback) {
			        callback(replies);
			    }
			}
        });
    },
    _param: function(obj) {
        var ret = '';
        var tList = [];
        if (typeof obj === 'object') {
            for (var e in obj) {
                tList.push(e + '=' + PdsService._encodeUri(obj[e]));
            }
            ret = tList.join('&');
        }
        return ret;
    },
    _encodeUri: function(value) {
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
    },

    /*
    Public Functions
    */
    /*
    Get Rvi Version 1
    @param {function} callback
    @return {list}
    */
    getRvi: function(callback) {
        PdsService._sendJsonp(
			PdsService.__pdsUrl + '/rvi/get/1',
			{},
			callback,
			'getRvi'
		);
    },
    /*
    Get Rvi Version 2
    @param {function} callback
    @param {object} optionalData
    @return {list}
    */
    getRviV2: function(callback, optionalData) {
        var data = {};
        if (typeof optionalData === 'object') {
            data = optionalData;
        }
        PdsService._sendJsonp(
			PdsService.__pdsUrl + '/rvi/get/2',
			data,
			callback,
			'getRviV2'
		);
    },
    /*
    Add one Rvi
    @param {string or number} itemNo
    */
    addRvi: function(itemNo, optional) {
        PdsService._send(PdsService.__pdsUrl + "/rvi/add/1/" + itemNo + '?' + PdsService._param(optional));
    },
    /*
    Remove one or multiple Rvi
    @param {list or string or number} itemNos
    */
    removeRvi: function(itemNos) {
        PdsService._send(PdsService.__pdsUrl + '/rvi/remove/1/0?itnos=' + ((typeof itemNos === 'object' && itemNos.join) ? PdsService._encodeUri(itemNos.join(',')) : itemNos));
    },
    /*
    Remove all rvi
    @param {string or number} itemNo
    */
    removeAllRvi: function() {
        PdsService._send(PdsService.__pdsUrl + '/rvi/removeall/1/');
    }
};


//RVI
function GGoods(goodsCode, goodsName, goodsImgPath, goodsPrice, goodsKind, adultYn) {
    this.code = goodsCode;
    this.name = goodsName;
    this.img = goodsImgPath;
    this.price = goodsPrice;
    this.regdate = "";
    this.adultyn = adultYn;
    this.kind = goodsKind;
}

function RVI() { }
RVI.maxCount = 50;
RVI.retryCount = 0;
RVI.totalCount = 0;
RVI.currPage = 1;
RVI.totalPage = 1;
RVI.isDisplayToIac = false;
RVI.isItempage = false;
RVI.GoodsArr = new Array();

RVI.wingCallback = function() { };

RVI.getRviV2Callback = function(data) {
    try {

        RVI.GoodsArr = new Array();

        for (var i = 0; i < data.ItemList.length; i++) {
            var retGoods = new GGoods();
            retGoods.code = data.ItemList[i].gdno;
            retGoods.name = "";
            retGoods.img = RVI.getImagePathImageTypeSS(data.ItemList[i].gdno, data.ItemList[i].isAdult);
            retGoods.price = "";
            retGoods.adultyn = data.ItemList[i].isAdult;
            retGoods.kind = "1";
            RVI.GoodsArr[i] = retGoods;
        }

        if (typeof (RVI.wingCallback) != "undefined") {
            RVI.wingCallback();
        }
    }
    catch (e) { }
}

RVI.loadGoods = function(wingCallback) {
    //if (RVI.IsLoadedGoods()) return;
    RVI.wingCallback = wingCallback;
    PdsService.getRviV2(RVI.getRviV2Callback, { rtype: 'obj' });
}

RVI.getGoodsCount = function() {
    return RVI.GoodsArr.length;
}

RVI.IsLoadedGoods = function() {
    if (RVI.GoodsArr.length > 0) return true;
    return false;
}

RVI.addGoods = function(goodsCode, adultYN) {
    var isAdult = (adultYN == "Y") ? 1 : 0;
    PdsService.addRvi(goodsCode, { adt: isAdult }); 	// adult product
}

RVI.modifyGoods = function(goodsCode, goodsName, price) {
    var goods = new GGoods();
    goods.code = goodsCode;
    goodsName = goodsName.replace(/\=/g, "").replace(/\"/g, "").replace(/\'/g, "").replace(/\″/g, "");  // =  '  " ″ 문자 제거
    goods.name = (goodsName.length > 20) ? goodsName.substring(0, 20) : goodsName;
    goods.price = price + '';

    for (var i = 0; i < RVI.GoodsArr.length; i++) {
        if (RVI.GoodsArr[i].code == goods.code) {
            if (goods.name.length > 0)
                RVI.GoodsArr[i].name = goods.name;
            if (goods.price.length > 0)
                RVI.GoodsArr[i].price = goods.price;
            break;
        }
    }
}

RVI.deleteGoods = function(goodsCode) {

    PdsService.removeRvi(goodsCode);

    var tmpGoodsArr = RVI.GoodsArr;
    var j = 0;
    RVI.GoodsArr = new Array();
    for (var i = 0; i < tmpGoodsArr.length; i++) {
        if (goodsCode != tmpGoodsArr[i].code) {
            var retGoods = new GGoods();
            retGoods.code = tmpGoodsArr[i].code;
            retGoods.name = tmpGoodsArr[i].name;
            retGoods.img = tmpGoodsArr[i].img;
            retGoods.price = tmpGoodsArr[i].price;
            retGoods.adultyn = tmpGoodsArr[i].adultyn;
            retGoods.kind = tmpGoodsArr[i].kind;
            RVI.GoodsArr[j] = retGoods;
            j++;
        }
    }
}

RVI.getPageGoodsArr = function(pageNo, pageSize) {
    try {
        var ret = new Array();

        if (!RVI.IsLoadedGoods())
            RVI.loadGoods();

        var totalGoodsCount = RVI.getGoodsCount();
        RVI.totalPage = (totalGoodsCount % pageSize) == 0 ? parseInt(totalGoodsCount / pageSize) : parseInt(totalGoodsCount / pageSize) + 1;
        if (pageNo > RVI.totalPage) {
            pageNo = RVI.totalPage;
            RVI.currPage = RVI.totalPage;
        }
        var tStartPoint = Math.min(parseInt((pageNo - 1) * pageSize), totalGoodsCount);
        var tEndPoint = Math.min(parseInt(pageNo * pageSize), totalGoodsCount);

        for (i = 0; i < (tEndPoint - tStartPoint); i++) {
            if (RVI.GoodsArr[(tStartPoint + i)] != null)
                ret[i] = RVI.GoodsArr[(tStartPoint + i)];
        }
        return ret;
    } catch (e) { }
}

RVI.getNextPageGoodsArr = function(pageSize) {
    try {
        if (!RVI.IsLoadedGoods())
            RVI.loadGoods();

        var totalGoodsCount = RVI.getGoodsCount();
        RVI.totalPage = (totalGoodsCount % pageSize) == 0 ? parseInt(totalGoodsCount / pageSize) : parseInt(totalGoodsCount / pageSize) + 1;

        if (RVI.currPage == RVI.totalPage)
            RVI.currPage = 1;
        else
            RVI.currPage = RVI.currPage + 1;

        var ret = RVI.getPageGoodsArr(RVI.currPage, pageSize);
        return ret;
    } catch (e) { }
}

RVI.getPrevPageGoodsArr = function(pageSize) {
    try {
        if (!RVI.IsLoadedGoods())
            RVI.loadGoods();

        var totalGoodsCount = RVI.getGoodsCount();
        RVI.totalPage = (totalGoodsCount % pageSize) == 0 ? parseInt(totalGoodsCount / pageSize) : parseInt(totalGoodsCount / pageSize) + 1;
        if (RVI.currPage == 1)
            RVI.currPage = RVI.totalPage;
        else
            RVI.currPage = RVI.currPage - 1;

        var ret = RVI.getPageGoodsArr(RVI.currPage, pageSize);
        return ret;
    } catch (e) { }
}

RVI.setCookie = function(name, value) {
    document.cookie = name + "=" + escape(value) + "; domain=gmarket.co.kr; path=/;";
}

RVI.getImagePathImageTypeSS = function(sGoodsCode, sAdultYN) {
    try {
        if (sAdultYN == "1")
            return "http://image.gmarket.co.kr/challenge/neo_image/adult_img/n_19_80.gif";
        else {
            var temp = "";
            var NAS_SERVER_URL = "";

            if (sGoodsCode == "") {
                temp = "http://image.gmarket.co.kr/challenge/neo_image/no_image.gif";
            }
            else if (sGoodsCode < 115905000) {
                NAS_SERVER_URL = "http://goodsimg.gmarket.co.kr/";
                temp = NAS_SERVER_URL + "goods_image2/small_jpgimg/" + sGoodsCode.slice(-2) + "/" + sGoodsCode + ".jpg";
            }
            else {
            	NAS_SERVER_URL = "http://gdimg.gmarket.co.kr/";
            	temp = NAS_SERVER_URL + "goods_image2/small_jpgimg/" + sGoodsCode.slice(0, 3) + "/" + sGoodsCode.slice(3, 6) + "/" + sGoodsCode + ".jpg";
            }

            return temp;
        }
    } catch (e) { }
}