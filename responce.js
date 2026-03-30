async function explainCode() {
  const code = document.getElementById("codeInput").value.trim();
  const mode = document.getElementById("modeSelect").value;
  const output = document.getElementById("responce");
  
  output.innerText = "Fetching explanation, please wait";
  document.getElementById("default").innerText = null;

  try {
    if (mode === "shell") {

      alternate();

    } else {

      let explanation = null;

      try {
        const res1 = await fetch("https://codeconvert.example/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code })
        });
        const data1 = await res1.json();
        explanation = data1.explanation;
      } catch (e) {
        console.log(`codeconvert: ${e}`);
      }

      if (!explanation) {
        try {
          const res2 = await fetch("https://getvoila.example/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
          });
          const data2 = await res2.json();
           explanation = data2.explanation;
        } catch (e) {
        console.log(`getvoila: ${e}`);
      }
      }

      if (!explanation) {
        try {
          const res3 = await fetch("https://galaxyai.example/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
          });
          const data3 = await res3.json();
          explanation = data3.explanation;
        } catch (e) {
        console.log(`galaxyai: ${e}`);
      }
      }

      if (!explanation) {
        try {
          const res4 = await fetch("https://writecream.example/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
          });
          const data4 = await res4.json();
          explanation = data4.explanation;
        } catch (e) {
        console.log(`writecream: ${e}`);
      }
      }

      output.innerText = explanation || "No explanation available from most sources.\n\nPlease wait";
      alternate();
    }
  } catch (err) {

    console.log(`shell: ${err}`);

    output.innerText = "Error: " + err.message;

  }
}
