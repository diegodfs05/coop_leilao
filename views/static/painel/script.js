let controlBtns = document.querySelectorAll("#sect-painel #options-label a");
let panelScreens = document.querySelectorAll("#sect-painel section");
let modalAnuncio = document.getElementById('modal-anuncios');
let btnCadastraAnuncio = document.querySelector('#settings-anuncios .cadastra-anuncio');
let btnsConclAnuncio = document.querySelectorAll('#settings-anuncios .concl-anuncio');

function switchSettingScreen(index) {
  panelScreens.forEach((ele) => {
    ele.classList.remove("ativo");
  });
  setTimeout(() => {
    panelScreens[index].classList.add("ativo");
  }, 100);
}

function toggleModalAnuncio() {
  modalAnuncio.classList.toggle('ativo');
}

document.addEventListener("DOMContentLoaded", () => {
  controlBtns.forEach((ele, index) => {
    ele.addEventListener("click", () => {
      switchSettingScreen(index);
    });
  });
  btnCadastraAnuncio.addEventListener('click', toggleModalAnuncio);
  btnsConclAnuncio.forEach(ele => {
    ele.addEventListener('click', toggleModalAnuncio);
  });

  console.log("Static home page loaded");
});
document.getElementById('auction-form').addEventListener('submit', function() {
  let today = new Date().toISOString().split('T')[0];
  document.getElementById('registrationDate').value = today;
});

