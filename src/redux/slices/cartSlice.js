// // src/redux/slices/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cartItems: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existingProductIndex = state.cartItems.findIndex(
//         (item) => item.id === product.id
//       );
//       if (existingProductIndex >= 0) {
//         state.cartItems[existingProductIndex].quantity += 1;
//       } else {
//         state.cartItems.push({ ...product, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload
//       );
//     },
//     increaseQuantity: (state, action) => {
//       const itemId = action.payload;
//       const item = state.cartItems.find((item) => item.id === itemId);
//       if (item) item.quantity += 1;
//     },
//     decreaseQuantity: (state, action) => {
//       const itemId = action.payload;
//       const item = state.cartItems.find((item) => item.id === itemId);
//       if (item && item.quantity > 1) item.quantity -= 1;
//     },
//   },
// });

// export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// export default cartSlice.reducer;
