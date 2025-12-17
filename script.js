function computeWater(arr) {
    let n = arr.length;
    let left = new Array(n);
    let right = new Array(n);

    left[0] = arr[0];
    for (let i = 1; i < n; i++) {
        left[i] = Math.max(left[i - 1], arr[i]);
    }

    right[n - 1] = arr[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        right[i] = Math.max(right[i + 1], arr[i]);
    }

    let water = 0;
    let waterArr = [];

    for (let i = 0; i < n; i++) {
        let w = Math.min(left[i], right[i]) - arr[i];
        water += w;
        waterArr.push(Math.max(w, 0));
    }

    return { water, waterArr };
}


function renderSVG(blocks, waterArr) {
    let width = 40, height = 200;
    let maxH = Math.max(...blocks);

    let svg = `<svg width="${blocks.length * width}" height="${height}" style="border:1px solid #999;">`;

    for (let i = 0; i < blocks.length; i++) {
        let blockH = (blocks[i] / maxH) * height;
        let waterH = (waterArr[i] / maxH) * height;

        let x = i * width;

        // Block (yellow)
        svg += `
            <rect x="${x}" y="${height - blockH}" width="${width - 5}" height="${blockH}"
            fill="#cddc39" stroke="#555" />
        `;

        // Water (blue)
        if (waterH > 0) {
            svg += `
                <rect x="${x}" y="${height - blockH - waterH}" width="${width - 5}" height="${waterH}"
                fill="#03a9f4" stroke="#333" />
            `;
        }
    }

    svg += `</svg>`;
    return svg;
}


function render() {
    let input = document.getElementById("inputBlocks").value;
    let arr = input.split(",").map(Number);

    let { water, waterArr } = computeWater(arr);

    document.getElementById("result").innerHTML = 
        `Total Water Stored: <b>${water} Units</b>`;

    document.getElementById("svgContainer").innerHTML =
        renderSVG(arr, waterArr);
}
