/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";

export class ConfigurationDialog extends Component {
    static components = { Dialog, CheckBox };
    static template = "awesome_dashboard.ConfigurationDialog";

    setup() {
        this.state = useState({
            disabledItems: [...this.props.disabledItems],
        });
    }

    toggleItem(itemId) {
        if (this.state.disabledItems.includes(itemId)) {
            this.state.disabledItems = this.state.disabledItems.filter(id => id !== itemId);
        } else {
            this.state.disabledItems.push(itemId);
        }
    }

    onApply() {
        this.props.onApply(this.state.disabledItems);
        this.props.close();
    }
}