# Generated by Django 4.0.4 on 2022-05-28 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=40, unique=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('color', models.CharField(default='#CD6211', max_length=7)),
                ('link', models.URLField(blank=True, null=True)),
                ('contributor', models.CharField(blank=True, max_length=40, null=True)),
                ('related_items', models.ManyToManyField(blank=True, null=True, to='ptp.item')),
            ],
        ),
    ]
