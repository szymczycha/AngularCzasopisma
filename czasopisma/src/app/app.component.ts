import { Component } from '@angular/core';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  deselectCzasopismo() {
    this.selectingCzasopismo = true;
    this.aktualneCzasopismo = "";
    this.wydaniaCzasopismDoWyswietlenia = [];
  }
  getButtonColor(rok: string) {
    if (rok == this.aktualnyRok) {
      return "blue";
    } else {
      return "gray";
    }
  }
  password: string = "";
  dobreZarobki: boolean = false;
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
  validateKeystroke(e: KeyboardEvent) {
    if (this.password + e.key == "666.666") {
      this.dobreZarobki = true;
    }
    if (e.key == "Backspace") {
      return true;
    }
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (numbers.includes(e.key)) {
      return true;
    }
    if (e.key == "." && this.password.split(".").length <= 2) {
      return true;
    }
    return false;
  }

  selectAktualnyRok(rok: string) {
    this.aktualnyRok = rok;
    this.wydaniaCzasopismDoWyswietlenia = [];

    Object.keys(this.xml[this.aktualneCzasopismo]).forEach(wydanieCzasopisma => {
      if (rok == "wszystkie" || this.xml[this.aktualneCzasopismo][wydanieCzasopisma].$.rok == this.aktualnyRok) {
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
