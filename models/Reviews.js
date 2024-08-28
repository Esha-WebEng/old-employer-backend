const { DataTypes } = require("sequelize");

module.exports.ReviewsModel = (sequelize) => {
  return sequelize.define(
    "Reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      emp_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emp_thougts: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hide_emp_info: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      compensation: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      work_balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      career_opportunities: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cutlers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recommendation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      suggestions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      best_worst: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      environment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      insurance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      residence: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      benovland_fund: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medical: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      other_benefit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      salary_range: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pay_on_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bonus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      increment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      increment_duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      monthly_leaves: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      annually_leaves: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      public_review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verificaton_doc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      review_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
