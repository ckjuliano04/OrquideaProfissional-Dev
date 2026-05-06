from rest_framework import serializers
from .models import RestrictedMaterials, RestrictedFiles, RestrictedVideos

class RestrictedFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedFiles
        fields = ['id', 'title', 'sort_order', 'file_upload']

class RestrictedVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedVideos
        fields = ['id', 'title', 'video_url', 'video_file', 'sort_order']

class RestrictedMaterialsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestrictedMaterials
        fields = ['id', 'title', 'description', 'audience_type', 'is_active', 'published_at']

class RestrictedMaterialsDetailSerializer(serializers.ModelSerializer):
    files = RestrictedFilesSerializer(many=True, read_only=True)
    videos = RestrictedVideosSerializer(source='restrictedvideos_set', many=True, read_only=True)

    class Meta:
        model = RestrictedMaterials
        fields = ['id', 'title', 'description', 'content', 'audience_type', 'is_active', 'published_at', 'files', 'videos']
