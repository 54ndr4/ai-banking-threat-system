const threatDatabase = [

    {

        type: "SWIFT Banking Intrusion",

        level: "CRITICAL",

        score: "97%",

        node: "SWIFT Gateway",

        recommendations: [

            "Freeze SWIFT sessions",

            "Block foreign transactions",

            "Lock payment channels"
        ]
    },

    {

        type: "ATM Malware Attack",

        level: "HIGH",

        score: "89%",

        node: "ATM Server",

        recommendations: [

            "Shutdown infected ATMs",

            "Deploy AI containment",

            "Enable forensic monitoring"
        ]
    },

    {

        type: "Core Database Breach",

        level: "CRITICAL",

        score: "95%",

        node: "Database Cluster",

        recommendations: [

            "Encrypt database instantly",

            "Disable remote access",

            "Start emergency backup"
        ]
    },

    {

        type: "Insider Threat Detected",

        level: "MEDIUM",

        score: "71%",

        node: "Employee Workstation",

        recommendations: [

            "Track employee session",

            "Restrict permissions",

            "Review activity logs"
        ]
    }

];


// TERMINAL

const terminalMessages = [

    "> Initializing AI engine...",

    "> Scanning banking nodes...",

    "> Monitoring SWIFT gateway...",

    "> Firewall protection active...",

    "> Threat analytics enabled...",

    "> AI anomaly detection running...",

    "> Endpoint security operational..."
];

function addTerminalMessage(message) {

    const terminal =
        document.getElementById(
            "terminal"
        );

    if (!terminal) return;

    const line =
        document.createElement("div");

    line.className =
        "terminal-line";

    line.innerText =
        message;

    terminal.prepend(line);

    if (terminal.children.length > 10) {

        terminal.removeChild(
            terminal.lastChild
        );
    }
}


// RANDOM TERMINAL

setInterval(() => {

    const randomMessage =

        terminalMessages[
        Math.floor(
            Math.random()
            *
            terminalMessages.length
        )
        ];

    addTerminalMessage(
        randomMessage
    );

}, 1000);




// MAIN SIMULATION

function runSimulation() {

    const randomThreat =

        threatDatabase[
        Math.floor(
            Math.random()
            *
            threatDatabase.length
        )
        ];

    const threatLevel =
        document.getElementById(
            "threatLevel"
        );

    if (threatLevel) {

        threatLevel.innerHTML =
            randomThreat.level;
    }

    if (randomThreat.level === "CRITICAL") {

        document.body.classList.add(
            "alert-mode"
        );

        setTimeout(() => {

            document.body.classList.remove(
                "alert-mode"
            );

        }, 4000);
    }

    const riskScore =
        document.getElementById(
            "riskScore"
        );

    if (riskScore) {

        riskScore.innerHTML =
            randomThreat.score;
    }

    updateRecommendations(
        randomThreat.recommendations
    );

    addThreatLog(

        randomThreat.node,

        randomThreat.type,

        randomThreat.level
    );

    addTerminalMessage(

        "> ALERT: " +

        randomThreat.type +

        " detected on " +

        randomThreat.node
    );
}



function updateRecommendations(items) {

    const box =
        document.getElementById(
            "recommendationsList"
        );

    if (!box) return;

    box.innerHTML = "";

    items.forEach(item => {

        box.innerHTML += `

        <div class="recommendation-card">

            <i class="fa-solid fa-shield-halved"></i>

            <span>${item}</span>

        </div>

        `;
    });
}


setInterval(
    runSimulation,
    10000
);

function animateCounters() {

    const cards =
        document.querySelectorAll(
            ".card p"
        );

    cards.forEach(card => {

        if (card.innerHTML.includes("%"))
            return;

        let count = 0;

        const target =
            parseInt(card.innerHTML);

        if (isNaN(target))
            return;

        const interval =
            setInterval(() => {

                count++;

                card.innerHTML =
                    count;

                if (count >= target) {

                    clearInterval(
                        interval
                    );
                }

            }, 20);

    });
}

animateCounters();

async function loadAnalysis() {

    const response =
        await fetch("/attack");

    const data =
        await response.json();

    const threats = [
        "SWIFT Intrusion",
        "ATM Malware Attack",
        "Database Breach",
        "Insider Threat",
        "DDoS Attack"
    ];

    const paths = [
        "External → SWIFT → DB",
        "Internet → ATM → Core",
        "VPN → Database",
        "Internal → Employee → Server",
        "External → API → Gateway"
    ];

    const threatElement =
        document.getElementById("predictedThreat");

    const confidenceElement =
        document.getElementById("aiConfidence");

    const attackPathElement =
        document.getElementById("attackPath");

    if (threatElement) {

        threatElement.innerText =
            threats[
            Math.floor(
                Math.random() * threats.length
            )
            ];
    }

    if (confidenceElement) {

        confidenceElement.innerText =
            (70 + Math.floor(Math.random() * 30))
            + "%";
    }

    if (attackPathElement) {

        attackPathElement.innerText =
            paths[
            Math.floor(
                Math.random() * paths.length
            )
            ];
    }

    let threatText = "";
    let decisionText = "";
    let actionText = "";

    switch (data.threat) {

        case "Malware Attack":

            threatText =
                `AI detected malware activity on ${data.node}.`;

            decisionText =
                "Immediate containment required to stop propagation.";

            actionText =
                "Isolate infected systems and launch forensic scan.";

            break;


        case "DDoS Spike":

            threatText =
                `Abnormal traffic spike detected on ${data.node}.`;

            decisionText =
                "AI predicts service degradation risk.";

            actionText =
                "Enable traffic filtering and activate rate limiting.";

            break;


        case "Unauthorized Login":

            threatText =
                `Multiple unauthorized login attempts on ${data.node}.`;

            decisionText =
                "Possible credential compromise detected.";

            actionText =
                "Lock accounts and enforce MFA verification.";

            break;


        case "Database Breach":

            threatText =
                `Suspicious database access detected on ${data.node}.`;

            decisionText =
                "Potential data exfiltration attempt underway.";

            actionText =
                "Disable external access and start emergency backup.";

            break;


        case "Insider Threat":

            threatText =
                `Unusual privileged activity detected on ${data.node}.`;

            decisionText =
                "AI confidence indicates insider misuse risk.";

            actionText =
                "Audit user activity and restrict permissions.";

            break;


        case "SWIFT Manipulation":

            threatText =
                `Abnormal transaction routing detected in ${data.node}.`;

            decisionText =
                "Potential financial fraud operation identified.";

            actionText =
                "Freeze SWIFT sessions and verify transactions.";

            break;
    }

    document.getElementById(
        "threatDetected"
    ).textContent = threatText;

    document.getElementById(
        "aiDecision"
    ).textContent = decisionText;

    document.getElementById(
        "recommendedAction"
    ).textContent = actionText;
}

loadAnalysis();

setInterval(loadAnalysis, 2500);