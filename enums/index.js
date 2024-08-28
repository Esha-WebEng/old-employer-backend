const genderEnum = ['male', 'female'];
const projectCompletionType = ['contributor', 'solo'];

const roleRights = {
  moderator: 'moderator', // Corrected typo here
  user: 'user',
  admin: 'admin',
};

const userRoles = Object.keys(roleRights);

const permissionCategories = {
  company: ['add', 'update', 'edit', 'block', 'delete'],
  user: ['add', 'update', 'edit', 'block', 'delete'],
  forum: ['post', 'createThread', 'editPost', 'blockPost', 'deletePost', 'blockUser'],
  blog: ['post', 'editPost', 'createCategory', 'blockPost', 'deletePost', 'blockUser', 'disableComments', 'editComments', 'deleteComments'],
  searchHistory: ['view', 'mark'],
  alerts: ['manage'],
  payments: ['manageFeature', 'managePayments', 'manageInvoices'],
  advertising: ['manageAdvertising', 'manageGoogleAds', 'manageClientAds'],
  email: ['send', 'view', 'delete'],
};

const rolePermissions = {
  superadmin: {
    company: ['add', 'update', 'edit', 'block', 'delete'],
    user: ['add', 'update', 'edit', 'block', 'delete'],
    forum: ['post', 'createThread', 'editPost', 'blockPost', 'deletePost', 'blockUser'],
    blog: ['post', 'editPost', 'createCategory', 'blockPost', 'deletePost', 'blockUser', 'disableComments', 'editComments', 'deleteComments'],
    searchHistory: ['view', 'mark'],
    alerts: ['manage'],
    payments: ['manageFeature', 'managePayments', 'manageInvoices'],
    advertising: ['manageAdvertising', 'manageGoogleAds', 'manageClientAds'],
    email: ['send', 'view', 'delete'],
  },
  admin: {
    company: ['add', 'update', 'edit', 'block'],
    user: ['add', 'update', 'edit', 'block'],
    forum: ['post', 'createThread', 'editPost', 'blockPost'],
    blog: ['post', 'editPost', 'createCategory', 'blockPost', 'deletePost'],
    searchHistory: ['view'],
    email: ['send', 'view'],
  },
  moderator: {
    company: ['add', 'update', 'edit', 'block'],
    forum: ['post', 'createThread', 'editPost', 'blockPost'],
    blog: ['post', 'editPost', 'createCategory', 'blockPost', 'deletePost', 'blockUser', 'disableComments', 'editComments', 'deleteComments'],
    searchHistory: ['view'],
  },
  blog: {
    blog: ['post', 'editPost'],
    comments: ['disableComments', 'editComments', 'deleteComments'],
  },
  forum: {
    forum: ['post', 'createThread', 'editPost'],
  },
  user: {
    personal: ['uploadResume', 'downloadResume', 'addReviews', 'hideReviewIdentity', 'endowsReview', 'viewReviews'], // Corrected to an array
    company: ['search', 'watchList', 'receiveUpdates'],
    featuredEmployer: ['replyComments'],
  },
};

module.exports = { genderEnum, userRoles, projectCompletionType, roleRights, rolePermissions, permissionCategories };
