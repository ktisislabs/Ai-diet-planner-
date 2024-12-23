import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activityLevel: "",
    fitnessGoal: "",
    timePeriod: "",
    allergicTo: "",
    customPrompt: "",
  });

  const [tdee, setTdee] = useState(null);
  const [showCalLoader, setShowCalLoader] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [showDietLoader, setShowDietLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const FancyLoader = () => (
    <div className="mt-12 flex justify-center items-center">
      <div className="relative flex justify-center items-center w-24 h-24">
        <div className="absolute w-24 h-24 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-slow"></div>
        <div className="absolute w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin-fast"></div>
        <div className="absolute w-8 h-8 border-4 border-t-transparent border-pink-500 rounded-full animate-spin-slower"></div>
      </div>
    </div>
  );

  const calculateCals = () => {
    const { weight, age, height, gender, activityLevel } = formData;

    let BMR;
    if (gender === "Male") {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "Female") {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let TDEE;
    switch (activityLevel) {
      case "sedentary":
        TDEE = BMR * 1.2;
        break;
      case "light":
        TDEE = BMR * 1.375;
        break;
      case "moderate":
        TDEE = BMR * 1.55;
        break;
      case "active":
        TDEE = BMR * 1.725;
        break;
      case "extra_active":
        TDEE = BMR * 1.9;
        break;
      default:
        TDEE = BMR;
    }

    setTimeout(() => {
      setTdee(TDEE.toFixed(2));
      setShowCalLoader(false);
    }, 2000);
  };

  const generateDietPlan = () => {
    const { fitnessGoal, timePeriod, allergicTo, customPrompt } = formData;
    const prompt = `Create a ${timePeriod}-week diet plan for ${fitnessGoal}. Avoid ${allergicTo || "none"} and consider: ${customPrompt || "default preferences"}.`;

    setTimeout(() => {
      setDietPlan(`Sample Diet Plan for ${fitnessGoal}: [Generated based on ${prompt}]`);
      setShowDietLoader(false);
    }, 2000);
  };

  const handleCalorieSubmit = (e) => {
    e.preventDefault();
    setShowCalLoader(true);
    calculateCals();
  };

  const handleDietSubmit = (e) => {
    e.preventDefault();
    setShowDietLoader(true);
    generateDietPlan();
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
        <Navbar />

        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg mt-6 mb-10 mx-4 sm:mx-auto">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Diet Planner
          </h1>

          {/* Maintenance Calories Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Calculate Maintenance Calories
            </h2>
            <form onSubmit={handleCalorieSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter height"
                    className="block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight (kg)"
                    className="block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm p-2"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm p-2"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm p-2"
                  required
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="light">Light Exercise (1–3 days/week)</option>
                  <option value="moderate">Moderate Exercise (3–5 days/week)</option>
                  <option value="active">Active (6–7 days/week)</option>
                  <option value="extra_active">Extra Active (intense exercise or physical job)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 mt-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
              >
                Calculate Calories
              </button>
            </form>
          </section>

          {showCalLoader && FancyLoader()}
          {tdee && (
            <div className="mt-10 mb-10 text-center border p-2 border-black rounded-xl">
              <p className="text-lg font-semibold">Your Maintenance Calories:</p>
              <p className="text-xl font-bold text-green-600">{tdee} kcal/day</p>
            </div>
          )}

          {/* Diet Plan Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Generate Diet Plan</h2>
            <form onSubmit={handleDietSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-2">
                    Fitness Goal
                  </label>
                  <select
                    id="fitnessGoal"
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    required
                  >
                    <option value="">Select fitness goal</option>
                    <option value="weightLoss">Weight Loss</option>
                    <option value="muscleGain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timePeriod" className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period (weeks)
                  </label>
                  <input
                    type="number"
                    id="timePeriod"
                    name="timePeriod"
                    value={formData.timePeriod}
                    onChange={handleChange}
                    placeholder="Enter weeks"
                    className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="allergicTo" className="block text-sm font-medium text-gray-700 mb-2">
                  Allergic To
                </label>
                <input
                  type="text"
                  id="allergicTo"
                  name="allergicTo"
                  value={formData.allergicTo}
                  onChange={handleChange}
                  placeholder="Enter allergies (e.g., nuts)"
                  className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Prompt
                </label>
                <textarea
                  id="customPrompt"
                  name="customPrompt"
                  value={formData.customPrompt}
                  onChange={handleChange}
                  placeholder="Enter additional details"
                  className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  rows={3}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 mt-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Generate Diet Plan
              </button>
            </form>
          </section>

          {showDietLoader && FancyLoader()}
          {dietPlan && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Your Generated Diet Plan:</p>
              <p className="text-sm text-gray-700">{dietPlan}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
