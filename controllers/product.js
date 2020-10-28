const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs')
const formidable = require('formidable');
const _ = require('lodash');
const Product = require('../models/product');


exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            
            req.product = product;

            console.log('findById with productId products', product)
            
            next();
        });
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.create = (req, res) => {

    console.log("* product create from controller. *")

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {

        if (err) {

            return res.status(400).json({
                error: "Image could not be uploaded."
            })

        }

        const {name, description, price, category, quantity, shipping} = fields

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are requied."
            })
        }



        let product = new Product(fields)

        if (files.photo) {

            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1M."
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {

            if (err) {
                res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json({ result })

        })

    })


};