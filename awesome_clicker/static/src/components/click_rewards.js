/** @odoo-module **/
import { _t } from "@web/core/l10n/translation";
import { choose } from "./utils";

export const rewards = [
    {
        description: _t("Get 1 free ClickBot!"),
        apply(clicker) {
            clicker.clickBots += 1;
        },
        maxLevel: 3,
    },
    {
        description: _t("Get 10 free ClickBots!"),
        apply(clicker) {
            clicker.clickBots += 10;
        },
        minLevel: 3,
    },
    {
        description: _t("Small Fortune: +500 Clicks"),
        apply(clicker) {
            clicker.increment(500);
        },
    },
    {
        description: _t("Jackpot: +5000 Clicks!"),
        apply(clicker) {
            clicker.increment(5000);
        },
        minLevel: 2,
    },
    {
        description: _t("Power Up: Get 1 BigBot!"),
        apply(clicker) {
            clicker.bigBots += 1;
        },
        minLevel: 2,
    }
];

export function getReward(currentLevel) {
    // تصفية الجوائز بناءً على مستوى اللاعب الحالي
    const availableRewards = rewards.filter(r => {
        const minOk = r.minLevel === undefined || currentLevel >= r.minLevel;
        const maxOk = r.maxLevel === undefined || currentLevel <= r.maxLevel;
        return minOk && maxOk;
    });

    return choose(availableRewards);
}