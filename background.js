chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extractTasks",
    title: "Extract Action Items",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "extractTasks") {

    const response = await fetch("https://actionbridge-worker.carenella1.workers.dev/v1/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ab-secret": "actionbridge-dev-secret"
      },
      body: JSON.stringify({
        transcript: info.selectionText
      })
    });

    const data = await response.json();

    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_ACTION_ITEMS",
      payload: data
    });

  }
});