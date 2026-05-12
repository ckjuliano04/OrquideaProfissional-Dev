from rest_framework import serializers

from .models import Stores, Tips


class StoreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stores
        fields = [
            "id",
            "title",
            "description",
            "city",
            "state",
            "address_text",
            "latitude",
            "longitude",
            "contact_info",
            "email",
        ]


class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tips
        fields = ["id", "title", "slug", "summary", "content", "image", "published_at"]
