from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import random

app = Flask(__name__)

CORS(app)


# DATABASE CONNECTION


def get_db_connection():

    connection = mysql.connector.connect(
        host="localhost", user="root", password="", database="ai_threat_system"
    )

    return connection


# HOME


@app.route("/")
def home():

    return {"message": "AI Banking Threat Security System Running"}


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
