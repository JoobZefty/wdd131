

const themeSelector = document.querySelector('select');
function changeTheme() {
    const currentValue = themeSelector.value;
// check to see what the current value of our select is.
// The current value is conveniently found in themeSelector.value!

// if the value is dark then:
// add the dark class to the body
// change the source of the logo img to point to the white logo.
// otherwise
// remove the dark class
// make sure the logo src is the blue logo.
    if (currentValue === 'dark') {
        // Add the 'dark' class to the body 
        document.body.classList.add('dark');
        // Change the source of the logo img to point to the white logo. 
        document.querySelector('.logo').src = 'dark-logo.png';
    } else {
        // Otherwise: // Remove the 'dark' class
        document.body.classList.remove('dark');
        // Make sure the logo src is the blue logo. 
        document.querySelector('.logo').src = 'logo.webp';
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);

