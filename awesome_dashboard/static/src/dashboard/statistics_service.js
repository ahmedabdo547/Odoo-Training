/** @odoo-module **/
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

export const statisticsService = {
    dependencies: ["rpc"],
    start(env, { rpc }) {
        const stats = reactive({ data: {} });

        async function loadStatistics() {
            const result = await rpc("/awesome_dashboard/statistics");
            Object.assign(stats.data, result);
        }

        loadStatistics();
        setInterval(loadStatistics, 5000);


        return stats;
    },
};

registry.category("services").add("statistics", statisticsService);