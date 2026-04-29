from django.db import models

class RestrictedMaterials(models.Model):
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    description = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True)
    content = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True)
    audience_type = models.CharField(max_length=30, db_collation='Latin1_General_CI_AS')
    is_active = models.BooleanField()
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='restricted_materials_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='restricted_materials_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'restricted_materials'

    def __str__(self):
        return self.title

class RestrictedFiles(models.Model):
    restricted_material = models.ForeignKey(RestrictedMaterials, models.DO_NOTHING)
    upload = models.ForeignKey('core_media.Uploads', models.DO_NOTHING)
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'restricted_files'

class RestrictedVideos(models.Model):
    restricted_material = models.ForeignKey(RestrictedMaterials, models.DO_NOTHING)
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    video_url = models.CharField(max_length=500, db_collation='Latin1_General_CI_AS')
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'restricted_videos'

class RestrictedMaterialRoles(models.Model):
    restricted_material = models.ForeignKey(RestrictedMaterials, models.DO_NOTHING)
    role = models.ForeignKey('users.Roles', models.DO_NOTHING)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'restricted_material_roles'
        unique_together = (('restricted_material', 'role'),)
