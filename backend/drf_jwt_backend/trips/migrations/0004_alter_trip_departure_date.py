# Generated by Django 4.0.3 on 2022-03-26 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0003_alter_trip_departure_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='departure_date',
            field=models.BigIntegerField(),
        ),
    ]
