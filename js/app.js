// AIC data (PPS, Nominal EUR, PLI, Index)
const aicData = {
    "Luxembourg": { "pps": 38500, "nominal": 56823, "pli": 148, "index": 146 },
    "Norway": { "pps": 31800, "nominal": 43799, "pli": 138, "index": 121 },
    "Netherlands": { "pps": 31700, "nominal": 37972, "pli": 120, "index": 120 },
    "Germany": { "pps": 31400, "nominal": 34356, "pli": 109, "index": 119 },
    "Iceland": { "pps": 30400, "nominal": 52289, "pli": 172, "index": 116 },
    "Switzerland": { "pps": 30500, "nominal": 55412, "pli": 182, "index": 116 },
    "Austria": { "pps": 30200, "nominal": 35543, "pli": 118, "index": 114 },
    "Belgium": { "pps": 29900, "nominal": 35364, "pli": 118, "index": 113 },
    "United Kingdom": { "pps": 29200, "nominal": 36718, "pli": 126, "index": 111 },
    "France": { "pps": 27800, "nominal": 29931, "pli": 108, "index": 106 },
    "Denmark": { "pps": 27700, "nominal": 39076, "pli": 141, "index": 105 },
    "Sweden": { "pps": 27100, "nominal": 33796, "pli": 125, "index": 103 },
    "Finland": { "pps": 26900, "nominal": 34392, "pli": 128, "index": 102 },
    "Ireland": { "pps": 26300, "nominal": 37124, "pli": 141, "index": 100 },
    "Italy": { "pps": 25800, "nominal": 25307, "pli": 98, "index": 98 },
    "Cyprus": { "pps": 25800, "nominal": 24247, "pli": 94, "index": 98 },
    "Spain": { "pps": 24100, "nominal": 21862, "pli": 91, "index": 91 },
    "Malta": { "pps": 23600, "nominal": 22339, "pli": 95, "index": 90 },
    "Lithuania": { "pps": 23200, "nominal": 18209, "pli": 78, "index": 88 },
    "Portugal": { "pps": 22600, "nominal": 19217, "pli": 85, "index": 86 },
    "Slovenia": { "pps": 22600, "nominal": 20497, "pli": 91, "index": 86 },
    "Romania": { "pps": 22600, "nominal": 13095, "pli": 58, "index": 86 },
    "Poland": { "pps": 22300, "nominal": 15602, "pli": 70, "index": 85 },
    "Czechia": { "pps": 21500, "nominal": 17393, "pli": 81, "index": 82 },
    "Czech Republic": { "pps": 21500, "nominal": 17393, "pli": 81, "index": 82 },
    "Greece": { "pps": 20900, "nominal": 17500, "pli": 84, "index": 79 },
    "Croatia": { "pps": 20800, "nominal": 15389, "pli": 74, "index": 79 },
    "Slovakia": { "pps": 20400, "nominal": 16483, "pli": 81, "index": 77 },
    "Estonia": { "pps": 19600, "nominal": 19030, "pli": 97, "index": 74 },
    "Bulgaria": { "pps": 19200, "nominal": 11054, "pli": 58, "index": 73 },
    "Hungary": { "pps": 19100, "nominal": 13171, "pli": 69, "index": 73 },
    "Latvia": { "pps": 19000, "nominal": 15159, "pli": 80, "index": 72 },
    "Turkey": { "pps": 18800, "nominal": 9201, "pli": 49, "index": 71 },
    "Montenegro": { "pps": 18300, "nominal": 10858, "pli": 59, "index": 70 },
    "Serbia": { "pps": 14800, "nominal": 9049, "pli": 61, "index": 56 },
    "North Macedonia": { "pps": 12900, "nominal": 6325, "pli": 49, "index": 49 },
    "Macedonia": { "pps": 12900, "nominal": 6325, "pli": 49, "index": 49 },
    "Republic of North Macedonia": { "pps": 12900, "nominal": 6325, "pli": 49, "index": 49 },
    "Republic of Macedonia": { "pps": 12900, "nominal": 6325, "pli": 49, "index": 49 },
    "FYROM": { "pps": 12900, "nominal": 6325, "pli": 49, "index": 49 },
    "The former Yugoslav Republic of Macedonia": { "pps": 12900, "nominal": 6325, "pli": 49, "index": 49 },
    "Albania": { "pps": 12300, "nominal": 7903, "pli": 64, "index": 47 },
    "Bosnia and Herzegovina": { "pps": 11100, "nominal": 6053, "pli": 55, "index": 42 },
    "Bosnia and Herz.": { "pps": 11100, "nominal": 6053, "pli": 55, "index": 42 }
};

