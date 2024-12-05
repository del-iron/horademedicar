// script.js

// Selecionando os elementos do DOM
const medicationForm = document.getElementById('medication-form');
const medName = document.getElementById('med-name');
const medDose = document.getElementById('med-dose');
const medTime = document.getElementById('med-time');
const medicationList = document.getElementById('med-list');
const reminderSound = document.getElementById('reminder-sound');

// Função para adicionar medicação
medicationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const medication = {
    name: medName.value,
    dose: medDose.value,
    time: medTime.value
  };
  
  addMedicationToList(medication);
  saveMedication(medication);
  medName.value = '';
  medDose.value = '';
  medTime.value = '';
});

// Função para adicionar medicamentos à lista
function addMedicationToList(medication) {
  const li = document.createElement('li');
  li.textContent = `${medication.name} - ${medication.dose} - às ${medication.time}`;
  medicationList.appendChild(li);
}

// Função para salvar medicamentos no LocalStorage
function saveMedication(medication) {
  let medications = JSON.parse(localStorage.getItem('medications')) || [];
  medications.push(medication);
  localStorage.setItem('medications', JSON.stringify(medications));
  checkForMedicationTimes();
}

// Função para verificar e tocar alarme quando o horário de medicação chegar
function checkForMedicationTimes() {
  const medications = JSON.parse(localStorage.getItem('medications')) || [];
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  
  medications.forEach(medication => {
    const [medHour, medMinute] = medication.time.split(':').map(Number);
    
    if (medHour === currentHour && medMinute === currentMinute) {
      alert(`Hora de tomar ${medication.name} - ${medication.dose}`);
      reminderSound.play();
    }
  });
}

// Função que verifica periodicamente o horário para alertar sobre a medicação
setInterval(checkForMedicationTimes, 60000); // Verifica a cada minuto
