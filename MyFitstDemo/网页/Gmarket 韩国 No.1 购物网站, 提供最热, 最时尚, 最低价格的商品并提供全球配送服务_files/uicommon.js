// Main Banner --> cpp
function bnnSliderInit() {
	$("#main_banner").slides({
		 preload: true,
		 navigation: true,
		 play: 5000,
		 hoverPause: true,
		 generatepaginate: true,
		 generateNextPrev:true
	});
}
$(function () { 
	if(window.addEventListener){
		window.addEventListener("resize", media_action, false);
	}else if(window.attachEvent){
		window.attachEvent("onresize", media_action);
	}
	media_action();
	generalCommon();
	if($("body").attr("id") === "homemain"){
		//js_random_swipe(".swipe");//메인 swipe 배너
		homemainGnb();
	}else if($("body").attr("id") === "sub"){
		subPage();
	}else if($("body").attr("id") === "myg"){
		myg();	
	}else{
		var article = (".faq .tr_show");
		$(".faq .th_cell a.question").click(function() {
			$(".doc .contents").hide();
			var myArticle =$(this).parents().next("tr");
			if($(myArticle).hasClass('hide')) {
				$(article).removeClass('tr_show').addClass('hide');
				$(myArticle).removeClass('hide').addClass('tr_show');
			}
			else {
				$(myArticle).addClass('hide').removeClass('tr_show');
			}
		});
		$(".doc .btn .m_bl").click(function() {
			if ($(".doc .contents").css("display") == "none") {
				$(".doc .contents").show();
				$(".doc .contents .right .m_gr").click(function() {
					$(".doc .contents").hide();
				});
			}
		});

		//고객센터 faq
		var article = $('#faq_board .article dl.a');
	    article.addClass('hide');
	    article.find('dl.a').slideUp(100);

		$("#faq_board .article .trigger").click(function() {
			var hitBg = $(this);
			var myArticle = $(this).parents('p.q').siblings('dl.a');
			if(myArticle.hasClass('hide')){
				article.addClass('hide').removeClass('show');
				article.find('.a').slideUp(100);
				myArticle.removeClass('hide').addClass('show');
				myArticle.find('.a').slideDown(100);
				hitBg.css('background-position','120% -795px');
			} else {
				myArticle.removeClass('show').addClass('hide');
				myArticle.find('.a').slideUp(100);
				hitBg.css('background-position','120% -745px');
			}
		});

		//로그인 인풋 활성화
		var in_focus = $('.login_box input[type="text"]');
		in_focus.focusin(function(){
			$(this).addClass('focus');
			$(this).siblings('label').css('background-position',' right -150px');
		}).focusout(function(){
			if ($(this).val()){
				$(this).removeAttr('class');
			}
			$(this).removeClass('focus');
			$(this).siblings('label').css('background-position','right -50px');
		});
		//로그인 패스워드 인풋 활성화
		var pw_focus = $('.login_box input[type="password"]');
		pw_focus.focusin(function(){
			$(this).addClass('focus');
			$(this).siblings('label').css('background-position',' right -150px');
		}).focusout(function(){
			if ($(this).val()){
				$(this).removeAttr('class');
			}
			$(this).removeClass('focus');
			$(this).siblings('label').css('background-position','right -50px');
		});

		//infosteal-box 인풋 활성화
		var steal_focus = $('.infosteal-box input[type="password"]');
		steal_focus.focusin(function(){
			$(this).addClass('focus');
			$(this).parent('span').addClass('hover');
		}).focusout(function(){
			if ($(this).val()){
				$(this).removeAttr('class');
			}
			$(this).removeClass('focus');
			$(this).parent('span').removeClass('hover');
		});

		$(".cp_table tbody tr td ul li input").click(function(){
		  if($(this).is(":checked") == true){
			 $(".cp_table tbody tr td ul li input").siblings("label").css({"font-weight":"normal"});
			 $(".cp_table tbody tr td ul li input:checked+label").css({ "font-weight": "bold" });
		  }else{
			 $(this).parent().find("label").css({"font-weight":"normal"});
		  }
		});
	}

	$("#homemain .swipe .item_list").on("click touchend", "a", function(e) {
		var el = $(this);
		var link = el.attr('href');
		window.location = link;
	});

}); //jQuery

