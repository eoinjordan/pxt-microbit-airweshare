# air-we-share — MakeCode Extension for BBC micro:bit

[![MakeCode](https://img.shields.io/badge/MakeCode-micro:bit-red)](https://makecode.microbit.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Originally developed as part of an **environmental monitoring education project** exploring indoor air quality with students. Published here for future use by educators, students, and makers.

## Background

**The Air We Share** was a classroom project where students used BBC micro:bit devices and the [Kitronik Air Quality Board](https://kitronik.co.uk/products/5674-kitronik-air-quality-board-for-bbc-microbit) to monitor CO₂ levels in their learning environment. Students built their own monitors, learned about what CO₂ levels mean for health and learning, and explored what happens to air quality when a classroom fills up or windows are opened.

This extension wraps the Kitronik sensor library with higher-level, classroom-friendly blocks — so students can focus on the science and coding ideas rather than low-level sensor calls.

## Install in MakeCode

1. Open [https://makecode.microbit.org](https://makecode.microbit.org)
2. New project → click the gear ⚙️ → **Extensions**
3. Paste: `https://github.com/eoinjordan/pxt-microbit-airweshare`
4. Click the extension to add it

> **Requires** the [Kitronik Air Quality Board](https://kitronik.co.uk/products/5674-kitronik-air-quality-board-for-bbc-microbit) — or any setup using `pxt-kitronik-air-quality`.

## Quickstart

The original student project code:

```typescript
basic.showString("" + kitronik_air_quality.readeCO2())

basic.forever(function () {
    basic.showString("" + airWeShare.readCO2())
    airWeShare.showAirQualityIcon()
    basic.pause(3000)
})
```

With alerts:

```typescript
airWeShare.setAlertThreshold(1000)
airWeShare.onHighCO2(function () {
    basic.showIcon(IconNames.Skull)
    music.playTone(880, 500)
})
```

## Blocks

### Reading sensor data

| Block | What it does |
|-------|-------------|
| `airWeShare.readCO2()` | CO₂ level in ppm (from Kitronik sensor) |
| `airWeShare.currentAirQuality()` | Returns `Good`, `Moderate`, `Poor`, or `Very Poor` |
| `airWeShare.airQualityFor(ppm)` | Classify any raw ppm value |
| `airWeShare.isCO2High()` | `true` if above the alert threshold |

### Display

| Block | What it does |
|-------|-------------|
| `airWeShare.showCO2()` | Scroll the CO₂ number on the LED display |
| `airWeShare.showAirQualityIcon()` | ✓ tick / ◻ square / 😢 sad / ☠️ skull |
| `airWeShare.levelLabel(level)` | `"Good"` / `"Moderate"` / `"Poor"` / `"Very Poor"` |

### Alerts

| Block | What it does |
|-------|-------------|
| `airWeShare.setAlertThreshold(ppm)` | Set the CO₂ alert level (default: 1000 ppm) |
| `airWeShare.onHighCO2(handler)` | Run code every 5 s when CO₂ is above threshold |

### Data logging

| Block | What it does |
|-------|-------------|
| `airWeShare.csvHeader()` | `"time_ms,co2_ppm,quality"` |
| `airWeShare.csvRow()` | `"12345,756,Good"` — one row per reading |

## CO₂ thresholds

| Level | ppm | Meaning |
|-------|-----|---------|
| **Good** | < 800 | Fresh air — good for concentration |
| **Moderate** | 800–999 | Slightly stuffy — open a window soon |
| **Poor** | 1000–1499 | Poor air quality — ventilate now |
| **Very Poor** | ≥ 1500 | Ventilate immediately |

Thresholds follow [UK Health and Safety Executive guidance](https://www.hse.gov.uk/coronavirus/equipment-and-machinery/air-conditioning-and-ventilation/identifying-poorly-ventilated-areas.htm) for indoor spaces.

## Project ideas

- **Classroom ventilation monitor** — alert when CO₂ rises above 1000 ppm, log every 30 s to serial
- **Good/bad air race** — two micro:bits in different rooms, compare readings over radio
- **Time-lapse logging** — record CSV data over a school day, graph it in spreadsheet
- **Science investigation** — does opening a window actually help? By how much? How fast?

## Hardware

- [BBC micro:bit v2](https://microbit.org/buy/) (v1 may work but is untested)
- [Kitronik Air Quality Board for micro:bit](https://kitronik.co.uk/products/5674-kitronik-air-quality-board-for-bbc-microbit)

## License

MIT — free to use, adapt, and share for education and personal projects.

---

*Published for future classroom use. Originally part of The Air We Share environmental monitoring project.*
