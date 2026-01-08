# -*- coding: utf-8 -*-
{
    'name': "Owl To Do App",
    'summary': "Manage your tasks efficiently with OWL",
    'description': """
                                                         
                                                         Owl To Do App
                                                                            ================================
                                                         A modern Todo List application built from scratch using Odoo OWL Framework.
                                                                            Features:
                                                                            - Add, Edit, Delete Tasks
                                                                            - Mark as Done
                                                                            - Interactive UI
                                                                                """,
    'author': "Ahmed Abdelhameed",
    'website': "https://www.linkedin.com/in/ahmed-abdelhameed-0557282a4/",
    'category': 'Productivity',
    'version': '17.0.1.0.0',

    'depends': ['base', 'web'],

    'data': [
        'security/ir.model.access.csv',
        'views/task_to_do.xml',
        'views/menus.xml',
    ],

    'assets': {
        'web.assets_backend': [
            'to_do_app/static/src/components/**/*.js',
            'to_do_app/static/src/components/**/*.xml',
        ],
    },

    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
