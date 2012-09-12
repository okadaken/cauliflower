// ここはこれから追加されるはず Toolbox.
Blockly.MSG_VARIABLE_CATEGORY = '変数';
Blockly.MSG_PROCEDURE_CATEGORY = '関数';
Blockly.MSG_EVENT_CATEGORY = 'イベント関数';
Blockly.MSG_MYDOCUMENT_CATEGORY = 'HTML'

// 日本語化終了 Context menus.
Blockly.MSG_DUPLICATE_BLOCK = '複製';
Blockly.MSG_REMOVE_COMMENT = 'コメントを削除';
Blockly.MSG_ADD_COMMENT = 'コメントを追加';
Blockly.MSG_EXTERNAL_INPUTS = '不要？外部型へ変形';
Blockly.MSG_INLINE_INPUTS = '不要？：行内型へ変形';
Blockly.MSG_DELETE_BLOCK = '削除';
Blockly.MSG_DELETE_X_BLOCKS = '削除（まとめて%1個）';
Blockly.MSG_COLLAPSE_BLOCK = '折りたたむ';
Blockly.MSG_EXPAND_BLOCK = '広げる';
Blockly.MSG_DISABLE_BLOCK = '無効にする';
Blockly.MSG_ENABLE_BLOCK = '有効にする';
Blockly.MSG_HELP = 'ヘルプ';
Blockly.MSG_ALL_BLOCKS_DELETE = '全てのブロックを削除';

//日本語化終了 Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Change value:';//Opera (11.61)用のハックなので和訳しない
Blockly.MSG_NEW_VARIABLE = '新しい変数を定義する';
Blockly.MSG_NEW_VARIABLE_TITLE = '新しい変数の変数名を入力してください。';
Blockly.MSG_RENAME_VARIABLE = '変数名を変更する';
Blockly.MSG_RENAME_VARIABLE_TITLE = '変数 "%1" の新しい変数名を入力してください。';

//日本語化終了 Procedure renaming.
Blockly.MSG_NEW_PROCEDURE = 'New procedure...';//現状未使用
Blockly.MSG_NEW_PROCEDURE_TITLE = 'New procedure name:';//現状未使用
Blockly.MSG_RENAME_PROCEDURE = '一覧にない関数を新しく定義する';
Blockly.MSG_RENAME_PROCEDURE_TITLE = '新しく定義する関数の名前を入力してください。';

//日本語化終了 Control Blocks
Blockly.LANG_CATEGORY_CONTROLS = '制御';
Blockly.LANG_CONTROLS_IF_HELPURL = 'http://code.google.com/p/blockly/wiki/If_Then';
Blockly.LANG_CONTROLS_IF_TOOLTIP_1 = '条件を評価し、結果が真（成立する）なら挟んだブロックを実行します。';
Blockly.LANG_CONTROLS_IF_TOOLTIP_2 = '条件を評価し、結果が真（成立する）なら、一番上に挟んだブロックを実行します。\n' + '結果が偽（成立しない）なら、二番目に挟んだブロックを実行します。';
Blockly.LANG_CONTROLS_IF_TOOLTIP_3 = '最初の条件を評価し、結果が真（成立する）なら、一番上に挟んだブロックを実行します。\n' + '最初の条件が真（成立する）以外なら、順番に上から別の条件を評価し、\n結果が真（成立する）のところに挟んだブロックを実行します。';
Blockly.LANG_CONTROLS_IF_TOOLTIP_4 = '最初の条件を評価し、結果が真（成立する）なら、一番上に挟んだブロックを実行します。\n' + '最初の条件が真（成立する）以外なら、順番に上から別の条件を評価し、\n結果が真（成立する）のところに挟んだブロックを実行します。\n' + 'どの条件も結果が真（成立する）にならない場合は、\n最後の偽の場合に挟んであるブロックを実行します。';
Blockly.LANG_CONTROLS_IF_MSG_IF = '分岐';
Blockly.LANG_CONTROLS_IF_MSG_CONDITION = '条件';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = '別の条件';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = '偽ならば';
Blockly.LANG_CONTROLS_IF_MSG_THEN = '真ならば';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF_THEN = '次の条件が真の場合';

Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = '分岐';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP_1 = 'この右側のブロックを挟んで分岐の形を変更します。';

Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = '追加条件';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP_1 = '条件を追加する場合は、このブロックを使います。';

Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = '偽ならば';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP_1 = 'どの条件も満たさないときに実行したいブロックがある場合は、これを使います。';

Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL = 'http://code.google.com/p/blockly/wiki/Repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT = '繰り返し';
Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO = '処理';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE = '継続条件';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = '終了条件';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = '一度処理を繰り返すごとに、継続条件が真（成立する）か調べ、\n挟んだブロックを繰り返します。\n継続条件が偽（成立しない）になった段階で繰り返しは終了します。';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = '一度処理を繰り返しごとに、終了条件が偽（成立しない）か調べ、\n挟んだブロックを繰り返します。\n終了条件が真（成立する）になった段階で繰り返しは終了します。';

