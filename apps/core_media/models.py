from django.db import models

class Uploads(models.Model):
    original_name = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS')
    file_name = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS')
    file_path = models.CharField(max_length=500, db_collation='Latin1_General_CI_AS')
    file_extension = models.CharField(max_length=20, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    mime_type = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    file_size_bytes = models.BigIntegerField(blank=True, null=True)
    created_at = models.DateTimeField()
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'uploads'

    def __str__(self):
        return self.original_name