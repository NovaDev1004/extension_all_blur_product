// Inject a <div> with a specific ID at document_start
(function() {
    const viewportHeight = window.innerHeight;
    const div = document.createElement("div");
    div.id = "owagent-div";
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = `${viewportHeight}px`;
    div.style.backgroundColor = "rgba(255, 255, 255, 1)";
    div.style.color = "red";
    div.style.textAlign = "center";
    div.style.zIndex = "9999";
    div.innerText = "";
  
    document.documentElement.appendChild(div); // Append to the top-level <html>

  })();