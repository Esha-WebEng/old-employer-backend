const { Op } = require("sequelize");
const { sequelize, company } = require("../db");
const verifyDomain = require("../config/verfiyDomain");

const createCompany = async (req, res) => {
  try {
    const {
      body: { name },
    } = req;

    const findOrAdd = await company.findOrCreate({ where: { name } });
    res.status(200).send(findOrAdd);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateCompany = async (req, res) => {
  try {
    const {
      body,
      file,
      query: { id },
    } = req;

    const findCompnay = await company.findByPk(id);
    if (!findCompnay) throw new Error("Company does not exist");

    if (file) body.logo = `/public/uploads/${file.filename}`;

    if (file && body.verificaton_doc)
      body.verificaton_doc = `/public/uploads/${file.filename}`;

    await company.update(body, { where: { id } });

    res.status(200).send(findOrAdd);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const searchCompany = async (req, res) => {
  try {
    const {
      query: { city, country, industry, searchText, name },
    } = req;

    const companies = await company.findAll({
      where: {
        [Op.or]: [
          { city, country, industry, name },
          sequelize.literal(
            `MATCH (name) AGAINST (${sequelize.escape(
              searchText
            )} IN NATURAL LANGUAGE MODE)`
          ),
        ],
      },
    });

    res.status(200).send(companies);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getSingleCompany = async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const getCompany = await company.findByPk(id);

    if (!getCompany) throw new Error("Company not found");

    res.status(200).send(getCompany);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const companyVerfiy = async (req, res) => {
  try {
    const {
      query: { id },
      body: { company_email },
    } = req;

    const verify = await verifyDomain(company_email);

    if (!verify)
      throw new Error("Email is not associated with a valid domain ");

    await company.update({ is_verified: true }, { where: { id } });

    res
      .status(200)
      .send({ message: "Your company has been verified successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await company.findAll();

    if (!companies || companies.length === 0) {
      return res.status(404).send({ message: "No companies found." });
    }
    res.status(200).json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).send({ message: "An error occurred while fetching companies." });
  }
};

const deleteCompanyById = async (req, res) => {
  const { query: { id } } = req;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const deletedCount = await company.destroy({
      where: { id }
    });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createCompany,
  updateCompany,
  searchCompany,
  getSingleCompany,
  companyVerfiy,
  getAllCompanies,
  deleteCompanyById
};
