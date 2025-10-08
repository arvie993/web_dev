function bmiCalculator (weight, height) {
    var bmi = weight / Math.pow(height, 2);
    var interpretation;
    if (bmi < 18.5) {
        interpretation = "Your BMI is " + bmi + ", so you are underweight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
    } else {
        interpretation = "Your BMI is " + bmi + ", so you are overweight.";
    }
    return interpretation;
}

// Test Data
console.log(bmiCalculator(65, 1.8));
console.log(bmiCalculator(72, 1.6));
console.log(bmiCalculator(94, 1.75));
console.log(bmiCalculator(50, 1.8));