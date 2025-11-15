{
    'name': 'Custom Sale List Button',
    'version': '17.0.1.0.0',
    'category': 'Sales',
    'summary': 'Adds a custom button in the sale order list view',
    'description': """
        This module adds a custom button named 'custombtn' after the 'New' button 
        in the list view for sale orders only. Clicking it logs 'hello' to the console.
    """,
    'depends': ['sale'],
    'data': [
        'views/sale_order_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'custom_sale_list_button/static/src/js/custom_list_button.js',
            'custom_sale_list_button/static/src/xml/custom_list_button.xml',
            'custom_sale_list_button/static/src/js/custom_kanban_button.js',
            'custom_sale_list_button/static/src/xml/custom_sale_kanban_button.xml',
            'custom_sale_list_button/static/src/js/custom_form_button.js',
            'custom_sale_list_button/static/src/xml/custom_form_button.xml',  # Updated to handle all
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
