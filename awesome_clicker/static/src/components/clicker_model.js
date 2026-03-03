/** @odoo-module **/
import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { getReward } from "./click_rewards";
import { choose } from "./utils";

export class ClickerModel extends Reactive {
    constructor() {
        super();
        this.version = 2; // الإصدار الحالي بعد إضافة الخوخ
        this.clicks = 0;
        this.level = 0;
        this.clickBots = 0;
        this.bigBots = 0;
        this.trees = { pear: 0, cherry: 0 ,peach:0};
        this.fruits = { pear: 0, cherry: 0 ,peach:0};
        this.bus = new EventBus();

        // إنتاج الكليكات تلقائياً كل 10 ثوانٍ
        setInterval(() => {
            const totalAutoClicks = (this.clickBots * 10) + (this.bigBots * 100);
            if (totalAutoClicks > 0) this.increment(totalAutoClicks);
        }, 10000);

        // إنتاج الفواكه كل 30 ثانية
        setInterval(() => {
            this.fruits.pear += this.trees.pear;
            this.fruits.cherry += this.trees.cherry;
        }, 30000);
    }

    get totalTrees() { return this.trees.pear + this.trees.cherry; }
    get totalFruits() { return this.fruits.pear + this.fruits.cherry; }

    // --- نظام الحفظ والاستعادة ---
    exportState() {
        return {
            version: this.version, // حفظ الإصدار مع الحالة
            clicks: this.clicks,
            level: this.level,
            clickBots: this.clickBots,
            bigBots: this.bigBots,
            trees: this.trees,
            fruits: this.fruits,
        };
    }

    importState(state) {
        this.clicks = state.clicks || 0;
        this.level = state.level || 0;
        this.clickBots = state.clickBots || 0;
        this.bigBots = state.bigBots || 0;
        this.trees = state.trees || { pear: 0, cherry: 0, peach: 0 };
        this.fruits = state.fruits || { pear: 0, cherry: 0, peach: 0 };
    }
    increment(inc = 1) {
        this.clicks += inc;
        if (this.level === 0 && this.clicks >= 1000) { this.level = 1; this.bus.trigger("MILESTONE_1k"); }
        if (this.level === 1 && this.clicks >= 5000) { this.level = 2; this.bus.trigger("MILESTONE_5k"); }
        if (this.level === 2 && this.clicks >= 1000000) { this.level = 3; this.bus.trigger("MILESTONE_1M"); }
    }

    buyClickBot = () => { if (this.clicks >= 1000) { this.clicks -= 1000; this.clickBots++; } }
    buyBigBot = () => { if (this.clicks >= 5000) { this.clicks -= 5000; this.bigBots++; } }
    buyTree = () => {
        if (this.clicks >= 1000000) {
            this.clicks -= 1000000;
            const treeType = choose(['pear', 'cherry']);
            this.trees[treeType]++;
        }
    }

    giveReward = (notificationService, actionService) => {
        const reward = getReward(this.level);
        if (!reward) return;
        notificationService.add(reward.description, {
            title: "🎁 مكافأة أودو!",
            type: "success",
            sticky: true,
            buttons: [{
                name: "Collect",
                onClick: () => { reward.apply(this); actionService.doAction("awesome_clicker.client_action"); },
                primary: true,
            }],
        });
    }
}