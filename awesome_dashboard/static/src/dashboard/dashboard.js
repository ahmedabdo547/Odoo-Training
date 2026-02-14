
/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item";
import { Chart } from "./chart";
import { ConfigurationDialog } from "./configuration_dialog";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem, Chart };

    setup() {
        this.action = useService("action");
        this.dialog = useService("dialog");
        this.statsService = useService("statistics");
        this.statistics = useState(this.statsService);

        this.items = [
            { id: "new_orders", label: "New Orders" },
            { id: "total_amount", label: "Total Amount" },
            { id: "monthly_sales", label: "Monthly Sales" },
            { id: "tshirt_sizes", label: "T-Shirt Sizes Distribution" },
            { id: "sales_growth", label: "Sales Growth" },
        ];

        const savedConfig = localStorage.getItem("disabled_dashboard_items");
        this.state = useState({
            disabledItems: savedConfig ? JSON.parse(savedConfig) : [],
        });
    }

    openConfiguration() {
        this.dialog.add(ConfigurationDialog, {
            items: this.items,
            disabledItems: this.state.disabledItems,
            onApply: (newDisabledItems) => {
                this.state.disabledItems = newDisabledItems;
                localStorage.setItem("disabled_dashboard_items", JSON.stringify(newDisabledItems));
            },
        });
    }
     openCustomers = () => {
        this.action.doAction("base.action_partner_form");
    };

    openActivity = () => {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: 'Crm Lead',
            res_model: 'crm.lead',
            views: [[false, 'list']],
        });
    };

}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);