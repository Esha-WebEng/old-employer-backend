const { User, Profile, Experience, Education, Projects, Permissions } = require("../db");
const { Op } = require("sequelize");
const { sequelize } = require("../db");

const getCurrentUser = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;

    const getUser = await User.findByPk(id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Profile,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Experience,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Education,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Projects,
          tributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
      ],
    });

    if (!getUser) throw new Error("User not Found");

    res.status(200).send(getUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const addOrUpdateProfile = async (req, res) => {
  try {
    const { user, body, file } = req;

    if (file) body.avatar = `/public/uploads/${file.filename}`;

    const findProfile = await Profile.findOne({ where: { UserId: user.id } });

    if (findProfile) {
      await Profile.update(body, { where: { userId: user.id } });
      res.status(201).send({ message: "Profile updated successfully" });
    } else await Profile.create({ ...body, UserId: user.id });

    res.status(201).send({ message: "Profile created successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const addExperience = async (req, res) => {
  try {
    const { user, body } = req;

    await Experience.create({ ...body, UserId: user.id });
    res.status(201).send({ message: "Experience added successfull" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const addEducation = async (req, res) => {
  try {
    const { user, body } = req;

    await Education.create({ ...body, UserId: user.id });
    res.status(201).send({ message: "Education added successfull" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const addProject = async (req, res) => {
  try {
    const { user, body, file } = req;

    body.media = `/public/uploads/${file.filename}`;
    await Projects.create({ ...body, UserId: user.id });

    res.status(201).send({ message: "Project added successfull" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const {
      query: { id },
      body,
      file,
    } = req;

    const project = await Projects.findByPk(id);

    if (!project) throw new Error("Project not found");

    if (file) body.media = `/public/uploads/${file.filename}`;

    await Projects.update(body, { where: { id } });
    res.status(200).send("Project updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateExperience = async (req, res) => {
  try {
    const {
      query: { id },
      body,
    } = req;

    const experience = await Experience.findByPk(id);

    if (!experience) throw new Error("Experience not found");

    await Experience.update(body, { where: { id } });
    res.status(200).send("Experience updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateEducation = async (req, res) => {
  try {
    const {
      query: { id },
      body,
    } = req;

    const education = await Education.findByPk(id);

    if (!education) throw new Error("Education not found");

    await Education.update(body, { where: { id } });
    res.status(200).send("Education updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req;

    const getUser = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Profile,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
          where: {
            [Op.or]: [
              { skills: { [Op.regexp]: `^${query.skills}` } }, 
              sequelize.literal(
                `MATCH (skills) AGAINST (${sequelize.escape(query.searchText)} IN NATURAL LANGUAGE MODE)`
              ),
            ],
          },
        },
        {
          model: Experience,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Education,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Projects,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
      ],
      where: {
        [Op.or]: [
          { country: query.country }, 
          { city: query.city },       
          { industry: { [Op.regexp]: `^${query.industry}` } }, 
          sequelize.literal(
            `MATCH (firstName, lastName, country, city, industry) AGAINST (${sequelize.escape(
              query.searchText
            )} IN NATURAL LANGUAGE MODE)`
          ),
        ],
      },
    });

    if (!getUser || getUser.length === 0) throw new Error("User not Found");

    res.status(200).send(getUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
};


const getUserDetails = async (req, res) => {
  try {
    const { query: { id } } = req;

    const getUser = await User.findByPk(id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Profile,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Experience,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Education,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Projects,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },  
        },
      ],
    });

    if (!getUser) throw new Error("User not Found");
    res.status(200).send(getUser);
  } catch (err) {
    console.error("Error fetching user details:", err); 
    res.status(404).send(err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Profile,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Experience,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Education,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
        {
          model: Projects,
          attributes: { exclude: ["UserId", "createdAt", "updatedAt"] },
        },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send({ message: "An error occurred while fetching users." });
  }
};

const deleteUserById = async (req, res) => {
  const { query: { id } } = req;

  try {
    // Find and delete the user by ID
    const user = await User.destroy({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const grantUserPermissions = async (req, res) => {
  try {
    const { role, permissions } = req.body;
    if (!role || !permissions) {
      return res.status(400).json({ message: "Role and permissions are required." });
    }
    const newPermission = await Permissions.create({
      role,
      permissions,
    });
    return res.status(201).json({
      message: "Permission entry created successfully",
      data: newPermission,
    });

  } catch (error) {
    console.error("Error adding permission entry:", error);
    return res.status(500).json({
      message: "An error occurred while adding the permission entry",
      error: error.message,
    });
  }
};

const updateUserPermissions = async (req, res) => {
  try {
    const { role, permissions } = req.body;

    if (!role || !permissions) {
      return res.status(400).json({ message: "Role and permissions are required." });
    }

    const updatedPermission = await Permissions.update(
      { permissions },
      { where: { role } }
    );

    if (updatedPermission[0] === 0) {
      return res.status(404).json({ message: "Permission entry not found." });
    }

    return res.status(200).json({
      message: "Permission entry updated successfully",
    });

  } catch (error) {
    console.error("Error updating permission entry:", error);
    return res.status(500).json({
      message: "An error occurred while updating the permission entry",
      error: error.message,
    });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permissions.findAll({
      attributes: ['role', 'permissions']
    });

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ message: "No permissions found." });
    }

    res.status(200).json(permissions);
  } catch (err) {
    console.error("Error fetching permissions:", err);
    res.status(500).json({ message: "An error occurred while fetching permissions." });
  }
};

module.exports = {
  getCurrentUser,
  addOrUpdateProfile,
  addExperience,
  addEducation,
  addProject,
  updateProject,
  updateExperience,
  updateEducation,
  searchUsers,
  getUserDetails,
  getAllUsers,
  deleteUserById,
  grantUserPermissions,
  getPermissions,
  updateUserPermissions
};
