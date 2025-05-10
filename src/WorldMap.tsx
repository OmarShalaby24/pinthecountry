import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { GeoJSONProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import worldGeoJSON from './data/world-countries.json';
import { LatLngBoundsExpression } from 'leaflet';

const WorldMap = ({ targetCountry }) => {
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const highlightedCountryRef = useRef<string | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);


  const handleGeoJsonAdd = (e) => {
    geoJsonLayerRef.current = e.target; // This is the L.GeoJSON layer
  };

  useEffect(() => {
    // Expose a function to the browser console
    window.pr = () => {
      if (highlightedCountryRef.current) {
        console.log(`${highlightedCountryRef.current}`);
      } else {
        console.log("No country is currently highlighted.");
      }
    };
  }, []);

  const getSelectionStyle = () => ({
    fillColor: '#ccc',
    weight: 1,
    color: '#555',
    fillOpacity: 0.7,
  });
  const getCorrectHighlightedStyle = () => ({
    fillColor: '#2ee300',
    weight: 3, // Make the border thicker
    color: '#1d8f00',
    fillOpacity: 0.7,
  });
  const getWrongHighlightedStyle = () => ({
    fillColor: '#ff0000',
    weight: 3, // Make the border thicker
    color: '#940000',
    fillOpacity: 0.7,
  });

  const getHighlightedStyle = () => ({
    fillColor: '#00a4d1', // Change the fill color on click
    weight: 3, // Make the border thicker
    color: '#0059ff', // Red border color
    fillOpacity: 0.5, // Optionally adjust fill opacity
  });

  const maxBounds: LatLngBoundsExpression = [
    [-100, -180],
    [85, 180],
  ];

  const onReset = () => {
    window.location.reload();
    // geoJsonLayerRef.current!.getLayers().forEach((layer) => {
    //   (layer as L.Path).setStyle(getSelectionStyle());
    // });
  };

  const handleSubmit = () => {
    console.log('submit clicked');
    submitButtonRef.current!.disabled = true;
    resetButtonRef.current!.textContent = 'Play Again';

    let correctLayer: L.Layer | null = null;

    geoJsonLayerRef.current!.getLayers().forEach((layer) => {
      const countryName = (layer as L.Layer & { feature?: GeoJSON.Feature }).feature?.properties?.name;

      if (highlightedCountryRef.current === targetCountry && countryName === targetCountry) {
        (layer as L.Path).setStyle(getCorrectHighlightedStyle());
      } else if (countryName === highlightedCountryRef.current) {
        (layer as L.Path).setStyle(getWrongHighlightedStyle());
      } else if (countryName === targetCountry) {
        (layer as L.Path).setStyle(getCorrectHighlightedStyle());
        correctLayer = layer;
      }
    });

    // If wrong, zoom to the correct one
    if (highlightedCountryRef.current !== targetCountry && correctLayer && mapRef.current) {
      const bounds = (correctLayer as L.Path).getBounds?.();
      if (bounds) {
        mapRef.current.fitBounds(bounds.pad(0.7)); // pad to give some margin
      }
    }
  };


  const trunOffHighlights = () => {
    geoJsonLayerRef.current!.getLayers().forEach((layer) => {
      (layer as L.Path).setStyle(getSelectionStyle());
    });
  }

  const onEachCountry = (feature, layer) => {
    const countryName = feature.properties.name;

    layer.on({
      click: () => {
        const previous = highlightedCountryRef.current;
        trunOffHighlights();

        layer.setStyle(getHighlightedStyle());
        highlightedCountryRef.current = countryName;
      },

      mouseover: () => {
        if (highlightedCountryRef.current === countryName) return;

        layer.setStyle({
          weight: 2,
          color: '#666',
          fillOpacity: 0.7,
        });
      },

      mouseout: () => {
        if (highlightedCountryRef.current !== countryName && targetCountry !== countryName) {
          layer.setStyle(getSelectionStyle());
        }
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={5}
        style={{ height: '550px', width: '80%' }}
        worldCopyJump={false}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        doubleClickZoom={false}
        ref={mapRef}
      >

        <GeoJSON
          data={worldGeoJSON as GeoJSON.FeatureCollection}
          style={getSelectionStyle}
          onEachFeature={onEachCountry}
          eventHandlers={{
            add: handleGeoJsonAdd, // <- This sets up the GeoJSON ref safely
          }}
        />


        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          noWrap={true}
        />
      </MapContainer>

      {false ? (
        <button onClick={() => { }}>Play Again</button>
      ) : (
        <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
          <button ref={resetButtonRef} onClick={onReset}>Reset</button>
          <button ref={submitButtonRef} onClick={handleSubmit}>Submit</button>
          {/* <button onClick={() => console.log(highlightedCountryRef.current)}>Submit</button> */}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
