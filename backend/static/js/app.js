const loginBtn =
    document.getElementById("loginBtn");


/* LOGIN */

if (loginBtn) {

    loginBtn.addEventListener(

        "click",

        async () => {

            const username =
                document.getElementById(
                    "username"
                ).value;

            const password =
                document.getElementById(
                    "password"
                ).value;

            try {

                const response =
                    await fetch(

                        "/login",

                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                username,
                                password
                            })
                        }
                    );

                const data =
                    await response.json();

                if (data.success) {

                    localStorage.setItem(

                        "adminLoggedIn",

                        "true"
                    );

                    window.location.href =
                        "/dashboard";

                } else {

                    document.getElementById(

                        "loginMessage"

                    ).innerHTML =

                        "Invalid Credentials";
                }

            } catch (error) {

                document.getElementById(

                    "loginMessage"

                ).innerHTML =

                    "Backend Connection Error";
            }
        }
    );
}


/* LOGIN CHECK */

function checkLogin() {

    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (
        loggedIn !== "true" &&
        window.location.pathname !== "/"
    ) {
        window.location.href = "/";
    }
}


/* LOGOUT */

function logout() {

    localStorage.clear();

    window.location.href =
        "/";
}


/* CLOCK */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (clock) {

        clock.innerHTML =
            new Date().toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);

updateClock();


/* ALERT SOUND */

const alertSound =
    new Audio("assets/sounds/alert.mp3");


/* AI RECOMMENDATIONS */

async function loadAIRecommendations() {

    try {

        const response =
            await fetch(

                "/ai"
            );

        const data =
            await response.json();

        const box =
            document.getElementById(
                "recommendationsList"
            );

        if (box) {

            box.innerHTML = "";

            data.recommendations.forEach(item => {

                box.innerHTML += `

                <div class="recommendation-card">

                    <i class="fa-solid fa-shield-halved"></i>

                    <span>${item}</span>

                </div>

                `;
            });
        }

        const risk =
            document.getElementById(
                "riskScore"
            );

        if (risk) {

            risk.innerHTML =
                data.risk_score + "%";
        }

    } catch (error) {

        console.log(error);
    }
}

loadAIRecommendations();

setInterval(

    loadAIRecommendations,

    8000
);


/* THREAT LOGS */

function addThreatLog(

    node,
    threat,
    severity

) {

    const logsBody =
        document.getElementById(
            "logsBody"
        );

    if (!logsBody) return;

    const row = `

    <tr>

        <td>
            ${new Date()
            .toLocaleTimeString()}
        </td>

        <td>${node}</td>

        <td>${threat}</td>

        <td>${severity}</td>

    </tr>

    `;

    const logEntry = {

        time: new Date().toLocaleTimeString(),

        node: node,

        threat: threat,

        severity: severity

    };

    let storedLogs =

        JSON.parse(
            localStorage.getItem("threatLogs")
        ) || [];

    storedLogs.unshift(logEntry);

    localStorage.setItem(
        "threatLogs",
        JSON.stringify(storedLogs)
    );

    logsBody.innerHTML =
        row + logsBody.innerHTML;

    alertSound.play();
}


/* SIMULATION */

async function runSimulation() {

    try {

        const response =
            await fetch(

                "/attack"
            );

        const data =
            await response.json();

        const threatLevel =
            document.getElementById(
                "threatLevel"
            );

        const riskScore =
            document.getElementById(
                "riskScore"
            );

        if (threatLevel) {

            threatLevel.innerHTML =
                data.severity;
        }

        if (riskScore) {

            riskScore.innerHTML =
                data.risk_score;
        }

        addThreatLog(

            data.node,

            data.threat,

            data.severity
        );

    } catch (error) {

        console.log(error);
    }
}


const simulateBtn =
    document.getElementById(
        "simulateBtn"
    );

if (simulateBtn) {

    simulateBtn.addEventListener(

        "click",

        () => {

            runSimulation();
        }
    );
}


setInterval(

    runSimulation,

    25000
);


/* NETWORK NODE ANIMATION */

const networkNodes =
    document.querySelectorAll(
        ".network-node"
    );

function randomizeNodes() {

    networkNodes.forEach(node => {

        node.classList.remove(

            "infected",

            "warning-node",

            "safe"
        );

        const random =

            Math.floor(
                Math.random() * 3
            );

        if (random === 0) {

            node.classList.add(
                "infected"
            );

        } else if (random === 1) {

            node.classList.add(
                "warning-node"
            );

        } else {

            node.classList.add(
                "safe"
            );
        }
    });
}

setInterval(

    randomizeNodes,

    4000
);