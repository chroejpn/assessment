'use strict'; //厳格モード起動
const userNameInput    = document.getElementById('user-name');  //名前入力欄
const assessmentButton = document.getElementById('assessment'); //診断開始ボタン
const resultDivision   = document.getElementById('result-area');//診断結果
const tweetDivision    = document.getElementById('tweet-area'); //ツイートボタン

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if(userName.length === 0 ){
      return;
    }
    console.log(assessment(userName));

    //診断結果エリア
    resultDivision.innerText = ''; //divタグの中を空に
    const header = document.createElement('h3'); //h3タグ作成
    header.innerText = '診断結果'; //タグ内のテキストを設定
    resultDivision.appendChild(header); //divタグの子要素として追加

    const paragraph = document.createElement('p'); //pタグを作成
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    //ツイートエリアを作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a')
    const hrefValue = 
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいとこお教えします...') +
      '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', "twitter-hashtag-button");
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'あなたのいいとこをXに投稿する'

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    tweetDivision.appendChild(script);
  }
)
userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

const answers = [
  //以下教材通りの項目
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  //以下AIにより生成された項目
  '###userName###のいいところは笑顔です。###userName###の笑顔を見ると、みんなが幸せな気持ちになります。',
  '###userName###のいいところは優しさです。###userName###の温かい雰囲気は、周囲の人々を和ませてくれます。',
  '###userName###のいいところは発想力です。###userName###が思いつくアイデアは、世界を面白く変えていきます。',
  '###userName###のいいところは勇気です。困難に立ち向かう###userName###の姿に、多くの人が励まされています。',
  '###userName###のいいところは誠実さです。###userName###の嘘のない態度は、多くの人から深い信頼を集めています。',
  '###userName###のいいところはユーモアです。###userName###の言葉で、場がパッと明るくなり、笑顔が生まれます。',
  '###userName###のいいところは聞き上手なところです。###userName###に話を聞いてもらうだけで、心が軽くなる人がいます。',
  '###userName###のいいところは直感です。###userName###の鋭い勘は、自分だけでなく周りの人も正しい道へ導きます。',
  '###userName###のいいところは継続力です。コツコツと努力を重ねる###userName###の姿は、誰にも真似できない強さです。',
  '###userName###のいいところは包容力です。どんなことも受け止めてくれる###userName###の器の大きさに、皆が救われています。',
  '###userName###のいいところは無邪気さです。子供のような純粋な心を持つ###userName###と一緒にいると、誰もが心を洗われます。',
  '###userName###のいいところはチャレンジ精神です。失敗を恐れずに挑む###userName###の姿が、仲間の背中を押しています。',
  '###userName###のいいところは繊細さです。細やかなことに気づける###userName###だからこそ、作れる空気感があります。',
  '###userName###のいいところは判断力です。迷いなく道を選ぶ###userName###のスピード感が、チームを前進させます。',
  '###userName###のいいところはポジティブさです。どんな状況でも光を見つけ出す###userName###に、皆が希望を感じています。',
  '###userName###のいいところは潔さです。終わったことをくよくよ悩まない###userName###の切り替えの早さに、皆が憧れます。',
  '###userName###のいいところは落ち着きです。どんなトラブルが起きても動じない###userName###がいるだけで、場が安心感に包まれます。',
  '###userName###のいいところは柔軟性です。状況に合わせて変化できる###userName###のしなやかさが、多くの問題を解決します。',
  '###userName###のいいところは愛嬌です。###userName###がいるだけで、周りの空気がパッと明るくなります。',
  '###userName###のいいところは責任感です。最後までやり遂げる###userName###の姿勢に、皆が信頼を寄せています。',
  '###userName###のいいところは素直さです。変なプライドを持たずに吸収する###userName###は、ものすごい速さで成長します。',
  '###userName###のいいところは集中力です。ゾーンに入ったときの###userName###の作業スピードには、誰も追いつけません。',
  '###userName###のいいところは記憶力です。些細なことまで覚えている###userName###に、驚かされる人がたくさんいます。',
  '###userName###のいいところは手際の良さです。###userName###が段取りを組めば、どんな難しいプロジェクトもスムーズに進みます。',
  '###userName###のいいところは遊び心です。###userName###は退屈な日常の中に、面白いことを見つける天才です。',
  '###userName###のいいところは謙虚さです。実力があるのに偉ぶらない###userName###の姿勢が、さらなる成功を呼び寄せます。',
  '###userName###のいいところは芯の強さです。周りに流されない###userName###の生き様は、とてもかっこいいです。',
  '###userName###のいいところは影響力です。###userName###の一言には、人を動かす不思議なパワーがあります。',
  '###userName###のいいところはサービス精神です。人を喜ばせようとする###userName###の工夫に、皆が感動しています。',
  '###userName###のいいところは清潔感です。身だしなみを整えている###userName###からは、いつも爽やかな風が吹いています。',
  '###userName###のいいところはバランス感覚です。攻めと守りを使い分ける###userName###のセンスは抜群です。',
  '###userName###のいいところは明るさです。落ち込んでいるときも、###userName###に会えば元気をもらえます。',
  '###userName###のいいところは分析力です。感情論だけでなく、事実に基づいて考える###userName###の意見は常に的確です。',
  '###userName###のいいところは計画性です。未来を見据えて準備する###userName###は、どんなトラブルも回避できます。',
  '###userName###のいいところは許す力です。失敗を責めずにチャンスをくれる###userName###に、救われる人がいます。',
  '###userName###のいいところは義理堅さです。受けた恩を忘れない###userName###は、多くの人から愛され続けます。',
  '###userName###のいいところは気前の良さです。自分だけでなく周りにも還元する###userName###の周りには、人が集まります。',
  '###userName###のいいところは頼りがいがあるところです。困ったときに真っ先に顔が浮かぶのが###userName###です。',
  '###userName###のいいところは運の良さです。ここぞという時にチャンスを掴む###userName###は、持っています。',
  '###userName###のいいところはひたむきさです。まっすぐに努力する###userName###を見て、心を打たれない人はいません。',
  '###userName###のいいところは探求心です。わからないことをそのままにしない###userName###の知識量は圧倒的です。',
  '###userName###のいいところは協調性です。チームの輪を乱さずに成果を出す###userName###は、組織の宝です。',
  '###userName###のいいところは創造性です。###userName###が生み出す作品やアイデアは、唯一無二の輝きを放っています。',
  '###userName###のいいところは統率力です。###userName###が旗を振れば、皆が迷わずに同じ方向へ進めます。',
  '###userName###のいいところは意外性です。見た目や普段の言動とのギャップに、多くの人が###userName###の虜になります。',
  '###userName###のいいところは忍耐強さです。すぐに結果が出なくても腐らない###userName###は、大器晩成型です。',
  '###userName###のいいところは多角的な視点です。他の人が気づかない死角に気づく###userName###は、リスク管理の天才です。',
  '###userName###のいいところは情報収集力です。流行や新しいニュースに敏感な###userName###の話は、いつも面白いです。',
  '###userName###のいいところは語彙力です。###userName###の選び取る言葉の美しさに、聞き惚れる人がいます。',
  '###userName###のいいところは諦めない心です。どんなに高い壁でも乗り越えようとする###userName###は、主人公のような輝きがあります。',
  '###userName###のいいところは正義感です。間違っていることにNOと言える###userName###の勇気は、皆の模範です。',
  '###userName###のいいところは立ち振る舞いです。ふとした仕草が美しい###userName###は、遠くからでも目立ちます。',
  '###userName###のいいところは几帳面さです。細部までこだわる###userName###の仕事は、完璧なクオリティです。',
  '###userName###のいいところは楽観的なところです。「なんとかなる」と笑う###userName###に、張り詰めた空気が緩みます。',
  '###userName###のいいところは冒険心です。安定よりもワクワクを選ぶ###userName###の人生は、物語のように刺激的です。',
  '###userName###のいいところは癒やしのオーラです。###userName###のそばにいると、マイナスイオンを浴びたようにリラックスできます。',
  '###userName###のいいところは信頼感です。口が堅く、約束を守る###userName###には、誰もが秘密を打ち明けたくなります。',
  '###userName###のいいところはスピード感です。思い立ったら即行動する###userName###は、チャンスを逃しません。',
  '###userName###のいいところは親しみやすさです。初対面の人ともすぐに仲良くなれる###userName###は、天性の人たらしです。',
  '###userName###のいいところは気品です。育ちの良さを感じさせる###userName###の雰囲気は、一目置かれています。',
  '###userName###のいいところは察する力です。言葉にしなくても相手の気持ちを汲み取る###userName###は、最高のパートナーです。',
  '###userName###のいいところは応援する力です。###userName###に「頑張れ」と言われると、普段以上の力が出せます。',
  '###userName###のいいところは夢を語る姿です。大きな夢に向かって走る###userName###を見て、自分も頑張ろうと思える人がいます。',
  '###userName###のいいところはミステリアスなところです。私生活が見えない###userName###のことが、みんな知りたくてたまりません。',
  '###userName###のいいところは食べっぷりです。美味しそうにご飯を食べる###userName###を見ていると、みんなも元気になります。',
  '###userName###のいいところは教え上手なところです。###userName###の説明は魔法のように分かりやすく、後輩から慕われています。',
  '###userName###のいいところは字の綺麗さです。丁寧な文字を書く###userName###の心は、きっと綺麗に整っています。',
  '###userName###のいいところは声の大きさです。###userName###のハキハキとした挨拶は、職場や学校の空気を変えます。',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  //文字コードの和を求める
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  //文字コードの和を回答の数で割ったあまりで添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName + 'さん');
  return result;
}

/*
//動作確認
console.log(assessment('太郎'))
console.log(assessment('次郎'))
console.log(assessment('花子'))
*/
//テスト用関数コード
function test() {
  console.log('診断結果の文章テスト')

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎さんのいいところは知識です。博識な太郎さんを多くの人が頼りにしています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
    '次郎さんのいいところは立ち振る舞いです。ふとした仕草が美しい次郎さんは、遠くからでも目立ちます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
    '花子さんのいいところは計画性です。未来を見据えて準備する花子さんは、どんなトラブルも回避できます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文章のテスト終了');
}

test();