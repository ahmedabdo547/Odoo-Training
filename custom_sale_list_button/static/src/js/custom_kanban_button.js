/** @odoo-module */
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { registry } from "@web/core/registry";
import { kanbanView } from "@web/views/kanban/kanban_view";

export class CustomKanbanController extends KanbanController {
    setup() {
        super.setup();
    }

    onCustomClick() {
        console.log('hello');
    }
}

CustomKanbanController.template = "custom_sale_list_button.KanbanView.Buttons";

export const customKanbanView = {
    ...kanbanView,
    Controller: CustomKanbanController,
};

registry.category("views").add("custom_sale_kanban_button", customKanbanView);