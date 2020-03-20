function handleMousedown(el, binding) {
  const obj = { data: {} };

  el.onmousedown = e => {
    const startX = e.clientX;
    const startY = e.clientY;
    const rect = el.getBoundingClientRect();

    Object.assign(obj, { startX, startY, offsetX: startX - rect.left, offsetY: startY - rect.top, rect });
    binding.value({ name: 'mousedown', ...obj });

    document.onmousemove = e => {
      e.preventDefault();
      const distX = e.clientX - startX;
      const distY = e.clientY - startY;

      Object.assign(obj, { distX, distY, x: e.clientX, y: e.clientY });
      binding.value({ name: 'mousemove', ...obj });
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      binding.value({ name: 'mouseup', ...obj });
    };
  };
}

export default {
  bind(el, { arg = true, value }) {
    if (!arg) {
      return false;
    }
    handleMousedown(el, { value });
  },
  update(el, { arg = true, value }) {
    if (!arg) {
      el.onmousedown = null;
    } else if (!el.onmousedown) {
      handleMousedown(el, { value });
    }
  },
  unbind(el) {
    el.onmousedown = null;
  }
};
