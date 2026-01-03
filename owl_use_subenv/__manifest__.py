{
    'name': 'OWL useSubEnv Demo',
    'version': '17.0.1.0.0',
    'category': 'Hidden',
    'summary': 'A demo to explain useSubEnv in Odoo 17',
    'author': 'Gemini',
    'depends': ['base', 'web'],
    'data': [
        'views/menus.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'owl_use_subenv/static/src/**/*',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}