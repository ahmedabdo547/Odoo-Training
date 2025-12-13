import jwt
import datetime


class JwtUtil:
    @staticmethod
    def _get_secret(env):
        return env['ir.config_parameter'].sudo().get_param('jwt.secret.key', 'my_default_secret_key_123')

    @staticmethod
    def generate_token(env, user_id):
        secret = JwtUtil._get_secret(env)
        payload = {
            'user_id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow(),
        }
        token = jwt.encode(payload, secret, algorithm='HS256')
        return token

    @staticmethod
    def validate_token(env, token):
        secret = JwtUtil._get_secret(env)
        try:
            payload = jwt.decode(token, secret, algorithms='HS256')
            return payload['user_id']
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return False
