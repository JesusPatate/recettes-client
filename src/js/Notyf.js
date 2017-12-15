import Notyf from 'notyf';
import 'notyf/dist/notyf.min.css';

var notyf = new Notyf({
  delay: 5000,
  confirmIcon: 'mdi mdi-comment-check-outline',
  alertIcon: 'mdi mdi-comment-alert-outline'
});

export default notyf;
