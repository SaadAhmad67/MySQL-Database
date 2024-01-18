const connection = require("../models/index");
module.exports = {
  addProduct: async function (req, res) {
    try {
      const { name, price } = req.body;
      const date = "2021-5-23";
      const dbConnection = await connection();
      await dbConnection.execute(
        `INSERT INTO products (name, price, createdAt, updatedAt) VALUES ("${name}", "${price}", "${date}", "${date}")`
      );
      res.status(201).send("Product added successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).send(err.mesage || "Something went wrong");
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      let { productId } = req.params;
      productId = Number(productId);
      const dbConnection = await connection();
      const [products] = await dbConnection.execute(
        `SELECT * from products where id = ${productId}`
      );
      if (products.length === 0) {
        return res.status(404).send("Product not found!");
      }
      res.status(201).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.mesage || "Something went wrong");
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      const dbConnection = await connection();
      const [products] = await dbConnection.execute("SELECT * FROM products");
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong");
    }
  },
  changeProduct: async (req, res) => {
    try {
      let { productId } = req.params;
      const { name, price } = req.body;
      if (!name || !price) {
        return res.status(409).send("Required fields cannot be empty!");
      }
      productId = Number(productId);
      const updatedDate = new Date().toISOString().slice(0, 10);
      const dbConnection = await connection();
      const [products] = await dbConnection.execute(
        `UPDATE products SET name = "${name}", price = ${price}, updatedAt = "${updatedDate}" WHERE id = ${productId}`
      );
      if (products.length === 0) {
        return res.status(404).send("Product not found");
      }
      res.status(201).send("Product updated!");
    } catch (err) {  
      console.log(err);
      res.status(500).send(err.mesage || "Something went wrong");
    }
  },
  deleteProduct: async (req, res) => {
    try {
        let { productId } = req.params;
        productId = Number(productId);
        const dbConnection = await connection();
        const [products] = await dbConnection.execute(
            `DELETE from products where id = ${productId}`
        );
        res.status(201).send("Product deleted sucessfully!");
      } catch (err) {  
        console.log(err);
        res.status(500).send(err.mesage || "Something went wrong");
      }
  }, 
  showProduct: async function (req, res) {
    try {
      const dbConnection = await connection();
      const [products] = await dbConnection.execute("SELECT * FROM products");
      res.status(200).render("products", { products });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message || "Something went wrong");
    }
  },
};

