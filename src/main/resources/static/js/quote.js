$(document).ready(function(){

	var content="";
	var author="";
	var getQuote = function(){
		$.getJSON("https://v1.hitokoto.cn/?c=d&c=h&c=i&c=j&encode=json",function(json){
			content = json["hitokoto"];
			author = json["from"];
			//console.log(content+"_"+author);

			$(".quote-content").html("「 "+content+" 」");
			$(".quote-author").html("——"+author);
		});
	}

	getQuote();

});
