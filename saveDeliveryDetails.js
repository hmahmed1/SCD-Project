// Save delivery details to local storage
function saveDeliveryDetails() {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const area = document.getElementById('area').value.trim();
    const street = document.getElementById('street').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Check if all fields are filled
    if (!name || !address || !area || !street || !phone || !email) {
        alert('Please fill all the fields!');
        return;
    }

    // Create an object to store the details
    const deliveryDetails = {
        name: name,
        address: address,
        area: area,
        street: street,
        phone: phone,
        email: email,
    };

    // Save the object to local storage
    localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));

    // Confirmation message
    alert('Your delivery details have been saved successfully!');
}
