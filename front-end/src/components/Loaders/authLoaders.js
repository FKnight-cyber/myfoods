import React from "react";
import Lottie from "lottie-react";
import food from "../../assets/food.json";

const Food = () => <Lottie animationData={food} loop={true} style={{ height: '100%' }} />;

export default Food;