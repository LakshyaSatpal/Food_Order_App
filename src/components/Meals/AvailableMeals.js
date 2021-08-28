import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    // This is an asyn function so the component will first run with the empty array.
    // async function always returns a promise
    try {
      const response = await fetch(
        "https://react-http-4d24a-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });

        setMeals(loadedMeals);
      }
    } catch (error) {
      setLoadingMeals(false);
      setError(error.message);
    }
    setLoadingMeals(false);
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let content;
  if (loadingMeals) {
    content = <p className={classes.loadingText}>Loading...</p>;
  } else if (error) {
    content = <p className={classes.loadingText}>{error}</p>;
  } else {
    content = mealsList;
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
