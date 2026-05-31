/**
 * Air We Share — CO2 and air quality monitoring for BBC micro:bit
 *
 * Wraps the Kitronik Air Quality Board with classroom-friendly blocks:
 * quality levels, LED indicators, threshold alerts, and data logging.
 *
 * Depends on: pxt-kitronik-air-quality
 */

//% color=#1a7a4a weight=80 icon="" block="Air We Share"
namespace airWeShare {

    /**
     * Air quality level based on CO2 ppm
     */
    export enum AirQualityLevel {
        //% block="Good"
        Good = 0,
        //% block="Moderate"
        Moderate = 1,
        //% block="Poor"
        Poor = 2,
        //% block="Very Poor"
        VeryPoor = 3
    }

    // Thresholds (ppm) — these match UK/EU classroom guidance
    const THRESHOLD_MODERATE = 800;
    const THRESHOLD_POOR = 1000;
    const THRESHOLD_VERY_POOR = 1500;

    let _alertThreshold = THRESHOLD_POOR;
    let _alertHandler: () => void = null;
    let _monitorRunning = false;

    /**
     * Read the current CO2 level in parts per million (ppm).
     */
    //% blockId=aws_read_co2
    //% block="CO2 level (ppm)"
    //% weight=100
    export function readCO2(): number {
        return kitronik_air_quality.readeCO2();
    }

    /**
     * Classify a CO2 reading as Good, Moderate, Poor, or Very Poor.
     * @param ppm CO2 level in ppm, eg: 600
     */
    //% blockId=aws_co2_level
    //% block="air quality for %ppm ppm"
    //% weight=90
    export function airQualityFor(ppm: number): AirQualityLevel {
        if (ppm >= THRESHOLD_VERY_POOR) return AirQualityLevel.VeryPoor;
        if (ppm >= THRESHOLD_POOR) return AirQualityLevel.Poor;
        if (ppm >= THRESHOLD_MODERATE) return AirQualityLevel.Moderate;
        return AirQualityLevel.Good;
    }

    /**
     * Get the current air quality level.
     */
    //% blockId=aws_current_level
    //% block="current air quality"
    //% weight=88
    export function currentAirQuality(): AirQualityLevel {
        return airQualityFor(readCO2());
    }

    /**
     * Show the current air quality on the LED display.
     * Good = tick, Moderate = small square, Poor = sad face, Very Poor = skull.
     */
    //% blockId=aws_show_icon
    //% block="show air quality icon"
    //% weight=85
    export function showAirQualityIcon(): void {
        const level = currentAirQuality();
        basic.clearScreen();
        switch (level) {
            case AirQualityLevel.Good:
                basic.showIcon(IconNames.Yes);
                break;
            case AirQualityLevel.Moderate:
                basic.showIcon(IconNames.SmallSquare);
                break;
            case AirQualityLevel.Poor:
                basic.showIcon(IconNames.Sad);
                break;
            case AirQualityLevel.VeryPoor:
                basic.showIcon(IconNames.Skull);
                break;
        }
    }

    /**
     * Show the CO2 reading as a scrolling number on the display.
     */
    //% blockId=aws_show_co2
    //% block="show CO2 reading"
    //% weight=84
    export function showCO2(): void {
        basic.showString("" + readCO2());
    }

    /**
     * Return a label for an air quality level.
     * @param level the air quality level
     */
    //% blockId=aws_level_label
    //% block="label for %level"
    //% weight=70
    export function levelLabel(level: AirQualityLevel): string {
        switch (level) {
            case AirQualityLevel.Good: return "Good";
            case AirQualityLevel.Moderate: return "Moderate";
            case AirQualityLevel.Poor: return "Poor";
            default: return "Very Poor";
        }
    }

    /**
     * Build a CSV data row for the current reading.
     * Format: timestamp_ms,co2_ppm,level_label
     */
    //% blockId=aws_csv_row
    //% block="CSV data row"
    //% weight=65
    export function csvRow(): string {
        const ppm = readCO2();
        const level = airQualityFor(ppm);
        return "" + input.runningTime() + "," + ppm + "," + levelLabel(level);
    }

    /**
     * Return the CSV header row.
     */
    //% blockId=aws_csv_header
    //% block="CSV header"
    //% weight=64
    export function csvHeader(): string {
        return "time_ms,co2_ppm,quality";
    }

    /**
     * Set the CO2 alert threshold (default 1000 ppm).
     * @param ppm threshold in ppm, eg: 1000
     */
    //% blockId=aws_set_threshold
    //% block="set alert threshold to %ppm ppm"
    //% weight=60
    export function setAlertThreshold(ppm: number): void {
        _alertThreshold = ppm;
    }

    /**
     * Run code when CO2 exceeds the alert threshold.
     * Checks every 5 seconds in the background.
     */
    //% blockId=aws_on_high_co2
    //% block="on high CO2"
    //% weight=55
    export function onHighCO2(handler: () => void): void {
        _alertHandler = handler;
        if (!_monitorRunning) {
            _monitorRunning = true;
            control.inBackground(() => {
                while (true) {
                    if (_alertHandler && readCO2() >= _alertThreshold) {
                        _alertHandler();
                    }
                    basic.pause(5000);
                }
            });
        }
    }

    /**
     * Is the current CO2 level above the alert threshold?
     */
    //% blockId=aws_is_high
    //% block="CO2 is above threshold"
    //% weight=50
    export function isCO2High(): boolean {
        return readCO2() >= _alertThreshold;
    }
}
