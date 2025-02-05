document.addEventListener("DOMContentLoaded", function () {
    const redRange = document.getElementById("redRange");
    const greenRange = document.getElementById("greenRange");
    const blueRange = document.getElementById("blueRange");
    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");
    const colorBox = document.getElementById("colorBox");
    const hexCode = document.getElementById("hexCode");
    const colorPicker = document.getElementById("colorPicker");

    function updateColor() {
        const r = redRange.value;
        const g = greenRange.value;
        const b = blueRange.value;
        
        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;
        
        const hex = rgbToHex(r, g, b);
        colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexCode.textContent = hex;
        colorPicker.value = hex;
    }

    function syncRangeWithInput(input, range) {
        input.addEventListener("input", function () {
            range.value = input.value;
            updateColor();
        });
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    colorPicker.addEventListener("input", function () {
        const { r, g, b } = hexToRgb(colorPicker.value);
        redRange.value = redInput.value = r;
        greenRange.value = greenInput.value = g;
        blueRange.value = blueInput.value = b;
        updateColor();
    });

    redRange.addEventListener("input", updateColor);
    greenRange.addEventListener("input", updateColor);
    blueRange.addEventListener("input", updateColor);

    syncRangeWithInput(redInput, redRange);
    syncRangeWithInput(greenInput, greenRange);
    syncRangeWithInput(blueInput, blueRange);

    updateColor();
});
