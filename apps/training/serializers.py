from rest_framework import serializers
from .models import RestrictedMaterials, RestrictedFiles, RestrictedVideos

class RestrictedFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedFiles
        fields = ['id', 'title', 'sort_order', 'upload']

class RestrictedVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedVideos
        fields = ['id', 'title', 'video_url', 'sort_order']

class RestrictedMaterialsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedMaterials
        fields = ['id', 'title', 'description', 'audience_type', 'is_active', 'published_at']

class RestrictedMaterialsDetailSerializer(serializers.ModelSerializer):
    files = RestrictedFilesSerializer(source='restrictedfiles_set', many=True, read_only=True)
    videos = RestrictedVideosSerializer(source='restrictedvideos_set', many=True, read_only=True)

    class Meta:
        model = RestrictedMaterials
        fields = '__all__'
