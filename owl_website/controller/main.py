from odoo import http
from odoo.http import request

class Main(http.Controller):
    @http.route("/custom/owl",type="http",auth="public",website="True")
    def owl_custom(self,**kw):
        template_id="owl_website.custom_owl_page"
        print("ok")
        return request.render(template_id)