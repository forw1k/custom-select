const getTemplate = (data = [], placeholder, selectedId) => {
  let textValue = placeholder ?? '';

  const items = data
    .map(({ id, value }) => {
      let currentClass = '';
      if (id === selectedId) {
        textValue = value;
      }

      return `
          <li class="select__item ${currentClass}" data-type="option" data-id="${id}">${value}</li>
        `;
    })
    .join('');

  return `
        <div class="select__shadow" data-type="shadow"></div>
        <div class="select__input" data-type="input">
          <div data-type="value">${textValue}</div>
          <i class="arrow up" data-type="iconArrow"></i>
        </div>
        <div class="select__dropdown">
          <ul class="select__list">
            ${items}
          </ul>
        </div>
      `;
};

export class Select {
  constructor(selector, options) {
    this._el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this._el.classList.add('select');
    this._el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  setup() {
    this.onClick = this.onClick.bind(this);
    this._el.addEventListener('click', this.onClick);
    this._iconArrow = this._el.querySelector('[data-type="iconArrow"]');
    this._value = this._el.querySelector('[data-type="value"]');
  }

  onClick(e) {
    const { type } = e.target.dataset;
    switch (type) {
      case 'input':
        this.toggle();
        break;
      case 'option':
        const id = e.target.dataset.id;
        this.select(id);
        break;
      case 'shadow':
        this.close();
      default:
        break;
    }
  }

  get isOpen() {
    return this._el.classList.contains('open');
  }

  get currentItem() {
    return this.options.data.find(({ id }) => id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this._value.textContent = this.currentItem.value;

    this._el.querySelectorAll('[data-type="option"]').forEach((el) => {
      el.classList.remove('selected');
    });
    this._el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.currentItem) : null;

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this._el.classList.add('open');
  }

  close() {
    this._el.classList.remove('open');
  }

  destroy() {
    this._el.removeEventListener('click', this.onClick);
    this._el.innerHTML = '';
  }
}
