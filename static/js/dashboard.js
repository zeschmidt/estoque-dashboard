fetch('/api/estoque')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produtos-cards');
    const limites = {
      "CAIXA INDIVIDUAL PAPELÃO": 50,
      "NAPA WAY 3MM ( ACT P/V 20/21 ) BRANCO": 0,
      "NAPA WAY 3MM ( ACT P/V 20/21 ) PRETO": 0,
      "SOLA SLIDE - BRANCO  44/45": 15
    };

    data.forEach(produto => {
      const limite = limites[produto.nome] ?? 10;
      const abaixoDoLimite = produto.saldo < limite;
      const card = document.createElement('div');
      card.className = `card ${abaixoDoLimite ? 'negativo' : 'positivo'}`;

      card.innerHTML = `
        <h4>${produto.nome}</h4>
        <p class="saldo">Saldo: ${produto.saldo} ${abaixoDoLimite ? '❗' : '✅'}</p>
        <p>Limite mínimo: ${limite}</p>
      `;

      container.appendChild(card);
    });
  });
