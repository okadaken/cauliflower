----------------------------------
このフォルダの使い方
2012/8/12
by okadaken( okadaken@gmail.com )
----------------------------------

ここにはBlockly（Javascriptブロックエディタ）を整理したものが入ってます。
各フォルダの役割は以下の通り。

・base
	blocklyの主要ファイルである blockly_[un]compressed.jsをビルドするためのファイル群が入っている。
	ビルドは base/build.py を実行すること。（要Python環境。2.6以降？）
	（一度 js ファイルをビルドしてしまえば、このbaseフォルダは必要ないかも知れない）
	元々はBlocklyのルートパスに入っていたファイル群。

・ext
	jsファイル以外でblocklyが主に使うファイル。cssや音声・画像ファイル。
	ここへのパスは、base/blockly.js と base/inject.js 内のハードコードによって決定される。
	もしパスを変えるならばこの両者を書き換えた上で再ビルドすること。

・extlib
	その他のjavascriptライブラリを入れるための場所。
	index.htmlやframe.htmlから指定している。
	
・generators
	javascriptコードをgenerateするのに使うライブラリ群。
	frame.htmlからロードする。

・language
	javascriptタイルを英語以外の言語（日本語や台湾語）として表示させるためのライブラリ群。
	基本は language/common を使い、必要なところだけ差分ファイルを作る。
	frame.htmlからロードする。

