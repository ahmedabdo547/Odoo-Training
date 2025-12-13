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

        try:
            uid = request.session.authenticate(request.db, login, password)

            if not uid:
                return {'status': 'error', 'message': 'Invalid Credentials'}

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
