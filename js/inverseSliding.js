/*
inverse-sliding - 12/08/2014
By Kevin Carr 
http://www.kevincarr.com/
*/
// Sliding variables
var oBarNav = $('#barNav');
var oBarTop = $('#barTop');
var oBarBot = $('#barBot');
var kcScroll = 0;
var kcPosition = 0;
var kcBarH = oBarTop.height();
//
function fnRemoveIds(myObj){
	// Objects shouldn't have matching IDs
	//     * In IE matching ids break the program
	myObj.children().children().attr("id", "");
	// just incase there are objects inside of the children
	myObj.children().children().children().attr("id", "");
}
function fnMatchDivs(lDiv,lDivToMatch){
	// Inverse sliding only requires top property
	//lDiv.css("left",lDivToMatch.position().left + "px");
	lDiv.css("top",lDivToMatch.position().top + "px");
	//lDiv.css("width",lDivToMatch.width() + "px");
	//lDiv.css("height",lDivToMatch.height() + "px");
}
function fnSetBarSlide(){
	kcScroll = $(window).scrollTop();
	kcPosition = kcScroll;
	var lHeight = $( window ).height();
	//
	// set the top bar to match the nav bar
	oBarTop.html(oBarNav.html());
	fnRemoveIds(oBarTop);
	// set the bottom bar to match the top bar
	oBarBot.html(oBarTop.html());
	// open up the top bar if the scroll is at the bottom
	if (kcScroll>lHeight){
		oBarTop.css({top: kcScroll});
		oBarBot.css({top: kcScroll-kcBarH});
	}else {
		oBarTop.css({top: kcScroll-kcBarH});
		oBarBot.css({top: lHeight+kcScroll-kcBarH});
	}
}

$(document).ready(function() {

	fnSetBarSlide();
	$(window).scroll(function () {
/*
   .d88b. 8 w    8 w               8b  8             8              
   YPwww. 8 w .d88 w 8d8b. .d88    8Ybm8 .d88 Yb  dP 88b. .d88 8d8b 
       d8 8 8 8  8 8 8P Y8 8  8    8  "8 8  8  YbdP  8  8 8  8 8P   
   `Y88P' 8 8 `Y88 8 8   8 `Y88    8   8 `Y88   YP   88P' `Y88 8    
                           wwdP
*/ 
		oBarTop.show();
		oBarBot.show();
		kcScroll = $(window).scrollTop();
		if(kcScroll > kcPosition) {
			// scrolling downwards
			if(oBarTop.position().top==kcPosition){
				// set bar to top
				oBarTop.css({top: kcScroll});
				oBarBot.css({top:  kcScroll-kcBarH});
			} else {
				if(Number(oBarTop.position().top)+(2*(kcScroll-kcPosition))>kcScroll){
					// set bar to top if lower than top
					oBarTop.css({top: kcScroll});
					oBarBot.css({top:  kcScroll-kcBarH});
				} else {
					// slide bar down
					oBarTop.css({top: Number(oBarTop.position().top)+(2*(kcScroll-kcPosition))});
					oBarBot.css({top:  Number(oBarTop.position().top)+$( window ).height()});
				}
			}
			fnMatchDivs(oBarNav,oBarTop);
			oBarTop.hide();
		} else {
			// scrolling upwards
			if(oBarTop.position().top<kcPosition-kcBarH){
				//set bar to bottom
				oBarTop.css({top: (kcScroll-kcBarH)});
				oBarBot.css({top: $( window ).height()+kcScroll-kcBarH});
			} else {
				// if bottom bar is on top, move it to the bottom
				if(oBarBot.position().top<oBarTop.position().top){
					oBarBot.css({top:  Number(oBarTop.position().top)+$( window ).height()});
				}
				if(Number(oBarTop.position().top)-(2*(kcPosition-kcScroll))<kcScroll-kcBarH){
					oBarTop.css({top: (kcScroll-kcBarH)});
					oBarBot.css({top: $( window ).height()+kcScroll-kcBarH});
				} else {
					oBarTop.css({top: Number(oBarTop.position().top)-(2*(kcPosition-kcScroll))});
					oBarBot.css({top:  Number(oBarTop.position().top)+$( window ).height()});
				}
			}
			fnMatchDivs(oBarNav,oBarBot);
			oBarBot.hide();
		}
		kcPosition = kcScroll;
	});
	$(window).resize(function(){
		fnSetBarSlide();
	}); 
});
