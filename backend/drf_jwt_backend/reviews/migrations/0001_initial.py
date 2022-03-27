# Generated by Django 4.0.3 on 2022-03-24 15:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_driver', models.BooleanField(default=False)),
                ('rating', models.FloatField()),
                ('comment', models.CharField(max_length=750)),
                ('review_recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Review_Recipient', to=settings.AUTH_USER_MODEL)),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Reviewer', to=settings.AUTH_USER_MODEL)),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trips.trip')),
            ],
        ),
    ]
