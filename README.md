# 理view

## 概要
+ 東京理科大学学生用講義レビューアプリ
+ Reactを勉強し始めたのでアウトプットとして制作
+ URL：https://riviewapp.netlify.app/

## 使用技術
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white)

## 機能
+ Googleログイン・ログアウト
+ 講義レビュー一覧表示
+ 講義レビュー投稿
+ 講義レビュー詳細表示
+ レスポンシブ対応

## 動作画面
https://github.com/user-attachments/assets/2a94805e-e2f7-4bc2-9b81-208e3b76b366

## 課題
+ 検索機能の追加
  - 講義名の一部を検索で掛けられるようにする
  - 時限・教授名での検索
+ Azureを使用したAuth認証
  - 大学で使うメールがOutlookであるため
+ ユーザーによって講義が重複してしまう
  - 投稿時に同じ科目名があれば警告する
  - レビューに別ユーザーのレビューも投稿できるようにする
+ ブックマーク機能の追加
  - 簡易版シラバスとして作ったため、気軽に気になる講義を見つけてもらう
