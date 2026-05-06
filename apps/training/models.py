from django.db import models

class RestrictedMaterials(models.Model):
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS', verbose_name="Título")
    description = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Descrição")
    content = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Conteúdo Adicional")
    audience_type = models.CharField(max_length=30, db_collation='Latin1_General_CI_AS', verbose_name="Tipo de Público")
    is_active = models.BooleanField(verbose_name="Ativo")
    published_at = models.DateTimeField(blank=True, null=True, verbose_name="Data de Publicação")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='restricted_materials_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='restricted_materials_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'restricted_materials'
        verbose_name = "Material de Treinamento"
        verbose_name_plural = "Materiais de Treinamento"

    def __str__(self):
        return self.title

class RestrictedFiles(models.Model):
    restricted_material = models.ForeignKey(RestrictedMaterials, models.CASCADE, related_name='files', verbose_name="Material", db_constraint=False)
    title = models.CharField(max_length=150, verbose_name="Título do Arquivo")
    file_upload = models.FileField(upload_to='training/files/', verbose_name="Arquivo (Upload)")
    sort_order = models.IntegerField(default=0, verbose_name="Ordem de Exibição")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'restricted_files'
        verbose_name = "Arquivo do Treinamento"
        verbose_name_plural = "Arquivos do Treinamento"

class RestrictedVideos(models.Model):
    restricted_material = models.ForeignKey(RestrictedMaterials, models.CASCADE, verbose_name="Material", db_constraint=False)
    title = models.CharField(max_length=150, verbose_name="Título do Vídeo")
    video_url = models.CharField(max_length=500, blank=True, null=True, verbose_name="URL Externa (opcional)")
    video_file = models.FileField(upload_to='training/videos/', blank=True, null=True, verbose_name="Arquivo de Vídeo (Upload)")
    sort_order = models.IntegerField(default=0, verbose_name="Ordem de Exibição")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'restricted_videos'
        verbose_name = "Vídeo do Treinamento"
        verbose_name_plural = "Vídeos do Treinamento"

class RestrictedMaterialRoles(models.Model):
    restricted_material = models.ForeignKey(RestrictedMaterials, models.DO_NOTHING)
    role = models.ForeignKey('users.Roles', models.DO_NOTHING)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'restricted_material_roles'
        unique_together = (('restricted_material', 'role'),)
