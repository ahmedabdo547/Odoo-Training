/** @odoo-module */
import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
    // ضفنا الـ limit للـ constructor
    constructor(orm, resModel, imageField, tooltipField, limit) {
        this.orm = orm;
        this.resModel = resModel;
        this.imageField = imageField;
        this.tooltipField = tooltipField;
        this.limit = limit;
        this.offset = 0; // بنبدأ دايماً من أول صفحة
        this.recordsLength = 0; // إجمالي الريكوردز
        this.keepLast = new KeepLast();
        this.records = [];
    }

    async load(domain) {
        const specification = { [this.imageField]: {} };
        if (this.tooltipField) specification[this.tooltipField] = {};

        // الدالة دي بترجع لنا records وكمان length (الإجمالي)
        const { length, records } = await this.keepLast.add(
            this.orm.webSearchRead(this.resModel, domain, {
                specification: specification,
                limit: this.limit,   // تحديد العدد
                offset: this.offset, // تحديد البداية
                context: { bin_size: true }
            })
        );
        this.records = records;
        this.recordsLength = length; // حفظ الإجمالي عشان البيدجر يقرأه
    }
}