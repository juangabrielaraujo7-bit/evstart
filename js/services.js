(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5511912251681";
  var form = document.getElementById("otherServiceForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var select = document.getElementById("otherService");
    var servico = select.value;
    if (!servico) return;

    var message = "Olá! Gostaria de saber mais sobre " + servico.toLowerCase() + ".";
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
    form.reset();
  });
})();
