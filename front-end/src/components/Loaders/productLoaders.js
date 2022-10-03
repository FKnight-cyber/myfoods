import React from "react";
import Lottie from "lottie-react";
import buyfood from "../../assets/buy-food.json";
import cartfood from "../../assets/cart-food.json";
import cleancart from "../../assets/remove-all-food.json";
import removefood from "../../assets/remove-food.json";

export const BuyFood = () => <Lottie animationData={buyfood} loop={true} style={{ height: 60, position:"absolute", left:0 }} />;
export const CartFood = () => <Lottie animationData={cartfood} loop={true} style={{ height: '50%', margin:30 }} />;
export const CleanCart = () => <Lottie animationData={cleancart} loop={true} style={{ height: '50%', margin:30 }} />;
export const RemoveFood = () => <Lottie animationData={removefood} loop={true} style={{ height: '100%', margin:0 }} />;