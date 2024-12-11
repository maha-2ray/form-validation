const fetchCountries =  async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const countrySelect = document.getElementById('country');
    
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const  toggleEmailError = (show) => {
  const emailError = document.getElementById('emailError');
  emailError.style.display = show ? 'block' : 'none';
}

const toggleDisabilitySpecify = () => {
  const specifyDisability = document.getElementById('specify-disability');
  specifyDisability.style.display = document.getElementById('disability-yes').checked ? 'flex' : 'none';
}
const  toggleMedicalSpecify = () => {
  const specifyMedical = document.getElementById('specify-medical');
  specifyMedical.style.display = document.getElementById('medical-yes').checked ? 'flex' : 'none';
}
const collectFormData = (formId) => {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  return data;
}
const displayCollectedData = (data) => {
  const output = document.getElementById('output');
  output.innerHTML = '<h2>Collected Data:</h2>';
  
  for (let [key, value] of Object.entries(data)) {
    output.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form1 = document.getElementById('form1');
  const form2 = document.getElementById('form2');
  
  if (form1) {
    fetchCountries();
    
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
      toggleEmailError(!validateEmail(emailInput.value));
    });
    
    form1.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateEmail(emailInput.value)) {
        const data = collectFormData('form1');
        localStorage.setItem('form1Data', JSON.stringify(data));
        window.location.href = 'form2.html';
      }
    });
  }
  
  if (form2) {
    const disabilityRadios = document.querySelectorAll('input[name="disability"]');
    disabilityRadios.forEach(radio => {
      radio.addEventListener('change', toggleDisabilitySpecify);
    });
    
    const medicalRadios = document.querySelectorAll('input[name="medical"]');
    medicalRadios.forEach(radio => {
      radio.addEventListener('change', toggleMedicalSpecify);
    });
    
    document.querySelector('.previous-btn').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
    
    form2.addEventListener('submit', (e) => {
      e.preventDefault();
      const data1 = JSON.parse(localStorage.getItem('form1Data'));
      const data2 = collectFormData('form2');
      const combinedData = { ...data1, ...data2 };
      displayCollectedData(combinedData);
    });
  }
});

