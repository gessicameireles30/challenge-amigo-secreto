let listaDeAmigos = [];

function adicionar() {
  let nomeAmigo = document.getElementById("amigo").value.trim();

  if ((!isNaN(nomeAmigo)) || (nomeAmigo === "")) {
    alert("Insira um nome válido.");
    document.getElementById("amigo").value = "";
    return;
  }

  if (listaDeAmigos.includes(nomeAmigo)) {
    alert("Nome já incluído! Insira outro nome.");
    return;
  }

  listaDeAmigos.push(nomeAmigo);
  document.getElementById("amigo").value = "";

  atualizarAmigos();
  atualizarSorteio();
  exibirAmigosEmLista();
}

function sortearAmigo() {
  let resultado = document.getElementById("resultado");

  if (listaDeAmigos.length === 0) {
    alert("Não há amigos cadastrados para sortear.");
    resultado.innerHTML = "";
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * listaDeAmigos.length);
  const amigoSorteado = listaDeAmigos[indiceAleatorio];

  resultado.innerHTML = `<strong>Amigo sorteado:</strong> ${amigoSorteado}`;
}

function sortear() {
  let listaSorteio = document.getElementById("lista-sorteio");
  let resultado = document.getElementById("resultado");

  listaSorteio.innerHTML = "";
  resultado.innerHTML = "";

  if (listaDeAmigos.length < 3) {
    alert("É necessário pelo menos três amigos para realizar o sorteio.");
    return;
  }

  let amigosSorteados = [...listaDeAmigos];
  embaralhar(amigosSorteados);

  for (let index = 0; index < listaDeAmigos.length; index++) {
    if (listaDeAmigos[index] === amigosSorteados[index]) {
      const noRep = (index + 1) % listaDeAmigos.length;
      [amigosSorteados[index], amigosSorteados[noRep]] = [amigosSorteados[noRep], amigosSorteados[index]];
    }
  }

  for (let i = 0; i < listaDeAmigos.length; i++) {
    listaSorteio.innerHTML += `${listaDeAmigos[i]} → ${amigosSorteados[i]}<br>`;
  }
}

function embaralhar(lista) {
  for (let index = lista.length - 1; index > 0; index--) {
    const aleatorio = Math.floor(Math.random() * (index + 1));
    [lista[index], lista[aleatorio]] = [lista[aleatorio], lista[index]];
  }
}

function reiniciar() {
  document.getElementById("amigo").value = "";
  document.getElementById("lista-amigos-ul").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("lista-sorteio").innerHTML = "";
  listaDeAmigos = [];
}

function removerAmigo(index) {
  listaDeAmigos.splice(index, 1);
  atualizarAmigos();
  atualizarSorteio();
  exibirAmigosEmLista();
}

function atualizarSorteio() {
  let listaSorteio = document.getElementById("lista-sorteio");
  let resultado = document.getElementById("resultado");

  if (listaSorteio) {
    listaSorteio.innerHTML = "";
  }
  if (resultado) {
    resultado.innerHTML = "";
  }
}

function atualizarAmigos() {
  let amigosIncluidos = document.getElementById("lista-amigos-ul");
  amigosIncluidos.innerHTML = "";

  listaDeAmigos.forEach((amigo, index) => {
    let li = document.createElement("li");
    li.textContent = amigo;
    li.style.cursor = "pointer";
    li.addEventListener('click', () => removerAmigo(index));
    amigosIncluidos.appendChild(li);
  });
}

function exibirAmigosEmLista() {
  atualizarAmigos();
}
