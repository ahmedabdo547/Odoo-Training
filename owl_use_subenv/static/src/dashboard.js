/** @odoo-module */
import { Component, useState, useSubEnv, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { CounterCard } from "./counter_card";

class SubEnvDashboard extends Component {
    setup() {
        // 1. تعريف الحالة المشتركة (Store)
        const sharedState = useState({ 
            count: 0,
            lastUpdatedBy: 'None'
        });

        // 2. حقن الحالة في البيئة (Dependency Injection)
        // الآن أي مكون ابن (مثل CounterCard) يمكنه الوصول لـ env.counterStore
        useSubEnv({ counterStore: sharedState });
    }
}

SubEnvDashboard.template = xml`
    <div class="o_action_manager p-4">
        <h1>OWL useSubEnv Example</h1>
        <div class="alert alert-info">
            القيمة الحالية في الأب (Dashboard): 
            <b t-esc="env.counterStore.count"/>
        </div>
        
        <div class="row">
            <CounterCard title="'Card A'" />
            <CounterCard title="'Card B'" />
            <CounterCard title="'Card C'" />
        </div>
    </div>
`;

SubEnvDashboard.components = { CounterCard };

registry.category("actions").add("owl_use_subenv.dashboard_action", SubEnvDashboard);
