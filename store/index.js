export const state = () => ({
  auth:{},
  basketItems:[]
})


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
  },

  basket(state){
    return state.basketItems;
  }
}

export const mutations = {
  addToBasket(state,item){
    state.basketItems.push(item);
  },

  removeFromBasket(state,item){
    state.basketItems = state.basketItems.filter(e=> e.id ==item.id);
  },
  clearBasket(state){
    state.basketItems = []
  }
}
