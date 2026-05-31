# air-we-share — MakeCode Extension for BBC micro:bit

CO2 and air quality monitoring blocks using the Kitronik Air Quality Board.

## Blocks

### Reading

```typescript
let ppm = airWeShare.readCO2();
```

### Quality classification

```typescript
let level = airWeShare.currentAirQuality();
// Good (<800), Moderate (800–999), Poor (1000–1499), Very Poor (≥1500)
```

### Display

```typescript
airWeShare.showCO2();         // scroll the number
airWeShare.showAirQualityIcon(); // tick / square / sad / skull
```

### Alerts

```typescript
airWeShare.setAlertThreshold(1000);
airWeShare.onHighCO2(function () {
    basic.showIcon(IconNames.Skull);
});
```

### Data logging (CSV)

```typescript
basic.showString(airWeShare.csvHeader());  // time_ms,co2_ppm,quality
basic.showString(airWeShare.csvRow());     // 12345,756,Good
```

## Your project code

```typescript
basic.showString("" + kitronik_air_quality.readeCO2());

basic.forever(function () {
    basic.showString("" + airWeShare.readCO2());
    airWeShare.showAirQualityIcon();
    basic.pause(3000);
});
```

## Install in MakeCode

1. Open https://makecode.microbit.org
2. New project → click the gear ⚙️ → Extensions
3. Paste: `https://github.com/eoinjordan/pxt-microbit-airweshare`
4. Click the extension to add it

## CO2 thresholds

| Level | ppm | What it means |
|-------|-----|---------------|
| Good | < 800 | Fresh air |
| Moderate | 800–999 | Slightly stuffy — open a window soon |
| Poor | 1000–1499 | Poor air quality — open windows now |
| Very Poor | ≥ 1500 | Very poor — ventilate immediately |

## License

MIT
