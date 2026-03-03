/** @odoo-module **/
import { Component, xml } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers"; // الدالة السحرية من أودو

export class ClickValue extends Component {
    static template = xml`
        <span t-esc="formatedValue" t-att-data-tooltip="props.value"/>
    `;

  get formatedValue(){
   return humanNumber(this.props.value,{ decimals: 1, minDigits: 1 })
  }
}