const pug = function(modName, wrapElem, elemClass) {
    let pugResultData = `.${modName}`;

    if(wrapElem) {
        pugResultData = pugResultData.concat(`\n\t.${modName}__${wrapElem}`);

        for( let i = 0; i < elemClass.length; i++) {
            pugResultData = pugResultData.concat(`\n\t\t.${modName}__${elemClass[i]}`);
        }
    } else {

        if (typeof elemClass === 'object') {
            for( let i = 0; i < elemClass.length; i++) {
                pugResultData = pugResultData.concat(`\n\t.${modName}__${elemClass[i]}`);
            }
        } else {
            pugResultData = pugResultData.concat(`\n\t.${modName}__${elemClass}`);
        }
    }

    return pugResultData;
}

module.exports = pug;
