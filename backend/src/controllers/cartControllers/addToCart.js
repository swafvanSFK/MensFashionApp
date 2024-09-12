import cartModel from "../../models/cartModel.js";
import productModel from "../../models/productModel.js";

const addToCartController = async (req, res) => {
  const { product, qty } = req.body;

  if (!req.user || !req.user.data._id) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  const productDetails = await productModel.findById(product);

  console.log(productDetails.stock);

  if (productDetails.stock < qty) {
    return res
      .status(400)
      .json({
        message: `Only ${productDetails.stock} unit available in stock`,
      });
  }

  if (!productDetails) {
    return res.status(400).json({ message: "Product not found" });
  }

  const cart = await cartModel.findOne({ user: req.user.data._id });

  if (cart) {
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === product
    );

    if (itemIndex > -1) {
      const newQty = cart.cartItems[itemIndex].qty + qty;

      if (productDetails.stock < newQty) {
        return res.status(400).json({
          message: `You can only add ${
            productDetails.stock - cart.cartItems[itemIndex].qty
          } more units of ${productDetails.productName}`,
        });
      }
      cart.cartItems[itemIndex].qty = newQty;
    } else {
      cart.cartItems.push({ product, qty });
    }

    await cart.save();

    res.status(200).json(cart);
  } else {
    const newCart = await cartModel.create({
      user: req.user.data._id,
      cartItems: [{ product, qty }],
    });

    res.status(201).json({ message: "Item added to cart", newCart });
  }
};

export default addToCartController;
