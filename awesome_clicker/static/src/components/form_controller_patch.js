/** @odoo-module **/
import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { onWillStart } from "@odoo/owl";

patch(FormController.prototype, {
  setup() {
    super.setup(...arguments);
    this.clicker = useService("awesome_clicker.clicker");
    this.notification = useService("notification");
    this.action = useService("action");

    onWillStart(() => {
      console.log("Form Controller Patch: checking for reward..."); // رسالة للتأكد في الـ Console
      // اجعلها 1.0 بدلاً من 0.01 للتجربة (نسبة 100%)
      if (Math.random() < 1.0) {
        this.clicker.giveReward(this.notification, this.action);
      }
    });
  },
});
