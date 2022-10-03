import React from "react";
import Lottie from "lottie-react";
import food from "../../assets/food-carousel.json";
import category from "../../assets/category.json";
import categories from "../../assets/categories.json";

export const LoadFood = () => <Lottie animationData={food} loop={true} style={{ height: '50%', margin:30 }} />;
export const LoadCategory = () => <Lottie animationData={category} loop={true} style={{ height: 160, margin:4 }} />;
export const LoadCategories = () => <Lottie animationData={categories} loop={true} style={{ height: '60%', margin:30 }} />;
