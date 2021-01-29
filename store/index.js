export const getters = {
  isAuthenticated(state){
    return state.auth.loggedIn;
  },

  loggedInUser(state){
    return state.auth.user;
  },

  isSpecialUser(state){
    if(state.auth.user)
      return state.auth.user.special_user;
    else return false;
  }
}
