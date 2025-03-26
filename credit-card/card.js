function isCardNumberValid(number) {
    return number === '1234123412341234';
}

function displayError(msg) {
    document.querySelector('.errorMsg').innerHTML = msg;
}

function submitHandler(event) {
    event.preventDefault();
    let errorMsg = '';

    displayError('');

    const cardNumber = document.querySelector('#cardNumber').value;

    if (isNaN(cardNumber)) {
        errorMsg += 'Card number is not a valid number.<br>';
    } else if (!isCardNumberValid(cardNumber)) {
        errorMsg += 'Card number is not a valid card number.<br>';
    }

    if (errorMsg !== '') {
        displayError(errorMsg);
        return false;
    }

    alert('Form submitted successfully!');
    return true;
}

document.querySelector('#credit-card').addEventListener('submit', submitHandler);