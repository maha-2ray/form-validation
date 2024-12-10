document.addEventListener('DOMContentLoaded', () => {
    
            const form1 = document.getElementById('form1');
            const form2 = document.getElementById('form2');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email');
            const male = document.getElementById('male').value;
            const female = document.getElementById('female').value;
            const countrySelect = document.getElementById('country').value;
            const submitButton = document.getElementById('next-btn');
            const emailError = document.getElementById('emailError');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validateEmail = () =>{
                    const isValid = emailRegex.test(email.value);
                    if(!isValid){
                        emailError.style.display = 'block';
                        submitButton.disabled = true;
                    }else{
                        emailError.style.display = 'none';
                        submitButton.disabled = false;
                    }
                return isValid;
            }

            email.addEventListener('input', validateEmail);
            if(form1){
                form1.addEventListener('submit', (e) =>{
                    e.defaultPrevented();
                    if(name && email && countrySelect){
                        localStorage.setItem('name', JSON.stringify({name}));
                        localStorage.setItem('email', JSON.stringify({email}));
                        localStorage.setItem('country', JSON.stringify({countrySelect}));
                        window.location.href = 'form2.html';
                    }else{
                        alert("Please refill the form");
                    }
                })
            }

           // Fetch countries from API
            fetch('https://restcountries.com/v3.1/all?fields=name,cca3')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch countries');
                    }
                    return response.json();
                })
                .then(data => {
                    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

                    data.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country.cca3;
                        option.textContent = country.name.common;
                        countrySelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    countrySelect.innerHTML = '<option>Error loading countries</option>';
                });
                ''
            countrySelect.addEventListener('change', function() {
                submitButton.disabled = !this.value;
            });
        });