function media_action(){
	var winWidth = $("body").width();
	var wide = $("body");
	var wing = $("div#wing");
	if($("body").attr("id") === "homemain"){
		return false;
	}else{
		if(winWidth<=1200) {
			wide.removeClass("wide");
			wing.addClass("close").find("span.button_toggle").show();			
		}else{
			wide.addClass("wide");
			wing.removeClass("close").find("span.button_toggle").hide();
			$(".power_cont > ul > li.on").trigger("focusin");
		}
	}
}

function categoryView(){	
	$("#all_category .all").bind("click", function(e){
		e.preventDefault();		
		var current = $(this),
			target = current.attr("href");
		if(current.hasClass("active")){
			current.removeClass("active").focus();
			$(target).slideUp("500");
		}else{
			current.addClass("active");
			$(target).slideDown("500");				
			$(target + " .button.close").bind("click", function(e){
				e.preventDefault();		
				current.removeClass("active").focus();
				$(target).slideUp("500");
			});
		}
	});
}

function generalCommon() {
	//All Categories
	categoryView();
	$("#wing span.button_toggle").bind("click focusin", function (){
		if($(this).parent("#wing").hasClass("close")){
			$(this).parent("#wing").removeClass("close");
			$(this).find("a").html("Close");
		} else {
			$(this).parent("#wing").addClass("close");
			$(this).find("a").html("Open");
		}
		return false;
	});	
	
	Search.run();

	if($("body").attr("id") != "homemain"){
		$("#gnb > li > a, .path > li > a, .sel > li > a").each(function (index){
			//$('.utill > li.myg span.arrow').css('cursor', 'pointer');
			$(this).bind("click", function () {
				if($(this).next(".subnav, .layer").is(":hidden")) {
					$("#gnb > li .subnav, .path > li ul.layer, .sel > li ul.layer").hide();
					$(this).next(".subnav, .layer").show();
					$("#gnb > li, .path > li, .sel > li, .opt > li").removeClass("active");
					$(this).parent("li").addClass("active");
				} else {
					$(this).next(".subnav, .layer").hide();
					$("#gnb > li, .path > li, .sel > li").removeClass("active");
				}
			});
		});
		$("#gnb > li .subnav span.close, #gnb > li .subnav .button_close").bind("click", function (e) {
			e.preventDefault();
			$("#gnb > li .subnav").hide();
		});
	}

	//셀렉트
	$(".ly_opt").prev().click(function(){
		if (!$(this).parent().hasClass("active")){
			$(this).next().show();
			$(this).parent().addClass("active");
		}else{
			$(this).next().hide();
			$(this).parent().removeClass("active");
		}
	})
	$(".ly_opt_only").click(function(){
		if (!$(this).hasClass("active")){
			$(".ly_opt_only ul").hide();
			$(this).find("ul").show();
			$(this).addClass("active");
		}else{
			$(".ly_opt_only ul").hide();
			$(".ly_opt_only").removeClass("active");
		}
	});
}//generalCommon

Search = (function ($) {
	var updateSearchInContent = function () {
		$("#search_cate_word").text($("#search_dropdown a.active").text());
		$("#search_cate_word").removeAttr("class");
		if($("#search_cate_word").width() < 100 ){
			$("#search_cate_word").addClass("wauto");
		} else{
			$("#search_cate_word").addClass("w100");
		}
		var newPaddingLeft = $("#search_cate").outerWidth() + 6;
		$("#searchfield_in").css({
			paddingLeft: newPaddingLeft
		});
	};
	var bindChangeHandler = function () {
		$("#search_cate").bind("click", function(){
			$("#search_dropdown").toggleClass("active");
		});
		$("#search_dropdown a").bind("click", function(){
			$("#search_dropdown a").removeClass("active");
			$(this).addClass("active");
			updateSearchInContent();
		});
	};
	var run = function () {
		bindChangeHandler();
	};
	return {
		run: run
	};
})(jQuery);

function homemainGnb(){
	$("#gnb>li>a").bind("click", function(e){
		e.preventDefault();		
		var current = $(this).parent(),
			sublayer = current.find("a").attr("href");
		if(current.hasClass("active")){
			current.removeClass("active");
			$(sublayer).hide();
		}else{
			$("#gnb>li").removeClass("active").find(".subnav").hide();
			current.addClass("active");
			$(sublayer).show();				
			$(sublayer + " .button_close").bind("click", function(e){
				e.preventDefault();		
				$(sublayer).hide();
				current.removeClass("active").find("a").focus();
			});
		}
	});
}

