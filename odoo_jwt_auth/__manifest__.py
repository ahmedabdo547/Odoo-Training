{
    'name': 'Odoo JWT Authentication',
    'version': '17.0.1.0.0',
    'summary': 'Secure API with JWT (JSON Web Tokens)',
    'category': 'Backend/API',
    'author': 'Ahmed Abdelhameed',
    'depends': ['base', 'web'],
    'external_dependencies': {
        'python': ['pyjwt'],  # 🛡️ صمام الأمان لمنع التثبيت لو المكتبة مش موجودة
    },
    'data': [],
    'installable': True,
    'application': False,
}
