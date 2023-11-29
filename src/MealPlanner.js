import React from "react";

const MealPlanner = () => {
    const style = {
        fontFamily: "Bradley Hand, cursive", // Fallback to cursive if Bradley Hand is not available
        fontWeight: 700
    };
    return (
        <>
            <div>
                <p style={style}>FitMeal Planner</p>
                <p>Discover your tailored weekly meal plan: simply share your goals, and we'll craft your path to healthier eating</p>
            </div>
        </>
    )
}

export default MealPlanner;