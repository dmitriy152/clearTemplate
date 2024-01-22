const scss = function(modName, wrapElem, elemClass) {
    let scssData = `.${modName} {\n\tdisplay:block;\n`;

    if (wrapElem) {
        scssData = scssData.concat(`\n\t&__${wrapElem} {}\n`);
    }

    if (typeof elemClass === 'object') {
        for( let i = 0; i < elemClass.length; i++) {
            scssData = scssData.concat(`\n\t&__${elemClass[i]} {}\n`);
        }
    } else {
        scssData = scssData.concat(`\n\t&__${elemClass} {}\n`);
    }

    scssData = scssData.concat('\n}');
    return scssData;
}

module.exports = scss;
