# Generated by Django 4.0.3 on 2022-03-16 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0002_rename_user_car_owner_car_color_car_license_plate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='color',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='car',
            name='license_plate',
            field=models.CharField(max_length=10),
        ),
    ]