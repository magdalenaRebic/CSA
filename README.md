# Česká spořitelna – E2E Testy

## Úvod

Tento projekt obsahuje **end-to-end (E2E) testy** napsané v **Cypress**, které simulují zákaznickou cestu při **založení standardního účtu na pobočce** České spořitelny.  
Testy jsou určeny pro **ostrý web**, aby bylo možné ověřit funkčnost a integritu zákaznické cesty v reálném prostředí.

---

## Technologie a závislosti

- **Cypress** – pro E2E testování
- **Faker** – pro generování náhodných testovacích dat (např. jména, emaily)
- Node.js a npm pro správu balíčků

---

## Instalace

1. Naklonujte repozitář:

```bash
git clone < https://github.com/magdalenaRebic/CSA >
```

2. Nainstalujte závislosti:

```bash
npm install

```

---

## Struktura projektu

```
project-root/
│
├─ cypress/
│   ├─ e2e/           # E2E testy
│   ├─ support/       # Commands, hooks, konfigurace
│   └─ fixtures/      # Testovací data
├─ package.json
├─ README.md
```

---

## Spuštění testů

### Otevření Cypress GUI

```bash
npx cypress open
```

Vyber test a spusť ho v interaktivním režimu.

### Spuštění testů headless

```bash
npx cypress run
```

---

## Specifika testů

- Testy simulují kompletní zákaznickou cestu při zakládání účtu.
- Data pro testování jsou generována dynamicky pomocí **Faker**.
- Aby se předešlo selhání testů na produkčním webu, byly ošetřeny **ReferenceError**, které by jinak způsobily pád testu.

---

## Tipy pro vývoj

- Pro přidání nových testů vytvářej soubory v `cypress/e2e/`.
- Pokud se objeví neznámé JavaScript chyby z aplikace, lze je ošetřit v `cypress/support/e2e.js` pomocí:

```javascript
Cypress.on("uncaught:exception", (err) => {
  return false; // ignoruje chyby aplikace a nepřerušuje test
});
```

---

## Výstupy testů

- Cypress automaticky generuje screenshoty při selhání testů.
- Volitelně lze zapnout nahrávání videa běhu testů v konfiguraci Cypress.
