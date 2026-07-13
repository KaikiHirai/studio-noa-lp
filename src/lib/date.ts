// 現在月を「7月」形式で返す。オファーの「◯月の無料体験枠」に使用。
// ビルド時（SSG）に評価されるため、静的書き出しでも生成時点の月が入る。
export function currentMonthLabel(now: Date = new Date()): string {
  return `${now.getMonth() + 1}月`;
}