Blockly.LANG_CONTROLS_FOR_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOR_TITLE_COUNT = '繰り返し';
Blockly.LANG_CONTROLS_FOR_INPUT_WITH = 'カウンタ変数';
Blockly.LANG_CONTROLS_FOR_INPUT_VAR = 'i';
Blockly.LANG_CONTROLS_FOR_INPUT_FROM = '開始';
Blockly.LANG_CONTROLS_FOR_INPUT_TO = '終了';
Blockly.LANG_CONTROLS_FOR_INPUT_DO = '処理';
Blockly.LANG_CONTROLS_FOR_TOOLTIP_1 = '一度処理を繰り返すごとにカウンタ変数の値を1ずつ増加させます。\n繰り返しが終了するとカウンタ変数の値は終了に設定した値より\n1だけ大きくなることに注意してください。';

Blockly.LANG_CONTROLS_FOREACH_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOREACH_TITLE_FOREACH = '繰り返し';
Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM = '要素変数';
Blockly.LANG_CONTROLS_FOREACH_INPUT_VAR = 'element';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST = '走査対象';
Blockly.LANG_CONTROLS_FOREACH_INPUT_DO = '処理';
Blockly.LANG_CONTROLS_FOREACH_TOOLTIP_1 = '走査する対象に含まれる要素を先頭から順番に、\n要素変数の"%1"に代入しながら繰り返し処理を行います。';

Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL = 'http://en.wikipedia.org/wiki/Control_flow';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP = 'の処理にジャンプ';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = '繰り返しの後';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = '繰り返しの先頭';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = '繰り返し処理を中断して、次の処理にジャンプします。\n繰り返しの後に何も処理がない場合はプログラムが終了します。';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = 'この後の処理をスキップして、繰り返しの先頭の処理にジャンプします。';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING = '警告：\n' +
'繰り返しブロックに\n挟んで使ってください。';

//日本語化終了 Logic Blocks.
Blockly.LANG_CATEGORY_LOGIC = '論理';
Blockly.LANG_LOGIC_BOOLEAN_VALUE = '真偽値';
Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://en.wikipedia.org/wiki/Inequality_(mathematics)';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = '両辺の値が等しいときに真を返します。'
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = '両辺の値が等しくないときに真を返します。';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = '左辺の値が右辺の値より小さければ真を返します。';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = '左辺の値が右辺の値より小さいか等しければ真を返します。';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = '左辺の値が右辺の値より大きければ真を返します。.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = '左辺の値が右辺の値より大きいか等しければ真を返します。';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = 'かつ';
Blockly.LANG_LOGIC_OPERATION_OR = 'または';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = '両辺の値が真の場合に真を返します。';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = '両辺のどちらかが真の場合に真を返します。';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'でない';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP_1 = '真偽を反転させます。';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = '真';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = '偽';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1 = '真か偽を返します。';

