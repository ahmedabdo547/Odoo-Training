/** @odoo-module */
import { Component, xml } from "@odoo/owl";

export class CounterCard extends Component {
    // لاحظ: لا نحتاج لاستقبال دوال عبر الـ props
    // نحن نعدل البيانات في الـ env مباشرة
    
    increment() {
        this.env.counterStore.count++;
        this.env.counterStore.lastUpdatedBy = this.props.title;
    }

    decrement() {
        this.env.counterStore.count--;
        this.env.counterStore.lastUpdatedBy = this.props.title;
    }
}

CounterCard.template = xml`
    <div class="col-md-4">
        <div class="card mb-3">
            <div class="card-header bg-primary text-white">
                <t t-esc="props.title"/>
            </div>
            <div class="card-body text-center">
                <h3><t t-esc="env.counterStore.count"/></h3>
                <small class="text-muted">Last Update: <t t-esc="env.counterStore.lastUpdatedBy"/></small>
                <div class="mt-3">
                    <button class="btn btn-sm btn-danger me-2" t-on-click="decrement">-</button>
                    <button class="btn btn-sm btn-success" t-on-click="increment">+</button>
                </div>
            </div>
        </div>
    </div>
`;
