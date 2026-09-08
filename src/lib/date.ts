// 体験オファーの対象月。静的出力とブラウザで同じ表示になるよう明示する。
// キャンペーン更新時はこの値を変更する（最終CTA・追従CTAで共用）。
const offerMonth = 9;

export function currentMonthLabel(): string {
  return `${offerMonth}月`;
}