// Math Blocks.
Blockly.LANG_CATEGORY_MATH = '数値';
Blockly.LANG_MATH_NUMBER_HELPURL = 'http://en.wikipedia.org/wiki/Number';
Blockly.LANG_MATH_NUMBER_VALUE = '数値';
Blockly.LANG_MATH_NUMBER_TOOLTIP_1 = '数値を表現したブロックです。';

Blockly.LANG_MATH_ARITHMETIC_HELPURL = 'http://en.wikipedia.org/wiki/Arithmetic';
Blockly.LANG_MATH_POW = '累乗';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD = '二数の和を計算します。';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS = '二数の差を計算します。';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY = '二数の積を計算します。';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE = '二数の商を計算します。';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER = '左辺を右辺で累乗します。';

Blockly.LANG_MATH_PARSE_TITLE1 = 'を';
Blockly.LANG_MATH_PARSE_TITLE2 = 'に変換した値';
Blockly.LANG_MATH_PARSE_TYPE_INT = '整数';
Blockly.LANG_MATH_PARSE_TYPE_FLOAT = '実数';
Blockly.LANG_MATH_PARSE_TOOLTIP_INT = '指定された文字列を整数に変換します。\n小数点以下は切り捨てられます。\n文字列が変換できない場合はNaNを返します。';
Blockly.LANG_MATH_PARSE_TOOLTIP_FLOAT = '指定された文字列を実数に変換します。\n文字列が変換できない場合はNaNを返します。';

Blockly.LANG_MATH_ISNAN_INPUT = 'が無効な数値か';
Blockly.LANG_MATH_ISNAN_TOOLTIP_1 = '指定された値が無効な数値を表わす\n特殊な数値（NaN）か調べます。\n';

Blockly.LANG_MATH_CHANGE_HELPURL = 'http://en.wikipedia.org/wiki/Negation';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE1 = '変数';
Blockly.LANG_MATH_CHANGE_TITLE_ITEM = 'x';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE2 = 'に';
Blockly.LANG_MATH_CHANGE_INPUT_BY = 'を加える';
Blockly.LANG_MATH_CHANGE_TOOLTIP_1 = '変数"%1"に指定された数値を加えます。';

Blockly.LANG_MATH_SINGLE_HELPURL = 'http://en.wikipedia.org/wiki/Square_root';
Blockly.LANG_MATH_SINGLE_OP_ROOT = 'の平方根';
Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE = 'の絶対値';
Blockly.LANG_MATH_SINGLE_OP_NEG = 'の符号を反転した値';
Blockly.LANG_MATH_SINGLE_OP_LN = 'の自然対数';
Blockly.LANG_MATH_SINGLE_OP_LOG10 = 'の常用対数';
Blockly.LANG_MATH_SINGLE_OP_EXP = 'を指数としたeの累乗';

Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT = '平方根を計算します。';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS = '絶対値を計算します。';
Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG = '符号を反転します。';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LN = '自然対数を計算します。';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10 = '常用対数を計算します。';
Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP = '自然対数の底 (e) を、指定した値を指数として累乗します。';
Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10 = 'Return 10 to the power of a number.';//Exceptionがでるので外した。
Blockly.LANG_MATH_ROUND_HELPURL = 'http://en.wikipedia.org/wiki/Rounding';
Blockly.LANG_MATH_ROUND_TOOLTIP_1 = '切り捨てや四捨五入を行います。';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUND = 'の小数点以下を四捨五入した値';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP = 'の小数点以下を切り上げた値';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN = 'の小数点以下を切り捨てた値';