// Color function based on yearly PPS
function getColor(yearly) {
    if (yearly === null || yearly === undefined) return '#cccccc';
    if (yearly >= 33000) return '#5b4db8';
    if (yearly >= 30000) return '#2166ac';
    if (yearly >= 25000) return '#5299c1';
    if (yearly >= 23000) return '#a8d0e6';
    if (yearly >= 20000) return '#ef8a62';
    if (yearly >= 18000) return '#b2182b';
    return '#67001f';
}

// Style function for GeoJSON features
function style(feature) {
    const countryName = feature.properties.name || feature.properties.NAME || feature.properties.ADMIN;
    const data = aicData[countryName];
    const pps = data ? data.pps : null;

    return {
        fillColor: getColor(pps),
        weight: 1,
        opacity: 1,
        color: '#ffffff',
        fillOpacity: 0.8
    };
}

// Europe bounds
const europeBounds = [
    [34, -25],
    [72, 50]
];

// Detect embed mode
const isEmbed = window.isEmbed === true;

// Detect mobile for layout (screen size)
const isSmallScreen = window.innerWidth <= 768;
// Detect touch for interaction mode (popup vs tooltip)
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
// Use touch behavior on small screens OR touch devices
const isMobile = isSmallScreen || isTouchDevice;

// Initialize map
const defaultZoom = isEmbed ? 4 : (isSmallScreen ? 3 : 5.4);
const defaultMinZoom = isEmbed ? 3 : (isSmallScreen ? 2.5 : 5);
const map = L.map('map', {
    center: [54, 15],
    zoom: defaultZoom,
    minZoom: defaultMinZoom,
    maxZoom: 8,
    maxBounds: europeBounds,
    maxBoundsViscosity: 1.0,
    tap: true,
    tapTolerance: 15
});

// Handle resize
window.addEventListener('resize', function() {
    map.invalidateSize();
});

// Tooltip element
const tooltip = document.getElementById('tooltip');

// Get display name
function getDisplayName(name) {
    if (name === "The former Yugoslav Republic of Macedonia") {
        return "North Macedonia";
    }
    return name;
}

// Highlight and show tooltip
function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#333',
        fillOpacity: 0.9
    });
    layer.bringToFront();

    // Get data
    const countryName = layer.feature.properties.name || layer.feature.properties.NAME || layer.feature.properties.ADMIN;
    const displayName = getDisplayName(countryName);
    const data = aicData[countryName];

    // Build tooltip content
    if (data) {
        tooltip.innerHTML = '<div class="tooltip-title">' + displayName + '</div>' +
            '<div class="tooltip-row"><span class="tooltip-label">AIC Index</span><span class="tooltip-value">' + data.index + '%</span></div>' +
            '<div class="tooltip-row"><span class="tooltip-label">PLI</span><span class="tooltip-value">' + data.pli + '</span></div>' +
            '<div class="tooltip-row"><span class="tooltip-label">Nominal</span><span class="tooltip-value">€' + data.nominal.toLocaleString() + '</span></div>' +
            '<div class="tooltip-row"><span class="tooltip-label">PPS</span><span class="tooltip-value">' + data.pps.toLocaleString() + '</span></div>';
    } else {
        tooltip.innerHTML = '<div class="tooltip-title">' + displayName + '</div>' +
            '<div class="tooltip-row"><span class="tooltip-label">Data</span><span class="tooltip-value">Not available</span></div>';
    }

    // Position and show with edge detection
    tooltip.classList.add('visible');

    const tooltipWidth = tooltip.offsetWidth || 280;
    const tooltipHeight = tooltip.offsetHeight || 200;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const mouseX = e.originalEvent.pageX;
    const mouseY = e.originalEvent.pageY;

    let x = mouseX + 15;
    let y = mouseY + 15;

    // Check right edge
    if (x + tooltipWidth > windowWidth - 20) {
        x = mouseX - tooltipWidth - 15;
    }

    // Check bottom edge
    if (y + tooltipHeight > windowHeight - 20) {
        y = mouseY - tooltipHeight - 15;
    }

    // Ensure minimum positions
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

// Reset and hide tooltip
function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
    tooltip.classList.remove('visible');
}

