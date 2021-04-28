/**
 * Path: /file
 */

const { Router } = require('express');
const route = Router();

const fs = require('fs');
const path = require('path');

route.get('/upgrade', (req, res) => {
    let pathFile = path.resolve(__dirname,`../db/clusters_GAM.csv`);

    fs.stat(pathFile, (err, stats) => {
        let code = stats.mtime.getTime();
        if(!err){
            return res.json({
                code: code
            });
        }else{
            return res.json({code: 'No valid'});
        }
    });
});

route.get('/', (req, res) => {
    let pathFile = path.resolve(__dirname,`../db/clusters_GAM.csv`);

    if(fs.existsSync(pathFile)){
        res.sendFile(pathFile);
    }else{
        res.json({
            ok: false,
            msg: 'No file exists!.'
        });
    }
});

module.exports = route;