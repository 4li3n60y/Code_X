function fetchExplainshell(code){

  code = code.replaceAll(" ", "+")
  let shellFetch = "https://explainshell.com/explain?cmd=" + code;
  let tag = "<a link href=\"" + shellFetch + "\" target=\"_blank\" title=\"opens explainshell\">Click here</a> to view explanation from explainshell.";

  document.getElementById("default").innerText = tag;
  document.getElementById("default").innerHTML = tag;

}

async function alternate() {
  const code = document.getElementById("codeInput").value.trim();
  const mode = document.getElementById("modeSelect").value;
  const output = document.getElementById("responce");

  let isShell = mode=== "shell" ? true : false;
  console.log(`command is shell?: ${isShell}`);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // paste your key here
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", 
        messages: [
          {
            role: "system",
            content: isShell
              ? "You are a shell command explainer. Break down the command step by step keeping it short yet clear."
              : "You are a " + mode + " programming code explainer. Explain the snippet keeping it short yet clear. you should also give responce with lines starting from the start rather than a paragraph"
          },
          {
            role: "user",
            content: code
          }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      output.innerText = data.choices[0].message.content + "\n\n";
    } else if (data.error) {
      output.innerText = "API Error: " + data.error.message + "\n\n";
    } else {
      output.innerText = "Unexpected response:\n" + JSON.stringify(data, null, 2) + "\n\n";
    }
  } catch (err) {
    console.log(`default: ${err}`);
    output.innerText = "Error: " + err.message + "\n\n";
  }

  if (isShell){fetchExplainshell(code);}
}


function toggleTheme() {

  let style = document.getElementById("blacky").getAttribute("href");
  console.log(style==="style.css"? "Dark Theme" : "Light Theme");

  switch(style){
    case "test.css":
      document.getElementById("blacky").href = "style.css";
      break;
    case "style.css":
      document.getElementById("blacky").href = "test.css";
      break;
    default:
      console.log("reload to process theme");
  }

}

function selectMode(){

  let lang = document.getElementById("modeSelect").value;
  let place = document.getElementById("languageImage").src;

  place = lang==="shell" ? "images/powershell.svg" : "images/" + lang + ".svg";
  document.getElementById("languageImage").src = place;

}


