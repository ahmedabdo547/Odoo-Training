/** @odoo-module **/
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_service";
import {ClickValue} from "./click_value.js"
import { Notebook } from "@web/core/notebook/notebook"; // استيراد المكون
export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";
    static components={ClickValue,Notebook}
    setup() {
        this.clicker = useClicker();
    }

    increment() {
        // هنا بننادي الـ increment من الـ service مباشرة
        this.clicker.increment(999000);
    }

}
registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);