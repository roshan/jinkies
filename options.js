// Saves options to chrome.storage
function save_options() {
  var githubUrl = document.getElementById('github-url').value;
  var jiraUrl = document.getElementById('jira-url').value;

  if (githubUrl[githubUrl.length - 1] != '/') {
    githubUrl = githubUrl + '/';
  }

  if (jiraUrl[jiraUrl.length - 1] != '/') {
    jiraUrl = jiraUrl + '/';
  }

  var permissionsUrl = githubUrl + "*";

  chrome.permissions.remove({
    permissions: ['activeTab'],
    origins: ['https://*/*']
  }, function(remove) { });

  chrome.permissions.request({
    permissions: ['activeTab'],
    origins: [permissionsUrl]
  }, function(granted) {
    if (granted) {
      console.log("granted permissions to " + permissionsUrl);
    } else {
      alert("Could not get permissions to " + permissionsUrl);
    }
  });

  chrome.storage.sync.set({
    githubUrl: githubUrl,
    jiraUrl: jiraUrl
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

  chrome.storage.sync.get({
      githubUrl: '',
      jiraUrl: ''
    }, function(items) {
      var githubUrl = items.githubUrl;
      var jiraUrl = items.jiraUrl;
      document.getElementById('github-url').value = githubUrl;
      document.getElementById('jira-url').value = jiraUrl;
  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    githubUrl: '',
    jiraUrl: ''
  }, function(items) {
    document.getElementById('github-url').value = items.githubUrl;
    document.getElementById('jira-url').value = items.jiraUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
