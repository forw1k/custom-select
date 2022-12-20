import { Select } from './modules/select';
import './index.scss';

const select = new Select('#select', {
  placeholder: 'Choose something',
  data: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Angular' },
    { id: '3', value: 'Vue' },
    { id: '4', value: 'Jquery' },
    { id: '5', value: '32424' },
    { id: '6', value: 'Something' },
    { id: '7', value: 'Else' },
  ],
});

window.customSelect = select;
