Cauliflower Project
======================

Cauliflowerとは？
------

JavaScriptプログラミングの入門教育を支援するオンラインエディタ

------

基礎的なHTMLをHTMLタグで記述することができ、JavaScriptの学習をはじめようとしているプログラミングの未経験者

UIと機能設計の意図
------

プログラミングの未経験者が、テキストエディタとブラウザ、IDEなどを利用し、JavaScriptプログラミングを円滑に学習できるようなScaffoldingを行うことをねらいしたJavaScriptエディタです。**最後の最後までCauliflowerで学習をすることは想定していません。**

ねらいとしたScaffoldingは次の２点で、これらを踏まえたUIと機能設計を行っています。また、Cauliflowerを卒業して、本来の目標であるテキストエディタとブラウザ、その他のIDE等を使った（テキストによる）JavaScriptプログラミングに移行しやすいように、Fadingに関しても考慮をしています。

### Scaffolding #1 プログラミングの基礎概念理解とJavaScriptによる表現

 （オブジェクト指向を除く）プログラミングの基礎概念の理解と、それらの概念を使って自分で考えたアルゴリズムがJavaScriptによってどのように表現できるかを理解する

 - 教師がプログラミングの基礎概念や動作結果について説明する際には、言葉や図解を利用します。JavaScriptを編集するエディタ上で可能なように、Google Blocklyをベースにしたブロックエディタを採用しています。ブロックの表記はプログラム上で使われている概念が理解でき、動作結果が予測しやすいように、説明的な日本語表記としてあります。これは日本語プログラミングを採用しているという訳ではなく、ブロックと日本語によるJavaScriptのコードインサイト機能の一種であると考えています。

 - ブロックで作成したプログラムから生成されるJavaScriptのコードは同一の画面にリアルタイムに表示されます。また、ブロックの編集によって変更された部分のJavaScriptが確認しやすいようにUIを設計してあります。これにより、プログラムにおける重要概念（変数、論理演算、制御構造等）をどのようにJavaScriptで表現すべきか、自分の考えたアルゴリズムをJavaScriptで記述する場合はどのようになるのかを学習しながらアルゴリズムを考えて実装することができます。

 - プログラミングの初学者はJavaScriptの文法規則に関する理解が十分でないため、テキストエディタを使ってプログラムを記述すると、構文エラーに悩まされます。構文エラーを解決するプロセスもプログラミングの重要な学習事項の一つではありますが、構文エラーを起こさないようにすることのみが学習目標になってしまい、アルゴリズムを考える段階まで到達するのに時間がかかります。プログラミング学習の初期段階において、言語の文法を覚えつつ、アルゴリズムを考えるという２つのことを同時にすることは、それそれの学習に悪影響を与えると考えています。ブロックエディタを使うことで構文エラーの発生を防ぎ、プログラムの基礎概念とJavaScriptでの表現方法を段階的に習得できると考えています。学習の初期段階において、**アルゴリズムを考えることがプログラミングの本質であり、言語の文法規則を習得することではない**と理解してもらうことがScaffoldingとして重要だと考えています。

### Scaffolding #2 JavaScriptの仕組みの基礎理解と作業プロセスへの慣れ

HTMLとJavaScriptがどのように連携して動作するかの仕組みの理解と、（Cauliflowerを利用しない場合のより汎用的な）JavaScript開発の作業プロセスを理解する

 - HTMLのDOM要素をJavaScriptから参照したり、イベントによってJavaScriptの関数呼び出しを行えるといったHTMLとJavaScriptの連携の本質的な理解がしやすいように設計されています。HTMLで呼び出しを行っている関数名をもった関数定義のためのブロックが自動的にエディタに表示されたり、HTMLの要素ID一覧がブロックの引数として表示されるという機能を付加しています。これにより、関数名やIDなどの名前をキーとして、HTMLとJavaScriptの相互連携が行えるということを直感的に理解できます。しかし、HTMLの中で参照している関数名を変更しても、すでにブロックエディタ上で定義された関数名は変更されない等、HTMLエディタとブロックエディタ間の連携はわざと不完全に設計してあります。2つのエディタが完全に自動で連携する機能を付けることは、テキストエディタを使って関数名やIDを自由に（間違いなく）記述する作業とのギャップが大きくなってしまいます。テキストエディタとブラウザ、IDEなどの開発環境とのギャップが大きくなりすぎ、Cauliflowerから卒業しにくくならないように、Scaffoldingの重要概念であるFadingについても考慮してエディタが持つ機能を設計してあります。

 - Cauliflower自体がWebアプリケーションとして実装されているため、自分が作ったJavaScriptプログラムとCauliflower本体の区別が分かりにくいという欠点があります。そこで、作成したプログラムを実行する際には、別のウィンドウを表示させ、実行しているプログラムのソースと実行結果を合わせて表示するようにしてあります。これにより、自分が作成したJavaScriptプログラムを実行しているのはWebブラウザであり、プログラムのソースを編集した場合は、最新の結果をブラウザに読み込ませて実行結果を確認するという、テキストエディタとブラウザを使ったJavaScriptの開発プロセスに似せるように設計してあります。また、その実行結果を確認するウィンドウからは、ソースをHTMLファイルとして書き出せる機能が備わっています。Cauliflowerから次の段階の環境環境に移行する際には、この機能を使って書きだした（Cauliflowerを使って作った）ソースを、Emacsなどのテキストエディタで開くことから始められるような設計としてあります。

関連URL
------

Demo URL: [http://okaken.sakura.ne.jp/cauliflower/](http://okaken.sakura.ne.jp/cauliflower/)

Support Target: [http://ipl.sfc.keio.ac.jp/text/pro-2012-4/%E3%83%9B%E3%83%BC%E3%83%A0/](http://ipl.sfc.keio.ac.jp/text/pro-2012-4/%E3%83%9B%E3%83%BC%E3%83%A0/) 

利用している外部ライブラリとバージョン
------

* [http://jquery.com/](http://jquery.com/) v1.7.2
* [http://jqueryui.com/home](http://jqueryui.com/home) v1.8.22
* [http://code.google.com/p/google-diff-match-patch/](http://code.google.com/p/google-diff-match-patch/) diff_match_patch_20120106.zip 
* [http://codemirror.net/](http://codemirror.net/) v2.32
* [http://github.com/dcneiner/Downloadify](https://github.com/dcneiner/Downloadify) v0.2.1 Jan 23, 2010