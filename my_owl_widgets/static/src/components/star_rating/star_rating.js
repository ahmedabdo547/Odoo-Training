/** @odoo-module */

import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class StarFieldWidget extends Component {
  static props = {
    ...standardFieldProps,
  };

  get stars() {
    const value = this.props.record.data[this.props.name] || 0;
    const max_rate = this.props.options?.max_rate || 5;
    let stars = [];
    for (let i = 1; i <= max_rate; i++) {
      stars.push({ id: i, isFilled: i <= value });
    }
    return stars;
  }

  async handleStarClick(value) {
    if (this.props.readonly) {
      return;
    }
    await this.props.record.update({ [this.props.name]: value });
  }
}

StarFieldWidget.template = "my_owl_widgets.StarFieldWidget";

StarFieldWidget.supportedTypes = ["integer"];

registry.category("fields").add("star_rating", {
    component: StarFieldWidget,
    extractProps: (fieldInfo) => {
        return {
            options: fieldInfo.options,
        };
    },
});