// Move tooltip with edge detection
function moveTooltip(e) {
    const tooltipWidth = tooltip.offsetWidth || 280;
    const tooltipHeight = tooltip.offsetHeight || 200;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const mouseX = e.originalEvent.pageX;
    const mouseY = e.originalEvent.pageY;

    let x = mouseX + 15;
    let y = mouseY + 15;

    // Check right edge
    if (x + tooltipWidth > windowWidth - 20) {
        x = mouseX - tooltipWidth - 15;
    }

    // Check bottom edge
    if (y + tooltipHeight > windowHeight - 20) {
        y = mouseY - tooltipHeight - 15;
    }

    // Ensure minimum positions
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

// Mobile info panel element
const mobilePanel = document.getElementById('mobile-panel');

// Show mobile panel using quadrant positioning
function showMobilePanel(e, countryName) {
    const displayName = getDisplayName(countryName);
    const data = aicData[countryName];

    if (data) {
        mobilePanel.innerHTML =
            '<div class="mobile-panel-close">&times;</div>' +
            '<div class="popup-title">' + displayName + '</div>' +
            '<div class="popup-row"><span>AIC Index:</span> <strong>' + data.index + '%</strong></div>' +
            '<div class="popup-row"><span>PLI:</span> <strong>' + data.pli + '</strong></div>' +
            '<div class="popup-row"><span>Nominal:</span> <strong>€' + data.nominal.toLocaleString() + '</strong></div>' +
            '<div class="popup-row"><span>PPS:</span> <strong>' + data.pps.toLocaleString() + '</strong></div>';
    } else {
        mobilePanel.innerHTML =
            '<div class="mobile-panel-close">&times;</div>' +
            '<div class="popup-title">' + displayName + '</div>' +
            '<div class="popup-row">No data available</div>';
    }

    // Close button handler
    mobilePanel.querySelector('.mobile-panel-close').addEventListener('click', function(evt) {
        evt.stopPropagation();
        mobilePanel.classList.remove('visible');
    });

    // Use Leaflet's containerPoint — works reliably on touch and mouse
    const tapX = e.containerPoint.x;
    const tapY = e.containerPoint.y;
    const mapSize = map.getSize();
    const centerX = mapSize.x / 2;
    const centerY = mapSize.y / 2;

    // Determine quadrant and position panel
    const isLeft = tapX < centerX;
    const isTop = tapY < centerY;

    // Reset all positioning
    mobilePanel.style.left = '';
    mobilePanel.style.right = '';
    mobilePanel.style.top = '';
    mobilePanel.style.bottom = '';

    if (isLeft && isTop) {
        // Top-left quadrant: panel's top-left corner at tap point (extends down-right)
        mobilePanel.style.left = tapX + 'px';
        mobilePanel.style.top = tapY + 'px';
    } else if (!isLeft && isTop) {
        // Top-right quadrant: panel's top-right corner at tap point (extends down-left)
        mobilePanel.style.right = (mapSize.x - tapX) + 'px';
        mobilePanel.style.top = tapY + 'px';
    } else if (isLeft && !isTop) {
        // Bottom-left quadrant: panel's bottom-left corner at tap point (extends up-right)
        mobilePanel.style.left = tapX + 'px';
        mobilePanel.style.bottom = (mapSize.y - tapY) + 'px';
    } else {
        // Bottom-right quadrant: panel's bottom-right corner at tap point (extends up-left)
        mobilePanel.style.right = (mapSize.x - tapX) + 'px';
        mobilePanel.style.bottom = (mapSize.y - tapY) + 'px';
    }

    mobilePanel.classList.add('visible');
}

// Hide mobile panel when tapping the map background
if (isMobile) {
    map.on('click', function() {
        mobilePanel.classList.remove('visible');
    });
}

// Build popup content (desktop only)
function getPopupContent(countryName) {
    const displayName = getDisplayName(countryName);
    const data = aicData[countryName];

    if (data) {
        return '<div class="popup-content">' +
            '<div class="popup-title">' + displayName + '</div>' +
            '<div class="popup-row"><span>AIC Index:</span> <strong>' + data.index + '%</strong></div>' +
            '<div class="popup-row"><span>PLI:</span> <strong>' + data.pli + '</strong></div>' +
            '<div class="popup-row"><span>Nominal:</span> <strong>€' + data.nominal.toLocaleString() + '</strong></div>' +
            '<div class="popup-row"><span>PPS:</span> <strong>' + data.pps.toLocaleString() + '</strong></div>' +
            '</div>';
    }
    return '<div class="popup-content"><div class="popup-title">' + displayName + '</div><div>No data</div></div>';
}

// Add events to each feature
function onEachFeature(feature, layer) {
    const countryName = feature.properties.name || feature.properties.NAME || feature.properties.ADMIN;

    if (isMobile) {
        layer.on('click', function(e) {
            showMobilePanel(e, countryName);
        });
    } else {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            mousemove: moveTooltip
        });
    }
}

// GeoJSON layer
let geojsonLayer;

// Check if country has data
function hasData(name) {
    return aicData[name] !== undefined;
}

// Load GeoJSON
fetch('https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson')
    .then(response => response.json())
    .then(data => {
        data.features = data.features.filter(f => {
            const name = f.properties.name || f.properties.NAME || f.properties.ADMIN;
            return hasData(name);
        });

        geojsonLayer = L.geoJSON(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

        map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });
