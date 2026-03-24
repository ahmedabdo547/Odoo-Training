/** @odoo-module */
import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { usePager } from "@web/search/pager_hook"; // 1. استيراد الـ Pager Hook

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static components = { Layout };

    setup() {
        this.orm = useService("orm");

        // 2. تمرير الـ limit للـ Model
        this.model = useState(new this.props.Model(
            this.orm,
            this.props.resModel,
            this.props.archInfo.imageField,
            this.props.archInfo.tooltipField,
            this.props.archInfo.limit
        ));

        // 3. تفعيل الـ Pager
        usePager(() => {
            return {
                offset: this.model.offset,
                limit: this.model.limit,
                total: this.model.recordsLength, // الإجمالي من الـ Model
                onUpdate: async (newState) => {
                    // لما تضغط على السهم اليمين أو الشمال، الـ newState بييجي فيها الـ offset والـ limit الجداد
                    this.model.offset = newState.offset;
                    this.model.limit = newState.limit;
                    await this.model.load(this.props.domain); // نحمل البيانات الجديدة
                },
            };
        });

        onWillStart(async () => {
            await this.model.load(this.props.domain);
        });

        onWillUpdateProps(async (nextProps) => {
            // تريكة مهمة جداً للـ UX:
            // لو المستخدم غير الفلتر (Search)، لازم نرجعه للصفحة الأولى!
            if (this.props.domain !== nextProps.domain) {
                this.model.offset = 0;
                await this.model.load(nextProps.domain);
            }
        });
    }
}