# Online platform til træning af matematik på A-niveau
Dette program er udarbejdet i forbindelse med P2-projektet på Software uddannelse på AAU.

## Beskrivelse
Programmet har til formål at understøtte læring i matematik blandt gymnasieelever med matematik på A-niveau.

## Sådan kommer du i gang
Der er enkelte trin man lige skal sikre sig, før det er muligt at køre programmet.

### Afhængigheder

Det kræves at [NodeJS](https://nodejs.org/en/) er installeret på computeren for at kunne køre programmet.

#### Installation af Node Pakker

  I `root` mappen skal følgende kommando køres, for at installere alle nøvendige Node pakker
  ```
  $ npm install
  ``` 

### Kørsel af program
For at køre programmet skal man blot skrive 
```
$ npm start
``` 

## Ydeligere info

### Struktur af program
Programmet er opdelt i to hoveddele: 

I mappen `public` ligger alt koden der køres på klientsiden. Dette inkluderer det JavaScript, som genererer vores HTML-side, som findes i `js/generatePages.js`. 

I mappen `src` ligger koden, som kører på serversiden. Dette har sin start i filen `app.js`. Denne gør ydeligere brug af en masse hjælpefunktioner. Bl.a. bliver alle requests håndteret i deres respektive filer i mappen `routes`. Generering af opgaver sker i mappen `API/examQuestions`. Her findes der JavaScript-filer til hvert emne, samt en overordnet generator, som findes i `API/examQuestions/generator.js`
### Andre kommandoer

Det er muligt at teste programmet ved at skrive:
```
$ npm run test
```

Det er også muligt at få `test-coverage` af programmet ved at skrive:
```
$ npm run coverage
```

Dokumentation af kildekode kan findes [her](https://madsbalslev.github.io/P2/)

## Udarbejdet af:

* [Simon M. P. Andersen](mailto:smpa20@student.aau.dk)
* [Lucian Ngando](mailto:lngand19@student.aau.dk)
* [Casper Ståhl](mailto:cstahl20@student.aau.dk)
* [Nicolai B. Nielsen](mailto:nni20@student.aau.dk)
* [Patrick R. Bertelsen](mailto:pberte20@student.aau.dk)
* [Mads P. Balslev](mailto:mbalsl20@student.aau.dk)