function js_random_swipe(selector) {
	$(selector).each(function(index){
		$(this).attr("id", "js_random_swipe" + (index+1));
		targetID = "#js_random_swipe" + (index + 1);
		$(targetID + " >ul").carouFredSel({
			auto: false,
			swipe		: {
				onTouch		: true,
				onMouse		: true
			},
			items : {
				start: "random"
			},
			pagination: targetID + " .paginate",
			prev: {
				button: targetID + " .button_prev",
				key:"left"	
			},
			next: {
				button: targetID + " .button_next",
				key:"right"	
			}
		})
	});
}//js_random_swipe

function subPage(){
	$('#sub #container .aside h3 a').bind("click", function(){
		$item = $("#sub #container .aside h3 a");
		if ($("#sub #container .aside .sch_2").css("display") == "none") {
			$item.addClass("active");
			$("#sub #container .aside .sch_2").show();
		} else {
			$item.removeClass("active");
			$("#sub #container .aside .sch_2").hide();
		}
	});
	$('.m_seller_info .memo a').bind("click", function(){
		$item = $(".seller_info .memo");
		if (!$(this).hasClass('active')) {
			$item.addClass("active");
		} else {
			$item.removeClass("active");
		}
	});
	$('div.power_list>div.power_cont>ul>li').bind("mouseenter focusin", function(){
		if (!$(this).hasClass('on')) {
			$item = $('div.power_list>div.power_cont>ul>li.on');
			$item.removeClass('on');
			$($item).find('span.img>a>img:eq(1)').hide();
			$($item).find('span.img>a>img:eq(0)').show();

			$(this).addClass('on');
			$(this).find('span.img>a>img:eq(0)').hide();
			$(this).find('span.img>a>img:eq(1)').show();
		}
	});
}//subPage

function myg(){
	$('#button_mysearch').bind("mouseenter focusin", function(){
		if ($("div.my_search .ly_mysearch").css("display") == "none") {
			$(".ly_mysearch").show();
		} else {
			$(".ly_mysearch").hide();
		}
	});
	$("#button_mysearch").bind("mouseleave focusout", function () {
		$(".ly_mysearch").hide();
	});

	//관심상품 그룹 추가 김태중 2013.08.20
	function groupOpen(selector) {
		var groupList = $(selector);
		if (groupList.length) {
			var items = groupList.find('li'),
				editForms = items.find('.edit_form');
			items.each(function () {
				var openForm = $(this).find('.view_form'),
					editForm = $(this).find('.edit_form'),
					openFormBtn = $(this).find('.view_form a.m_lbl1'),
					closeFormBtn = $(this).find('.edit_form a.m_wh');
				editForm.hide();
				openFormBtn.bind('click', function (e) {
					e.preventDefault();
					editForm.show();
					openForm.hide();
				});
				closeFormBtn.bind('click', function (e) {
					e.preventDefault();
					editForm.hide();
					openForm.show();
				});
			});
		}
	}
}//myg


