var issLayer;
var issSource;
var map;

const attribution = new ol.control.Attribution({
  collapsible: false,
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupMap();
  setInterval(askIss, 1000);
}

const key = 'VZZ4I30ebsE5A3u4SQ28';
const styleJson = 'https://api.maptiler.com/maps/06b333f1-4c52-4d8c-83f5-367a51e444b3/style.json?key=' + key;

function setupMap() {
  issSource = new ol.source.Vector();

  map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),
    view: new ol.View({
      constrainResolution: true,
      center: ol.proj.fromLonLat([0, 0]),
      zoom: 2,
    }),
    layers: [
      issLayer = new ol.layer.Vector({
        source: issSource,
        zIndex: 1,
      }),
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: styleJson,
        }),
      }),
    ],
  });

  olms.apply(map, styleJson);
}

function askIss() {
  loadJSON('http://api.open-notify.org/iss-now.json', gotData, 'jsonp');
}

function gotData(data) {
  var lat = data.iss_position.latitude;
  var lon = data.iss_position.longitude;

  var issCoordinates = ol.proj.fromLonLat([lon, lat]);

  if (issSource.getFeatures().length === 0) {
    // If the ISS feature doesn't exist, create it
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: './iss-25544.png',
      }),
    });

    var issFeature = new ol.Feature({
      geometry: new ol.geom.Point(issCoordinates),
    });

    issFeature.setStyle(iconStyle);
    issSource.addFeature(issFeature);
  } else {
    // Update the existing ISS feature's position
    var issFeature = issSource.getFeatures()[0];
    issFeature.getGeometry().setCoordinates(issCoordinates);
  }

  // Update the map view to center on the ISS coordinates
  //map.getView().setCenter(issCoordinates);    //keeping the ISS in center of the screen
}

function draw() {
  // Nothing to draw here since the map and marker are managed by OpenLayers
}
