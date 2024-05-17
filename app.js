/* **** Leaflet **** */

var map_opacity = 0.7;

// Base layers
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', minZoom: 6, maxZoom: 14});

var cartodb = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', minZoom: 6, maxZoom: 14});

 var white = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==", {minZoom: 6, maxZoom: 14});

 // Overlay layers (TMS)
 var lyr = L.tileLayer('./{z}/{x}/{y}.png', {tms: 1, opacity: map_opacity, attribution: "", minZoom: 6, maxZoom: 14});

// Map
var map = L.map('map', {
    center: [51.808564980592536, 19.249441503918895],
    zoom: 14,
    minZoom: 6,
    maxZoom: 14,
    layers: [osm, lyr]
});

var basemaps = {"OpenStreetMap": osm, "CartoDB Positron": cartodb, "Without background": white}
var overlaymaps = {"Land surface types": lyr}

// Title
var title = L.control();
title.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'ctl title');
    this.update();
    return this._div;
};
title.update = function(props) {
    this._div.innerHTML = "Land surface types";
};
title.addTo(map);

// Note
var src = 'Generated by <a href="https://gdal.org/programs/gdal2tiles.html">GDAL2Tiles</a>, Copyright &copy; 2008 <a href="http://www.klokan.cz/">Klokan Petr Pridal</a>,  <a href="https://gdal.org/">GDAL</a> &amp; <a href="https://www.osgeo.org/">OSGeo</a> <a href="http://code.google.com/soc/">GSoC</a>';
var note = L.control({position: 'bottomleft'})
note.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'ctl src');
    this.update();
    return this._div;
};
note.update = function(props) {
    this._div.innerHTML = src;
};
note.addTo(map);

// Legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        categories = ['Category 1', 'Category 2', 'Category 3'],
        labels = ['<strong> Legend Title </strong>'];

    for (var i = 0; i < categories.length; i++) {
        labels.push(
            '<i style="opacity:' + map_opacity + ';background:' + getColor(categories[i]) + '"></i> ' +
            categories[i]
        );
    }

    div.innerHTML = labels.join('<br>');
    console.log(div)
    console.log(labels)
    return div;
};

function getColor(category) {
    switch (category) {
        case 'UME': return '#490005';
        case 'UMI': return '#9c6e6c';
        case 'UMV': return '#859381';
        case 'UMS': return '#b78958';
        case 'UHE': return '#9b8c6b';
        case 'PRH': return '#da9e13';
        case 'PRMu': return '#cab443';
        case 'PRMl': return '#d0ec89';
        case 'PRLu': return '#d9e1c3';
        case 'PRLl': return '#cdde8b';
        case 'PDV': return '#81a2ac';
        case 'PDEu': return '#b6bfc1';
        case 'PDEl': return '#8ca59c';
        case 'PSI': return '#b7a0c0';
        case 'PSL': return '#e1cff1';
        case 'PSF': return '#c7c6cc';
        case 'PFR': return '#b9d7c7';
        case 'PFD': return '#96b69d';
        case 'PFSu': return '#91c0b9';
        case 'PFSl': return '#9fd8e7';
        default: return '#ffffff';
    }
}

legend.addTo(map);

// Add to Layers panel
L.control.layers(basemaps, overlaymaps, {collapsed: false}).addTo(map);

// Fit to overlay bounds (SW and NE points with (lat, lon))
map.fitBounds([[48.649153452415646, 24.984812859572443], [54.96797650876942, 13.51407014826535]]);