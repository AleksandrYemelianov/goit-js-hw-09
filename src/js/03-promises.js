import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}

function createPromiseOnSubmit(e) {
    e.preventDefault()
    const { delay, step, amount } = e.target.elements
    delayInput = Number(delay.value);
    stepDelayInput = Number(step.value);
    amountInput = Number(amount.value);

    let position = 0;
  
    for (let i = 0; i < amountInput; i++) {
        position += 1;
        
        createPromise(position, delayInput)
        .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      
        delayInput += stepDelayInput;
      };
}
 
formEl.addEventListener('submit', createPromiseOnSubmit)

 


