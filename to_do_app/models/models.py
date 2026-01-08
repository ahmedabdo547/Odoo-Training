from odoo import fields, models, api


class TaskTodo(models.Model):
    _name = 'task.todo'

    name = fields.Char('Task Name', required=True)
    is_done = fields.Boolean('Is Done?')
