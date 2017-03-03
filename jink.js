function replaceJiraTicketWithUrl(obj) {
  var jiraPattern = /[A-Z]+-[0-9]+/g;

  chrome.storage.sync.get({
    githubUrl: '',
    jiraUrl: ''
  }, function(items) {
    var githubUrl = items.githubUrl;
    var jiraUrl = items.jiraUrl;
    var hostname = document.location.hostname

    if (githubUrl.includes(hostname)) {
      var jiraUrlString = jiraUrl + "/secure/QuickSearch.jspa?searchString=";

      var matched = obj.html().match(jiraPattern);

      if ( matched ) {
	var text = obj.html();
	$.each(matched, function (i, v) {
	  text = text.replace(v, "<a href='"+jiraUrlString+v+"'>"+v+"</a>");
	});
	obj.html(text);
	return obj
      }
    } else {
    }

  })
}

$( ".commit-desc" ).each(function() {
  return replaceJiraTicketWithUrl($(this));
})

$( ".commit-title" ).each(function() {
  return replaceJiraTicketWithUrl($(this));
})

