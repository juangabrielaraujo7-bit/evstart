(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5511912251681";
  var form = document.getElementById("quoteForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = form.nome.value.trim();
    var tipo = form.tipo.value.trim();
    var modelo = form.modelo.value.trim();
    var defeito = form.defeito.value.trim();

    if (!nome || !tipo || !modelo || !defeito) return;

    var message =
      "Olá! Gostaria de um orçamento:\n\n" +
      "*Nome:* " + nome + "\n" +
      "*Aparelho:* " + tipo + "\n" +
      "*Modelo:* " + modelo + "\n" +
      "*Defeito:* " + defeito;

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
    form.reset();
  });
})();
