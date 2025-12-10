# -*- coding: utf-8 -*-
{
  "name": "Owl Website",
  "version": "17.0.0.0",
  "category": "Tools",
  'summary': 'Brief description of the module',
  'description': '''
      Detailed description of the module
  ''',
  'author': 'Cybrosys Techno Solutions',
  'company': 'Cybrosys Techno Solutions',
  'maintainer': 'Cybrosys Techno Solutions',
  'website': 'https://www.cybrosys.com',
  "depends": ["base", "web","website"],
  "data": [
      "views/templates.xml"
  ],

  "assets": {
      'web.assets_frontend': [
          'owl_website/static/src/components/partner/partner.js',
          'owl_website/static/src/components/partner/partner.xml',
      ]
  },
  "license": "LGPL-3",
  "installable": True,
  "auto_install": False,
  "application": True
}