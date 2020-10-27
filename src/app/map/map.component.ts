import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { DataApiService } from '../services/data-api.service';
import { Unidades } from '../models/unidades';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map;

  selectedEstado;
  selectedMunicipio;
  selectedUnidad;

  selectedEstadoEsc;
  selectedMunicipioEsc;
  selectedCatEsc;

  selectedEstadoCom;
  selectedMunicipioCom;
  selectedCatCom;

  selectedEstadoHosp;
  selectedMunicipioHosp;
  selectedCatHosp;

  arrEstados = [];
  arrMunicipios = [];
  arrMunicipiosEsc = [];
  arrMunicipiosHosp = [];
  arrMunicipiosCom = [];
  arrActividades = [];
  arrEscuelaCat = [];
  arrEscuelas = [];
  arrComercioCat = [];
  arrComercio = [];
  arrHospitalCat = [];
  arrHospital = [];

  constructor(private markerService: MarkerService,
    private dataApiService: DataApiService
    ) 
    { }

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeCapitalMarkers(this.map);
    this.getEstados();
    this.getUnidades();
    this.getEscuelaCat();
    this.getComercioCat();
    this.getHospitalCat();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

 private getEstados()
 {
  this.dataApiService.getEstados().subscribe((estados: any) => {
    this.arrEstados = estados;
   });

 }

 private getUnidades()
 {
  this.dataApiService.getUnidades().subscribe((unidades: any) => {
    this.arrActividades = unidades.content;
   });
 
 }

 private getEscuelaCat()
 {
   this.dataApiService.getEscuelaCat().subscribe((unidades: any) => {
    this.arrEscuelaCat = unidades.content;
   });
 }

 private getComercioCat()
 {
   this.dataApiService.getComercioCat().subscribe((unidades: any) => {
     this.arrComercioCat = unidades.content
   });
 }

 private getHospitalCat()
 {
   this.dataApiService.getHospitalCat().subscribe((unidades: any) => {
     this.arrHospitalCat = unidades.content
   });
 }
 
 private changeEstado()
 {
   this.dataApiService.getMunicipios(this.selectedEstado)
   .subscribe((municipios: any) => {
    this.arrMunicipios = municipios;
   });
 
 }

 private changeEstadoEsc()
 {
   this.dataApiService.getMunicipios(this.selectedEstadoEsc)
   .subscribe((municipios: any) => {
    this.arrMunicipiosEsc = municipios;
   });
 
 }

 private changeEstadoCom()
 {
   this.dataApiService.getMunicipios(this.selectedEstadoCom)
   .subscribe((municipios: any) => {
    this.arrMunicipiosCom = municipios;
   });
 
 }
 
 private changeEstadoHosp()
 {
   this.dataApiService.getMunicipios(this.selectedEstadoHosp)
   .subscribe((municipios: any) => {
    this.arrMunicipiosHosp = municipios;
   });
 
 }

 private changeMunicipio()
 {
  console.log(this.selectedEstado);
  console.log(this.selectedMunicipio);
  console.log(this.selectedUnidad);
 }

 private buscarDenues()
 {
  this.markerService.makeDenuesMarkers(this.map,
    this.selectedEstado,
    this.selectedMunicipio,
    this.selectedUnidad
    );
 }

 private buscarEscuelas()
 {
  this.markerService.makeEscuelasMarkers(this.map,
    this.selectedEstadoEsc,
    this.selectedMunicipioEsc,
    this.selectedCatEsc
    );
 }

 private buscarComercios()
 {
  this.markerService.makeComercioMarkers(this.map,
    this.selectedEstadoCom,
    this.selectedMunicipioCom,
    this.selectedCatCom
    );
 }

 private buscarHospital()
 {
   console.log("Estado: " + this.selectedEstadoHosp);
   console.log("Municipio: " + this.selectedMunicipioHosp);
   console.log("Cat: " + this.selectedCatHosp);
  this.markerService.makeHospitalMarkers(this.map,
    this.selectedEstadoHosp,
    this.selectedMunicipioHosp,
    this.selectedCatHosp
    );
 }
 
}