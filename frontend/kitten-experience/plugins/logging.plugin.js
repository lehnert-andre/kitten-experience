//import Vue from 'vue'
import LoggingSerivce from './logging/logging.service'

//Vue.use(LoggingSerivce);


export default ({ app }, inject) => {
  inject('LOGGER', LoggingSerivce.LOGGER)
}
