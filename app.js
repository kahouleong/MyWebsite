/* Enter your WhatsApp number in international format, digits only. */
const whatsappNumber = '601127243879';

const prices = {
  ceramic: { small: 500, medium: 600, large: 700 },
  wash: { small: 70, medium: 80, large: 90 },
};

const service = document.querySelector('#service');
const washEligibility = document.querySelector('#wash-eligibility');
const size = document.querySelector('#size');
const distance = document.querySelector('#distance');
const estimateLabel = document.querySelector('#estimate-label');
const travelNote = document.querySelector('#travel-note');
const travelRates = {
  unknown: { fee: null, note: 'Share your location to confirm the travel charge.' },
  local: { fee: 0, note: 'Travel within 10 km is free.' },
  extended: { fee: 20, note: 'Includes RM20 for travel from 11–20 km.' },
  quote: { fee: null, note: 'Above 20 km: please enquire for a travel quote.' },
};

const estimate = document.querySelector('#estimate');
const whatsapp = document.querySelector('#whatsapp');
const contactNote = document.querySelector('#contact-note');
const hasNumber = /^[1-9][0-9]{6,14}$/.test(whatsappNumber);

function updateEstimate() {
  const travel = travelRates[distance.value];
  const price = 'RM' + (prices[service.value][size.value] + (travel.fee ?? 0));
  const priceLabel = travel.fee === null ? 'Service price' : 'Estimated total';
  estimateLabel.textContent = priceLabel;
  travelNote.textContent = travel.note;
  estimate.value = price;
  washEligibility.hidden = service.value !== 'wash';
  if (hasNumber) {
    const serviceName = service.selectedOptions[0].text;
    const sizeName = size.selectedOptions[0].text.toLowerCase();
    const coatingDetails = service.value === 'wash' ? ' My previous coating date or booking reference: ____.' : '';
    const message = 'Hi Back to Default Detailing! I’d like to enquire about ' +
      serviceName + ' for a ' + sizeName + ' vehicle (' + priceLabel.toLowerCase() + ': ' + price +
      '). My vehicle make and model: ____. My location: ____. ' + travel.note + coatingDetails;
    whatsapp.href = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
  }
}

if (!hasNumber) {
  whatsapp.removeAttribute('href');
  whatsapp.setAttribute('aria-disabled', 'true');
  contactNote.textContent = 'WhatsApp enquiries will open once the business number is added.';
}

service.addEventListener('change', updateEstimate);
size.addEventListener('change', updateEstimate);
distance.addEventListener('change', updateEstimate);
document.querySelectorAll('.pick').forEach((link) => {
  link.addEventListener('click', () => {
    service.value = link.dataset.service;
    updateEstimate();
  });
});
updateEstimate();
