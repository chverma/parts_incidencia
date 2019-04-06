'use strict';

var Incidence = require('../model/modelIncidence.js');

exports.list_all_incidences = function (req, res) {
  Incidence.getAllIncidence(function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.send(incidence);
  });
};

exports.create_an_incidence = function (req, res) {
  var newIncidence = new Incidence(req.body);

  // handles null error
  if (!newIncidence) {
    res.status(400).send({error: true, message: 'Please provide incidence'});
  } else {
    Incidence.createIncidence(newIncidence, function (err, incidence) {
      if (err) {
        res.send(err);
      }
      res.json(incidence);
    });
  }
};

exports.read_an_incidence = function (req, res) {
  Incidence.getIncidenceById(req.params.incidenceId, function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.json(incidence);
  });
};

exports.update_an_incidence = function (req, res) {
  Incidence.updateById(req.params.incidenceId, new Incidence(req.body), function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.json(incidence);
  });
};

exports.delete_an_incidence = function (req, res) {
  Incidence.removeById(req.params.incidenceId, function (err, incidence) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Incidence successfully deleted' });
  });
};

exports.generate_pdf = function (req, res) {
  var JSZip = require('jszip');
  var Docxtemplater = require('docxtemplater');

  var fs = require('fs');
  var path = require('path');

  // Load the docx file as a binary
  var content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

  var zip = new JSZip(content);
  var doc = new Docxtemplater();
  doc.loadZip(zip);

  // set the templateVariables
  doc.setData({
      first_name: 'John',
      last_name: 'Doe',
      phone: '0652455478',
      description: 'New Website'
  });

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    };
    console.log(JSON.stringify({error: e}));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
  }

  var bufferDocx = doc.getZip().generate({type: 'nodebuffer'});

  const docx = require("@nativedocuments/docx-wasm");

  // init docx engine
  docx.init({
      ND_DEV_ID: "28P401I90R065AOI9QUQAFRNEV",    // goto https://developers.nativedocuments.com/ to get a dev-id/dev-secret
      ND_DEV_SECRET: "3NHVA7MA6HLD6BP1AB63SF0F4G", // you can also set the credentials in the enviroment variables
      ENVIRONMENT: "NODE", // required
      LAZY_INIT: true      // if set to false the WASM engine will be initialized right now, usefull pre-caching (like e.g. for AWS lambda)
  }).catch( function(e) {
      console.error(e);
  });

  async function convertHelper(document, exportFct) {
      const api = await docx.engine();
      await api.load(document);
      const arrayBuffer = await api[exportFct]();
      await api.close();
      return arrayBuffer;
  }

  convertHelper(bufferDocx, "exportPDF")
  .then((arrayBuffer) => {
      var generatedPDF = path.resolve(__dirname, 'sample.pdf');
      fs.writeFileSync(generatedPDF, new Uint8Array(arrayBuffer));
      return generatedPDF;
  })
  .then((generatedPDF) => {
    res.download(generatedPDF, 'part_incidencia.pdf');
  })
  .catch((e) => {
    console.error(e);
  });

};
