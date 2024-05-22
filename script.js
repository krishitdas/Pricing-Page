document.addEventListener("DOMContentLoaded", function() {
    const pricingSection = document.querySelector('.pricing');

    // Smooth Scroll to Pricing Section on Page Load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fade-in Effect for Pricing Plans
    function handleScroll() {
        const sectionTop = pricingSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight / 1.3;

        if (sectionTop < triggerPoint) {
            pricingSection.classList.add('visible');
            window.removeEventListener('scroll', handleScroll); // Remove event listener after effect is applied
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case the section is already in view

    // Price Conversion Logic
    const convertButton = document.getElementById('convert-button');
    const prices = document.querySelectorAll('.price');
    const exchangeRate = 75; // Example exchange rate from USD to INR
    let inInr = false; // Track the current currency state

    convertButton.addEventListener('click', function() {
        prices.forEach(priceElement => {
            const usdPrice = parseFloat(priceElement.getAttribute('data-usd'));
            if (inInr) {
                // Convert to USD
                priceElement.textContent = `$${usdPrice.toFixed(2)}/month`;
                convertButton.textContent = "Convert to INR";
            } else {
                // Convert to INR
                const inrPrice = (usdPrice * exchangeRate).toFixed(2);
                priceElement.textContent = `₹${inrPrice}/month`;
                convertButton.textContent = "Convert to USD";
            }
        });
        inInr = !inInr; // Toggle the currency state
    });
});