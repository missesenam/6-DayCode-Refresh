import React from "react";

const MealCard = ({ recipe, toggleLike, isLiked }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 max-w-xl mx-auto">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded mb-4 w-full object-cover"
      />
      <h2 className="text-xl font-bold mb-2">{recipe.strMeal}</h2>
      <p className="text-sm text-gray-600 mb-2">{recipe.strCategory}</p>
      <p className="text-sm text-gray-500 mb-2">
        {recipe.strInstructions.slice(0, 150)}...
      </p>
      <div className="flex justify-between items-center mt-4">
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Full Recipe
        </a>
        <button className="text-red-600 font-bold" onClick={toggleLike}>
          {isLiked ? "❤️ Unlike" : "🤍 Like"}
        </button>
      </div>
    </div>
  );
};

export default MealCard;
