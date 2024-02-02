const fs = require('fs');
const argv = require('yargs').argv;

const pugGen  = require('./core/module/pug');
const scssGen = require('./core/module/scss');

const modName = argv.class;6
const wrapElem = argv.wrap;
const elemClass = argv.elem;
const dataNumber = argv.schema;

const modulePath = './app/views/modules/';

fs.mkdirSync(modulePath + modName);
fs.mkdirSync(`${modulePath + modName}/ts`);
fs.mkdirSync(`${modulePath + modName}/scss`);

fs.writeFileSync(`${modulePath + modName}/${modName}_mod.pug`, `${pugGen(modName, wrapElem, elemClass)}`);
fs.writeFileSync(`${modulePath + modName}/ts/${modName}_mod.ts`, '');
fs.writeFileSync(`${modulePath + modName}/scss/${modName}_mod.scss`, `${scssGen(modName, wrapElem, elemClass)}`);

console.log('\x1b[36m%s\x1b[35m%s\x1b[36m%s\x1b[0m', 'Модуль ', modName, ' успешно создан');

//node generate --class=box --wrap=wrap --elem=item

