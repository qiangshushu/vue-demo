export default {
  bind(el, binding) {
    if (binding.value.visiable) {
      el.style.visibility = 'visible';
    } else {
      el.style.visibility = 'hidden';
    }
  },
  update(el, binding) {
    if (binding.value.visiable) {
      el.style.visibility = 'visible';
    } else {
      el.style.visibility = 'hidden';
    }
  }
};
