# スクリプトコマンド一覧

## 開発・ビルド関連

    • npm run dev

開発サーバーを起動します。通常、http://localhost:3000でアプリケーションが動作します。

    • npm run build

アプリケーションを本番ビルドします。

    • npm run start

本番ビルド後のアプリケーションを起動します。

## コード管理

    • npm run lint

ESLintを使用してコードの静的解析を実行します。

    • npm run fix

ESLintとPrettierを使用してコードをフォーマットし、問題を自動修正します。

## テスト関連

    • npm run test

Jestを使用してユニットテストを実行します。

    • npm run test:e2e

PlaywrightでE2Eテストを実行します。

    • npm run test:ui

PlaywrightのインタラクティブUIを開いて、E2Eテストを選択・実行します。

    • npm run test:codegen

npm run devで開発サーバーを起動し、Playwrightのcodegenツールでテストを記録します。テストのコードを自動生成する際に便利です。

## その他

    • npm run prepare

Huskyのセットアップを実行します。コミット時のコードチェックを自動化するための設定です。

## test関連のコマンドについて

Push時にCircleCIが自動実行し、テストの品質管理が行われます。CircleCI設定ファイルに記述された条件に従い、JestおよびPlaywrightテストが実行されます。

## CircleCI設定について

    • プロジェクトにプッシュされるたびに、CircleCIが自動的にテストを実行します。
    • testコマンドやtest:e2eの実行結果は、CircleCIのインターフェースから確認できます。
