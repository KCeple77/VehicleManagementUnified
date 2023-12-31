import { Component } from '@angular/core';
import { LocationService } from '../../services/location.service';

import Graphic from '@arcgis/core/Graphic';
import Map from '@arcgis/core/Map';
import config from '@arcgis/core/config';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import MapView from '@arcgis/core/views/MapView';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  mapView!: MapView;

  constructor(
    private locationService: LocationService
  ) {

  }

  ngOnInit() {
    config.apiKey = "AAPK8636e303b15f4645b8e9738091fff655X4_HN5iSSAhP3OyfrLRqEtFUyQwX94dmLV_1D017_7fZ7E55g3zbCT3Nku2tlZ0T";

    const map = new Map({
        basemap: 'topo-vector'
    });

    this.mapView = new MapView({
        container: 'arcgisMapView',
        map: map,
        center: [17.815399, 42.266568],
        zoom: 7.4
    });

    this.locationService.getAllLocations().subscribe((locations) => {   // Fetch locations from your service
      locations.forEach(location => {
        this.addPinpoint(location.locationX, location.locationY);
      });
    });
  }

  addPinpoint(locationX: number, locationY: number) {
    const point = new Point({
      longitude: locationX,
      latitude: locationY
    });

    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40], // RGB color of the marker
      outline: {
        color: [255, 255, 255], // RGB color of the outline
        width: 2
      }
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    this.mapView.graphics.add(pointGraphic);
  }
}