Blockly.LANG_MATH_TRIG_HELPURL = 'http://en.wikipedia.org/wiki/Trigonometric_functions';
Blockly.LANG_MATH_TRIG_TOOLTIP_SIN = 'Return the sine of a degree.';
Blockly.LANG_MATH_TRIG_TOOLTIP_COS = 'Return the cosine of a degree.';
Blockly.LANG_MATH_TRIG_TOOLTIP_TAN = 'Return the tangent of a degree.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN = 'Return the arcsine of a number.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS = 'Return the arccosine of a number.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN = 'Return the arctangent of a number.';

Blockly.LANG_MATH_ONLIST_HELPURL = '';
Blockly.LANG_MATH_ONLIST_INPUT_OFLIST = 'of list';
Blockly.LANG_MATH_ONLIST_OPERATOR_SUM = 'sum';
Blockly.LANG_MATH_ONLIST_OPERATOR_MIN = 'min';
Blockly.LANG_MATH_ONLIST_OPERATOR_MAX = 'max';
Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE = 'average';
Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN = 'median';
Blockly.LANG_MATH_ONLIST_OPERATOR_MODE = 'modes';
Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV = 'standard deviation';
Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM = 'random item';
Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM = 'Return the sum of all the numbers in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN = 'Return the smallest number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX = 'Return the largest number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE = 'Return the arithmetic mean of the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN = 'Return the median number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE = 'Return a list of the most common item(s) in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV = 'Return the standard deviation of the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM = 'Return a random element from the list.';

Blockly.LANG_MATH_CONSTRAIN_HELPURL = 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29';
Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN = 'constrain';
Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW = 'between (low)';
Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH = 'and (high)';
Blockly.LANG_MATH_CONSTRAIN_TOOLTIP_1 = 'Constrain a number to be between the specified limits (inclusive).';

Blockly.LANG_MATH_MODULO_HELPURL = 'http://en.wikipedia.org/wiki/Modulo_operation';
Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND = 'remainder of';
Blockly.LANG_MATH_MODULO_TOOLTIP_1 = 'Return the remainder of dividing both numbers.';

Blockly.LANG_MATH_RANDOM_INT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_INT_TITLE_RANDOM = 'random integer';
Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM = 'from';
Blockly.LANG_MATH_RANDOM_INT_INPUT_TO = 'to';
Blockly.LANG_MATH_RANDOM_INT_TOOLTIP_1 = 'Return a random integer between the two\n' +
'specified limits, inclusive.';

Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM = 'random fraction';
Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP_1 = 'Return a random fraction between\n' +
'0.0 (inclusive) and 1.0 (exclusive).';

// Text Blocks.
Blockly.LANG_CATEGORY_TEXT = '文字列';
Blockly.LANG_TEXT_TEXT_HELPURL = 'http://en.wikipedia.org/wiki/String_(computer_science)';
Blockly.LANG_TEXT_TEXT_TOOLTIP_1 = 'A letter, word, or line of text.';

Blockly.LANG_TEXT_JOIN_HELPURL = '';
Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH = 'create text with';
Blockly.LANG_TEXT_JOIN_TOOLTIP_1 = 'Create a piece of text by joining\n' +
'together any number of items.';

Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN = 'join';
Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this text block.';

Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = 'item';
Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP_1 = 'Add an item to the text.';

Blockly.LANG_TEXT_APPEND_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_APPEND_TO = 'to';
Blockly.LANG_TEXT_APPEND_APPENDTEXT = 'append text';
Blockly.LANG_TEXT_APPEND_VARIABLE = 'item';
Blockly.LANG_TEXT_APPEND_TOOLTIP_1 = 'Append some text to variable "%1".';

Blockly.LANG_TEXT_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH = 'length';
Blockly.LANG_TEXT_LENGTH_TOOLTIP_1 = 'Returns number of letters (including spaces)\n' +
'in the provided text.';

Blockly.LANG_TEXT_ISEMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY = 'is empty';
Blockly.LANG_TEXT_ISEMPTY_TOOLTIP_1 = 'Returns true if the provided text is empty.';

