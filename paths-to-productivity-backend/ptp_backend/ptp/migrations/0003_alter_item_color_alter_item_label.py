# Generated by Django 4.0.4 on 2022-05-29 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ptp', '0002_alter_item_related_items'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='color',
            field=models.CharField(blank=True, max_length=7, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(max_length=40),
        ),
    ]
