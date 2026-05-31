/**
 * Test file — matches your "The Air We Share" CO2 sensor project.
 * This compiles under pxt and is the baseline for the agent end-to-end test.
 */

// Original project code — show CO2 on startup
basic.showString("" + kitronik_air_quality.readeCO2());

// Main loop — continuous monitoring with icon feedback
basic.forever(function () {
    const ppm = airWeShare.readCO2();
    basic.showString("" + ppm);
    airWeShare.showAirQualityIcon();
    basic.pause(3000);
});

// Alert when CO2 gets too high
airWeShare.setAlertThreshold(1000);
airWeShare.onHighCO2(function () {
    basic.showIcon(IconNames.Skull);
    music.playTone(880, 500);
});
