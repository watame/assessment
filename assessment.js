"use strict";
// 入力領域
const userNameInput = document.getElementById("user-name");
// 診断ボタン
const assessmentButton = document.getElementById("assessment");
// 診断結果
const resultDivided = document.getElementById("result-area");
// Tweet領域
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  // 子要素がある限り削除する
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// (ES6)無名関数でボタンがクリックされた際に関数が発火する
assessmentButton.onclick = () => {
  // 名前が未入力の場合は処理を行わない
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement("h3");
  header.innerText = "診断結果";
  resultDivided.appendChild(header);

  const paragraph = document.createElement("p");
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TweetAreaの作成
  removeAllChildren(tweetDivided);

  // anchorタグの作成・追加
  const anchor = document.createElement("a");
  //<script async src="" charset="utf-8"></script>
  // 日本語を利用する場合は、URIエンコードを行ってから組み込む
  const hrefValue =
    "https://twitter.com/intent/tweet?button_hashtag=" +
    encodeURIComponent("あなたのいいところ") +
    "&ref_src=twsrc%5Etfw";
  anchor.setAttribute("href", hrefValue);
  anchor.className = "twitter-hashtag-button";
  // 結果を本文に入れる
  anchor.setAttribute("data-text", result);
  anchor.innerText = "Tweet #あなたのいいところ";
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement("script");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  tweetDivided.appendChild(script);
};

// 入力キーを(event)として受け取り、Enterの場合だけassessmentButton.onclickと同一の動作をする
userNameInput.onkeydown = event => {
  if (event.key === "Enter") {
    assessmentButton.onclick();
  }
};

const answers = [
  "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
  "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
  "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
  "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
  "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
  "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
  "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
  "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
  "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
  "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
  "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
  "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
  "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
  "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
  "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
  "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。",
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @returns {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // 正規表現で1行の中で、{userName}という文字列「全て」を置換する
  result = result.replace(/\{userName\}/g, userName);

  return result;
}

console.assert(
  assessment("太郎") ===
    "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
  "診断結果の文言の特定部分を名前に置き換える処理が正しくありません"
);

console.assert(
  assessment("太郎") === assessment("太郎"),
  "同一人物の診断結果の文言が異なっています"
);
