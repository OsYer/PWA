let userData = {
  userID: null,
  tipoMembresiaID: null
};

module.exports = {
  setUserData: (id, tipoMembresiaID) => {
    userData.userID = id;
    userData.tipoMembresiaID = tipoMembresiaID;
    console.log("userData.userID", userData.userID)
    console.log("userData.tipoMembresiaID", userData.tipoMembresiaID)
  },
  getUserData: () => {
    return userData;
  }
};
