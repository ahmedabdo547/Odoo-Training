/** @odoo-module */
import { FormController } from "@web/views/form/form_controller";
import { registry } from "@web/core/registry";
import { formView } from "@web/views/form/form_view";

export class CustomFormController extends FormController {
    setup() {
        super.setup();
    }

    onCustomClick() {
        console.log('hello');
    }
}

CustomFormController.template = "custom_sale_list_button.FormView.Buttons";  // Matches the updated template name

export const customFormView = {
    ...formView,
    Controller: CustomFormController,
};

registry.category("views").add("custom_sale_form_button", customFormView);