# Generated by Django 5.0.3 on 2024-04-28 06:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_rating'),
    ]

    operations = [
        migrations.CreateModel(
            name='genreRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=200)),
                ('rating', models.FloatField()),
                ('gmovie_name', models.CharField(max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user')),
            ],
        ),
    ]
