var quoteFunc =[];
$(document).ready(function(){
setTweetLink();
$.ajax({
	url:"https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30",
	async:true,
	dataType: "json",
	success: function (data){
		quoteFunc.push(function() {
			var rand_indx = Math.floor(Math.random() *30);
			var g = Math.floor(Math.random() *255);
			var b = Math.floor(Math.random() *255);
			var r = Math.floor(Math.random() *255);
			var rand_color ="rgb("+r+", "+g+", "+b+")";
			var quote_obj =data[rand_indx];
			$("#content").html(quote_obj.content);
			$("#author").html(quote_obj.title);
			$('body').css("background-image","linear-gradient(315deg,rgb(250,250,250),"+rand_color);
		});
	}
	});
});


$("#btn-quote").on('click',function(){
	quoteFunc[0]();
  setTweetLink();
});

function setTweetLink(){
	var tweetUrl = "https://twitter.com/intent/tweet?text="
	var tweet = $("#content").text();
  var tweetAuthor = $("#author").text();
  tweetAuthor = tweetAuthor.split(" ").join("");
  var hashTag = " #quote; #" + tweetAuthor;
  var tweetEncodedTag = encodeURIComponent(hashTag).replace(/%20/g,'+');
  var encodedTweet = encodeURIComponent(tweet).replace(/%20/g,'+');
	$('#tweet').attr("href",tweetUrl+encodedTweet+tweetEncodedTag);
}

