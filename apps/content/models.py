from django.db import models

class Pages(models.Model):
    slug = models.CharField(unique=True, max_length=100, db_collation='Latin1_General_CI_AS')
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    summary = models.CharField(max_length=500, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    content = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True)
    banner_image_url = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    is_active = models.BooleanField()
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='pages_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='pages_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pages'

    def __str__(self):
        return self.title

class Brands(models.Model):
    name = models.CharField(max_length=120, db_collation='Latin1_General_CI_AS')
    description = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True)
    external_link = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    image_url = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    is_active = models.BooleanField()
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='brands_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='brands_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'brands'

    def __str__(self):
        return self.name

class Stores(models.Model):
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    description = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True)
    city = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    state = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    address_text = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    contact_info = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    is_active = models.BooleanField()
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='stores_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='stores_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stores'

    def __str__(self):
        return self.title

class Tips(models.Model):
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    slug = models.CharField(unique=True, max_length=160, db_collation='Latin1_General_CI_AS')
    summary = models.CharField(max_length=500, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    content = models.TextField(db_collation='Latin1_General_CI_AS')
    image_url = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    is_active = models.BooleanField()
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='tips_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='tips_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tips'

    def __str__(self):
        return self.title
