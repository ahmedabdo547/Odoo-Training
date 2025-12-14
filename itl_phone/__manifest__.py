# -*- coding: utf-8 -*-
{
    'name': 'Itl Phone',
    'version': '1.0',
    'summary': 'Brief description of the module',
    'description': '''
        Detailed description of the module
    ''',
    'category': 'Uncategorized',
    'author': 'Cybrosys Techno Solutions',
    'company': 'Cybrosys Techno Solutions',
    'maintainer': 'Cybrosys Techno Solutions',
    'website': 'https://www.cybrosys.com',
    'depends': ['base', 'web'],
    'data': [
        'views/itl_phone_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'itl_phone/static/src/components/**/*.js',
            'itl_phone/static/src/components/**/*.xml',
        ]
    },
    'license': 'LGPL-3',
    'installable': True,
    'application': False,
    'auto_install': False,
}
