/** @odoo-module */
import { registry } from "@web/core/registry";
import { GalleryController } from "./gallery_controller";
import { GalleryArchParser } from "./gallery_arch_parser";
import { GalleryModel } from "./gallery_model";       // استيراد أمين المخزن
import { GalleryRenderer } from "./gallery_renderer"; // استيراد الرسام

export const galleryView = {
    type: "gallery",
    display_name: "Gallery",
    icon: "fa fa-picture-o",
    multiRecord: true,
    Controller: GalleryController,
    Model: GalleryModel,       // تسجيل الكلاس هنا
    Renderer: GalleryRenderer, // تسجيل الكلاس هنا

    props: (genericProps, view) => {
        const { arch } = genericProps;
        const parser = new GalleryArchParser();
        const archInfo = parser.parse(arch);

        return {
            ...genericProps,
            Model: view.Model,       // تمرير الموديل كـ prop
            Renderer: view.Renderer, // تمرير الرسام كـ prop
            archInfo,
        };
    },
};

registry.category("views").add("gallery", galleryView);