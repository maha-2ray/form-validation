let formData = {};

const updateFormData = (newData)=>{
    formData = {...formData, ...newData}

    const dataDisplay = document.createElement('div');
    dataDisplay.id = 'data-display';
    dataDisplay.style.marginTop = "20px";
    dataDisplay.style.padding = "1rem";
    dataDisplay.style.border = "1px solid #ccc";
    dataDisplay.style.background = "#f9f9f9";

    dataDisplay.innerHTML = `<h3>Collected Data</h3><pre>` + JSON.stringify(formData, null, 2) + `</pre>`;

    const existingDisplay = document.getElementById('data-display');
    if (existingDisplay) {
        existingDisplay.remove();
    }
    document.body.appendChild(dataDisplay);
}

const handleForm1 = (e) => {
    e.defaultPrevented();

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
  countrySelect.addEventListener('change', function() {
    submitButton.disabled = !this.value;
  });

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const submitButton = document.getElementById('next-btn');
    const countrySelect = document.getElementById('country').value;
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';
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

  
  
    updateFormData({name, email, countrySelect, gender});

    window.location.href = 'form2.html';
}

const handleForm2 = (e) => {
    e.defaultPrevented();

    const hasDisability = document.getElementById('disability-yes').checked ? 'Yes' : 'No';
    const disabilitySpecification = hasDisability === 'Yes' ? document.getElementById('specify-disability').querySelector('textarea').value : '';
    const hasMedicalCondition = document.getElementById('medical-yes').checked ? 'Yes' : 'No';
    const medicalSpecification = hasMedicalCondition === 'Yes' ? document.getElementById('specify-medical').querySelector('textarea').value : '';
    
    updateFormData({ hasDisability, disabilitySpecification, hasMedicalCondition, medicalSpecification });
}

const handleSpecificationVisibility = () =>{
    const disabilityYes = document.getElementById('disability-yes');
    const medicalYes = document.getElementById('medical-yes');
    const specifyDisability = document.getElementById('specify-disability');
    const specifyMedical = document.getElementById('specify-medical');
    
    if (disabilityYes && specifyDisability) {
        disabilityYes.addEventListener('change', () => {
            specifyDisability.style.display = disabilityYes.checked ? 'block' : 'none';
        });
    }
    
    if (medicalYes && specifyMedical) {
        medicalYes.addEventListener('change', () => {
            specifyMedical.style.display = medicalYes.checked ? 'block' : 'none';
        });
    }
}

//#####################################################################################################################################################
document.addEventListener('DOMContentLoaded', () => {
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    
    if (form1) {
        form1.addEventListener('submit', handleForm1);
    }
    
    if (form2) {
        form2.addEventListener('submit', handleForm2);
        handleSpecificationVisibility();
    }

});