import {isBlank} from "~/functions/utils";

// This is your plugin object. It can be exported to be used anywhere.
const LoggingSerivce = {

  LOGGER: {
    isLoggingEnabled: true,

    disableLogging() {
      this.isLoggingEnabled = false;
    },

    enableLogging() {
      this.isLoggingEnabled = true;
    },

    info(context, message, ...optionalParams) {
      context = context ? '[' + context + '] ' : '';

      if (this.isLoggingEnabled) {
        if (isBlank(optionalParams)) {
          console.log(context + message);
        } else {
          console.log(context + message, optionalParams);
        }
      }
    },

    warn(context, message, ...optionalParams) {
      context = context ? '[' + context + '] ' : '';

      if (this.isLoggingEnabled) {
        if (isBlank(optionalParams)) {
          console.warn(context + message);
        } else {
          console.warn(context + message, optionalParams);
        }
      }
    },

    error(context, message, ...optionalParams) {
      context = context ? '[' + context + '] ' : '';

      if (this.isLoggingEnabled) {
        if (isBlank(optionalParams)) {
          console.error(context + message);
        } else {
          console.error(context + message, optionalParams);
        }
      }
    },

    getLogger(vueComponent) {

      const vueComponentName = vueComponent && vueComponent._name ?
        '[' + vueComponent._name
          .replace('<', '')
          .replace('>', '') + '] ' : '';


      return {
        context: vueComponentName,
        isLoggingEnabled: this.isLoggingEnabled,

        info(message, ...optionalParams) {
          if (this.isLoggingEnabled) {
            if (isBlank(optionalParams)) {
              console.log(this.context + message);
            } else {
              console.log(this.context + message, optionalParams);
            }
          }
        },

        warn(message, ...optionalParams) {
          if (this.isLoggingEnabled) {
            if (isBlank(optionalParams)) {
              console.warn(this.context + message);
            } else {
              console.warn(this.context + message, optionalParams);
            }
          }
        },

        error(message, ...optionalParams) {
          if (this.isLoggingEnabled) {
            if (isBlank(optionalParams)) {
              console.error(this.context + message);
            } else {
              console.error(this.context + message, optionalParams);
            }
          }
        },
      }
    },
  },


  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {

    Vue.prototype.$LOGGER = this.LOGGER;

    // We call Vue.mixin() here to inject functionality into all components.
    Vue.mixin({
      mounted() {
        // Anything added to a mixin will be injected into all components.
        // In this case, the mounted() method runs when the component is added to the DOM.
      }
    });
  }
};

export default LoggingSerivce;