window.onload=function(){
	var wingstart=document.getElementById("wing");
	if ($("body").find("div#wing").length == 1) {//#wing이 있을경우만 호출
		var topHeight = document.getElementById("utill").offsetHeight + document.getElementById("header").offsetHeight;
	} else {}

	if(wingstart) {
		if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
			wingscroll6();
		}
		function wingscroll6() {
			var maxtop = topHeight;
			var body = document.getElementById("wrap");
			var newtop = (body) ? -(body.offsetTop +topHeight - 10) : topHeight - 10; //ie6 스크롤시 top 여백조절
			var sct = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
			if (sct <= 0) rv = maxtop;
			else {
				var top = maxtop - sct;
				rv = (top > newtop) ? top : newtop;
			}
			var botm = 330;
			var sch = (document.body.scrollHeight) ? document.body.scrollHeight - botm : document.documentElement.scrollHeight - botm;
			if (body) sch = sch;
			var returnv = ((sct + rv) > sch) ? sch : sct + rv;
			wingstart.style.top=(returnv < (topHeight - 0)) ? (topHeight - 0) + "px" : returnv + "px";
		}
		function wingscroll() {
			var wing=document.getElementById("wing");
			if(wing){
				var body=document.getElementById("wrap");
				if ($('#wing').hasClass("lp") == true){
				var maxtop=0;
				}else{
				var maxtop=topHeight;
					//2015-01-19 #super_deal_wrap 추가
					if( $("#super_deal_wrap").length == 1){
						var maxtop=topHeight + document.getElementById("super_deal_top_wrap").offsetHeight;
					} else if ( $("#topbanner").length == 1){
						var maxtop=topHeight + document.getElementById("topbanner").offsetHeight;
					}  //WPR-450 메인배너추가 후_2014-11-07
				}// lp에서 ie7 윙이 하단으로 가도록 조건부 스크립트 처리 2014-04-22 하현수추가
				var newtop=(body)? -(body.offsetTop-5) : 5;
				var sct=(document.body.scrollTop)? document.body.scrollTop : document.documentElement.scrollTop;
				var sch=document.documentElement.scrollHeight;
				if(sct<=topHeight){
					wing.style.position="absolute";
					wing.style.top=maxtop+"px";
					wing.style.marginTop="0";
				}else{
					var top = 5;
					wing.style.position="fixed";
					wing.style.top= 0 +"px";
					wing.style.right = "50%";
					var foot = (document.getElementById('footer')) ? document.getElementById('footer') : null;
					if (foot == null) {
						//alert('footer');
						return false;
					}
					var sct = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
					var sch = document.documentElement.scrollHeight;
					rtnChk = sch - sct - foot.offsetHeight;
					var btmSize = 65;	//container와 footer의 간격 - 실제 wing이 멈추는 값
					if (wing.offsetHeight+btmSize > rtnChk) {
						wing.style.marginTop = (top - (wing.offsetHeight - rtnChk) - btmSize) + 'px';
					}
					else {
						wing.style.marginTop = top + 'px';
					}
				}
			}
		}
		function scrolling(){
			if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
				wingscroll6();
			} else {
				wingscroll();
			}
		}
		if(window.addEventListener){
			window.addEventListener("scroll", scrolling, false);
		}else if(window.attachEvent){
			window.attachEvent("onscroll", scrolling);
		}
	}
}//wing action

function gnb(dep1, dep2){
	var time;
	var gnb_wrap      = $("#gnb");
	var gnb_1dep      = $("#gnb > li");
	var gnb_1dep_menu = $("#gnb > li > a");
	var gnb_2dep      = $("#gnb > li > div");
	var gnb_2dep_li   = $("#gnb > li > div > ul > li");
	var gnb_2dep_menu = $("#gnb > li > div > ul > li > a");
	var gnb_last_menu = $("#gnb > li:last-child li:last-child a");

	gnb_1dep_menu.bind( 'mouseleave' , function(){
		time = setTimeout(function(){
			gnb_reset();
		}, 500)
	});

	function gnb_reset(){
		gnb_1dep.removeClass("active");
		gnb_2dep.hide();
		gnb_2dep.find("li").removeClass("active");

		if (dep1) {
			gnb_1dep.eq(dep1-1).addClass("active");


			if (dep2) {
				gnb_1dep.eq(dep1-1).find("ul > li").eq(dep2-1).addClass("active");
			};
		}

	}

	gnb_reset();

	gnb_1dep_menu.bind("focus mouseover",function(){

		clearTimeout(time);
		gnb_1dep.removeClass("active");
		gnb_2dep.hide();
		$(this).parent().addClass("active");
		$(this).next().show();

	})

	gnb_last_menu.bind("blur",function(){
		gnb_reset();
	})
	gnb_2dep.bind("mouseenter",function(){
		clearTimeout(time);
	})
	gnb_2dep.bind("blur mouseleave",function(){
		time = setTimeout(function(){
			gnb_reset();
		}, 500)
	})
}//gnb

