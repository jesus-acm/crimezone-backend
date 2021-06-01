/**
 * Path: /file
 */

const { Router } = require('express');
const route = Router();

const fs = require('fs');
const path = require('path');

// TODO: Verificar o acceder a los archivos para que la modifcacion sea mayor
route.post('/version', (req, res) => {
    console.log('Verificando versionamiento.');
    const rutaPeaton = path.resolve(__dirname,`../db/clusters_GAM.csv`);
    const rutaTransporte = path.resolve(__dirname,`../db/clusters_GAM_transporte_publico.csv`);
    const { peaton, transporte } = req.body;

    if(fs.existsSync(rutaPeaton) && fs.existsSync(rutaTransporte)){
        const archivoPeaton = fs.statSync(rutaPeaton);
        const archivoTransporte = fs.statSync(rutaTransporte);
        const fechaPeaton = new Date(archivoPeaton.mtime);
        const fechaTransporte = new Date(archivoTransporte.mtime);

        let vPeaton = Number.parseInt(`${peaton}`);
        let vTransporte = Number.parseInt(`${transporte}`);
        let verificacionPeaton = vPeaton < fechaPeaton.getTime();
        let verificacionTransporte = vTransporte < fechaTransporte.getTime();

        res.json({
            ok: true,
            peaton: verificacionPeaton,
            transporte: verificacionTransporte
        });
        
    }else{
        console.log('Verificar que se encuentren ambos archivos.')
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el desarrollador.'
        });
    }
});

route.get('/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    let pathFile = path.resolve(__dirname,`../db/${ nombre }.csv`);

    if(fs.existsSync(pathFile)){
        let archivo = fs.statSync(pathFile);
        let fecha = new Date(archivo.mtime);
        res.sendFile(pathFile, {
            headers: {'X-Version': fecha.getTime()}
        });
    }else{
        console.log('No se encontro el archivo.')
        res.json('');
    }
});

module.exports = route;