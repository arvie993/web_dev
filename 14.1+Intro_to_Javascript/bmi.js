//Create your function below this line.
//The first parameter should be the weight and the second should be the height.




/* If my weight is 65Kg and my height is 1.8m, I should be able to call your function like this:

var bmi = bmiCalculator(65, 1.8); 

bmi should equal 20 when it's rounded to the nearest whole number.

*/
function bmiCalculator(weight, height) {
    var bmi = weight / Math.pow(height, 2);
    return Math.round(bmi);
}

//Test your function by calling it with the weight and height values you want and storing the return value in a variable called
var bmi = bmiCalculator(65, 1.8);
console.log(bmi); // Expect 20
