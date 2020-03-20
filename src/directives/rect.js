function handleMousedown(el, binding) {
  const obj = { x: 0, y: 0 };

  el.onmousedown = e => {
    const x = e.clientX;
    const y = e.clientY;

    Object.assign(obj, { x, y, nx: x, ny: y });
    binding.value({ name: 'mousedown', type: e.button, ...obj });

    document.onmousemove = e => {
      e.preventDefault();
      e.stopPropagation();
      const nx = e.clientX;
      const ny = e.clientY;

      Object.assign(obj, { nx, ny });
      binding.value({ name: 'mousemove', type: e.button, ...obj });
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      binding.value({ name: 'mouseup', type: e.button });
    };
  };
}

export default {
  bind(el, binding) {
    handleMousedown(el, binding);
  },
  unbind(el) {
    el.onmousedown = null;
  }
};
