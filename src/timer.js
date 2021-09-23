const resetTime = () => {
  closeSeconds();
  closeMinutes();
  closeHours();
  sec = 0;
  min = 0;
  hour = 0;
  const xs = document.querySelectorAll('.t');
  xs.forEach((time, i) => {
    if (time.dataset.time === 'hour' || time.dataset.time === 'min') {
      time.innerHTML = '00:';
    } else {
      time.innerHTML = '00';
    }
  });
  document.getElementById('time').classList.remove('pulse');
  reset.setAttribute('disabled', true);
  stop.setAttribute('disabled', true);
};

export { resetTime };
