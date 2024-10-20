let payloadData = {};

function updateInputFields() {
    const messageType = document.getElementById('messageType').value;
    const messageInput = document.getElementById('messageInput');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const captionInput = document.getElementById('captionInput');

    messageInput.classList.add('d-none');
    imageUrlInput.classList.add('d-none');
    captionInput.classList.add('d-none');

    if (messageType === 'text') {
        messageInput.classList.remove('d-none');
    } else if (messageType === 'image') {
        imageUrlInput.classList.remove('d-none');
    } else if (messageType === 'imageWithCaption') {
        imageUrlInput.classList.remove('d-none');
        captionInput.classList.remove('d-none');
    }
}

function setButtonLoading(isLoading) {
    const button = document.getElementById('submitButton');
    const spinner = button.querySelector('.spinner-border');
    const buttonText = document.getElementById('buttonText');

    button.disabled = isLoading;
    if (isLoading) {
        spinner.classList.remove('d-none');
        buttonText.textContent = 'Sending...';
    } else {
        spinner.classList.add('d-none');
        buttonText.textContent = 'Send Message';
    }
}

async function sendMessage(event) {
    event.preventDefault();

    const number = document.getElementById('number').value;
    const messageType = document.getElementById('messageType').value;
    const message = document.getElementById('message').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const caption = document.getElementById('caption').value;
    const token = document.getElementById('token').value;
    const responseMessage = document.getElementById('responseMessage');
    const responseElement = document.getElementById('response');

    responseMessage.classList.add('d-none');
    responseMessage.className = ''; 
    responseMessage.textContent = '';
    responseElement.textContent = '';

    if (!token) {
        showError('Please provide the x-access-token!');
        return;
    }

    if (!number) {
        showError('Please provide a phone number!');
        return;
    }

    if (messageType === 'text' && !message) {
        showError('Please provide a message!');
        return;
    }

    if ((messageType === 'image' || messageType === 'imageWithCaption') && !imageUrl) {
        showError('Please provide an image URL!');
        return;
    }

    payloadData = { number, message, imageUrl, caption };

    setButtonLoading(true);

    try {
        const response = await fetch('api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(payloadData)
        });

        const result = await response.json();

        responseMessage.classList.remove('d-none');
        if (result.statusCode == 200) {
            responseMessage.classList.add('alert', 'alert-success');
        } else {
            responseMessage.classList.add('alert', 'alert-danger');
        }
        responseMessage.innerText = result.message;

        document.getElementById('payload').innerText = JSON.stringify(payloadData, null, 2);
        document.getElementById('headers').innerText = JSON.stringify({
            'Content-Type': 'application/json',
            'x-access-token': token
        }, null, 2);
        responseElement.innerText = JSON.stringify(result, null, 2);

    } catch (error) {
        showError(error.message || 'An error occurred while sending the message.');
    } finally {
        setButtonLoading(false);
    }
}

function showError(message) {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.classList.remove('d-none');
    responseMessage.className = 'alert alert-danger mt-3';
    responseMessage.innerText = message;
}