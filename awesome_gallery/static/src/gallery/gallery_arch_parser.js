/** @odoo-module */
export class GalleryArchParser {
    parse(xmlDoc) {
        const imageField = xmlDoc.getAttribute("image_field");
        const tooltipField = xmlDoc.getAttribute("tooltip_field");

        // قراءة الـ limit من الـ XML
        const limitAttr = xmlDoc.getAttribute("limit");
        const limit = limitAttr ? parseInt(limitAttr, 10) : 80; // 80 كقيمة افتراضية

        return {
            imageField,
            tooltipField,
            limit, // إرجاعها مع باقي الخصائص
        };
    }
}