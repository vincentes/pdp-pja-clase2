var express = require("express");
var router = express.Router();
var ObjectType = require("../models/objectType");

router
    .route("/objetotipos")
    .get((req,res) => {
        ObjectType.find((err, otypes) => {
            if(err) throw err;
            res.json(otypes);
        })
    })
    .post((req,res) => {
        // const name = req.body.name;
        const { code, name } = req.body;
        var type = new ObjectType();
        type.code = code;
        type.name = name;

        type.save((err) => {
            if(err) throw err;
            res.json({message: "El tipo de objeto ha sido agregado exitosamente."});
        });
    });

router
    .route('/objetotipos/:id')
    .get((req, res) => {
        ObjectType.findById(req.params.id, (err, type) => {
            if(err) throw err;
            res.json(type);
        });
    })
    .delete((req, res) => {
        ObjectType.findByIdAndDelete(req.params.id, (err, type) => {
            if(err) throw err;
            res.json(type);
        });
    })
    .put((req, res) => {
        const { code, name } = request.body;
        const modType = {
            code,
            name
        };
        ObjectType.findByIdAndUpdate(req.params.id, modType, (err, type) => {
            if(err) throw err;
            res.json(type);
        });
    });

module.exports = router;