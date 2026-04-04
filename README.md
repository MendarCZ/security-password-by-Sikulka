# Web bezpečnost

Jednoduchá statická stránka pro rychlou osvětu:
- základní bezpečnostní kroky
- přepínač `CZ / EN`
- lokální checklist přes `localStorage`
- mrkající avatar v hero sekci

## Soubory

- `index.html` - hlavní stránka
- `style.css` - vzhled stránky
- `script.js` - checklist, jazykový přepínač, mrkání avatara
- `avatar/` - lokální obrázky vrstev avatara

## Nasazení

Stránka je čistě statická. Pro GitHub Pages stačí nahrát obsah této složky beze změn.

Není potřeba:
- backend
- build krok
- externí knihovny

## Poznámky

- Stav checkboxů se ukládá jen lokálně v prohlížeči.
- Přepnutí jazyka se také ukládá jen lokálně v prohlížeči.
- Avatar používá lokální assety ze složky `avatar/`, takže stránka není závislá na jiném projektu v workspace.
