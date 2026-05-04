from rest_framework import serializers
from .models import HomePageSettings, Tip, Brand

class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class HomePageSettingsSerializer(serializers.ModelSerializer):
    tips = serializers.SerializerMethodField()
    brands = serializers.SerializerMethodField()

    class Meta:
        model = HomePageSettings
        fields = '__all__'

    def get_tips(self, obj):
        tips = Tip.objects.filter(is_active=True)[:3]
        return TipSerializer(tips, many=True).data

    def get_brands(self, obj):
        brands = Brand.objects.filter(is_active=True)
        return BrandSerializer(brands, many=True).data
