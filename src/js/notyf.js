import Notyf from 'notyf';
import 'notyf/dist/notyf.min.css';

const notyf = new Notyf({
  delay: 5000,
  confirmIcon: 'mdi mdi-comment-check-outline',
  alertIcon: 'mdi mdi-weather-lightning'
});

export default notyf;
