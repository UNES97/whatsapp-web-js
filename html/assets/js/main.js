const qrForm = document.getElementById('qrForm');
const tokenInput = document.getElementById('token');
const tokenError = document.getElementById('tokenError');
const loading = document.getElementById('loading');
const qrImage = document.getElementById('qrImage');
const qrCode = document.getElementById('qrCode');
const errorMessage = document.getElementById('errorMessage');
const generateBtn = document.getElementById('generateBtn');

tokenInput.addEventListener('input', () => {
    generateBtn.disabled = tokenInput.value.trim() == '';
});

qrForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const token = tokenInput.value.trim();

    tokenInput.classList.remove('is-invalid');
    errorMessage.classList.add('d-none');
    errorMessage.innerText = '';

    if (!token) {
        tokenInput.classList.add('is-invalid');
        tokenError.innerText = 'Please provide an access token';
        return;
    }

    loading.classList.remove('d-none');
    qrImage.classList.add('d-none');

    try {
        const response = await fetch('api/qr', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });

        let result = await response.json();
        if(result.statusCode == 200) {
            const imageResponse = await fetch('api/qr-image', {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            });
            
            const blob = await imageResponse.blob();
            const qrURL = URL.createObjectURL(blob);
        
            loading.classList.add('d-none');
        
            qrImage.classList.remove('d-none');
            qrCode.src = qrURL;
        }
        else {
            throw new Error(result.message || 'Failed to generate QR code');
        }
    } catch (error) {
        loading.classList.add('d-none');
        errorMessage.classList.remove('d-none');
        errorMessage.innerText = error.message;
    }
});