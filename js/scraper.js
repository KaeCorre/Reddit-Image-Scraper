var scrappedReddit = "";

function scrapeImages(subreddit) {
	var scrappedImageNum = 0;
	var scrappedFilterNum = 0;
	$.getJSON(scrappedReddit, function(response) {
		console.log(response);
		$.each(response.data.children, function(i, item) {
			item.data.url = item.data.url.replace(/^http:\/\//i, 'https://');
			var scrappedURL = item.data.url;
			var scrappedThumb = item.data.thumbnail;
			var scrappedPermalink = "https://www.reddit.com" + item.data.permalink;
			if ($('#nsfw-filter').prop("checked")) {
				$('.scrape-grid').append('<div class="scrape-box"><div class="scrape-image text-center"><img src="' + scrappedThumb + '" class="scrappedImage" alt=""></div><div class="scrape-buttons"><a href="' + scrappedPermalink + '" title="Permalink" target="_blank"><button type="button" class="btn btn-reddit"><i class="fas fa-link"></i></button></a><a href="' + scrappedURL + '" title="Image Source" target="_blank"><button type="button" class="btn btn-reddit"><i class="far fa-image"></i></button></a></div></div>');
			} else {
				if (item.data.over_18 == false) {
					$('.scrape-grid').append('<div class="scrape-box"><div class="scrape-image text-center"><img src="' + scrappedThumb + '" class="scrappedImage" alt=""></div><div class="scrape-buttons"><a href="' + scrappedPermalink + '" title="Permalink" target="_blank"><button type="button" class="btn btn-reddit"><i class="fas fa-link"></i></button></a><a href="' + scrappedURL + '" title="Image Source" target="_blank"><button type="button" class="btn btn-reddit"><i class="far fa-image"></i></button></a></div></div>');
				}
			}
		});
	});
	console.log(scrappedImageNum);
	console.log(scrappedFilterNum);
};

$(document).ready(function() {
	var redditPrevInput = "";
	
	$("#scrapeForm").submit(function(event) {
		event.preventDefault();
		var redditCurInput = $("#scrape-subreddit").val();
		if (redditPrevInput !== redditCurInput) {
			$('.scrape-box').remove();
			scrappedReddit = "https://www.reddit.com/r/" + redditCurInput + "/" + $('select#sort-by').val() + ".json?" + "&limit=" + ($('#scrape-amount').val());
			console.log(scrappedReddit);
			console.log($('#nsfw-filter').prop("checked"));
			scrapeImages(redditCurInput);
		}
	});
});