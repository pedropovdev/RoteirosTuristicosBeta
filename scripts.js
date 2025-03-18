// Inicializando o mapa
var map = L.map('map').setView([-12.45, -38.97], 11); // Latitude e Longitude iniciais

// Carregando o mapa base
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var streetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Adicionando uma camada de controle para alternar entre diferentes camadas de mapa base
var baseLayers = {
  "OpenStreetMap": osmLayer,
  "StreetMap": streetMapLayer
};

L.control.layers(baseLayers).addTo(map);

// Adicionando uma bússola (norte)
var north = L.control({ position: "topright" });
north.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML = '<img src="compass.png" alt="Norte" style="width: 50px; height: 50px;">'; // Caminho da imagem da bússola
  return div;
};
north.addTo(map);

// Adicionando uma escala ao mapa
L.control.scale().addTo(map);

// Carregando os dados JSON com as comunidades quilombolas
fetch('backend.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(comunidade => {
      // Adicionando marcadores no mapa
      var marker = L.marker([comunidade.latitude, comunidade.longitude]).addTo(map);
      
      // Criando um pop-up com informações
      marker.bindPopup(`
        <div style="font-size: 16px; max-width: 300px;">
          <strong>${comunidade.nome}</strong><br>
          ${comunidade.municipio}<br>
          <strong>${comunidade.estado}</strong><br>
          ${comunidade.atrativos}
        </div>
      `);
    });
  })
  .catch(error => console.error('Erro ao carregar os dados:', error));