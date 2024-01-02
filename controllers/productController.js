const Product = require('../models/Product');

const getAllProducts = (req, res) => {
    Product.findAll()
        .then(products => {
            res.json({ status: 200, ProductsList: products });
        })
        .catch(err => {
            res.json({ message: "Internal Server Error", status: 500 });
            console.log(err);
        });
}

const createNewProduct = (req, res) => {
    const productData = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount
    };

    Product.create(productData).then(() => {
        console.log("Record successfully saved");
        res.json({ "message": "Record Successfully saved", "status": 200 });
    })
        .catch(err => {
            if (err) {
                res.json({ "message": "Internal Server Error", "status": 500 });
                console.log(err);
            }
        });

}

const updateProduct = (req, res) => {
    var id = req.body.id;
    var productData = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount
    };

    Product.findByPk(id).then((product) => {
        if (!product) {
            console.log("Product not found");
        } else {
            product.update(productData);
            console.log("Record successfully updated");
            res.json({ message: "Record Successfully updated", status: 200 });
        }
    }).catch((err) => {
        if (err) {
            res.json({ message: "Internal Server Error", status: 500 });
            console.log(err);
        }
    });
}


const getProduct = (req, res) => {
    var productId = req.params.id;
    console.log("Product: ", productId);
    Product.findOne({ where: { id: productId } })
        .then(product => {
            res.send({ status: 200, Product: product });
        })
        .catch(err => {
            res.json({ message: "Internal Server Error", status: 500 });
            console.log(err);
        });
}

const deleteProduct = (req, res) => {
    var deleteId = req.body.id;
    Product.destroy({ where: { id: deleteId } })
        .then(() => {
            console.log("Record successfully deleted");
            res.json({ message: "Record Successfully deleted", status: 200 });
        })
        .catch(err => {
            res.end('{"message": "Internal Server Error", "status" : 500}');
            console.log(err);
        });;
}



module.exports = { getAllProducts, createNewProduct, updateProduct, getProduct, deleteProduct };