Blockly.LANG_TEXT_ENDSTRING_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_ENDSTRING_INPUT = 'letters in text';
Blockly.LANG_TEXT_ENDSTRING_TOOLTIP_1 = 'Returns specified number of letters at the beginning or end of the text.';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST = 'first';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST = 'last';

Blockly.LANG_TEXT_INDEXOF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_INDEXOF_TITLE_FIND = 'find';
Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE = 'occurrence of text';
Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT = 'in text';
Blockly.LANG_TEXT_INDEXOF_TOOLTIP_1 = 'Returns the index of the first/last occurrence\n' +
'of first text in the second text.\n' +
'Returns 0 if text is not found.';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST = 'first';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST = 'last';

Blockly.LANG_TEXT_CHARAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm'
Blockly.LANG_TEXT_CHARAT_TITLE_LETTER = 'letter';
Blockly.LANG_TEXT_CHARAT_INPUT_AT = 'at';
Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT = 'in text';
Blockly.LANG_TEXT_CHARAT_TOOLTIP_1 = 'Returns the letter at the specified position.';

Blockly.LANG_TEXT_CHANGECASE_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_CHANGECASE_TITLE_TO = 'to';
Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_1 = 'Return a copy of the text in a different case.';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE = 'UPPER CASE';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE = 'lower case';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE = 'Title Case';

Blockly.LANG_TEXT_TRIM_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_TRIM_TITLE_SPACE = 'trim spaces from';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'sides';
Blockly.LANG_TEXT_TRIM_TOOLTIP_1 = 'Return a copy of the text with spaces\n' +
'removed from one or both ends.';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'sides';
Blockly.LANG_TEXT_TRIM_TITLE_SIDE = 'side';
Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH = 'both';
Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT = 'left';
Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT = 'right';

// 日本語化終了 Lists Blocks.
Blockly.LANG_CATEGORY_LISTS = '配列';
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE_1 = '空の配列を作る';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP_1 = '空の配列を作成します。';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = '配列を作る';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP_1 = '要素を指定して配列を作ります。';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = '配列';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP_1 = '指定したい要素数の分だけ要素ブロックを加えてください。';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = '要素';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP_1 = '配列の中に指定したい要素数だけ入れてください。';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_TITLE_CREATELIST = '配列を作る';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = '共通の要素';
Blockly.LANG_LISTS_REPEAT_INPIT_REPEATED = '要素の数';
Blockly.LANG_LISTS_REPEAT_INPIT_TIMES = 'times';//使っていない
Blockly.LANG_LISTS_REPEAT_TOOLTIP_1 = '同じ要素を指定した要素数だけ入れた配列を作ります。';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = 'の長さ';
Blockly.LANG_LISTS_LENGTH_TOOLTIP_1 = '配列の長さ（要素数）を取得します。';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = 'が空か';
Blockly.LANG_LISTS_TOOLTIP_1 = '配列の要素がないかどうかを調べます。';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND = 'に見つかる要素の番地';
Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE = '検索する要素';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = '検索する配列';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP_1 = '指定した配列に含まれている要素の番地を検索します。\n' + '要素が見つからない場合の結果は0となります。';
Blockly.LANG_LISTS_INDEX_OF_FIRST = '最初';
Blockly.LANG_LISTS_INDEX_OF_LAST = '最後';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_TITLE = '配列から取得した要素';
Blockly.LANG_LISTS_GET_INDEX_INPUT_AT = '番地';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = '配列';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_1 = '番地を指定して配列の要素を取得します。';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_TITLE = '配列に要素を代入';
Blockly.LANG_LISTS_SET_INDEX_INPUT_AT = '番地';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = '配列';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = '要素';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1 = '指定した番地に要素を代入します。';

//日本語化終了 Variables Blocks.

Blockly.LANG_VARIABLES_IS_UNDEFINED_INPUT = 'が未定義値か';
Blockly.LANG_VARIABLES_IS_UNDEFINED_TOOLTIP1 = '指定された値がundefined（未定義値）かどうか調べます。\n==の演算子を使っているので、値がnullの場合も真と判定される\nことに気をつけてください。';

