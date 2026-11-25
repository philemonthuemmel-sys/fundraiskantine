# Fundraiskantine

Statische One-Pager-Website für die Spendenkampagne „Fundraiskantine" – reines HTML/CSS/JS, kein Build-Step, keine Abhängigkeiten.

## Struktur

- `index.html` – die komplette Kampagnenseite (Deutsch)
- `styles.css` – Gestaltung (Farben abgestimmt auf das Logo)
- `script.js` – Fortschrittsbalken, Countdown, FAQ-Akkordeon, Kopier-Buttons, mobile Navigation
- `logo.png` – Kampagnen-Logo (transparent, im Header eingebunden)
- `favicon.png` – Browser-Icon
- `merch-geschirrtuch.png` – selbst entworfener Entwurf: ausgebreitetes kariertes Tuch (Stil wie Beispielfoto) mit Logo-Druck
- `merch-kochschuerze.png`, `merch-basecap.png` – Produktfotos von Wikimedia Commons (CC0 / Public Domain) mit unserem Logo
- `leika-haus.jpg` – Haus-Rendering von leika-leipzig.com (Quelle: `haus-bunt_kompri.jpg`) – Nutzungsrechte bitte mit LEIKA/Libero Architekten klären
- `README.md` – diese Datei

## Kampagnenzahlen anpassen

Die Zahlen stehen als `data`-Attribute am Abschnitt `#fortschritt` in `index.html`:

- `data-goal` – Spendenziel in Euro
- `data-current` – bisher gesammelter Betrag in Euro
- `data-donors` – Anzahl der Unterstützenden

Bankverbindung und Kontaktdaten stehen direkt in den Abschnitten `#spenden` und `#kontakt`.

## Lokal ansehen

`index.html` direkt im Browser öffnen oder lokal ausliefern:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 aufrufen
```

## Veröffentlichung über GitHub Pages

1. In den Repo-Einstellungen unter **Pages** gehen
2. Quelle wählen: **Deploy from a branch**, Branch `main`, Ordner `/ (root)`
3. Speichern – die Seite ist nach kurzer Zeit unter
   `https://philemonthuemmel-sys.github.io/fundraiskantine/` erreichbar
