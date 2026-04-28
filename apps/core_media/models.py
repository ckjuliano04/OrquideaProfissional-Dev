from django.db import models

class Uploads(models.Model):
    original_name = models.CharField(max_length=510)
    file_name = models.CharField(max_length=510)
    file_path = models.CharField(max_length=1000)
    file_extension = models.CharField(max_length=40, blank=True, null=True)
    mime_type = models.CharField(max_length=200, blank=True, null=True)
    file_size_bytes = models.BigIntegerField(blank=True, null=True)
    created_at = models.DateTimeField()
    # Importante: ForeignKey para Users legados
    created_by_user_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'uploads'