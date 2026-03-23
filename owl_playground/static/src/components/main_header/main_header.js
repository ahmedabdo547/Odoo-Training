/** @odoo-module **/

import { Component, mount, xml, whenReady, useState } from "@odoo/owl";

// تعريف المكون
class MainHeader extends Component {
    // 1. القالب (Template): عنصر أب واحد يضم كل شيء
    static template = xml`
        <div class="bg-primary text-white text-center p-2 shadow-sm d-flex justify-content-between align-items-center" style="position: sticky; top: 0; z-index: 1000;">
            <i class="fa fa-arrow-right p-2" style="cursor: pointer;" t-on-click="onPrevious" title="السابق"></i>

            <div>
                <i class="fa fa-rocket me-2"></i>
                <b t-esc="messageList[Math.abs(state.currentIndex % messageList.length)]"></b>
            </div>

            <div>
                <i class="fa fa-arrow-left p-2 me-3" style="cursor: pointer;" t-on-click="onNext" title="التالي"></i>
                <i class="fa fa-close p-2 text-danger bg-white rounded-circle" style="cursor: pointer;" t-on-click="onRemove" title="إغلاق"></i>
            </div>
        </div>
    `;

    // 2. دالة الإعداد (Setup)
    setup() {
        // مصفوفة النصوص
        this.messageList = [
            'أهلاً بك في معمل OWL - هذه أول خطوة في رحلتنا يا أحمد!',
            'هذا النص يتغير ديناميكياً بدون تحميل الصفحة',
            'قوة الـ Hooks والـ Reactivity في Odoo 17'
        ];

        // ربط المتغير currentIndex بالـ useState لمراقبة التغييرات
        this.state = useState({ currentIndex: 0 });
    }

    // 3. دوال التعامل مع الأحداث (Events) مكتوبة بالطريقة القياسية
    onNext() {
        this.state.currentIndex++;
    }

    onPrevious() {
        this.state.currentIndex--;
    }

    onRemove(ev) {
        // نستخدم closest للبحث عن العنصر الأب اللي واخد الكلاس bg-primary ومسحه بالكامل
        ev.target.closest('.bg-primary').remove();
    }
}

// 4. أمر التركيب (Mounting)
whenReady().then(() => {
    mount(MainHeader, document.body);
});