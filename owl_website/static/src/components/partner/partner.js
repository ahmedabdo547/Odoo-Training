/** @odoo-module */
import { registry } from '@web/core/registry';
import { onWillStart, useState, Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class Partner extends Component {
setup() {
   this.state = useState({partners:[]})

   onWillStart(async () => {
                await this.loadPartners()
            });
    }
    async loadPartners (){
     this.state.partners = await this.env.services.orm.searchRead('res.partner',[],['image_128','name','phone'])
    }
}
Partner.template = "owl_website.PartnerTemplate";
registry.category("public_components").add("owl_website.PartnerTemplate", Partner);