Blockly.LANG_VARIABLES_GET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_GET_TITLE_1 = '変数';
Blockly.LANG_VARIABLES_GET_TITLE_2 = 'の値';
Blockly.LANG_VARIABLES_GET_ITEM = 'x';
Blockly.LANG_VARIABLES_GET_TOOLTIP_1 = '変数に格納されている値を取得します。';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_SET_TITLE_1 = '変数';
Blockly.LANG_VARIABLES_SET_TITLE_2 = 'に代入';
Blockly.LANG_VARIABLES_SET_ITEM = 'x';
Blockly.LANG_VARIABLES_SET_TOOLTIP_1 = '変数に値を代入します。';

// 日本語化終了 Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'procedure';
Blockly.LANG_PROCEDURES_DEFNORETURN_PREFIX = '関数';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = '定義';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP_1 = '戻り値のない関数を定義します。';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = '戻り値';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP_1 = '戻り値のある関数を定義します。';

Blockly.LANG_PROCEDURES_DEF_ARGS = '引数：'
Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = '警告：\n' +
'引数の変数名が重複しています。';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = 'を実行する';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = 'procedure';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP_1 = '戻り値のない関数を実行します。';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = 'を実行して戻り値を得る';
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP_1 = '戻り値のある関数を実行します。';

Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = '引数の定義';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = '変数：';

Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = '関数定義をハイライトする';

// HTML Blocks. 直接書いているのはなるべく外部化すること。

Blockly.LANG_MYDOCUMENT_WRITE_TITLE = 'ページに出力する';
Blockly.LANG_MYDOCUMENT_WRITE_TOOLTIP_1 = 'スクリプト要素が呼び出された場所に、指定した内容\nを出力します（内容は文字列に変換されます）。\nこの命令が実行される前に読み込まれたコンテンツは削除されます。\nページにコンテンツに追加する場合は、innerHTML\nプロパティなどを使います。';

Blockly.LANG_MYDOCUMENT_DIRECT_TITLE = 'ページが読み込まれたら実行する';
Blockly.LANG_MYDOCUMENT_DIRECT_DO = '処理';
Blockly.LANG_MYDOCUMENT_DIRECT_TOOLTIP_1 = 'scriptタグが読み込まれたタイミングで\n指定した処理を実行します。';

Blockly.LANG_MYDOCUMENT_ONLOAD_TITLE = 'ページの読み込み完了後に実行する';
Blockly.LANG_MYDOCUMENT_ONLOAD_DO = '処理';
Blockly.LANG_MYDOCUMENT_ONLOAD_TOOLTIP_1 = 'ページの全ての要素の読み込みが完了するのを待ってから\n指定した処理を実行します。';
Blockly.LANG_MYDOCUMENT_ONLOAD_WARNING = '警告：\n' +
'このブロックを2つ以上配置すると\n意図と異なる動作をする可能性があります。';

Blockly.LANG_MYDOCUMENT_PRINT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_MYDOCUMENT_PRINT_TITLE_PRINT = 'ダイアログを表示して待つ';
Blockly.LANG_MYDOCUMENT_PRINT_TOOLTIP_1 = '指定された内容のダイアログウィンドウを表示します。';

Blockly.LANG_MYDOCUMENT_PROMPT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html';
Blockly.LANG_MYDOCUMENT_PROMPT_TITLE1 = 'プロンプト';
Blockly.LANG_MYDOCUMENT_PROMPT_TITLE2 = 'に入力された';
Blockly.LANG_MYDOCUMENT_PROMPT_TOOLTIP_1 = '指定された内容でプロンプトを表示します。';
Blockly.LANG_MYDOCUMENT_PROMPT_TYPE_TEXT = '文字列';
Blockly.LANG_MYDOCUMENT_PROMPT_TYPE_NUMBER = '数値';
