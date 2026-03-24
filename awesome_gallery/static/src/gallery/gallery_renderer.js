/** @odoo-module */
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks"; // 1. استيراد useService
import { url } from "@web/core/utils/urls";

export class GalleryRenderer extends Component {
    static template = "awesome_gallery.GalleryRenderer";
    static props = {
        model: Object,
        imageField: String,
        tooltipField: { type: String, optional: true }, // حقل اختياري
        resModel: String,
    };

    setup() {
        // 2. استدعاء خدمة الـ action وحفظها في الـ component
        this.action = useService("action");
    }

    getImageUrl(recordId) {
        return url("/web/image", {
            model: this.props.resModel,
            id: recordId,
            field: this.props.imageField,
        });
    }

    // 3. الدالة اللي هتتنفذ عند الضغط على الصورة أو الكارت
    onImageClick(recordId) {
        // بنقول للـ action service تفتح الـ form view للريكورد ده تحديداً
        this.action.switchView("form", {
            resId: recordId,
        });
    }
    getTooltip(record) {
        if (!this.props.tooltipField) {
            return ""; // لو مفيش حقل، رجع فاضي
        }

        const value = record[this.props.tooltipField];
        if (!value) {
            return "";
        }

        // لو الحقل Many2one، الـ value هتكون Array زي كده: [1, "Ahmed"]
        if (Array.isArray(value)) {
            return value[1]; // نرجع الاسم بس
        }

        // لو نص أو رقم، رجعه زي ما هو
        return value;
    }
}