//swipe plugin
(function ($) {
	$.fn.swipe = function (options) {
		if(!this) return false;
		var defaults = {
			fingers: 1,
			threshold: 75,
			swipe: null,
			swipeLeft: null,
			swipeRight: null,
			swipeUp: null,
			swipeDown: null,
			swipeStatus: null,
			click: null,
			triggerOnTouchEnd: true,
			allowPageScroll: "auto"
		};
		//Constants
		var LEFT = "left";
		var RIGHT = "right";
		var UP = "up";
		var DOWN = "down";
		var NONE = "none";
		var HORIZONTAL = "horizontal";
		var VERTICAL = "vertical";
		var AUTO = "auto";
		var PHASE_START = "start";
		var PHASE_MOVE = "move";
		var PHASE_END = "end";
		var PHASE_CANCEL = "cancel";
		var hasTouch = "ontouchstart" in window,
			START_EV = hasTouch ? "touchstart" : "mousedown",
			MOVE_EV = hasTouch ? "touchmove" : "mousemove",
			END_EV = hasTouch ? "touchend" : "mouseup",
			CANCEL_EV = "touchcancel";
		var phase = "start";
		if(options.allowPageScroll == undefined && (options.swipe != undefined || options.swipeStatus != undefined))
			options.allowPageScroll = NONE;
		if(options)
			$.extend(defaults, options);

		return this.each(function () {
			var that = this;
			var $this = $(this);
			var triggerElementID = null;
			var fingerCount = 0;
			var start = {
				x: 0,
				y: 0
			};
			var end = {
				x: 0,
				y: 0
			};
			var delta = {
				x: 0,
				y: 0
			};

			function touchStart(event) {
				var evt = hasTouch ? event.touches[0] : event;
				phase = PHASE_START;
				if(hasTouch) {
					fingerCount = event.touches.length;
				}
				distance = 0;
				direction = null;
				if(fingerCount == defaults.fingers || !hasTouch) {
					start.x = end.x = evt.pageX;
					start.y = end.y = evt.pageY;
					if(defaults.swipeStatus)
						triggerHandler(event, phase);
				} else {
					touchCancel(event);
				}
				that.addEventListener(MOVE_EV, touchMove, false);
				that.addEventListener(END_EV, touchEnd, false);
			}

			function touchMove(event) {
				if(phase == PHASE_END || phase == PHASE_CANCEL)
					return;
				var evt = hasTouch ? event.touches[0] : event;
				end.x = evt.pageX;
				end.y = evt.pageY;
				direction = caluculateDirection();
				if(hasTouch) {
					fingerCount = event.touches.length;
				}
				phase = PHASE_MOVE
				validateDefaultEvent(event, direction);
				if(fingerCount == defaults.fingers || !hasTouch) {
					distance = caluculateDistance();
					if(defaults.swipeStatus)
						triggerHandler(event, phase, direction, distance);
					if(!defaults.triggerOnTouchEnd) {
						if(distance >= defaults.threshold) {
							phase = PHASE_END;
							triggerHandler(event, phase);
							touchCancel(event);
						}
					}
				} else {
					phase = PHASE_CANCEL;
					triggerHandler(event, phase);
					touchCancel(event);
				}
			}

			function touchEnd(event) {
				event.preventDefault();
				distance = caluculateDistance();
				direction = caluculateDirection();
				if(defaults.triggerOnTouchEnd) {
					phase = PHASE_END;
					if((fingerCount == defaults.fingers || !hasTouch) && end.x != 0) {
						if(distance >= defaults.threshold) {
							triggerHandler(event, phase);
							touchCancel(event);
						} else {
							phase = PHASE_CANCEL;
							triggerHandler(event, phase);
							touchCancel(event);
						}
					} else {
						phase = PHASE_CANCEL;
						triggerHandler(event, phase);
						touchCancel(event);
					}
				} else if(phase == PHASE_MOVE) {
					phase = PHASE_CANCEL;
					triggerHandler(event, phase);
					touchCancel(event);
				}
				that.removeEventListener(MOVE_EV, touchMove, false);
				that.removeEventListener(END_EV, touchEnd, false);
			}

			function touchCancel(event) {
				fingerCount = 0;
				start.x = 0;
				start.y = 0;
				end.x = 0;
				end.y = 0;
				delta.x = 0;
				delta.y = 0;
			}

			function triggerHandler(event, phase) {
				if(defaults.swipeStatus)
					defaults.swipeStatus.call($this, event, phase, direction || null, distance || 0);
				if(phase == PHASE_CANCEL) {
					if(defaults.click && (fingerCount == 1 || !hasTouch) && (isNaN(distance) || distance == 0))
						defaults.click.call($this, event, event.target);
				}
				if(phase == PHASE_END) {
					if(defaults.swipe) {
						defaults.swipe.call($this, event, direction, distance);
					}
					switch(direction) {
					case LEFT:
						if(defaults.swipeLeft)
							defaults.swipeLeft.call($this, event, direction, distance);
						break;
					case RIGHT:
						if(defaults.swipeRight)
							defaults.swipeRight.call($this, event, direction, distance);
						break;
					case UP:
						if(defaults.swipeUp)
							defaults.swipeUp.call($this, event, direction, distance);
						break;
					case DOWN:
						if(defaults.swipeDown)
							defaults.swipeDown.call($this, event, direction, distance);
						break;
					}
				}
			}

			function validateDefaultEvent(event, direction) {
				if(defaults.allowPageScroll == NONE) {
					event.preventDefault();
				} else {
					var auto = defaults.allowPageScroll == AUTO;
					switch(direction) {
					case LEFT:
						if((defaults.swipeLeft && auto) || (!auto && defaults.allowPageScroll != HORIZONTAL))
							event.preventDefault();
						break;
					case RIGHT:
						if((defaults.swipeRight && auto) || (!auto && defaults.allowPageScroll != HORIZONTAL))
							event.preventDefault();
						break;
					case UP:
						if((defaults.swipeUp && auto) || (!auto && defaults.allowPageScroll != VERTICAL))
							event.preventDefault();
						break;
					case DOWN:
						if((defaults.swipeDown && auto) || (!auto && defaults.allowPageScroll != VERTICAL))
							event.preventDefault();
						break;
					}
				}
			}

			function caluculateDistance() {
				return Math.round(Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)));
			}

			function caluculateAngle() {
				var X = start.x - end.x;
				var Y = end.y - start.y;
				var r = Math.atan2(Y, X); //radians
				var angle = Math.round(r * 180 / Math.PI); //degrees
				if(angle < 0)
					angle = 360 - Math.abs(angle);
				return angle;
			}

			function caluculateDirection() {
				var angle = caluculateAngle();
				if((angle <= 45) && (angle >= 0))
					return LEFT;
				else if((angle <= 360) && (angle >= 315))
					return LEFT;
				else if((angle >= 135) && (angle <= 225))
					return RIGHT;
				else if((angle > 45) && (angle < 135))
					return DOWN;
				else
					return UP;
			}
			try {
				this.addEventListener(START_EV, touchStart, false);
				this.addEventListener(CANCEL_EV, touchCancel);
			} catch(e) {
			}
		});
	};
})(jQuery);

