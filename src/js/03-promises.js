import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

let formData = {};
let delayNumber = 0;
let stepNumber = 0;
let amountNumber = 0;
let position = 0;
let delayN = 0;

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name = "delay"]'),
  inputStep: document.querySelector('input[name = "step"]'),
  inputAmount: document.querySelector('input[name = "amount"]'),
  createBtn: document.querySelector('button'),
}

// refs.inputAmount.addEventListener('input', repeatePromises);
refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onCreatePromisesBtn);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  // console.log("formData", formData);
}

function onCreatePromisesBtn(e) {
  e.preventDefault();
  repeatePromises();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);    
  });   
}

function repeatePromises() {
  const { delay, step, amount } = formData;
  delayNumber = Number(delay);
  stepNumber = Number(step);
  amountNumber = Number(amount);
  
  for (let i = 1, j = delayNumber; i <= amountNumber, j <= (delayNumber + step * (amountNumber - 1)); i += 1, j += stepNumber) {
    position = i;
    delayN = j;
    createPromise(position, delayN).then(onSuccessPromise).catch(onErrorPromise);
    if (i === amountNumber) {
      break;
    }
  }
}

function onSuccessPromise(result) {
  Notiflix.Notify.success(result);   
}

function onErrorPromise(error) {
  Notiflix.Notify.failure(error);
}
