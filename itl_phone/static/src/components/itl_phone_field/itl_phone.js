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
    console.log("inherited field successfully");
    onWillStart(async () => {
      await Promise.all([
        loadCSS(
          "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.6/build/css/intlTelInput.css"
        ),
        loadJS(
          "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.6/build/js/intlTelInput.min.js"
        ),
      ]);
    });
    onMounted(() => {
      console.log("mounted");
      this.state.iti = window.intlTelInput(this.inputRef.el, {
        loadUtils: () =>
          import(
            "https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.6/build/js/utils.js"
          ),
      });
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
export const itlPhoneField = {
  component: ItlPhoneField,
};
registry.category("fields").add("custom_itl_phone", itlPhoneField);
