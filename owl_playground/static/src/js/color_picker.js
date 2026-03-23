/** @odoo-module **/

import { Component, xml, onWillStart, onWillUpdateProps } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

// ---------------------------------------------------------
// 1. المكون الفرعي: حبة اللون (Color Pill)
// ---------------------------------------------------------
class ColorPill extends Component {
    static template = xml`
        <span
            t-attf-class="o_color_pill o_color_#{props.color} #{props.record.data[props.name] == props.color ? 'active': ''}"
            t-attf-title="اللون رقم #{props.color} (مستخدم #{props.count} مرة)"
            t-on-click="pillClicked">
        </span>
    `;

    pillClicked = () => {
        // تحديث قيمة الحقل في قاعدة البيانات مباشرة عبر الـ Record الممرر من الأب
        this.props.record.update({ [this.props.name]: this.props.color });
    }
}

// ---------------------------------------------------------
// 2. المكون الرئيسي: حقل اختيار الألوان (Color Picker Field)
// ---------------------------------------------------------
export class ColorPickerField extends Component {
    static components = { ColorPill };
    static supportedFieldTypes = ['integer'];

    static template = xml`
        <div>
            <div class="d-flex align-items-center mb-2">
                <t t-foreach="totalColors" t-as="color" t-key="color">
                    <ColorPill
                        color="color"
                        record="props.record"
                        name="props.name"
                        count="colorCounts[color] || 0"
                    />
                </t>
            </div>

            <div class="mt-2 text-muted fw-bold" style="font-size: 0.9em;">
                <t t-if="props.record.data[props.name]">
                    <span class="text-success">
                        <i class="fa fa-check-circle me-1"></i>
                        تم اختيار الفئة رقم <t t-out="props.record.data[props.name]"/> بنجاح
                    </span>
                </t>
                <t t-else="">
                    <span class="text-danger">
                        <i class="fa fa-exclamation-triangle me-1"></i>
                        الرجاء اختيار فئة لتمييز السجل!
                    </span>
                </t>
            </div>
        </div>
    `;

    setup() {
        // الألوان المتاحة
        this.totalColors = [1, 2, 3, 4, 5, 6];
        // كائن فارغ لتخزين عدد مرات استخدام كل لون من السيرفر
        this.colorCounts = {};

        // استدعاء خدمة الـ ORM
        this.orm = useService("orm");

        // إيقاف الرسم مؤقتاً حتى تعود البيانات من السيرفر
        onWillStart(async () => {
            await this.fetchColorCounts();
        });
        // بتشتغل كل مرة تقلب فيها بين السجلات (الـ Props تتغير)
        onWillUpdateProps(async (nextProps) => {
            await this.fetchColorCounts();
        });
    }

    async fetchColorCounts() {
        const modelName = this.props.record.resModel;
        const fieldName = this.props.name;

        try {
            // جلب البيانات مجمعة
            const result = await this.orm.readGroup(
                modelName,
                [],
                [fieldName],
                [fieldName]
            );

            // تعبئة الكائن بالبيانات القادمة
            result.forEach((record) => {
                this.colorCounts[record[fieldName]] = record[`${fieldName}_count`];
            });
        } catch (error) {
            console.error("خطأ أثناء جلب البيانات:", error);
        }
    }
}

// ---------------------------------------------------------
// 3. التسجيل في الـ Registry
// ---------------------------------------------------------
registry.category("fields").add("owl_color_picker", {
    component: ColorPickerField
});