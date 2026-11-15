/* Enter your WhatsApp number in international format, digits only. */
const whatsappNumber = '601127243879';

const service = document.querySelector('#service');
const washEligibility = document.querySelector('#wash-eligibility');
const whatsapp = document.querySelector('#whatsapp');
const contactNote = document.querySelector('#contact-note');
const hasNumber = /^[1-9][0-9]{6,14}$/.test(whatsappNumber);

const carBrand = document.querySelector('#car-brand');
const carModel = document.querySelector('#car-model');
const carOther = document.querySelector('#car-other');
const carOtherLabel = document.querySelector('#car-other-label');
const carOtherText = document.querySelector('#car-other-text');

function brandName(brand) {
  return brand === 'Mercedes_Benz' ? 'Mercedes-Benz' : brand.replaceAll('_', ' ');
}

for (const brand of Object.keys(carModels).sort((a, b) => brandName(a).localeCompare(brandName(b)))) {
  carBrand.add(new Option(brandName(brand), brand));
}
carBrand.add(new Option('Other brand', 'other'));

function showManualEntry() {
  const customBrand = carBrand.value === 'other';
  carOtherLabel.hidden = !customBrand && carModel.value !== 'other';
  carOther.disabled = carOtherLabel.hidden;
  carOtherText.textContent = customBrand ? 'Enter brand and model' : 'Enter model';
}

function updateModels() {
  const models = carModels[carBrand.value];
  carModel.disabled = !models;
  carModel.replaceChildren(new Option(models ? 'Select a model' : 'Select a brand first', ''));
  if (models) {
    for (const model of models.split('|').sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
      carModel.add(new Option(model, model));
    }
    carModel.add(new Option('Other model', 'other'));
  } else if (carBrand.value === 'other') {
    carModel.options[0].text = 'Enter your car below';
  }
  carOther.value = '';
  showManualEntry();
  updateEnquiry();
}

function vehicleDescription() {
  const manual = carOther.value.trim();
  if (carBrand.value === 'other') return manual || '____';
  if (!carBrand.value) return '____';
  const model = carModel.value === 'other' ? manual : carModel.value;
  return brandName(carBrand.value) + ' ' + (model || '____');
}

function updateEnquiry() {
  washEligibility.hidden = service.value !== 'wash';
  if (hasNumber) {
    const serviceName = service.selectedOptions[0].text;
    const message = 'Hi Back to Default Detailing! I’d like to enquire about ' +
      serviceName + ' for ' + vehicleDescription() + '.';
    whatsapp.href = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
  }
}

if (!hasNumber) {
  whatsapp.removeAttribute('href');
  whatsapp.setAttribute('aria-disabled', 'true');
  contactNote.textContent = 'WhatsApp enquiries will open once the business number is added.';
}

service.addEventListener('change', updateEnquiry);
carBrand.addEventListener('change', updateModels);
carModel.addEventListener('change', () => {
  carOther.value = '';
  showManualEntry();
  updateEnquiry();
});
carOther.addEventListener('input', updateEnquiry);
document.querySelectorAll('.pick').forEach((link) => {
  link.addEventListener('click', () => {
    service.value = link.dataset.service;
    updateEnquiry();
  });
});
updateModels();
