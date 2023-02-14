module.exports = (req, res, next) => {
  const salesData = req.body;
  for (let i = 0; i < salesData.length; i += 1) {
    const { productId, quantity } = salesData[i];
    if (productId === undefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }

    if (quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  return next();
};