import React, { useState } from 'react';
import './App.css';
import EditableCell from './EditableCell';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle'; // Import shuffle icon
import ListIcon from '@mui/icons-material/List'; // Import list icon


// This is mock data. Fetch the data from backend to replace mock data
const mockMealPlan = [
  {
    day: "Day 1",
    breakfast: "Greek yogurt with honey, almonds, and mixed berries",
    lunch: "Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and balsamic vinaigrette",
    dinner: "Baked salmon with steamed broccoli and quinoa"
  },
  {
    day: "Day 2",
    breakfast: "Scrambled eggs with spinach and whole grain toast",
    lunch: "Turkey and cheese sandwich on whole grain bread with lettuce, tomato, and mustard",
    dinner: "Stir-fried tofu with mixed vegetables (bell peppers, snap peas, carrots) and brown rice"
  },
  {
    day: "Day 3",
    breakfast: "Oatmeal with sliced banana and a sprinkle of cinnamon",
    lunch: "Lentil soup with a side of whole grain bread",
    dinner: "Grilled steak with a side of sweet potato mash and green beans"
  },
  {
    day: "Day 4",
    breakfast: "Smoothie with spinach, banana, mixed berries, and almond milk",
    lunch: "Quinoa salad with chickpeas, cucumber, tomatoes, feta cheese, and lemon vinaigrette",
    dinner: "Baked chicken breast with roasted Mediterranean vegetables (eggplant, zucchini, bell peppers)"
  },
  {
    day: "Day 5",
    breakfast: "Whole grain cereal with skim milk and sliced strawberries",
    lunch: "Tuna salad with mixed greens, avocado, and whole grain crackers",
    dinner: "Spaghetti with homemade tomato sauce and a side salad"
  },
  {
    day: "Day 6",
    breakfast: "Avocado toast on whole grain bread with a poached egg",
    lunch: "Chicken Caesar wrap with a side of fruit salad",
    dinner: "Grilled shrimp with garlic butter, asparagus, and wild rice"
  },
  {
    day: "Day 7",
    breakfast: "Pancakes with fresh blueberries and a small amount of maple syrup",
    lunch: "Caprese salad with fresh mozzarella, tomatoes, basil, and balsamic glaze",
    dinner: "Beef stir-fry with bell peppers, onions, and broccoli served over noodles"
  }
];
const fitnessGoals = ["Stay Healthy", "Lose weight", "Maintain weight", "Gain muscle"];
const dietRestrictions = ["N/A", "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
  "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"];
