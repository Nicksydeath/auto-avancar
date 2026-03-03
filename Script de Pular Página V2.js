if (document.getElementById("autoMenu")) {
    return;
}

(function () {
    // ======= ESTILO DO MENU =======
    const style = document.createElement("style");
    style.textContent = `
    #autoMenu {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0d0d0d;
        color: #00ff88;
        border: 1px solid #00ff88;
        padding: 12px;
        z-index: 99999999;
        font-family: monospace;
        width: 190px;
        box-shadow: 0 0 10px #00ff8844;
        border-radius: 6px;
    }

    #autoMenu input {
        width: 100%;
        background: black;
        color: #00ff88;
        border: 1px solid #00ff88;
        text-align: center;
        font-size: 14px;
        padding: 4px;
    }

    #autoMenu button {
        margin-top: 10px;
        width: 100%;
        background: black;
        color: #00ff88;
        border: 1px solid #00ff88;
        padding: 6px;
        cursor: pointer;
        transition: 0.2s;
    }

    #autoMenu button:hover {
        background: #00ff88;
        color: black;
    }

    #countdown {
        margin-top: 10px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .label {
        font-size: 12px;
        opacity: 0.7;
        text-align: center;
        margin-top: 4px;
    }
    `;
    document.head.appendChild(style);

    const menu = document.createElement("div");
    menu.id = "autoMenu";
    menu.innerHTML = `
        <div style="text-align:center; margin-bottom:6px;">Auto Avançar</div>
        <div class="label">Intervalo (min.seg)</div>
        <input id="delayInput" type="text" value="1">

        <div id="countdown">00:00</div>
        <div class="label">Próximo clique</div>

        <button id="toggleBtn">Iniciar</button>
    `;
    document.body.appendChild(menu);

    let countdownInterval = null;
    let running = false;
    let remainingSeconds = 0;
    let totalSeconds = 0;

    function formatTime(seconds) {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    }

    function clickNextButton() {
        const spanIcon = document.querySelector('span[data-testid="bonsai-icon-caret-right"]');
        if (spanIcon) {
            const nextBtn = spanIcon.closest("button");
            if (nextBtn) nextBtn.click();
        }
    }

    function convertInputToSeconds(value) {
        const parts = value.split(".");
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parts[1] ? parseInt(parts[1].padEnd(2, "0")) : 0;

        return (minutes * 60) + seconds;
    }

    function startCycle() {
        remainingSeconds = totalSeconds;
        document.getElementById("countdown").textContent = formatTime(remainingSeconds);

        countdownInterval = setInterval(() => {
            remainingSeconds--;

            if (remainingSeconds <= 0) {
                clickNextButton();
                remainingSeconds = totalSeconds;
            }

            document.getElementById("countdown").textContent =
                formatTime(remainingSeconds);
        }, 1000);
    }

    document.getElementById("toggleBtn").onclick = function () {
        if (!running) {

            totalSeconds = convertInputToSeconds(
                document.getElementById("delayInput").value
            );

            if (!totalSeconds || totalSeconds <= 0) return;

            this.textContent = "Parar";
            running = true;

            startCycle();

        } else {
            this.textContent = "Iniciar";
            clearInterval(countdownInterval);
            document.getElementById("countdown").textContent = "00:00";
            running = false;
        }
    };
})();
