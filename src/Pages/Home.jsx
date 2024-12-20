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


const [tdee,setTdee] = useState(null) ;  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    calculateCals()
  };


const calculateCals = () => { 
    const weight = formData.weight; 
    const age = formData.age; 
    const height = formData.height; 
    const gender = formData.gender ; 

    // Calculate BMR (Basal Metabolic Rate)

    let Bmr ; 
    if(gender==="Male"){
     Bmr = 10 * weight + 6.25 * height - (5 * age) + 5; 
    }
    if(gender==="Female") {
  Bmr = 10* weight + 6.25 * height - (5*age) -161 ; 
   }
   

    const activityLevel = formData.activityLevel;

    let TDEE;

    // Calculate Total Daily Energy Expenditure based on activity level
    switch(activityLevel) {
        case "sedentary": 
            TDEE = Bmr * 1.2; 
            break;
        case "lightly_active": 
            TDEE = Bmr * 1.375; 
            break;
        case "moderately_active": 
            TDEE = Bmr * 1.55; 
            break;
        case "very_active": 
            TDEE = Bmr * 1.725; 
            break;
        case "extra_active": 
            TDEE = Bmr * 1.9; 
            break;
        default:
            TDEE = Bmr; // If no activity level is selected, default to BMR
    }

    
    setTdee(TDEE)

}
console.log(tdee)


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
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="activityLevel"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                  <option value="light">Light Exercise (light exercise 1–3 days/week)</option>
                  <option value="moderate">Moderate Exercise (moderate exercise 3–5 days/week)</option>
                  <option value="active">Active Exercise (physical job or extreme exercise)</option>
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

          {tdee ? (
  <div className="mt-2 my-12 font-poppins text-center border bg-black p-2 text-lg font-regular text-white rounded-full">
    Your Total Daily Maintenance Calories is: <strong>{tdee} cals</strong>
  </div>
) : null}

          {/* Diet Plan Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Generate Diet Plan
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fitnessGoal"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                  <label
                    htmlFor="timePeriod"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                <label
                  htmlFor="allergicTo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="customPrompt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
        </div>
      </div>
    </>
  );
}

export default Home;