const apiKey = 'a367fdf7b943407bbd32f920074521ee';
const file_path = 'D:\fitmeal' // remember to change file path

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [raw, setRaw] = useState({});
  const [mealPlan, setMealPlan] = useState(mockMealPlan);
  const [diet, setDiet] = useState(dietRestrictions[0]);
  const [goal, setGoal] = useState(fitnessGoals[0]);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [calory, setCalory] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // get Spoonacular username, password, and hash on loading
  const setupConnection = () => {
    const url = `https://api.spoonacular.com/users/connect?apiKey=${apiKey}`;
    // this data does not matter, you can set to whatever you want
    const userData = {
      username: "Cool User",
      firstName: "Cool",
      lastName: "User",
      email: "979560766@qq.com"
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        setUsername(data['username']);
        setPassword(data['password']);
        setHash(data['hash']);
        //console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const checkGoalSetting = () => {
    if (age === 0 || weight === 0 || height === 0) {
      setOpenSnackbar(true);
      return false;
    }
    return true;
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  // get an estimation of recommended calories by calculating Basal Metabolic Rate (BMR)
  // using Harris-Benedict Equation
  const calculateCalory = (callback) => {
    if (!checkGoalSetting()) {
      return;
    }
    if (username === "") {
      setupConnection();
    }
    let weightInKg = weight / 2.20462;
    let heightInCm = height * 30.48; // 1 foot = 30.48 cm
    // BMR estimation
    let BMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
    const activityFactors = {
      "Stay Healthy": 1.2,        // Sedentary: little or no exercise
      "Lose weight": 1.55,        // Moderately active: moderate exercise/sports 3-5 days/week
      "Maintain weight": 1.375,   // Lightly active: light exercise/sports 1-3 days/week
      "Gain muscle": 1.725        // Very active: hard exercise/sports 6-7 days a week
    };
    let maintenanceCalories = BMR * activityFactors[goal];
    // Adjust based on fitness goal
    switch (goal) {
      case "Lose weight":
        maintenanceCalories -= 500; // Create a deficit for weight loss
        break;
      case "Gain muscle":
        maintenanceCalories += 500; // Add extra for muscle gain
        break;
      default:
        break;
    }
    setCalory(maintenanceCalories);
    if (callback) callback(maintenanceCalories);
  }

  const handleUpdate = (rowIndex, columnKey, newValue) => {
    const updatedMealPlan = [...mealPlan];
    updatedMealPlan[rowIndex][columnKey] = newValue;
    setMealPlan(updatedMealPlan);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const processData = (data) => {
    console.log(data);
    setRaw(data);
    const weekData = data.week;
    const processedData = Object.keys(weekData).map((dayKey, index) => {
      const dayData = weekData[dayKey];
      return {
        day: `Day ${index + 1}`,
        breakfast: dayData.meals[0]?.title || '',
        lunch: dayData.meals[1]?.title || '',
        dinner: dayData.meals[2]?.title || ''
      };
    });

    return processedData;
  };

  const handleGenerateMealPlan = () => {
    calculateCalory((newCalory) => {
      const targetCalories = newCalory;
      const timeFrame = 'week';

      const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setMealPlan(processData(data));
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    });
  };


  const handleShuffle = () => {
    // Call the handleGenerateMealPlan to get new query results
    handleGenerateMealPlan();
  }

  const formatMealPlanForAPI = () => {
    const slots = { breakfast: 1, lunch: 2, dinner: 3 };
    const formattedItems = [];
    const date = getLinuxTimeInSeconds(); // Calculate the starting date of the meal plan

    Object.entries(raw.week).forEach(([dayName, dayData], dayIndex) => {
      dayData.meals.forEach((meal, mealIndex) => {
        // Get meal type based on index (0: breakfast, 1: lunch, 2: dinner)
        const mealType = Object.keys(slots)[mealIndex];
        formattedItems.push({
          date: date,
          slot: slots[mealType],
          position: mealIndex,
          type: "RECIPE",
          value: {
            id: meal.id,
            servings: 1,
            title: meal.title,
            imageType: "jpg"
          }
        });
      });
    });
    return formattedItems;
  };

  const getLinuxTimeInSeconds = () => {
    const now = new Date();
    return Math.floor(now.getTime() / 1000);
  };

  // Function to download the content as a text file
  const downloadTextFile = (text, filename) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'default.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const processIngredient = (data) => {
    const items = {};

    data.aisles.forEach(aisle => {
      aisle.items.forEach(item => {
        if (items[item.name]) {
          items[item.name] += item.measures.us.amount;
        } else {
          items[item.name] = item.measures.us.amount;
        }
      });
    });

    return items;
  };


  const handleGetGrocery = () => {
    if (!checkGoalSetting()) {
      return;
    }
    // Assuming you have a function to format your meal plan data for the API
    let formattedMealPlan = formatMealPlanForAPI();
    const addMealPlanUrl = `https://api.spoonacular.com/mealplanner/${username}/items?hash=${hash}&apiKey=${apiKey}`;
    fetch(addMealPlanUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedMealPlan),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Meal plan added:', data);
        // call generate shopping list here
        const generateShoppingListUrl = `https://api.spoonacular.com/mealplanner/${username}/shopping-list/2023-10-07/2023-12-31?hash=${hash}&apiKey=${apiKey}`;

        fetch(generateShoppingListUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
          .then(response => response.json())
          .then(ingredient => {
            console.log(ingredient);
            const itemsSummary = processIngredient(ingredient);
            let fileContent = '';
            Object.entries(itemsSummary).forEach(([name, amount]) => {
              fileContent += `${name} - ${amount} oz\n`;
            });

            // Trigger the download
            downloadTextFile(fileContent, 'grocery_items_summary.txt');
          })
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <div><Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
        Please enter all basic info (age, weight, height).
      </Alert>
    </Snackbar>
      <Container sx={{ mb: 4 }}>
        {/* Header */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{
            fontFamily: 'Lucida Handwriting, cursive',
            fontWeight: '400'
          }}>
            FitMeal
          </Typography>
          <Typography variant="subtitle1" width={500}>
            Discover your tailored weekly meal plan: simply share your goals, and we'll craft your path to healthier eating
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Left Panel */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom align='center' sx={{
                  fontFamily: 'Inter',
                  fontWeight: '700'
                }}>Goal Setting</Typography>
                <Typography variant="h6" gutterBottom align='left' sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  ml: 0.1
                }}>Basic info</Typography>
                <TextField label="Age" variant="outlined" fullWidth margin="normal" onChange={handleAgeChange} />
                <TextField label="Weight (lb)" variant="outlined" fullWidth margin="normal" onChange={handleWeightChange} />
                <TextField label="Height (ft)" variant="outlined" fullWidth margin="normal" onChange={handleHeightChange} />

                <Typography variant="h6" gutterBottom align='left' sx={{
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  mt: 2,
                  ml: 0.1
                }}>My fitness goal</Typography>
                <TextField
                  select
                  label="My fitness goal"
                  variant="outlined"
                  value={goal}
                  onChange={handleGoalChange}
                  fullWidth
                  margin="normal"
                >
                  {fitnessGoals.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography variant="h6" gutterBottom align='center' sx={{
                  fontFamily: 'Inter',
                  fontWeight: '700'
                }}>Customization</Typography>
                <TextField
                  select
                  label="Diet Restriction"
                  variant="outlined"
                  value={diet}
                  onChange={handleDietChange}
                  fullWidth
                  margin="normal"
                >
                  {dietRestrictions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleGenerateMealPlan}
                  sx={{
                    mt: 2,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: "gray",
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'black',
                      borderColor: 'black',
                    },
                  }}
                >
                  Generate My Meal Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" sx={{
                    mb: 2, pl: 2, fontFamily: 'Inter',
                    fontWeight: '700'
                  }}>
                    My Meal Plan
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<ShuffleIcon />}
                      onClick={handleShuffle}
                      sx={{
                        mr: 1,
                        borderColor: 'black',
                        color: 'black',
                        '&:hover': {
                          backgroundColor: 'gray',
                          color: 'white',
                          borderColor: 'black',
                        },
                      }}
                    >
                      Shuffle
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ListIcon />}
                      onClick={handleGetGrocery}
                      sx={{
                        mr: 1,
                        borderColor: 'black',
                        color: 'black',
                        '&:hover': {
                          backgroundColor: 'gray',
                          color: 'white',
                          borderColor: 'black',
                        },
                      }}
                    >
                      Get Grocery List
                    </Button>
                  </Box>
                </Box>
                <TableContainer component={Paper} elevation={0} style={{ boxShadow: 'none', border: 'none' }}>
                  <Table sx={{ minWidth: 650 }} aria-label="meal plan table">
                    <TableHead>
                      <TableRow sx={{ borderBottom: 1 }}>
                        <TableCell sx={{ width: '10%' }}></TableCell>
                        <TableCell align="left" sx={{
                          fontFamily: 'Inter',
                          fontWeight: '700'
                        }}>Breakfast</TableCell>
                        <TableCell align="left" sx={{
                          fontFamily: 'Inter',
                          fontWeight: '700'
                        }}>Lunch</TableCell>
                        <TableCell align="left" sx={{
                          fontFamily: 'Inter',
                          fontWeight: '700'
                        }}>Dinner</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mealPlan.map((dayPlan, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { borderBottom: 'none' } }}>
                          <TableCell component="th" scope="row" sx={{
                            fontFamily: 'Inter',
                            fontWeight: '700'
                          }}>
                            {`Day ${index + 1}`}
                          </TableCell>
                          {/* Calls Editable Cell component for double click modifitcation */}
                          <EditableCell value={dayPlan.breakfast} row={index} column="breakfast" onUpdate={handleUpdate} />
                          <EditableCell value={dayPlan.lunch} row={index} column="lunch" onUpdate={handleUpdate} />
                          <EditableCell value={dayPlan.dinner} row={index} column="dinner" onUpdate={handleUpdate} />
                        </TableRow>
                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container></div>

  );
}

export default App;
