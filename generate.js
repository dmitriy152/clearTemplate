const fs = require('fs');
const argv = require('yargs').argv;

const pugGen  = require('./core/module/pug');
const scssGen = require('./core/module/scss');

const modName = argv.class;
const wrapElem = argv.wrap;
const elemClass = argv.elem;
const dataNumber = argv.schema;

const modulePath = './app/views/modules/';


//console.log(pugGen(modName, wrapElem, elemClass));

fs.mkdirSync(modulePath + modName);
fs.mkdirSync(`${modulePath + modName}/js`);
fs.mkdirSync(`${modulePath + modName}/scss`);

fs.writeFileSync(`${modulePath + modName}/${modName}_mod.pug`, `${pugGen(modName, wrapElem, elemClass)}`);
fs.writeFileSync(`${modulePath + modName}/js/${modName}_mod.js`, '');
fs.writeFileSync(`${modulePath + modName}/scss/${modName}_mod.scss`, `${scssGen(modName, wrapElem, elemClass)}`);

console.log(`Модуль ${modName} успешно создан`);

//node generate --class=box --wrap=wrap --elem=item
