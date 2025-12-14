/** @odoo-module */
import { registry } from "@web/core/registry";
import { PhoneField } from "@web/views/fields/phone/phone_field";
import { onWillStart, onMounted, useRef, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { loadCSS, loadJS } from "@web/core/assets";

export class ItlPhoneField extends PhoneField {
  setup() {
    super.setup();
    this.inputRef = useRef("input");
    this.state = useState({
      iti: undefined,
      isValid: false,
    });
    this.notification = useService("notification");

    onWillStart(async () => {
      const [_, __] = await Promise.all([
        loadCSS(
          "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.6/build/css/intlTelInput.css",
        ),
        loadJS(
          "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.6/build/js/intlTelInput.min.js",
        )
      ]);

    });

    onMounted(() => {
      console.log("mounted");
      if (this.inputRef.el) {
        const options = {
          separateDialCode: this.props.separateDialCode,
          initialCountry: this.props.initialCountry || "eg", // جعل مصر الافتراضي إذا لم يحدد
          utilsScript:
            "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.6/build/js/utils.js",
        };
        this.state.iti = window.intlTelInput(this.inputRef.el, options);
      }
    });
  }
  validate() {
    this.state.isValid = this.state.iti.isValidNumber();
    if (this.state.isValid) {
      this.notification.add("the phone number is valid.", {
        title: "Validation Success",
        type: "success",
      });
    } else {
      this.notification.add("the phone number is not valid.", {
        title: "Validation Failed",
        type: "danger",
      });
    }
  }
}
ItlPhoneField.template = "itl_phone.ItlPhoneField";
ItlPhoneField.props = {
  ...PhoneField.props,
  separateDialCode: { type: Boolean, optional: true },
  initialCountry: { type: String, optional: true },
};
export const itlPhoneField = {
  component: ItlPhoneField,
  extractProps({ options }) {
    return {
      separateDialCode: options.separate_dial_code,
      initialCountry: options.initial_country,
    };
  },
};
registry.category("fields").add("custom_itl_phone", itlPhoneField);
