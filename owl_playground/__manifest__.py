{
    'name': 'OWL Playground',
    'version': '1.0',
    'category': 'Tool',
    'summary': 'تعلم إطار عمل OWL خطوة بخطوة',
    'depends': ['web', 'sale'],
    'data': [
        'views/sale_order_view.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'owl_playground/static/src/components/main_header/main_header.js',
            'owl_playground/static/src/scss/color_picker.scss',
            'owl_playground/static/src/js/color_picker.js',
        ],
    },
    'installable': True,
    'application': True,
}
