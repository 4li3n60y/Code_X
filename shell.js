async function scrapeTest() {
    const response = await fetch("https://myopenrouter-api.onrender.com/scrape?url=https://explainshell.com/explain?cmd=cd&id=help");
    const data = await response.json();

    if (data.success) {
        console.log("Element content:", data.content);
    } else {
        console.error("Scrape failed:", data.error);
    }
}
scrapeTest();
