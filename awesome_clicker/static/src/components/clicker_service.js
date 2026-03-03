/** @odoo-module **/
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";
import { useService } from "@web/core/utils/hooks";
import { useState } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { browser } from "@web/core/browser/browser";

export function useClicker() {
  return useState(useService("awesome_clicker.clicker"));
}

// تعريف المهاجرات (Migrations) لمعالجة تحديثات الداتا القديمة
const migrations = [
    {
        fromVersion: 1,
        toVersion: 2,
        apply(state) {
            // إضافة هيكل الخوخ للبيانات القديمة
            if (!state.trees) state.trees = {};
            if (!state.fruits) state.fruits = {};
            state.trees.peach = 0;
            state.fruits.peach = 0;
        }
    }
];

export const clickerService = {
  dependencies: ["effect", "action", "command"],

  start(env, { effect, action, command }) {
    const clickerModel = new ClickerModel();
    const CURRENT_VERSION = 2; // الإصدار الحالي بعد إضافة الخوخ

    // 1. استعادة الحالة عند بدء التشغيل مع نظام المهاجرة
    const savedData = browser.localStorage.getItem("awesome_clicker_state");
    if (savedData) {
        try {
            let state = JSON.parse(savedData);
            const stateVersion = state.version || 1;

            // تطبيق المهاجرات إذا كان إصدار الداتا قديم
            if (stateVersion < CURRENT_VERSION) {
                migrations
                    .filter(m => m.fromVersion >= stateVersion)
                    .forEach(m => {
                        m.apply(state);
                        state.version = m.toVersion;
                    });
            }
            clickerModel.importState(state);
        } catch (e) {
            console.error("خطأ في استعادة البيانات:", e);
        }
    }

    // 2. حفظ الحالة تلقائياً كل 10 ثوانٍ
    setInterval(() => {
        const state = clickerModel.exportState();
        browser.localStorage.setItem("awesome_clicker_state", JSON.stringify(state));
    }, 10000);

    // تسجيل الأوامر في الـ Command Palette (CTRL+K)
    command.add(_t("Open Clicker Game"), () => {
        action.doAction({
          type: "ir.actions.client",
          tag: "awesome_clicker.client_action",
          target: "new",
          name: _t("Clicker Game"),
        });
    }, { category: "apps" });

    command.add(_t("Buy 1 Click Bot"), () => {
        clickerModel.buyClickBot();
    }, {
        category: "actions",
        isAvailable: () => clickerModel.level >= 1,
    });

    // مستمع الـ Milestones لظهور الـ Rainbow Man
    clickerModel.bus.addEventListener("MILESTONE_1k", () => {
      effect.add({
        type: "rainbow_man",
        message: _t("مبروك يا بطل! دلوقتى تقدر تشتري روبوتات تساعدك (ClickBots unlocked!)"),
      });
    });

    return clickerModel;
  },
};

registry.category("services").add("awesome_clicker.clicker", clickerService);