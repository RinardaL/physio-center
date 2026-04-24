module.exports = (req, res, next) => {
  const { emri, mbiemri } = req.body;

  if (!emri || !mbiemri) {
    return res.status(400).send("Emri dhe mbiemri janë të detyrueshëm");
  }

  next();
};