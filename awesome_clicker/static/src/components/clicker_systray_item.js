/** @odoo-module **/
import { registry } from "@web/core/registry";
import { Component, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_service";
import { ClickValue } from "./click_value.js";
// استيراد مكونات الـ Dropdown الرسمية من أودو
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
export class MySystrayItem extends Component {
  // إضافة المكونات الجديدة للـ static components
  static components = { ClickValue, Dropdown, DropdownItem};
  static template = "awesome_clicker.MySystrayItem";

  setup() {
    this.clicker = useClicker();
    this.action = useService("action");

    useExternalListener(document.body, "click", this.onExternalClick, {
      capture: true,
    });
  }

  onExternalClick = () => {
    // تركناها كما هي لزيادة العداد مع كل نقرة في النظام
    this.clicker.increment(1);
  };

  openClientAction = () => {
    this.action.doAction({
      type: "ir.actions.client",
      tag: "awesome_clicker.client_action",
      target: "new",
      name: "Clicker Game",
    });
  };
}

registry.category("systray").add("awesome_clicker.my_systray_item", {
  Component: MySystrayItem,
});