/** @odoo-module */
import { ListController } from "@web/views/list/list_controller";
import { registry } from "@web/core/registry";
import { listView } from "@web/views/list/list_view";

export class CustomListController extends ListController {
    setup() {
        super.setup();
    }

    onCustomClick() {
        console.log('hello');
    }
}

CustomListController.template = "custom_sale_list_button.ListView.Buttons";

export const customListView = {
    ...listView,
    Controller: CustomListController,
};

registry.category("views").add("custom_sale_list_button", customListView);