import os
from flask import Flask, jsonify, render_template
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

TINY_TOKEN = os.environ.get("TINY_TOKEN")

ids = [
    "728160241", "728157756", "728157807", "741133306", "728158432", "728159007",
    "728159025", "728159134", "728159141", "728159184", "728159227", "728159255",
    "728159280", "728159353", "739817236"
]

urls = [
    f'https://api.tiny.com.br/api2/produto.obter.estoque.php?token={TINY_TOKEN}&id={id}&formato=JSON'
    for id in ids
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/api/estoque')
def estoque():
    data = []
    for url in urls:
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            produto = response.json().get("retorno", {}).get("produto", {})
            if produto:
                data.append({
                    "nome": produto.get("nome", "Desconhecido"),
                    "saldo": produto.get("saldo", 0)
                })
        except Exception as e:
            print(f"Erro ao acessar {url}: {e}")
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)