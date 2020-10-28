const { errorHandler } = require('../helpers/dbErrorHandler');
const Category = require('../models/category');

exports.create = (req, res) => {

    console.log("* create from controller. *")

    const category = new Category(req.body)
    category.save( (err, data) => {

        if (err) {
            
            console.log("Error from category controller. --> ", err)

            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
 
    })

};