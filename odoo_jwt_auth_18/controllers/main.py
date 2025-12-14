import functools
from odoo import http
from odoo.http import request
from ..utils.jwt_util import JwtUtil
from odoo.exceptions import AccessDenied


def jwt_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        auth_header = request.httprequest.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return {'status': 'error', 'message': 'Missing or Invalid Authorization Header'}

        token = auth_header.split(" ")[1]
        uid = JwtUtil.validate_token(request.env, token)
        if not uid:
            return {'status': 'error', 'message': 'Invalid or Expired Token'}
        request.update_env(user=uid)
        return func(*args, **kwargs)

    return wrapper


class JwtAuthController(http.Controller):
    @http.route('/api/login', type='json', auth='public', methods=['POST'], csrf=False)
    def login(self, login, password):

        db_name = request.db or request.env.cr.dbname
        if not db_name:
            return {'status': 'error', 'message': 'Database not selected'}

        credential = {
            "login": login,
            "password": password,
            "type": "password"
        }

        try:
            auth_result = request.session.authenticate(db_name, credential)

            if not auth_result:
                return {'status': 'error', 'message': 'Invalid Credentials'}

            if isinstance(auth_result, dict):
                uid = auth_result['uid']
            else:
                uid = auth_result  # احتياطي للنسخ القديمة

        except AccessDenied:
            return {'status': 'error', 'message': 'Wrong login or password'}

        token = JwtUtil.generate_token(request.env, uid)

        return {
            'status': 'success',
            'token': token,
            'uid': uid,
            'user_name': request.env.user.name
        }

    @http.route('/api/products', type='json', auth='public', methods=['POST'], csrf=False)
    @jwt_required
    def get_products(self, **kw):
        user = request.env.user

        limit = kw.get('limit', 5)

        products = request.env['product.product'].search_read(
            [('type', '=', 'consu')],
            ['id', 'name', 'list_price'],
            limit=limit
        )

        return {
            'status': 'success',
            'requested_by': user.name,
            'data': products
        }
