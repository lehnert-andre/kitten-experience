import {isBlank} from "~/shared-functions/utils";

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


    printAppInfo(appInfo) {
      try {
        console.group(`Application started: %c ${appInfo.name} %c Version ${appInfo.version} %c`,
          'background:#35495e ; padding: 2px; margin: 2px 0 2px 2px; border-radius: 3px 0 0 3px;  color: #fff',
          'background:#0060a9 ; padding: 2px; margin: 2px 2px 2px 0; border-radius: 0 3px 3px 0;  color: #fff',
          'background:transparent',);
        console.log('Application configuration:');
        console.table({...appInfo});
        console.groupEnd();
      } catch (e) {
        // ignore IE errors
      }
    },

    getLogger(context) {
      let contextName = '';

      if (context && context._name) {
        // Vue Component Name
        contextName = context._name
          .replace('<', '')
          .replace('>', '');
        contextName = `[${contextName}] `;
      } else if (context.constructor.name) {
        // Class Name
        contextName = context.constructor.name;
        contextName = `[${contextName}] `;
      }

      return {
        context: contextName,
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
