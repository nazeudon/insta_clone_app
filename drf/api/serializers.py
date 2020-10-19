from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # 現在アクティブなUserモデルを取得できる。
        # 今回であれば、カスタムしたUserモデル
        model = get_user_model()
        fields = ("id", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # validated_data -> validation後の辞書型データ
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    # defaultの日時表記は読みにくいので、フォーマットをカスタムする
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Profile
        fields = ("id", "nickName", "userProfile", "created_on", "img")
        extra_kwargs = {"userProfile": {"read_only": True}}


class PostSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "userPost", "created_on", "img", "liked")
        extra_kwargs = {"userPost": {"read_only": True}}


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id", "text", "userComment", "post")
        extra_kwargs = {"userComment": {"read_only": True}}
