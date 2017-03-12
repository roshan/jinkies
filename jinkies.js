function replaceJiraTicketWithUrl(githubUrl, jiraUrl, elem) {
  var jiraPattern = /[A-Z]+-[0-9]+/g;
  var jiraSearchUrl = jiraUrl + "/secure/QuickSearch.jspa?searchString=";
  replaced = elem.innerHTML.replace(/[A-Z]+-[0-9]+/g, "<a href='"+jiraSearchUrl+"$&'>$&</a>");
  elem.innerHTML = replaced;
}

chrome.storage.sync.get({
  githubUrl: '',
  jiraUrl: ''
}, function(items) {
  githubUrl = items.githubUrl;
  jiraUrl = items.jiraUrl;
    if ((githubUrl.trim().length == 0) 
	|| (!githubUrl.includes(location.hostname))) {
        return;
    } else {
      replaceJiraTicketWithUrl(githubUrl, jiraUrl, document.getElementsByClassName("commit-desc")[0])
      replaceJiraTicketWithUrl(githubUrl, jiraUrl, document.getElementsByClassName("commit-title")[0])
    }
});
