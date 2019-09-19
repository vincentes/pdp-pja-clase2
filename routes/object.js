var express = require("express");
var router = express.Router();
var Object = require("../models/object");

router
    .route("/objetos")
    .get((req,res) => {
        Object.find((err, objects) => {
            if(err) throw err;
            res.json(objects);
        })
    })
    .post((req,res) => {
        // const name = req.body.name;
        const { orderNumber, type, state, description, basePrice } = req.body;
        var object = new Object();
        object.orderNumber = orderNumber;
        object.type = type;
        object.state = state;
        object.description = description;
        object.basePrice = basePrice;

        object.save((err) => {
            if(err) throw err;
            res.json({message: "El objeto ha sido agregado exitosamente."});
        });
    });

router
    .route('/objetos/:id')
    .get((req, res) => {
        Object.findById(req.params.id, (err, object) => {
            if(err) throw err;
            res.json(object);
        });
    })
    .delete((req, res) => {
        Object.findByIdAndDelete(req.params.id, (err, object) => {
            if(err) throw err;
            res.json(object);
        });
    });

router
    .route('/objetos/encontrarPorOrden/:cod')
    .get((req, res) => {
        Object.find({
            orderNumber: req.params.cod
        }, (err, objects) => {
            if(err) throw err;
            res.json(objects);
        });
    });

module.exports = router;