let jogadores = ['Jogador 1', 'Jogador 1'];
let jogadorAtivo = 1;
let jogadasJogador1 = [];
let jogadasJogador2 = [];
let vitoria = false;

const pJogador1 = document.querySelector('#j1');
const pJogador2 = document.querySelector('#j2');

const posicoesVitoria = [
  ['11', '12', '13'],
  ['21', '22', '23'],
  ['31', '32', '33'],
  ['11', '21', '31'],
  ['12', '22', '32'],
  ['13', '23', '33'],
  ['11', '22', '33'],
  ['13', '22', '31'],
];

const marcarCasa = (casa) => {
  console.log(casa.id);
  casa.innerHTML = 'X';
};

const tabuleiro = [
  ['11', '12', '13'],
  ['21', '22', '23'],
  ['31', '32', '33'],
];

const verificaVitoria = (jogador) => {
  vitoria = true;
  let jogadas = 0

  if (jogador === 1) jogadas = jogadasJogador1
  else jogadas = jogadasJogador2

  document.getElementById(jogadas[0]).classList.remove('text-white');
  document.getElementById(jogadas[0]).classList.add('text-emerald-500');
  document.getElementById(jogadas[1]).classList.remove('text-white');
  document.getElementById(jogadas[1]).classList.add('text-emerald-500');
  document.getElementById(jogadas[2]).classList.remove('text-white');
  document.getElementById(jogadas[2]).classList.add('text-emerald-500');

  alert(`Jogador ${jogador} venceu`);
  return false;
}

const verificaJogador = (j) => {
  casa1.innerHTML === j &&
    casa2.innerHTML === j &&
    casa3.innerHTML === j
}

const mudarJogador = (jogador, jogador2) => {
  jogador2.classList.add('text-black');
  jogador2.classList.add('dark:text-white');
  jogador.classList.add('text-violet-600');
  jogador.classList.remove('text-black');
  jogador.classList.remove('dark:text-white');
}

tabuleiro.forEach((tab) => {
  tab.forEach((t) => {
    if (vitoria) return;

    const casa = document.getElementById(t);

    casa.addEventListener('click', () => {
      if (jogadorAtivo === 1) {

        casa.innerHTML = 'X';
        casa.disabled = true;
        jogadorAtivo = 2;
        jogadasJogador1.push(t);

        mudarJogador(pJogador1, pJogador2)

      } else {
        mudarJogador(pJogador2, pJogador1)

        casa.innerHTML = 'O';
        casa.disabled = true;
        jogadorAtivo = 1;
        jogadasJogador2.push(t);

      }

      if (jogadasJogador1.length === 3 || jogadasJogador2.length === 3) {

        posicoesVitoria.forEach((casa) => {
          let casa1 = document.getElementById(casa[0]);
          let casa2 = document.getElementById(casa[1]);
          let casa3 = document.getElementById(casa[2]);

          if (
            casa1.innerHTML !== '' &&
            casa2.innerHTML !== '' &&
            casa3.innerHTML !== ''
          ) {
            if (
              casa1.innerHTML === casa2.innerHTML &&
              casa2.innerHTML === casa3.innerHTML
            ) {
              if (
                casa1.innerHTML === 'X' &&
                casa2.innerHTML === 'X' &&
                casa3.innerHTML === 'X'
              ) {
                verificaVitoria(1)
              }
              else if (
                casa1.innerHTML === 'O' &&
                casa2.innerHTML === 'O' &&
                casa3.innerHTML === 'O'
              ) {
                verificaVitoria(2)
              } else {
                alert('O jogo terminou empatado')
              }

            }

          }
        });

      }

    });

  });

});