# Generated by Django 4.0.3 on 2022-03-26 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0002_alter_trip_departure_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='departure_time',
            field=models.BigIntegerField(),
        ),
    ]
