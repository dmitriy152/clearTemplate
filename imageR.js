const fs = require('fs');
const resizeImg = require('resize-img');

const testFolder = './app/img/resize';


fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log(file);
        resize(file);
    });
});

async function resize(file) {
    const image = await resizeImg(fs.readFileSync(  `app/img/resize/${file}`), {
        width: 1024
    });

    fs.writeFileSync(`dev/img/resize/${file}`, image);
}

//resize();
