document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const provider = document.getElementById('provider').value;
    const appointmentDate = document.getElementById('appointment-date').value;

    const data = { name, email, provider, appointmentDate };

    fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => console.error('Error:', err));
});

const healthTips = [
    "Stay hydrated and drink plenty of water.",
    "Get regular physical exercise to stay fit.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Practice mindfulness and reduce stress."
];

const tipsContainer = document.getElementById('tips-container');

healthTips.forEach(tip => {
    const tipDiv = document.createElement('div');
    tipDiv.textContent = tip;
    tipsContainer.appendChild(tipDiv);
});

// Fetch doctors dynamically from the server
fetch('/api/providers')
    .then(response => response.json())
    .then(providers => {
        const doctorSelect = document.getElementById('provider');
        providers.forEach(provider => {
            const option = document.createElement('option');
            option.value = provider.provider_id;
            option.textContent = `${provider.first_name} (${provider.provider_specialty})`;
            doctorSelect.appendChild(option);
        });
    })
    .catch(err => console.error('Error fetching providers:', err));
