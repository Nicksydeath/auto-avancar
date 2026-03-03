(function () {

    if (document.getElementById("autoMenu")) {
        return;
    }

    // ======= ESTILO DO MENU =======
    const style = document.createElement("style");
    style.textContent = `
    #autoMenu {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #111;
        color: #0f0;
        border: 1px solid #0f0;
        padding: 10px;
        z-index: 99999999;
        font-family: monospace;
        width: 150px;
    }
    `;
    document.head.appendChild(style);

    const menu = document.createElement("div");
    menu.id = "autoMenu";
    menu.innerHTML = `
        <div>Intervalo (ms):</div>
        <input id="delayInput" type="number" value="1000"
            style="width:100%; background:black; color:#0f0; border:1px solid #0f0;">
        <button id="toggleBtn"
            style="margin-top:10px; width:100%; background:black; color:#0f0; border:1px solid #0f0;">
            Iniciar
        </button>
    `;
    document.body.appendChild(menu);

    let intervalID = null;

    function clickNextButton() {
        const btns = document.querySelectorAll("button.sc-lkltAP.gBHwHF");
        const nextBtn = btns[1];

        if (nextBtn) {
            nextBtn.click();
        } else {
            console.warn("Botão de avançar não encontrado!");
        }
    }

    document.getElementById("toggleBtn").onclick = function () {
        const delay = parseInt(document.getElementById("delayInput").value);

        if (intervalID === null) {
            this.textContent = "Parar";
            intervalID = setInterval(clickNextButton, delay);
            clickNextButton();
        } else {
            this.textContent = "Iniciar";
            clearInterval(intervalID);
            intervalID = null;
        }
    };

})();
