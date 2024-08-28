const { Op } = require("sequelize");
const { Shortlist } = require("../db");

const shortlist = async (req, res) => {
  try {
    const {
      body: { candidateId },
      user: { id },
    } = req;
    const isShortListed = await Shortlist.findOne({
      where: { [Op.and]: [{ employerId: id }, { candidateId }] },
    });

    if (isShortListed) throw new Error("Candidate already shortlisted");

    await Shortlist.create({
      employerId: id,
      candidateId,
    });

    res.status(201).send({ message: "Candidate added to shortlist" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateShorlist = async (req,res) => {
  try {
    const {
      query: { id },
    } = req;
    const candidate = await Shortlist.findByPK(id);

    if (candidate) throw new Error("Candidate not found");
    await Shortlist.destroy({ where: { id: id } });

    res.status(200).send({ message: "Candidate removed from list" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  shortlist,
  updateShorlist,
};
