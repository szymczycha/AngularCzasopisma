import { Component } from '@angular/core';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  wydaniaCzasopismDoWyswietlenia: string[] = [];
  title = 'czasopisma';
  xml: any;
  czasopisma: string[] = [];
  selectingCzasopismo: boolean = true;
  aktualneCzasopismo: string = '';
  lataAktualnegoCzasopisma: string[] = [];
  aktualnyRok: string = '';
  public selectCzasopismo(czasopismo: string) {
    this.aktualneCzasopismo = czasopismo;
    this.selectingCzasopismo = false;
    this.lataAktualnegoCzasopisma =
      this.xml.lata[this.aktualneCzasopismo].split(',');
  }
  selectAktualnyRok(rok: string) {
    this.aktualnyRok = rok;
    this.wydaniaCzasopismDoWyswietlenia = [];
    Object.keys(this.xml[this.aktualneCzasopismo]).forEach(wydanieCzasopisma => {
      if(this.xml[this.aktualneCzasopismo][wydanieCzasopisma].$.rok == this.aktualnyRok){
        this.wydaniaCzasopismDoWyswietlenia.push(wydanieCzasopisma);
      }
    });
  }
  constructor() {
    fetch('./assets/czasopisma.xml')
      .then((response) => response.text())
      .then((data) => {
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(data, (err, result) => {
          console.log(result);
          console.log(result.czasopisma.zmienne.Atari_Age.src);
          this.xml = result.czasopisma;
          console.log(this.xml);
          console.log(this.xml.zmienne['Avax']);
          this.czasopisma = Object.keys(result.czasopisma.zmienne);
        });
      })
      .catch(console.error);
  }
}