//slides plugin
(function (a) {
	a.fn.slides = function (b) {
		b = a.extend({}, a.fn.slides.option, b);
		return this.each(function () {
			//a("." + b.container, a(this)).children().wrapAll("<div class='swipe_control'>");
			var w = a(this),
				k = a(".swipe_control", w),
				A = k.children().size(),
				r = k.children().outerWidth(),
				n = k.children().outerHeight(),
				d = b.start - 1,
				m = b.effect.indexOf(",") < 0 ? b.effect : b.effect.replace(" ", "").split(",")[0],
				t = b.effect.indexOf(",") < 0 ? m : b.effect.replace(" ", "").split(",")[1],
				p = 0,
				o = 0,
				c = 0,
				q = 0,
				v, h, j, y, x, u, l, f;

			function e(D, C, B) {
				if(!h && v) {
					h = true;
					b.animationStart(q + 1);
					switch(D) {
					case "next":
						o = q;
						p = q + 1;
						p = A === p ? 0 : p;
						y = r * 2;
						D = -r * 2;
						q = p;
						break;
					case "prev":
						o = q;
						p = q - 1;
						p = p === -1 ? A - 1 : p;
						y = 0;
						D = 0;
						q = p;
						break;
					case "paginate":
						p = parseInt(B, 10);
						o = a("." + b.paginateClass + " span." + b.currentClass + " a", w).attr("href").match("[^#/]+$");
						if(p > o) {
							y = r * 2;
							D = -r * 2
						} else {
							y = 0;
							D = 0
						}
						q = p;
						break
					}
					if(C === "fade") {
						if(b.crossfade) {
							k.children(":eq(" + p + ")", w).css({
								zIndex: 10
							}).fadeIn(b.fadeSpeed, b.fadeEasing, function () {
								if(b.autoHeight) {
									k.animate({
										height: k.children(":eq(" + p + ")", w).outerHeight()
									}, b.autoHeightSpeed, function () {
										k.children(":eq(" + o + ")", w).css({
											display: "none",
											zIndex: 0
										});
										k.children(":eq(" + p + ")", w).css({
											zIndex: 0
										});
										b.animationComplete(p + 1);
										h = false
									})
								} else {
									k.children(":eq(" + o + ")", w).css({
										display: "none",
										zIndex: 0
									});
									k.children(":eq(" + p + ")", w).css({
										zIndex: 0
									});
									b.animationComplete(p + 1);
									h = false
								}
							})
						} else {
							k.children(":eq(" + o + ")", w).fadeOut(b.fadeSpeed, b.fadeEasing, function () {
								if(b.autoHeight) {
									k.animate({
										height: k.children(":eq(" + p + ")", w).outerHeight()
									}, b.autoHeightSpeed, function () {
										k.children(":eq(" + p + ")", w).fadeIn(b.fadeSpeed, b.fadeEasing)
									})
								} else {
									k.children(":eq(" + p + ")", w).fadeIn(b.fadeSpeed, b.fadeEasing, function () {
										if(a.browser.msie) {
											a(this).get(0).style.removeAttribute("filter")
										}
									})
								}
								b.animationComplete(p + 1);
								h = false
							})
						}
					} else {
						k.children(":eq(" + p + ")").css({
							left: y,
							display: "block"
						});
						if(b.autoHeight) {
							k.animate({
								left: D,
								height: k.children(":eq(" + p + ")").outerHeight()
							}, b.slideSpeed, b.slideEasing, function () {
								k.css({
									left: -r
								});
								k.children(":eq(" + p + ")").css({
									left: r,
									zIndex: 5
								});
								k.children(":eq(" + o + ")").css({
									left: r,
									display: "none",
									zIndex: 0
								});
								b.animationComplete(p + 1);
								h = false
							})
						} else {
							k.animate({
								left: D
							}, b.slideSpeed, b.slideEasing, function () {
								k.css({
									left: -r
								});
								k.children(":eq(" + p + ")").css({
									left: r,
									zIndex: 5
								});
								k.children(":eq(" + o + ")").css({
									left: r,
									display: "none",
									zIndex: 0
								});
								b.animationComplete(p + 1);
								h = false
							})
						}
					}
					if(b.paginate) {
						a("." + b.paginateClass + " span." + b.currentClass, w).removeClass(b.currentClass);
						a("." + b.paginateClass + " span:eq(" + p + ")", w).addClass(b.currentClass);
					}
				}
			}

			function s() {
				clearInterval(w.data("interval"))
			}

			function g() {
				if(b.pause) {
					clearTimeout(w.data("pause"));
					clearInterval(w.data("interval"));
					l = setTimeout(function () {
						clearTimeout(w.data("pause"));
						f = setInterval(function () {
							e("next", m);
							updatePageCounter();
						}, b.play);
						w.data("interval", f)
					}, b.pause);
					w.data("pause", l)
				} else {
					s()
				}
			}
			if(A < 2) {
				return
			}
			if(d < 0) {
				d = 0
			}
			if(d > A) {
				d = A - 1
			}
			if(b.start) {
				q = d
			}
			a("." + b.container, w).css({
				overflow: "hidden",
				position: "relative"
			});
			k.children().css({
				position: "absolute",
				top: 0,
				left: k.children().outerWidth(),
				zIndex: 0,
				display: "none"
			});
			k.css({
				position: "relative",
				width: (r * 3),
				height: n,
				left: -r
			});
			a("." + b.container, w).css({
				display: "block"
			});
			if(b.autoHeight) {
				k.children().css({
					height: "auto"
				});
				k.animate({
					height: k.children(":eq(" + d + ")").outerHeight()
				}, b.autoHeightSpeed)
			}
			if(b.preload && k.find("img:eq(" + d + ")").length) {
				a("." + b.container, w).css({
					background: "url(" + b.preloadImage + ") no-repeat 50% 50%"
				});
				var z = k.find("img:eq(" + d + ")").attr("src") + "?" + (new Date()).getTime();
				if(a("img", w).parent().attr("class") != "swipe_control") {
					u = k.children(":eq(0)")[0].tagName.toLowerCase()
				} else {
					u = k.find("img:eq(" + d + ")")
				}
				k.find("img:eq(" + d + ")").attr("src", z).load(function () {
					k.find(u + ":eq(" + d + ")").fadeIn(b.fadeSpeed, b.fadeEasing, function () {
						a(this).css({
							zIndex: 5
						});
						a("." + b.container, w).css({
							background: ""
						});
						v = true;
						b.slidesLoaded()
					})
				})
			} else {
				k.children(":eq(" + d + ")").fadeIn(b.fadeSpeed, b.fadeEasing, function () {
					v = true;
					b.slidesLoaded()
				})
			}
			if(b.bigTarget) {
				k.children().css({
					cursor: "pointer"
				});
				k.children().click(function () {
					e("next", m);
					return false
				})
			}
			if(b.hoverPause && b.play) {
				k.bind("mouseover", function () {
					s()
				});
				k.bind("mouseleave", function () {
					g()
				})
			}
			if(b.generateNextPrev) {
				a("." + b.container, w).after('<span class="button ' + b.prev + '"><a href="#">Prev</a></span>');
				a("." + b.prev, w).after('<span class="button ' + b.next + '"><a href="#">Next</a></span>');
			}
			cur = 0;
			tot = A;
			ccurrent = a(".currCount");
			totalSlide = a(".totCount");
			totalSlide.text(tot);
			ccurrent.text(cur + 1);

			function updatePageCounter() {
				curpos = a("." + b.paginateClass + " span:eq(" + p + ") a", w).attr("title");
				ccurrent.text(curpos);
			}
			a("." + b.next, w).click(function (B) {
				B.preventDefault();
				if(b.play) {
					g();
				}
				e("next", m);
				updatePageCounter();
			});
			a("." + b.prev, w).click(function (B) {
				B.preventDefault();
				if(b.play) {
					g();
				}
				e("prev", m);
				updatePageCounter();
			});
			var getNowScroll = function () {
				var position = document.documentElement;
				var body = document.body;
				var now = {};
				now.X = document.all ? (!position.scrollLeft ? body.scrollLeft : position.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
				now.Y = document.all ? (!position.scrollTop ? body.scrollTop : position.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
				return now;
			}
			a("#swipe").swipe({
				swipeLeft: function (B) {
					if(b.play) {
						g();
					}
					e("next", m);
					updatePageCounter();
				},
				swipeRight: function (B) {
					if(b.play) {
						g();
					}
					e("prev", m);
					updatePageCounter();
				},
				swipeUp: function () {
					if(b.play) {
						g();
					}
					var ty = getNowScroll().Y + 500;
					a("body, html").animate({
						scrollTop: ty
					}, 300);
				},
				swipeDown: function () {
					if(b.play) {
						g();
					}
					var ty = getNowScroll().Y - 500;
					a("body, html").animate({
						scrollTop: ty
					}, 300);
				}
			});
			if(b.generatepaginate) {
				if(b.prependpaginate) {
					w.prepend("<div class=" + b.paginateClass + "></div>");
				} else {
					w.append("<div class=" + b.paginateClass + "></div>");
				}
				k.children().each(function () {
					a("." + b.paginateClass, w).append('<span><a href="#' + c + '" title="' + (c + 1) + '"></a></span>');
					c++;
				});
			} else {
				a("." + b.paginateClass + " span a", w).each(function () {
					a(this).attr("href", "#" + c);
					c++;
				});
			}
			a("." + b.paginateClass + " span:eq(" + d + ")", w).addClass(b.currentClass);
			a("." + b.paginateClass + " span a", w).click(function () {
				if(b.play) {
					g();
				} else {}
				j = a(this).attr("href").match("[^#/]+$");
				if(q != j) {
					e("paginate", t, j)
					updatePageCounter();
				}
				return false
			});
			var $arrLeftBtn = a('#main_banner span.button.prev');
			$arrLeftBtn.bind("click", function () {
				if(b.play) {
					g();
				}
				e("prev", m);
				updatePageCounter();
			});
			var $arrRightBtn = a('#main_banner span.button.next');
			$arrRightBtn.bind("click", function () {
				if(b.play) {
					g();
				}
				e("next", m);
				updatePageCounter();
			});
			a("a.link", w).click(function () {
				if(b.play) {
					g();
				}
				j = a(this).attr("href").match("[^#/]+$") - 1;
				if(q != j) {
					e("paginate", t, j)
				}
				return false
			});
			if(b.play) {
				f = setInterval(function () {
					e("next", m);
					updatePageCounter();
				}, b.play);
				w.data("interval", f)
			}
		})
	};
	a.fn.slides.option = {
		preload: false,
		preloadImage: "http://image.gmkt.kr/_Net/global/gl_common/loading.gif",
		container: "swipe",
		generateNextPrev: false,
		next: "next",
		prev: "prev",
		paginate: true,
		generatepaginate: true,
		prependpaginate: false,
		paginateClass: "paginate",
		currentClass: "active",
		fadeSpeed: 350,
		fadeEasing: "",
		slideSpeed: 350,
		slideEasing: "",
		start: 1,
		effect: "slide",
		crossfade: false,
		play: 0,
		pause: 1,
		hoverPause: false,
		autoHeight: false,
		autoHeightSpeed: 350,
		bigTarget: false,
		animationStart: function () {},
		animationComplete: function () {},
		slidesLoaded: function () {}
	};
})(jQuery);