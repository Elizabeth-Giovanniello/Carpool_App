# Generated by Django 4.0.3 on 2022-03-24 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar_color',
            field=models.CharField(default='white', max_length=15),
            preserve_default=False,
        ),
    ]
