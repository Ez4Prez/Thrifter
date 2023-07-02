"""order id

Revision ID: f002b853d548
Revises: a91915910979
Create Date: 2023-07-02 13:23:34.751962

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f002b853d548'
down_revision = 'a91915910979'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('order_id', sa.Integer(), nullable=False))
        batch_op.drop_column('sale_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sale_id', sa.INTEGER(), nullable=False))
        batch_op.drop_column('order_id')

    # ### end Alembic commands ###
