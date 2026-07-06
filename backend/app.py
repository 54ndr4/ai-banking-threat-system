from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import mysql.connector
import random
import os

app = Flask(__name__)

CORS(app)


# DATABASE CONNECTION


def get_db_connection():

    connection = mysql.connector.connect(
        host=os.getenv("MYSQLHOST"),
        user=os.getenv("MYSQLUSER"),
        password=os.getenv("MYSQLPASSWORD"),
        database=os.getenv("MYSQLDATABASE"),
        port=int(os.getenv("MYSQLPORT")),
    )

    return connection


# HOME


@app.route("/")
def home():
    return render_template("index.html")

# LOGIN


@app.route("/login", methods=["POST"])
def login():

    data = request.json

    username = data.get("username")

    password = data.get("password")

    connection = get_db_connection()

    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT * FROM users
    WHERE username=%s AND password=%s
    """

    cursor.execute(query, (username, password))

    user = cursor.fetchone()

    cursor.close()

    connection.close()

    if user:

        return jsonify({"success": True, "message": "Login successful", "user": user})

    return jsonify({"success": False, "message": "Invalid credentials"})


# PAGES

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/network")
def network():
    return render_template("network.html")


@app.route("/analysis")
def analysis():
    return render_template("analysis.html")


@app.route("/reports")
def reports():
    return render_template("reports.html")


@app.route("/live-feed")
def live_feed():
    return render_template("live-feed.html")

# THREAT LOGS


@app.route("/logs")
def logs():

    sample_logs = [
        {
            "node": "SWIFT Gateway",
            "threat": "Banking Intrusion",
            "severity": "CRITICAL",
        },
        {"node": "ATM Server", "threat": "Malware Attack", "severity": "HIGH"},
        {
            "node": "Core Database",
            "threat": "Unauthorized Access",
            "severity": "MEDIUM",
        },
    ]

    return jsonify(sample_logs)


# AI ENGINE


@app.route("/ai")
def ai():

    ai_data = [
        {
            "type": "SWIFT Banking Intrusion",
            "recommendations": [
                "Freeze SWIFT sessions",
                "Block suspicious transactions",
                "Activate banking firewall",
            ],
        },
        {
            "type": "ATM Malware Attack",
            "recommendations": [
                "Shutdown infected ATMs",
                "Enable malware containment",
                "Deploy forensic scan",
            ],
        },
        {
            "type": "Database Breach Attempt",
            "recommendations": [
                "Encrypt banking database",
                "Disable remote access",
                "Start emergency backup",
            ],
        },
    ]

    selected = random.choice(ai_data)

    return jsonify(
        {
            "threat": selected["type"],
            "risk_score": random.randint(75, 99),
            "recommendations": selected["recommendations"],
        }
    )


# ATTACK SIMULATION


@app.route("/attack")
def attack():

    nodes = [
        "SWIFT Gateway",
        "ATM Server",
        "Core Banking",
        "Database Cluster",
        "Cloud Backup",
        "Security Operations",
        "Employee Workstation",
        "Mobile Banking API",
    ]

    threats = [
        "Malware Attack",
        "DDoS Spike",
        "Unauthorized Login",
        "Database Breach",
        "Insider Threat",
        "SWIFT Manipulation",
    ]

    severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]

    return jsonify(
        {
            "node": random.choice(nodes),
            "threat": random.choice(threats),
            "severity": random.choice(severities),
            "risk_score": str(random.randint(70, 99)) + "%",
        }
    )


if __name__ == "__main__":

    app.run(debug=True)
