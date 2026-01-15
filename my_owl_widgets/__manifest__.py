{
    'name': 'My OWL Widgets Library',
    'version': '1.0',
    'summary': 'A collection of custom OWL field widgets (Stars, Colors, Avatars)',
    'author': 'Ahmed Abdelhameed',
    'category': 'Hidden/Tools',
    'depends': ['web'],
    'data': [
    ],
    'assets': {
        'web.assets_backend': [
            'my_owl_widgets/static/src/components/**/*.js',
            'my_owl_widgets/static/src/components/**/*.xml',
        ],
    },
    'installable': True,
    'application': False,  #
}
