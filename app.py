from flask import Flask, render_template, jsonify, request
import numpy as np
import random

app = Flask(__name__)

def simulate(t, A, omega, phi, B, D, threshold):
    E = A * np.sin(omega * t + phi)
    C = random.uniform(0, 1)
    E_total = E * B * D
    state = 1 if (E_total * C) >= threshold else 0

    return {
        "E": float(E),
        "E_total": float(E_total),
        "C": float(C),
        "state": state
    }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/simulate")
def run_sim():
    t = float(request.args.get("t", 0))
    A = float(request.args.get("A", 1))
    omega = float(request.args.get("omega", 6.28))
    phi = float(request.args.get("phi", 0))
    B = float(request.args.get("B", 1))
    D = float(request.args.get("D", 1))
    threshold = float(request.args.get("threshold", 0.9))

    return jsonify(simulate(t, A, omega, phi, B, D, threshold))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
