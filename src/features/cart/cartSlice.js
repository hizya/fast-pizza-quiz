import { createSlice } from "@reduxjs/toolkit";

const initialState={
  cart:[],
};

const cartSlice=createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCart(state,action){
      state.cart.push(action.payload);
    },
    decreaseCart(state,action){
      console.log('decreaseCart')
      state.cart=state.cart.filter(cart=>cart.pizzaId!==action.payload);
    },
    increaseQuantity(state,action){
      const item=state.cart.find(item=>item.pizzaId===action.payload);
      item.quantity++;
      item.totalPrice=item.quantity*item.unitPrice
    },
    decareseQuantity(state,action){
      const item=state.cart.find(item=>item.pizzaId===action.payload);
      item.quantity--;
      if(item.quantity===0) {
        cartSlice.caseReducers.decreaseCart(state,action)
        return;
      }
      item.totalPrice=item.quantity*item.unitPrice
    },
    clearCart(state){
      state.cart=[];
    },
  }
})

export const {addToCart,decreaseCart,clearCart,increaseQuantity,decareseQuantity}=cartSlice.actions;
export default cartSlice.reducer;


export const getCart=state=>state.cart.cart;
export const getTotalCartQuantity=state=>state.cart.cart.reduce((acc,item)=>item.quantity+acc,0);
export const getTotalCartPrice=state=>state.cart.cart.reduce((acc,item)=>item.totalPrice+acc,0);

export const getCurrentQuantityById=id=>state=>state.cart.cart.find(item=>item.pizzaId===id)?.quantity??0;

