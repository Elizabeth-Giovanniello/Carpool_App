# Generated by Django 4.0.3 on 2022-03-26 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='departure_time',
            field=models.IntegerField(),
        ),
    ]
