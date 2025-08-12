import React from "react";
import MealCard from "../components/MealCard";
import axios from "axios";

const whatsForDinner = () => {
  const [recipe, setRecipe] = React.useState(null);
  const [category, setCategory] = React.useState("");
  const [liked, setLiked] = React.useState(
    () => JSON.parse(localStorage.getItem("likedRecipes")) || []
  );
  // random recipe API endpoint
  const fetchRandomRecipe = async () => {
    try {
      const randomRecipeUrl =
        "https://www.themealdb.com/api/json/v1/1/random.php";
      const response = await fetch(randomRecipeUrl);
      const data = await response.json();
      console.log(data.meals[0]);
      setRecipe(data.meals[0]);
    } catch (error) {
      console.error("Error fetching random recipe:", error);
    }
  };
  // List all meal categories
  const [categories, setCategories] = React.useState([]);
  const fetchCat = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // list meals by category
  const mealByCategory = async (category) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const meals = res.data.meals;
      console.log("Fetched meals by category:", meals);
      if (meals && meals.length > 0) {
        const getRandomMeal = meals[Math.floor(Math.random() * meals.length)];
        console.log("random meal", getRandomMeal);

        const res2 = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getRandomMeal.idMeal}`
        );
        const theMeal = res2.data.meals[0];
        console.log("the meal", theMeal);
        setRecipe(theMeal);
      }
    } catch (error) {
      console.error("Error fetching meals by category:", error);
    }
  };

  // toggle like functionality
  const toggleLike = (meal) => {
    if (!meal) return;
    const checkExist = liked.find((m) => m.idMeal === meal.idMeal);
    let updatedLikes;

    if (checkExist) {
      updatedLikes = liked.filter((m) => m.idMeal !== meal.idMeal);
      console.log("meal already liked: removing from liked");
    } else {
      updatedLikes = [...liked, meal];
      console.log("meal not liked yet: adding to liked");
    }

    setLiked(updatedLikes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
  };

  React.useEffect(() => {
    fetchCat();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center ">
      <h1 className="text-3xl font-bold mb-4">🍲 What’s For Dinner?</h1>
      {/* get recipe buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={fetchRandomRecipe}
        >
          Get Random Recipe
        </button>

        <select
          className="p-2 rounded border"
          onChange={(e) => {
            setCategory(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="">-- Select Category --</option>
          {categories.map((category) => {
            return (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            );
          })}
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => mealByCategory(category)}
        >
          Get Recipe by Category
        </button>
      </div>
      {/* recipe card */}
      {recipe && (
        <MealCard
          recipe={recipe}
          isLiked={liked.some((r) => r.idMeal === recipe.idMeal)}
          toggleLike={() => toggleLike(recipe)}
        />
      )}

      {/* liked recipes */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">❤️ Liked Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liked.map((meal) => (
            <MealCard
              key={meal.idMeal}
              recipe={meal}
              toggleLike={() => toggleLike(meal)}
              isLiked={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default whatsForDinner;
