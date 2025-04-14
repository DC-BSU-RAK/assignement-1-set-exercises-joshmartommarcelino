// Wait until everything on the page has loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get input and display elements from the page
    const pricePerLiterInput = document.getElementById('pricePerLiter');
    const litersPurchasedInput = document.getElementById('litersPurchased');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalCostDisplay = document.getElementById('totalCost');

    // Run the calculation when the user clicks the button
    calculateBtn.addEventListener('click', calculatePetrolCost);

    // This function does the math and shows the result
    function calculatePetrolCost() {
        // Get the numbers the user typed in
        const pricePerLiter = parseFloat(pricePerLiterInput.value);
        const litersPurchased = parseFloat(litersPurchasedInput.value);

        // If one or both values are not valid numbers, show an error message
        if (isNaN(pricePerLiter) || isNaN(litersPurchased)) {
            totalCostDisplay.textContent = 'Please enter valid numbers';
            return;
        }

        // Multiply the price and liters to get the total cost
        const totalCost = pricePerLiter * litersPurchased;

        // Show the result with two decimal places
        totalCostDisplay.textContent = `AED ${totalCost.toFixed(2)}`;
    }

    // Bonus: update the result while the user is typing
    pricePerLiterInput.addEventListener('input', calculatePetrolCost);
    litersPurchasedInput.addEventListener('input', calculatePetrolCost);

    // Run the calculation once when the page loads
    calculatePetrolCost();
});