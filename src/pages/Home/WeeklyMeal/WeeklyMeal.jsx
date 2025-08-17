import React from 'react';

const WeeklyMeal = () => {
  // Hardcoded weekly meals
  const weeklyMeals = [
    { day: "Monday", Breakfast: "Paratha & Omelette", Lunch: "Rice, Chicken Curry", Dinner: "Vegetable Soup & Chapati" },
    { day: "Tuesday", Breakfast: "Pancakes & Tea", Lunch: "Fried Rice & Fish Fry", Dinner: "Dal, Rice & Stir Fry" },
    { day: "Wednesday", Breakfast: "Bread & Egg", Lunch: "Beef Curry & Rice", Dinner: "Mixed Veg & Chapati" },
    { day: "Thursday", Breakfast: "Chira & Milk", Lunch: "Chicken Biryani", Dinner: "Fish Curry & Rice" },
    { day: "Friday", Breakfast: "Toast & Jam", Lunch: "Egg Curry & Rice", Dinner: "Vegetable Stir Fry" },
    { day: "Saturday", Breakfast: "Porridge & Fruit", Lunch: "Mutton Curry & Rice", Dinner: "Dal & Chapati" },
    { day: "Sunday", Breakfast: "Paratha & Tea", Lunch: "Fried Chicken & Rice", Dinner: "Soup & Bread" },
  ];

  const categories = ["Breakfast","Lunch","Dinner"];

  return (
    <section className="py-10 md:py-16 bg-base-100">
      <div className="mx-auto px-3 sm:px-6 lg:px-10 ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-[#ec644b] text-center">
          Weekly Meal Plan
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 sm:py-3 px-3 sm:px-6 text-gray-600 text-left">Day</th>
                {categories.map(cat => (
                  <th key={cat} className="py-2 sm:py-3 px-3 sm:px-6 text-gray-600 text-left">{cat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyMeals.map(row => (
                <tr 
                  key={row.day} 
                  className="text-gray-600 border-b border-amber-200 hover:bg-amber-50 transition"
                >
                  <td className="py-2 px-3 sm:py-3 sm:px-6 font-semibold">{row.day}</td>
                  {categories.map(cat => (
                    <td key={cat} className="py-2 px-3 sm:py-3 sm:px-6">{row[cat]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WeeklyMeal;
