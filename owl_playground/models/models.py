from odoo import models, fields, api, _


class SaleOrder(models.Model):
    _inherit = 'sale.order'
    color_number = fields.Integer(string="Color Category")
