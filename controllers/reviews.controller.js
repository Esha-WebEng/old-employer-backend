const { Reviews, company, User } = require("../db");

const addReview = async (req, res) => {
  try {
    const { user, body } = req;
    const review = await Reviews.find({
      where: { review_by: user.id, companyId: body.companyId },
    });
    if (review) throw new Error("Review Already exist, please edit");

    await Reviews.create(body);
    res.status(201).send({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const verifyReview = async (req, res) => {
  try {
    const {
      body,
      file,
      query: { id },
    } = req;

    if (file) body.verificaton_doc = `/public/uploads/${file.filename}`;

    const review = await Reviews.update(body, {
      where: { companyId: body.companyId, id },
    });
    if (!review) throw new Error("Something went wrong while adding doc");

    res
      .status(200)
      .send({ message: "We received verification doc successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getReviewByCompany = async (req, res) => {
  try {
    const {
      query: { companyId },
    } = req;

    const reviewsList = await Reviews.findAll({
      where: { companyId },
      include: [company, User],
    });

    res.status(200).send(reviewsList);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addReview,
  verifyReview,
  getReviewByCompany,
};
