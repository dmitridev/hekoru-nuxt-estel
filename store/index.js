export const getters = {
  isAuthenticated(state){
    return state.auth.loggedIn;
  },

  loggedInUser(state){
    return state.auth.user;
  },

  isSpecialUser(state){
    return state.auth.user.special_user;
  }
}
