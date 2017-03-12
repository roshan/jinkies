function replaceJiraTicketWithUrlJs(elem) {
  var jiraPattern = /[A-Z]+-[0-9]+/g;

  chrome.storage.sync.get({
      githubUrl: '',
      jiraUrl: ''
    }, function(items) {
      var githubUrl = items.githubUrl;
      var jiraUrl = items.jiraUrl;

      var jiraSearchUrl = jiraUrl + "/secure/QuickSearch.jspa?searchString=";

    replaced = elem.innerHTML.replace(/[A-Z]+-[0-9]+/g, "<a href='"+jiraSearchUrl+"$&'>$&</a>");
    elem.innerHTML = replaced;
  });
}

replaceJiraTicketWithUrlJs(document.getElementsByClassName("commit-desc")[0])
replaceJiraTicketWithUrlJs(document.getElementsByClassName("commit-title")[0])
