const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname+'/shopping_cart.db'
})

const vendors = db.define('vendor',{
    vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    vendor_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const products = db.define('product', {
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_qty: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const carts = db.define('cart', {
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cart_qty: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = {
    db, vendors, products, carts
}