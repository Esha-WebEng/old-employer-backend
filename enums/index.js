const genderEnum = ['male', 'female'];
const projectCompletionType = ['contributor', 'solo'];

const roleRights = {
  moderator: 'moderator',   
  admin: 'admin',
  superadmin: "superadmin",
  blogmoderator:"blogmoderator",
  forummoderator:"forummoderator",
  employer:"employer",
  featuredemployer:"featuredemployer",
  employermoderator:"employermoderator",
  user: 'user',
};

const userRoles = Object.keys(roleRights);


module.exports = { genderEnum, userRoles, projectCompletionType, roleRights };
